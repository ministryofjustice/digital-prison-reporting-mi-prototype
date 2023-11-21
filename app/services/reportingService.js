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
    let aVal = a[sortColumnName]
    let bVal = b[sortColumnName]

    if (sortColumnName === 'name') {
      aVal = a.lastName + a.firstName
      bVal = b.lastName + b.firstName
    }

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
      if (!filterFormat) {
        return false
      }

      if (filterFormat.filter.type === 'date-range') {
        const dataDate = new Date(row[filter])

        return (filters[filter].start && new Date(filters[filter].start) > dataDate) ||
          (filters[filter].end && new Date(filters[filter].end) < dataDate)
      }

      return row[filter].toLowerCase() !== filters[filter]
    })
  })

module.exports = {
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

  countExternalMovements: (filters, dataFormat) => filter(fakeExternalMovementsData.data, filters, dataFormat).length,

  reportExternalMovements: ({
    filters,
    dataFormat,
    groupFieldName
  }) => {
    const data = filter(fakeExternalMovementsData.data.map(d => adjustExternalMovementDate(d)), filters, dataFormat)
    const groupField = dataFormat.find(field => field.name === groupFieldName)

    const groupedData = {}
    if (groupField.grouping && groupField.grouping.groups) {
      groupField.grouping.groups.forEach(g => {
        groupedData[g.value] = 0
      })
    }

    data.forEach(d => {
      const value = d[groupFieldName]
      if (groupedData[value]) {
        groupedData[value]++
      } else {
        groupedData[value] = 1
      }
    })

    let groupedDataByHeader = {}

    if (groupField.grouping && groupField.grouping.groups) {
      Object.keys(groupedData).forEach(name => {
        const groupOption = groupField.grouping.groups.find(g => g.value === name)

        if (groupOption) {
          groupedDataByHeader[groupOption.text] = groupedData[name]
        } else {
          groupedDataByHeader[name] = groupedData[name]
        }
      })
    } else {
      groupedDataByHeader = groupedData
    }

    return groupedDataByHeader
  }
}
