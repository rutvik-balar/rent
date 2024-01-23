const fs = require('fs');
const path = require('path');

const generateRepositoryFile = (moduleName, operation, repositoryDir) => {
    const content = `
  // ${moduleName} ${operation.toUpperCase()} Repository
  // Implement your repository logic here for ${operation} operation
    `;

    fs.writeFileSync(path.join(repositoryDir, `${operation}-${moduleName}.repo.ts`), content.trim());
  };

module.exports = generateRepositoryFile;