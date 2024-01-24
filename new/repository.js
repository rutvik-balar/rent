const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateRepositoryFile = (moduleName, repositoryDir) => {

  const repositoryContent = `
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { Pagination } from '../../../../../domain/entities/common/pagination';
import { ${capitalizeFirstLetter(moduleName)}GetDB } from '../../../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-get.interface';
import { ${capitalizeFirstLetter(moduleName)}PostReq } from '../../../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-post.interface';
import { optionFormatForArray } from '../../../../helpers/fm-ts';
import ${capitalizeFirstLetter(moduleName)} from '../../../sequelize/entities/t_${moduleName.toLowerCase()}';
import { mysqlCommonRepo } from '../common/common.repo';
import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from './${moduleName.toLowerCase()}-repo.interface';
  
export const mysql${capitalizeFirstLetter(moduleName)}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface = {
  create: async (input: ${capitalizeFirstLetter(moduleName)}PostReq, t: Transaction): Promise<void> => {
    await ${capitalizeFirstLetter(moduleName)}.create(input, { transaction: t });
  },
  get: async (paginationData: Pagination, t: Transaction): Promise<O.Option<${capitalizeFirstLetter(moduleName)}GetDB[]>> => {
    const { fields, order, limit, offset } = paginationData;
    const where = mysqlCommonRepo.whereCondition(fields);
    const orderBy = mysqlCommonRepo.convertOrder(order);

    const data = await ${capitalizeFirstLetter(moduleName)}.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'description',
        'created_at',
        'updated_at',
      ],
      where,
      limit,
      offset,
      order: orderBy,
      transaction: t,
    });
    return optionFormatForArray<${capitalizeFirstLetter(moduleName)}GetDB>(data);
  },
  getCount: async (paginationData: Pagination, t: Transaction): Promise<number> => {
    const { fields } = paginationData;
    const where = mysqlCommonRepo.whereCondition(fields);

    const data = await ${capitalizeFirstLetter(moduleName)}.count({
      where,
      transaction: t,
    });
    return data;
  },
  update: async (input: ${capitalizeFirstLetter(moduleName)}PostReq, t: Transaction): Promise<void> => {
    await ${capitalizeFirstLetter(moduleName)}.update(
      {
        name: input.name,
        description: input.description,
        update_at: Date.now(),
      },
      { where: { email: input.email }, transaction: t },
    );
  },
  delete: async (email: string, t: Transaction): Promise<void> => {
    await ${capitalizeFirstLetter(moduleName)}.update(
      { is_active: 0, update_at: Date.now() },
      { where: { email }, transaction: t },
    );
  },
};
  `;
  const repositoryInterfaceContent = `
import * as O from 'fp-ts/Option';
import { Transaction } from 'sequelize';

import { Pagination } from '../../../../../domain/entities/common/pagination';
import { ${capitalizeFirstLetter(moduleName)}GetDB } from '../../../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-get.interface';
import { ${capitalizeFirstLetter(moduleName)}PostReq } from '../../../../../domain/entities/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}-post.interface';
  
export type ${capitalizeFirstLetter(moduleName)}RepoInterface = {
  create: (input: ${capitalizeFirstLetter(moduleName)}PostReq, transaction: Transaction) => void;

  get: (
    paginationData: Pagination, 
    transaction: Transaction
  ) => Promise<O.Option<${capitalizeFirstLetter(moduleName)}GetDB[]>>;

  getCount: (
    paginationData: Pagination, 
    transaction: Transaction
  ) => Promise<number>;

  update: (input: any, transaction: Transaction) => Promise<void>;

  delete: (email: string, transaction: Transaction) => Promise<void>;
};
    `;

    fs.appendFileSync(path.join(repositoryDir, `${moduleName}.repo.ts`), repositoryContent.trim());
    fs.appendFileSync(path.join(repositoryDir, `${moduleName}.repo.interface.ts`), repositoryInterfaceContent.trim());

  };

module.exports = generateRepositoryFile;