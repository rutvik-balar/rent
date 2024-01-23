const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateUsecaseFile = (moduleName, operation, usecaseDir) => {

  let content = ``;

  if (operation == 'create') {
    content = `
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { convertToPagination } from '../../../domain/entities/common/pagination';
import { ${capitalizeFirstLetter(moduleName)}PostReq } from '../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-post.interface';
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError } from '../../../infrastructure/helpers/res';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-repo.interface';

export const ${operation}${capitalizeFirstLetter(moduleName)}UseCase = async (
  input: ${capitalizeFirstLetter(moduleName)}PostReq,
  ${moduleName.toLowerCase()}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  const filter = convertToPagination({
    email: input.email,
  });
  const ${moduleName} = await ${moduleName.toLowerCase()}Repo.get(filter, t);

  if (O.isSome(${moduleName})) {
    return E.left(formatError(StatusCodes.CONFLICT, 'ALREADY_EXIST'));
  } else {
    return E.right(await ${moduleName.toLowerCase()}Repo.create(input, t));
  }
};
  `;
  }
  else if (operation == 'get') {
    content = `
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { Pagination } from '../../../domain/entities/common/pagination';
import { 
  ${capitalizeFirstLetter(moduleName)}GetRes, 
  ${moduleName.toLowerCase()}GetResFromJSON, 
} from '../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-get.interface';
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError } from '../../../infrastructure/helpers/res';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-repo.interface';

export const ${operation}${capitalizeFirstLetter(moduleName)}UseCase = async (
  paginationData: Pagination,
  ${moduleName.toLowerCase()}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, ${capitalizeFirstLetter(moduleName)}GetRes>> => {
  const ${moduleName.toLowerCase()} = await ${moduleName.toLowerCase()}Repo.get(paginationData, t);
  const ${moduleName.toLowerCase()}Count = await ${moduleName.toLowerCase()}Repo.getCount(paginationData, t);

  if (O.isSome(${moduleName.toLowerCase()})) {
    const data = ${moduleName.toLowerCase()}.value.map((item) => ${moduleName.toLowerCase()}GetResFromJSON(item));
    return E.right({ totalRecord: ${moduleName.toLowerCase()}Count, data });
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'));
  }
};
  `;
  }

  else if (operation == 'update') {
    content = `
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { convertToPagination } from '../../../domain/entities/common/pagination';
import { ${capitalizeFirstLetter(moduleName)}PostReq } from '../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-post.interface';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError } from '../../../infrastructure/helpers/res';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-repo.interface';

export const ${operation}${capitalizeFirstLetter(moduleName)}UseCase = async (
  input: ${capitalizeFirstLetter(moduleName)}PostReq,
  ${moduleName.toLowerCase()}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface,
  t: Transaction,
): Promise<E.Either<ReturnType<typeof formatError>, void>> => {
  const filter = convertToPagination({
    email: input.email,
  });

  const ${moduleName} = await ${moduleName.toLowerCase()}Repo.get(filter, t);

  if (O.isSome(${moduleName})) {
    return E.right(await ${moduleName.toLowerCase()}Repo.update(input, t));
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'));
  }
};
  `;

  }
  else {
    content = `
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { convertToPagination } from '../../../domain/entities/common/pagination';
import { ApplicationError } from '../../../infrastructure/configs/constants/application-tag';
import { StatusCodes } from '../../../infrastructure/configs/constants/statusCodes';
import { formatError } from '../../../infrastructure/helpers/res';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from '../../../infrastructure/orm/repositories/mysql-repositories/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-repo.interface';
        
export const ${operation}${capitalizeFirstLetter(moduleName)}UseCase = async (
  email: string,
  ${moduleName.toLowerCase()}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface,
  t: Transaction,
): Promise<E.Either<ApplicationError, void>> => {
  const filter = convertToPagination({
    email,
  });
    
  const ${moduleName} = await ${moduleName.toLowerCase()}Repo.get(filter, t);

  if (O.isSome(${moduleName})) {
    return E.right(await ${moduleName.toLowerCase()}Repo.delete(email, t));
  } else {
    return E.left(formatError(StatusCodes.NOT_FOUND, 'NO_DATA_FOUND'));
  }
};
  `;
  }

    fs.writeFileSync(path.join(usecaseDir, `${operation}-${capitalizeFirstLetter(moduleName)}.usecase.ts`), content.trim());
  };

module.exports = generateUsecaseFile;