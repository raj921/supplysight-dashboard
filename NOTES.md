github 
https://github.com/raj921/supplysight-dashboard

Project Overview

This is SupplySight Dashboard, and it is a modern React + GraphQL application that is aimed at managing supply chain inventory. It includes real-time inventory KPI data, trend charts that interactively show stock trends, as well as advanced filter capabilities.

Decisions Made

Tech Stack:

Frontend: React 18, Tailwind CSS, Apollo Client

Backend: Apollo Server, Express, GraphQL

This stack was chosen thanks to its flexibility and modern capabilities, which are suitable for a responsive UI and efficient data handling.

State Management:

Apollo Client was used to manage GraphQL data, making both the state management and data retrieval simple.

Styling.

Tailwind CSS was used because of its utility-first approach to enable fast,yet stylish UI development.

Trade-offs

Performance vs. Complexity:

While using GraphQL makes data fetching easier, it also adds work. It brings complexity to both how the schema needs to be structured and setting up resolvers.

Development Speed vs. Optimization:

In the initial development phase, performance optimization was not prioritized. Future development should focus on addressing performance bottlenecks.

Improvements

Testing:

Integrate comprehensive unit and integration tests for both front-end and backend components in order to ensure a modicum of reliability and more maintainable code.

Error Handling:

Employ more stable error handling in both the client and server, allowing for superior user feedback and detailed debug information.

Documentation:

Make the API endpoints and frontend documentation better, so new staff can join without so much trouble.

User Experience:

Elicit user feedback to find areas for improvement in UI/UX, ensuring the application meets user needs effectively.

Conclusion

The SupplySight Dashboard is a robust application, with a solid foundation. Expanding testing and performance tweaking will make it faster yet