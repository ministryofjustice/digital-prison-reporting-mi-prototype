module.exports = {
  getFilters: (format, filterValues) => (format
    .filter(f => f.filter)
    .map(f => {
      return {
        text: f.display,
        name: f.name,
        type: f.filter.type,
        ...(f.filter.type === 'Radio' && {
          options: f.filter.staticOptions.map((o) => {
            return {
              value: o.name,
              text: o.display
            }
          })
        }),
        value: filterValues ? filterValues[f.name] : null
      }
    })),

  getSortedBy: (fields, sortedByData) => {
    let defaultValue
    const sortableFields = []
    let sortedBy
    let sortDirection
    if (sortedByData) {
      sortedBy = sortedByData.find((s) => s.name === 'Sort by')
      sortDirection = sortedByData.find((d) => d.name === 'Sort direction')
    }

    fields.forEach((field, index) => {
      if (field.sortable) {
        sortableFields.push({
          value: index,
          text: field.display
        })
      }
      if (sortedBy && sortedBy.value === field.display) {
        defaultValue = index + ''
      } else if (field.defaultsort) {
        defaultValue = index + ''
      }
    })

    const selectInput = {
      text: 'Field',
      name: 'sortColumn',
      type: 'Radio',
      options: sortableFields,
      value: defaultValue
    }

    const ascDesc = {
      text: 'Direction',
      name: 'sortedAsc',
      type: 'Radio',
      options: [
        {
          value: 'Asc',
          text: 'Ascending'
        },
        {
          value: 'Desc',
          text: 'Descending'
        }
      ],
      value: sortDirection ? sortDirection.value : 'Asc'
    }

    return [
      selectInput,
      ascDesc
    ]
  }
}
