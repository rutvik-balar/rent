const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateValidationFile = (moduleName, operation, validationDir) => {
    const content = `
import Joi from 'joi'

export const ${operation}${capitalizeFirstLetter(moduleName)}Schema = Joi.object({
  
})
    `;

    fs.writeFileSync(path.join(validationDir, `${operation}-${moduleName}.schema.ts`), content.trim());
  };

module.exports = generateValidationFile;