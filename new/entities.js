const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateEntitiesFile = (moduleName, repositoryDir) => {

  const getInterfaceContent = `
  export interface ${capitalizeFirstLetter(moduleName)}GetDB {
    // Add more properties as needed
  }
  `;
  const postInterfaceContent = `
  export interface ${capitalizeFirstLetter(moduleName)}PostReq {
    // Add more properties as needed
  }
    `;

    fs.appendFileSync(path.join(repositoryDir, `${moduleName}-get.interface.ts`), getInterfaceContent.trim());
    fs.appendFileSync(path.join(repositoryDir, `${moduleName}-post.interface.ts`), postInterfaceContent.trim());

  };

module.exports = generateEntitiesFile;