import { AreaRes } from '~lib/api'

export const sortAreas = (areas: AreaRes[]): AreaRes[] => {
  return (
    areas?.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name)
    }) || []
  )
}
