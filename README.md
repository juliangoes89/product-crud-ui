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

## Testing

Run unit tests once:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

Coverage artifacts are generated in the `coverage/` folder.

## API Integration

The application communicates with a product API. Ensure that the API is running and accessible. The API endpoints are defined in the `src/api/products.ts` file.

## Deployment

### Initial setup

#### 1 Login and select subscription

az login
az account set --subscription "<your-subscription-id-or-name>"

#### 2 Variables

$rg="crud-products-rg"
$location="brazilsouth"
$plan="ui-products-plan"
$app="ui-products"
$api="https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net"

#### 3 Create resource group, app service plan, and web app

az group create --name $rg --location $location
az appservice plan create --name $plan --resource-group $rg --sku B1 --is-linux
az webapp create --name $app --resource-group $rg --plan $plan --runtime "NODE|20-lts"

#### 4 Configure app setting for Vite API base URL

az webapp config appsettings set --resource-group $rg --name $app --settings VITE_API_BASE_URL=$api

#### 5 Build and package app

npm install
npm run build
Compress-Archive -Path .\dist\* -DestinationPath [dist.zip](http://_vscodecontentref_/1) -Force

#### 6 Deploy zip and verify

az webapp deploy --resource-group $rg --name $app --src-path [dist.zip](http://_vscodecontentref_/2) --type zip
az webapp show --resource-group $rg --name $app --query "{name:name, host:defaultHostName, state:state}" -o json

To deploy the application to Azure, you can use the following command in PowerShell:

#### Deploy to Azure

```bash
Set-Location 'c:\EAFIT\Docencia\Proyecto 2\Semana 11\Pruebas Automatizadas\UI\product-crud-app'; $app='ui-products'; $rg='crud-products-rg'; $api='https://api-products-efg7evbffkhybqde.brazilsouth-01.azurewebsites.net'; az webapp config appsettings set --resource-group $rg --name $app --settings VITE_API_BASE_URL=$api --output none; az webapp deploy --resource-group $rg --name $app --src-path '.\dist.zip' --type zip; az webapp show --resource-group $rg --name $app --query "{name:name, host:defaultHostName, state:state}" -o json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.