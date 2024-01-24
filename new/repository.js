const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const generateRepositoryFile = (moduleName, repositoryDir) => {

  const repositoryContent = `
import { Transaction } from 'sequelize';

import { ${capitalizeFirstLetter(moduleName)}RepoInterface } from './${moduleName.toLowerCase()}.repo.interface';
    
export const mysql${capitalizeFirstLetter(moduleName)}Repo: ${capitalizeFirstLetter(moduleName)}RepoInterface = {
  create: async (t: Transaction): Promise<void> => {
  },
  getCount: async (t: Transaction): Promise<void> => {
  },
  update: async (t: Transaction): Promise<void> => {
  },
  get: async (t: Transaction): Promise<void> => {
  },
  delete: async (t: Transaction): Promise<void> => {
  },
};
  `;
  const repositoryInterfaceContent = `
import { Transaction } from 'sequelize';
  
export type ${capitalizeFirstLetter(moduleName)}RepoInterface = {
  create: (transaction: Transaction) => void;

  get: (transaction: Transaction) => Promise<void>;

  getCount: (transaction: Transaction) => Promise<void>;

  update: (transaction: Transaction) => Promise<void>;

  delete: (transaction: Transaction) => Promise<void>;
};
  `;

    fs.appendFileSync(path.join(repositoryDir, `${moduleName}.repo.ts`), repositoryContent.trim());
    fs.appendFileSync(path.join(repositoryDir, `${moduleName}.repo.interface.ts`), repositoryInterfaceContent.trim());

  };

module.exports = generateRepositoryFile;