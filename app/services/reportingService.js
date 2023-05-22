const fakePersonRegisterData = require('../data/fakePersonRegisterData')
const fakeExternalMovementsData = require('../data/fakeExternalMovementsData')

const sortAndPage = (
  data,
  selectedPage,
  pageSize,
  sortColumnName,
  sortedAsc
) => data
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

module.exports = {

  listPersonRegister: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc
  }) => {
    return sortAndPage(
      fakePersonRegisterData.data,
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc
    )
  },

  countPersonRegister: () => {
    return fakePersonRegisterData.data.length
  },

  listExternalMovements: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc
  }) => {
    return sortAndPage(
      fakeExternalMovementsData.data,
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc
    )
  },

  countExternalMovements: () => {
    return fakeExternalMovementsData.data.length
  }
}
