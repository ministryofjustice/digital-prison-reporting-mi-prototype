const dataTableFilters = require('./versions/main-ui/v1/components/data-table/filters')
const filtersFilters = require('./versions/main-ui/v1/components/filters/filters')

module.exports = function () {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {
    ...dataTableFilters,
    ...filtersFilters
  }

  filters.setCurrentToActive = function (navItems, currentUrl) {
    if (!currentUrl || !navItems) {
      return navItems
    }

    return navItems.map(n => {
      if (currentUrl.startsWith(n.href) &&
        (n.href !== '/' || currentUrl === '/')) {
        return { ...n, active: true }
      } else {
        return n
      }
    })
  }

  return filters
}
