const fakePersonRegisterData = require('../data/fakePersonRegisterData')
const fakeExternalMovementsData = require('../data/fakeExternalMovementsData')

const maxExternalMovementDate = new Date('2023-06-06')

const adjustExternalMovementDate = row => {
  const dateDiff = new Date() - maxExternalMovementDate
  return {
    ...row,
    date: (new Date(row.date).getTime() + dateDiff)
  }
}

const sortPageAndFilter = (
  data,
  selectedPage,
  pageSize,
  sortColumnName,
  sortedAsc,
  filters,
  dataFormat
) => filter(data, filters, dataFormat)
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

const filter = (data, filters, dataFormat) => data
  .filter(row => {
    return !Object.keys(filters).find(filter => {
      if (!filters[filter]) {
        return false
      }

      const filterFormat = dataFormat.find(f => f.name === filter && f.filter)

      if (filterFormat.filter.type === 'date-range') {
        const dataDate = new Date(row[filter])

        return (filters[filter].start && new Date(filters[filter].start) > dataDate) ||
          (filters[filter].end && new Date(filters[filter].end) < dataDate)
      }

      return row[filter].toLowerCase() !== filters[filter]
    })
  })

module.exports = {

  listPersonRegister: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc,
    filters,
    dataFormat
  }) => {
    return sortPageAndFilter(
      fakePersonRegisterData.data,
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc,
      filters,
      dataFormat
    )
  },

  countPersonRegister: (filters, dataFormat) => filter(fakePersonRegisterData.data, filters, dataFormat).length,

  listExternalMovements: ({
    selectedPage,
    pageSize,
    sortColumnName,
    sortedAsc,
    filters,
    dataFormat
  }) => {
    return sortPageAndFilter(
      fakeExternalMovementsData.data.map(d => adjustExternalMovementDate(d)),
      selectedPage,
      pageSize,
      sortColumnName,
      sortedAsc,
      filters,
      dataFormat
    )
  },

  countExternalMovements: (filters, dataFormat) => filter(fakeExternalMovementsData.data, filters, dataFormat).length
}
