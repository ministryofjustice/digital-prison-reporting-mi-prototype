const fakePersonRegisterData = require('../data/fakePersonRegisterData')
const fakeExternalMovementsData = require('../data/fakeExternalMovementsData')

const parseLocaleDate = dateString => {
  const dateParser = /(\d{2})\/(\d{2})\/(\d{4})/
  const match = dateString.match(dateParser)
  return new Date(
    match[3],
    match[2] - 1,
    match[1]
  )
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
        const filterStartDate = parseLocaleDate(filters[filter].start)
        const filterEndDate = parseLocaleDate(filters[filter].end)
        return dataDate < filterStartDate || dataDate > filterEndDate
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
      fakeExternalMovementsData.data,
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
