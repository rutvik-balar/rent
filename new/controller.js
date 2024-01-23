const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateControllerFile = (moduleName, operation, controllerDir) => {

  let content = ``;

  if (operation == 'create') {
    content = `
import { NextFunction, Request, Response } from 'express';

import { get${capitalizeFirstLetter(moduleName)}UseCase } from '../../../application/usecase/${moduleName.toLowerCase()}/get-${moduleName.toLowerCase()}.usecase';
import { convertToPagination, Pagination } from '../../../domain/entities/common/pagination';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { handleResult } from '../../../infrastructure/helpers/res';
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo';
import { mysql${capitalizeFirstLetter(moduleName)}Repo } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo';

export const get${capitalizeFirstLetter(moduleName)}Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const paginationData: Pagination = convertToPagination(req.query);
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await get${capitalizeFirstLetter(moduleName)}UseCase(paginationData, mysql${capitalizeFirstLetter(moduleName)}Repo, t);
    });
    handleResult(req, res, next, StatusCodes.OK, 'OK', data);
  } catch (error) {
    next(error);
  }
};
  `;
  }
  else if (operation == 'get') {
    content = `
import { NextFunction, Request, Response } from 'express';

import { ${capitalizeFirstLetter(moduleName)}UseCase } from '../../../application/usecase/${moduleName.toLowerCase()}/get-${moduleName.toLowerCase()}.usecase';
import { convertToPagination, Pagination } from '../../../domain/entities/common/pagination';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { handleResult } from '../../../infrastructure/helpers/res';
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo';
import { mysql${capitalizeFirstLetter(moduleName)}Repo } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo';

export const get${capitalizeFirstLetter(moduleName)}Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const paginationData: Pagination = convertToPagination(req.query);
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await ${capitalizeFirstLetter(moduleName)}UseCase(paginationData, mysql${capitalizeFirstLetter(moduleName)}Repo, t);
    });
    handleResult(req, res, next, StatusCodes.OK, 'OK', data);
  } catch (error) {
    next(error);
  }
};
  `;
  }

  else if (operation == 'update') {
    content = `
import { NextFunction, Request, Response } from 'express';

import { update${capitalizeFirstLetter(moduleName)}UseCase } from '../../../application/usecase/${moduleName.toLowerCase()}/update-${moduleName.toLowerCase()}.usecase';
import { ${capitalizeFirstLetter(moduleName)}PostReq } from '../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-post.interface';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { handleResult } from '../../../infrastructure/helpers/res';
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo';
import { mysql${capitalizeFirstLetter(moduleName)}Repo } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo';

export const update${capitalizeFirstLetter(moduleName)}Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const input: ${capitalizeFirstLetter(moduleName)}PostReq = req.body;

    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await update${capitalizeFirstLetter(moduleName)}UseCase(input, mysql${capitalizeFirstLetter(moduleName)}Repo, t);
    });
    handleResult(req, res, next, StatusCodes.OK, 'OK', data);
  } catch (error) {
    next(error);
  }
};
  `;

  }
  else {
    content = `
import { NextFunction, Request, Response } from 'express';

import { delete${capitalizeFirstLetter(moduleName)}UseCase } from '../../../application/usecase/${moduleName.toLowerCase()}/delete-${moduleName.toLowerCase()}.usecase';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError, handleResult } from '../../../infrastructure/helpers/res';
import { mysqlCommonRepo } from '../../../infrastructure/orm/repositories/mysql-repositories/common/common.repo';
import { mysql${capitalizeFirstLetter(moduleName)}Repo } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.repo';

export const delete${capitalizeFirstLetter(moduleName)}Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email = req.query.email as string;
    const data = await mysqlCommonRepo.wrapInWorkUnitCtx(async (t) => {
      return await delete${capitalizeFirstLetter(moduleName)}UseCase(email, mysql${capitalizeFirstLetter(moduleName)}Repo, t);
    });
    handleResult(req, res, next, StatusCodes.OK, 'OK', data);
  } catch (error: any) {
    switch (error?.message) {
      case 'NO_DATA_FOUND': {
        const errorFormat = formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND');
        next(errorFormat);
        break;
      }
      default: {
        next(error);
        break;
      }
    }
  }
};
  `;
  }
  fs.writeFileSync(path.join(controllerDir, `${operation}-${moduleName.toLowerCase()}.controller.ts`), content.trim());
};

module.exports = generateControllerFile;
