const fs = require('fs');
const path = require('path');

const generateValidationFile = (moduleName, operation, validationDir) => {
    const content = `
  // ${moduleName} ${operation.toUpperCase()} Validation Schema
  // Implement your validation schema here for ${operation} operation
    `;
    fs.writeFileSync(path.join(validationDir, `${operation}-${moduleName}.schema.ts`), content.trim());
  };

module.exports = generateValidationFile;