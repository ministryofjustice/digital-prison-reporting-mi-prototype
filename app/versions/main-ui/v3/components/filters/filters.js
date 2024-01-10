/* Nunjuck filter methods to be included in an app's filters.js */

const getFilterValueForDisplay = filter => {
  switch (filter.type) {
    case 'select':
    case 'radio':
      return filter.options.find(o => o.value === filter.value).text
    case 'date-range':
      return filter.value.start + ' - ' + filter.value.end
    default:
      return filter.value
  }
}

const valueIsNotEmpty = f => (f.value && (f.type !== 'date-range' || f.value.start || f.value.end))

module.exports = {
  mapSelectedValuesForFilter: (filters, createUrlForParameters) => (
    filters
      .filter(f => valueIsNotEmpty(f))
      .map(f => ({
        heading: {
          text: f.text
        },
        items: [{
          text: getFilterValueForDisplay(f),
          href: createUrlForParameters({ [f.name]: '' })
        }]
      }))
  ),

  mapSelectedValuesForButtonMenu: (filters, createUrlForParameters) => (
    filters
      .filter(f => valueIsNotEmpty(f))
      .map(f => ({
        text: f.text + ': ' + getFilterValueForDisplay(f),
        href: createUrlForParameters({ [f.name]: '' }),
        classes: 'filter-summary-remove-button govuk-button--secondary'
      }))
  )
}
