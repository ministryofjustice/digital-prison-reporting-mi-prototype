const dataTableFilters = require('./components/data-table/filters')

module.exports = function () {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {
    ...dataTableFilters
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

  filters.addMatchingBreadCrumbs = function (items, navItems, currentUrl) {
    const flattenedItems = navItems.flatMap(section => section.items.map(item => {
      return [
        {
          text: section.heading.text,
          href: '#'
        },
        item
      ]
    }))
    const matchingItem = flattenedItems.find(item => item[1].href === currentUrl)
    return matchingItem
      ? [
          ...items,
          ...matchingItem
        ]
      : items
  }

  return filters
}
