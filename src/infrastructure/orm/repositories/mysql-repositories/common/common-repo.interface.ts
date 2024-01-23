import { WhereOptions } from 'sequelize'

import {
  OrderField,
  PaginationField,
} from '../../../../../domain/entities/common/pagination'

export type CommonRepoInterface<WorkUnitCtx> = {
  wrapInWorkUnitCtx: <X>(
    fn: (workUnitCtx: WorkUnitCtx) => Promise<X>,
  ) => Promise<X>

  convertOrder: (order?: OrderField[]) => [string, 'asc' | 'desc'][] | undefined

  whereCondition: (
    fields?: PaginationField[],
    active?: 'active' | 'inactive' | 'both',
  ) => WhereOptions
}
