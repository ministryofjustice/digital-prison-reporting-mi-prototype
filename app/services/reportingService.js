const fakePersonRegisterData = require('../data/fakePersonRegisterData')
const fakeExternalMovementsData = require('../data/fakeExternalMovementsData')

const sortPageAndFilter = (
  data,
  selectedPage,
  pageSize,
  sortColumnName,
  sortedAsc,
  filters
) => filter(data, filters)
  .sort((a, b) => {
    const aVal = a[sortColumnName]
    const bVal = b[sortColumnName]

    if (aVal === bVal) {
      return 0
    } else if (aVal < bVal) {
      return sortedAsc ? -1 : 1
    } else {
      return sortedAsc ? 1 : -1
    }
  })
  .slice((selectedPage - 1) * pageSize, (selectedPage * pageSize))

const filter = (data, filters) => data
  .filter(row => (
    !Object.keys(filters).find(filter => (
      filters[filter] && row[filter].toLowerCase() !== filters[filter]
    ))
  ))

module.exports = {

  listPersonRegister: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc,
    filters
  }) => {
    return sortPageAndFilter(
      fakePersonRegisterData.data,
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc,
      filters
    )
  },

  countPersonRegister: (filters) => filter(fakePersonRegisterData.data, filters).length,

  listExternalMovements: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc,
    filters
  }) => {
    return sortPageAndFilter(
      fakeExternalMovementsData.data,
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc,
      filters
    )
  },

  countExternalMovements: (filters) => filter(fakeExternalMovementsData.data, filters).length
}
