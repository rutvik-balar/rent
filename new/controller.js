const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateControllerFile = (moduleName, operation, controllerDir) => {

  let content = `
  import { NextFunction, Request, Response } from 'express';

import { ${operation}${capitalizeFirstLetter(moduleName)}UseCase } from '../../../application/usecase/${moduleName.toLowerCase()}/${operation}-${moduleName.toLowerCase()}.usecase';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { handleResult } from '../../../infrastructure/helpers/res';
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo';
import { mysql${capitalizeFirstLetter(moduleName)}Repo } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo';

export const ${operation}${capitalizeFirstLetter(moduleName)}Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await ${operation}${capitalizeFirstLetter(moduleName)}UseCase(mysql${capitalizeFirstLetter(moduleName)}Repo, t);
    });
    handleResult(req, res, next, StatusCodes.OK, 'OK', data);
  } catch (error) {
    next(error);
  }
};
 `;

  fs.writeFileSync(path.join(controllerDir, `${operation}-${moduleName.toLowerCase()}.controller.ts`), content.trim());
};

module.exports = generateControllerFile;
