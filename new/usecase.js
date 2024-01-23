const fs = require('fs');
const path = require('path');

const generateUsecaseFile = (moduleName, operation, usecaseDir) => {
    const content = `
  // ${moduleName} ${operation.toUpperCase()} UseCase
  // Implement your use case logic here for ${operation} operation
    `;
    fs.writeFileSync(path.join(usecaseDir, `${operation}-${moduleName}.usecase.ts`), content.trim());
  };

module.exports = generateUsecaseFile;