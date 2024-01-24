const generateControllerFile = require('./new/controller');
const generateRepositoryFile = require('./new/repository');
const generateUsecaseFile = require('./new/usecase');
const generateValidationFile = require('./new/validation');
const generateEntitiesFile = require('./new/entities');

const fs = require('fs');
const path = require('path');

const moduleName = 'product';
const modulePath = path.join(__dirname, 'src', 'apis', moduleName);

// Create module directory if it doesn't exist
// if (!fs.existsSync(modulePath)) {
  fs.existsSync(modulePath) ? fs.rmSync(modulePath, { recursive: true }) : null 
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

  // Create entities directory
  const entitiesDir = path.join(__dirname, 'src', 'domain', 'entities', moduleName);
  fs.existsSync(entitiesDir) ? fs.rmSync(entitiesDir, { recursive: true }) : null 
  fs.mkdirSync(entitiesDir);

  // Create API docs directory
  const apiDocsDir = path.join(__dirname, 'api-docs', 'paths');
  if (!fs.existsSync(apiDocsDir)) {
    fs.mkdirSync(apiDocsDir);
  }

  // CRUD operations: get, create, update, delete
  const crudOperations = ['get', 'create', 'update', 'delete'];

  // Loop through CRUD operations
  crudOperations.forEach((operation) => {

  // Create Controller file
  generateControllerFile(moduleName, operation, controllerDir);

  // Create UseCase file
  generateUsecaseFile(moduleName, operation, usecaseDir);

  // Create Validation Schema file
  generateValidationFile(moduleName, operation, validationDir);

  // Create Repository file
  // generateRepositoryFile(moduleName, operation, repositoryDir);

  });

  generateRepositoryFile(moduleName, repositoryDir);

  generateEntitiesFile(moduleName, entitiesDir);


  console.log(`API module for '${moduleName}' with CRUD operations generated successfully!`);
// } else {
  // console.error(`Error: Module '${moduleName}' already exists.`);
// }
