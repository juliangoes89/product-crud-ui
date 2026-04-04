# Product CRUD Application

This project is a React application built with Vite that provides a CRUD interface for managing products. It interacts with a product API defined by the provided Swagger file.

## Features

- Create, Read, Update, and Delete (CRUD) operations for products.
- Responsive design for a seamless user experience.
- TypeScript for type safety and better development experience.

## Project Structure

```
product-crud-app
├── public                # Static assets
├── src                   # Source code
│   ├── api               # API client and product API functions
│   ├── components        # Reusable components for product forms and lists
│   ├── pages             # Page components for routing
│   ├── types             # TypeScript interfaces
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point of the application
│   └── vite-env.d.ts     # Vite environment types
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd product-crud-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## API Integration

The application communicates with a product API. Ensure that the API is running and accessible. The API endpoints are defined in the `src/api/products.ts` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.