const { gql } = require('graphql-tag');


const warehouses = [
  { code: 'BLR-A', name: 'Bangalore A', city: 'Bangalore', country: 'India' },
  { code: 'PNQ-C', name: 'Pune C', city: 'Pune', country: 'India' },
  { code: 'DEL-B', name: 'Delhi B', city: 'Delhi', country: 'India' },
  { code: 'MUM-D', name: 'Mumbai D', city: 'Mumbai', country: 'India' },
];

const products = [
  { id: 'P-1001', name: '12mm Hex Bolt', sku: 'HEX-12-100', warehouse: 'BLR-A', stock: 180, demand: 120 },
  { id: 'P-1002', name: 'Steel Washer', sku: 'WSR-08-500', warehouse: 'BLR-A', stock: 50, demand: 80 },
  { id: 'P-1003', name: 'M8 Nut', sku: 'NUT-08-200', warehouse: 'PNQ-C', stock: 80, demand: 80 },
  { id: 'P-1004', name: 'Bearing 608ZZ', sku: 'BRG-608-50', warehouse: 'DEL-B', stock: 24, demand: 120 }
];


const generateKPIs = (range) => {
  const days = parseInt(range.replace('d', ''));
  const kpis = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const stock = Math.floor(Math.random() * 1000) + 500;
    const demand = Math.floor(Math.random() * 800) + 300;
    
    kpis.push({
      date: date.toISOString().split('T')[0],
      stock,
      demand,
    });
  }
  
  return kpis;
};

const typeDefs = gql`
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let filteredProducts = [...products];
      
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.id.toLowerCase().includes(searchLower)
        );
      }
      
     
      if (warehouse) {
        filteredProducts = filteredProducts.filter(product => product.warehouse === warehouse);
      }
      
      
      if (status && status !== 'All') {
        filteredProducts = filteredProducts.filter(product => {
          if (status === 'Healthy') return product.stock > product.demand;
          if (status === 'Low') return product.stock === product.demand;
          if (status === 'Critical') return product.stock < product.demand;
          return true;
        });
      }
      
      return filteredProducts;
    },
    
    warehouses: () => warehouses,
    
    kpis: (_, { range }) => generateKPIs(range),
  },
  
  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      products[productIndex].demand = demand;
      return products[productIndex];
    },
    
    transferStock: (_, { id, from, to, qty }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      const product = products[productIndex];
      
      if (product.warehouse !== from) {
        throw new Error('Product not in source warehouse');
      }
      
      if (product.stock < qty) {
        throw new Error('Insufficient stock for transfer');
      }
      
      product.stock -= qty;
      product.warehouse = to;
      
      return product;
    },
  },
};

module.exports = { typeDefs, resolvers };
