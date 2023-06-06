/* Nunjuck filter methods to be included in an app's filters.js */

module.exports = {
  mapSelectedValuesForFilter: (filters, createUrlForParameters) => (
    filters
      .filter(f => f.value)
      .map(f => ({
        heading: {
          text: f.text
        },
        items: [{
          text: f.options.find(o => o.value === f.value).text,
          href: createUrlForParameters({ [f.name]: '' })
        }]
      }))
  ),

  mapSelectedValuesForButtonMenu: (filters, createUrlForParameters) => (
    filters
      .filter(f => f.value)
      .map(f => ({
        text: f.text + ': ' + f.options.find(o => o.value === f.value).text,
        href: createUrlForParameters({ [f.name]: '' }),
        classes: 'filter-summary-remove-button govuk-button--secondary'
      }))
  )
}
