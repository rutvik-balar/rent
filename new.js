const fs = require('fs');
const path = require('path');

const moduleName = 'product';
const modulePath = path.join(__dirname, 'src', 'apis', moduleName);

// Create module directory if it doesn't exist
if (!fs.existsSync(modulePath)) {
  fs.mkdirSync(modulePath);

  // Create paths directory
  const pathsDir = path.join(modulePath, 'paths');
  fs.existsSync(pathsDir) ? fs.rmSync(pathsDir, { recursive: true }) : null 
  fs.mkdirSync(pathsDir);

  // Create schemas directory
  const schemasDir = path.join(modulePath, 'schemas');
  fs.existsSync(schemasDir) ? fs.rmSync(schemasDir, { recursive: true }) : null 
  fs.mkdirSync(schemasDir);

  // Create controller directory
  const controllerDir = path.join(__dirname, 'src', 'interface', 'controller', moduleName);
  fs.existsSync(controllerDir) ? fs.rmSync(controllerDir, { recursive: true }) : null 
  fs.mkdirSync(controllerDir);

  // Create usecase directory
  const usecaseDir = path.join(__dirname, 'src', 'application', 'usecase', moduleName);
  fs.existsSync(usecaseDir) ? fs.rmSync(usecaseDir, { recursive: true }) : null 
  fs.mkdirSync(usecaseDir);

  // Create validation directory
  const validationDir = path.join(__dirname, 'src', 'interface', 'validation', moduleName);
  fs.existsSync(validationDir) ? fs.rmSync(validationDir, { recursive: true }) : null 
  fs.mkdirSync(validationDir);

  // Create repository directory
  const repositoryDir = path.join(__dirname, 'src', 'infrastructure', 'orm', 'repositories', 'mysql-repositories', moduleName);
  fs.existsSync(repositoryDir) ? fs.rmSync(repositoryDir, { recursive: true }) : null 
  fs.mkdirSync(repositoryDir);

  // Create API docs directory
  const apiDocsDir = path.join(__dirname, 'api-docs', 'paths');
  if (!fs.existsSync(apiDocsDir)) {
    fs.mkdirSync(apiDocsDir);
  }

  // CRUD operations: get, create, update, delete
  const crudOperations = ['get', 'create', 'update', 'delete'];

  // Loop through CRUD operations
  crudOperations.forEach((operation) => {
    // Create API path file
    const pathFileContent = `
# ${moduleName} ${operation.toUpperCase()} API Paths
/${moduleName}/${operation}:
  ${operation === 'get' ? 'get' : 'post'}:
    summary: ${operation === 'get' ? `Get ${moduleName} details` : `Create a new ${moduleName}` }
    responses:
      '200':
        description: Successful response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/${moduleName}-${operation}'
  `;
    fs.writeFileSync(path.join(pathsDir, `${moduleName}-${operation}.yaml`), pathFileContent.trim());

    // Create API schema file
    const schemaFileContent = `
# ${moduleName} ${operation.toUpperCase()} Schema
${moduleName}-${operation}:
  type: object
  properties:
    // Define properties here
  required:
    // Define required properties here
  `;
    fs.writeFileSync(path.join(schemasDir, `${moduleName}-${operation}.yaml`), schemaFileContent.trim());

    // Create Controller file
    const controllerFileContent = `
// ${moduleName} ${operation.toUpperCase()} Controller
// Implement your controller logic here for ${operation} operation
    `;
    fs.writeFileSync(path.join(controllerDir, `${operation}-${moduleName}.controller.ts`), controllerFileContent.trim());

    // Create UseCase file
    const usecaseFileContent = `
// ${moduleName} ${operation.toUpperCase()} UseCase
// Implement your use case logic here for ${operation} operation
    `;
    fs.writeFileSync(path.join(usecaseDir, `${operation}-${moduleName}.usecase.ts`), usecaseFileContent.trim());

    // Create Validation Schema file
    const validationFileContent = `
// ${moduleName} ${operation.toUpperCase()} Validation Schema
// Implement your validation schema here for ${operation} operation
    `;
    fs.writeFileSync(path.join(validationDir, `${operation}-${moduleName}.schema.ts`), validationFileContent.trim());

    // Create Repository file
    const repositoryFileContent = `
// ${moduleName} ${operation.toUpperCase()} Repository
// Implement your repository logic here for ${operation} operation
    `;
    fs.writeFileSync(path.join(repositoryDir, `${operation}-${moduleName}.repo.ts`), repositoryFileContent.trim());

    // Create API Docs file
    const apiDocsFileContent = `
# ${moduleName} ${operation.toUpperCase()} API Paths
/${moduleName}/${operation}:
  ${operation === 'get' ? 'get' : 'post'}:
    summary: ${operation === 'get' ? `Get ${moduleName} details` : `Create a new ${moduleName}` }
    responses:
      '200':
        description: Successful response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/${moduleName}-${operation}'
  `;
    fs.writeFileSync(path.join(apiDocsDir, `${moduleName}-${operation}.yaml`), apiDocsFileContent.trim());
  });

  console.log(`API module for '${moduleName}' with CRUD operations generated successfully!`);
} else {
  console.error(`Error: Module '${moduleName}' already exists.`);
}
