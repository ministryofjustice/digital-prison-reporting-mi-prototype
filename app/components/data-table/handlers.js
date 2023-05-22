/* Request handler methods to be used in an app's routes.js */

const { mapOptionsToUrl } = require('./utils')

module.exports = {
  configureDataTableOptions: (req, res, next) => {
    const query = req.query ? req.query : {}
    const {
      selectedPage = 1,
      pageSize = 10,
      sortColumn = 0,
      sortedAsc = 'true'
    } = query

    req.renderOptions = {
      ...req.renderOptions,
      dataTable: {
        selectedPage,
        pageSize,
        sortColumn,
        sortedAsc: sortedAsc === 'true',
        mapOptionsToUrl
      }
    }

    next()
  }
}
