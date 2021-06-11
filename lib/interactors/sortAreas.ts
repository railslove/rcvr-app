import { AreaRes } from '~lib/api'

export const sortAreas = (areas: AreaRes[]): AreaRes[] => {
  //console.log(areas)
  //return (areas)
  return (
    areas?.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name)
    }) || []
  )
}
