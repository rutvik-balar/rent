export type OrderField = {
  field: string
  direction: 'asc' | 'desc'
}

export type PaginationField = {
  name: string
  value: string | number
  operation:
    | 'like'
    | 'equals'
    | 'not_equals'
    | 'greater_than'
    | 'less_than'
    | 'greater_than_equals'
    | 'less_than_equals'
}

export type Pagination = {
  fields?: PaginationField[]
  limit?: number
  offset?: number
  order?: OrderField[]
}

type InputOrder = string | string[]

interface ParsedOrder {
  field: string
  direction: 'asc' | 'desc'
}

export const parseOrder = (order: InputOrder): ParsedOrder[] => {
  if (typeof order === 'string') {
    const [field, direction] = order.split(' | ')
    return [{ field, direction: (direction as 'asc' | 'desc') || 'asc' }]
  } else if (Array.isArray(order)) {
    return order.map((item) => {
      const [field, direction] = item.split(' | ')
      return { field, direction: (direction as 'asc' | 'desc') || 'asc' }
    })
  }
  return []
}

export const convertToPagination = (data: any): Pagination => {
  const { order, limit, offset, ...fields } = data
  const orderFields = parseOrder(order)

  const pagination: Pagination = {
    fields: Object.keys(fields).map((fieldName) => {
      if (typeof fields[fieldName] === 'number') {
        return {
          name: fieldName,
          value: fields[fieldName],
          operation: 'equals',
        }
      }
      return {
        name: fieldName,
        value: fields[fieldName].split(' | ')[0],
        operation: fields[fieldName].split(' | ')[1] || 'equals',
      }
    }),
    order: orderFields,
    limit: limit ? parseInt(limit, 10) : undefined,
    offset: offset ? parseInt(offset, 10) : undefined,
  }

  return pagination
}
