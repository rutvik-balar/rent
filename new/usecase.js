const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateUsecaseFile = (moduleName, operation, usecaseDir) => {

  let content = `
import * as E from 'fp-ts/Either';
import { Transaction } from 'sequelize';

import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError } from '../../../infrastructure/helpers/res';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo.interface';
  
export const ${operation}${capitalizeFirstLetter(moduleName)}UseCase = async (
  ${moduleName.toLowerCase()}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'));
};
`;

    fs.writeFileSync(path.join(usecaseDir, `${operation}-${moduleName}.usecase.ts`), content.trim());
  };

module.exports = generateUsecaseFile;