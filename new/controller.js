const fs = require('fs');
const path = require('path');

const generateControllerFile = (moduleName, operation, controllerDir) => {
    const content = `
  // ${moduleName} ${operation.toUpperCase()} Controller
  // Implement your controller logic here for ${operation} operation
    `;
    fs.writeFileSync(path.join(controllerDir, `${operation}-${moduleName}.controller.ts`), content.trim());
  };

module.exports = generateControllerFile;
