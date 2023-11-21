/* Request handler methods to be used in an app's routes.js */

const { configureDataTableOptions, queryParameterPrefix: dataTableQueryParameterPrefix } = require('../data-table/handlers')
const { configureFilterOptions, queryParameterPrefix: filtersQueryParameterPrefix } = require('../filters/handlers')
const { getHeaders, mapData } = require('../data-table/utils')
const { getFilters } = require('../filters/utils')
const { getCreateUrlForParametersFunction } = require('../../utils/urlHelper')

module.exports = {
  filterTableLayoutHandlers: [
    configureDataTableOptions,
    configureFilterOptions,
    (req, res) => {
      const {
        dataFormat,
        title,
        listData,
        countData,
        tabs = false
      } = req.dataTableLayoutOptions

      const data = listData({
        ...req.renderOptions.dataTable,
        sortColumnName: dataFormat[req.renderOptions.dataTable.sortColumn].name,
        filters: req.renderOptions.filterValues,
        dataFormat
      })

      const columnOptions = dataFormat
        .map(column => ({
          value: column.name,
          text: column.header
        }))

      let columns = req.query.columns

      if (!columns || columns.length === 0) {
        columns = dataFormat
          .filter(column => column.display !== false)
          .map(column => column.name)
      }

      let dataTableLayout = '../components/data-table-layout/views/layout'
      dataTableLayout += tabs ? '-tabs.html' : '.html'

      res.render('lists-list', {
        ...req.renderOptions,
        title,
        head: getHeaders(dataFormat, columns),
        rows: mapData(data, dataFormat, columns),
        filters: getFilters(dataFormat, req.renderOptions.filterValues),
        totalRowCount: countData(req.renderOptions.filterValues, dataFormat),
        createUrlForParametersPaging: getCreateUrlForParametersFunction(req.query, dataTableQueryParameterPrefix),
        createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, filtersQueryParameterPrefix),
        columnOptions,
        columns,
        dataTableLayout
      })
    }
  ]
}
