/* Request handler methods to be used in an app's routes.js */

const { configureDataTableOptions, dataTableQueryParameterPrefix } = require('../data-table/handlers')
const { configureFilterOptions, filtersQueryParameterPrefix } = require('../filters/handlers')
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
        template,
        listData,
        countData
      } = req.dataTableLayoutOptions

      const personRegisterData = listData({
        ...req.renderOptions.dataTable,
        sortColumnName: dataFormat[req.renderOptions.dataTable.sortColumn].name,
        filters: req.renderOptions.filterValues,
        dataFormat
      })

      res.render(template, {
        ...req.renderOptions,
        head: getHeaders(dataFormat),
        rows: mapData(personRegisterData, dataFormat),
        filters: getFilters(dataFormat, req.renderOptions.filterValues),
        totalRowCount: countData(req.renderOptions.filterValues, dataFormat),
        createUrlForParametersPaging: getCreateUrlForParametersFunction(req.query, dataTableQueryParameterPrefix),
        createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, filtersQueryParameterPrefix)
      })
    }
  ]
}
