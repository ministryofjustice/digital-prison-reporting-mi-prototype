/* Request handler methods to be used in an app's routes.js */

const queryParameterPrefix = 'filters.'

module.exports = {
  queryParameterPrefix,

  configureFilterOptions: (req, res, next) => {
    const query = req.query ? req.query : {}
    const filterOptions = {}

    Object.keys(query)
      .filter(q => q.startsWith(queryParameterPrefix))
      .forEach(q => {
        const filterName = q.replace(queryParameterPrefix, '')
        const splitFilterName = filterName.split('.')

        switch (splitFilterName.length) {
          case 1:
            filterOptions[filterName] = query[q]
            break
          case 2:
            filterOptions[splitFilterName[0]] = {
              ...filterOptions[splitFilterName[0]],
              [splitFilterName[1]]: query[q]
            }
            break
          default:
            console.error('Unable to parse filter name: ' + filterName)
        }
      })

    req.renderOptions = {
      ...req.renderOptions,
      filterValues: filterOptions
    }

    next()
  }
}
