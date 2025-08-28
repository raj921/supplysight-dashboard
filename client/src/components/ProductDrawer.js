import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { UPDATE_DEMAND, TRANSFER_STOCK } from '../graphql/queries';
import { useMutation } from '@apollo/client';

function ProductDrawer({ isOpen, product, onClose, onUpdate }) {
  const [demand, setDemand] = useState(product?.demand || 0);
  const [transferQty, setTransferQty] = useState(0);
  const [transferWarehouse, setTransferWarehouse] = useState('');

  const [updateDemand, { loading: updatingDemand }] = useMutation(UPDATE_DEMAND);
  const [transferStock, { loading: transferringStock }] = useMutation(TRANSFER_STOCK);

  useEffect(() => {
    if (product) {
      setDemand(product.demand);
    }
  }, [product]);

  const handleUpdateDemand = async (e) => {
    e.preventDefault();
    try {
      await updateDemand({ 
        variables: { 
          id: product.id, 
          demand: parseInt(demand) 
        } 
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating demand:', error);
    }
  };

  const handleTransferStock = async (e) => {
    e.preventDefault();
    try {
      await transferStock({ 
        variables: { 
          id: product.id, 
          from: product.warehouse, 
          to: transferWarehouse, 
          qty: parseInt(transferQty) 
        } 
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error transferring stock:', error);
    }
  };

  if (!isOpen || !product) return null;

  const getStatus = () => {
    if (product.stock > product.demand) return '🟢 Healthy';
    if (product.stock === product.demand) return '🟡 Low';
    return '🔴 Critical';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl">
        <div className="h-full flex flex-col">
        
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

         
          <div className="flex-1 overflow-y-auto p-6">
     
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ID:</span>
                  <span className="ml-2 text-gray-900">{product.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 text-gray-900">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-600">Warehouse:</span>
                  <span className="ml-2 text-gray-900">{product.warehouse}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 text-gray-900">{getStatus()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Current Stock:</span>
                  <span className="ml-2 text-gray-900">{product.stock.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Current Demand:</span>
                  <span className="ml-2 text-gray-900">{product.demand.toLocaleString()}</span>
                </div>
              </div>
            </div>

          
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Update Demand</h4>
              <form onSubmit={handleUpdateDemand}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Demand Quantity
                  </label>
                  <input
                    type="number"
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)}
                    className="input-field"
                    min="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingDemand}
                  className="btn-primary w-full"
                >
                  {updatingDemand ? 'Updating...' : 'Update Demand'}
                </button>
              </form>
            </div>

        
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Transfer Stock</h4>
              <form onSubmit={handleTransferStock}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Transfer
                  </label>
                  <input
                    type="number"
                    value={transferQty}
                    onChange={(e) => setTransferQty(e.target.value)}
                    className="input-field"
                    min="1"
                    max={product.stock}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Warehouse
                  </label>
                  <input
                    type="text"
                    value={transferWarehouse}
                    onChange={(e) => setTransferWarehouse(e.target.value)}
                    className="input-field"
                    placeholder="Enter warehouse code"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={transferringStock}
                  className="btn-primary w-full"
                >
                  {transferringStock ? 'Transferring...' : 'Transfer Stock'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDrawer;
