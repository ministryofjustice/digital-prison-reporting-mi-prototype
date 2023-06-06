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
        filterOptions[q.replace(queryParameterPrefix, '')] = query[q]
      })

    req.renderOptions = {
      ...req.renderOptions,
      filterValues: filterOptions
    }

    next()
  }
}
