const fakePersonRegisterData = require('../data/fakePersonRegisterData')

module.exports = {

  listPersonRegister: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc
  }) => {
    return fakePersonRegisterData.data
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
  },

  countPersonRegister: () => {
    return fakePersonRegisterData.data.length
  }

}
