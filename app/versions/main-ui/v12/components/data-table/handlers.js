/* Request handler methods to be used in an app's routes.js */

const queryParameterPrefix = 'paging.'

module.exports = {
  queryParameterPrefix,

  configureDataTableOptions: (req, res, next) => {
    const query = req.query ? req.query : {}
    const pagingOptions = {}

    Object.keys(query)
      .filter(q => q.startsWith(queryParameterPrefix))
      .forEach(q => {
        pagingOptions[q.replace(queryParameterPrefix, '')] = query[q]
      })

    const {
      selectedPage = 1,
      pageSize = 10,
      sortColumn = 0,
      sortedAsc = 'true'
    } = pagingOptions

    req.renderOptions = {
      ...req.renderOptions,
      dataTable: {
        selectedPage,
        pageSize,
        sortColumn,
        sortedAsc: sortedAsc === 'true'
      }
    }

    next()
  }
}
