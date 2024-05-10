const dataTableFilters = require('./versions/main-ui/v1/components/data-table/filters')
const filtersFilters = require('./versions/main-ui/v1/components/filters/filters')
const { runtime } = require('nunjucks')

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
      console.log(currentUrl)
      if (currentUrl.startsWith(n.href) &&
        (n.href !== '/' || currentUrl === '/')) {
        return { ...n, active: true }
      } else {
        return n
      }
    })
  }

  filters.json = function (value, spaces) {
    if (value instanceof runtime.SafeString) {
      value = value.toString()
    }
    const jsonString = JSON.stringify(value, null, spaces).replace(/</g, '\\u003c')
    return runtime.markSafe(jsonString)
  }

  return filters
}
