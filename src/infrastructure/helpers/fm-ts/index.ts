import * as O from 'fp-ts/Option'

export const optionFormatForArray = <D>(data?: D[] | null): O.Option<D[]> => {
  if (Array.isArray(data) && data?.length) {
    return O.some(data)
  } else {
    return O.none
  }
}
export const optionFormatForObject = <D>(data?: D | null): O.Option<D> => {
  if (data && Object.keys(data)?.length) {
    return O.some(data)
  } else {
    return O.none
  }
}
