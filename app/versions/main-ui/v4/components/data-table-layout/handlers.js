/* Request handler methods to be used in an app's routes.js */

const { configureDataTableOptions, queryParameterPrefix: dataTableQueryParameterPrefix } = require('../../../v1/components/data-table/handlers')
const { configureFilterOptions, queryParameterPrefix: filtersQueryParameterPrefix } = require('../../../v1/components/filters/handlers')
const { getHeaders, mapData } = require('../../../v1/components/data-table/utils')
const { getFilters } = require('../../../v1/components/filters/utils')
const { getCreateUrlForParametersFunction } = require('../../../../../utils/urlHelper')
const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 300 })
const cacheKey = 'columns'

const columnFilterOptions = (req, res, next) => {
  const columnOptions = req.dataTableLayoutOptions.dataFormat
    .map(column => {
      if (column.mandatoryDisplay) {
        return {
          value: column.name,
          text: column.header,
          disabled: column.mandatoryDisplay
        }
      } else {
        return {
          value: column.name,
          text: column.header
        }
      }
    })

  let columns = (req.query.columns && req.query.columns !== 'reset') ? [].concat(req.query.columns) : []

  if (columns.length === 0) {
    if (cache.has(cacheKey) && req.query.columns !== 'reset') {
      columns = cache.get(cacheKey)
    } else {
      columns = req.dataTableLayoutOptions.dataFormat
        .filter(column => column.display !== false)
        .map(column => column.name)
    }
  } else {
    req.dataTableLayoutOptions.dataFormat
      .filter(column => column.mandatoryDisplay)
      .forEach(column => {
        if (!columns.includes(column.name)) {
          columns.unshift(column.name)
        }
      })
  }

  cache.set(cacheKey, columns)

  req.renderOptions = {
    ...req.renderOptions,
    columnOptions,
    columns
  }

  next()
}

const dataTableLayoutOptions = (req, res) => {
  const {
    dataFormat,
    title,
    listData,
    countData,
    version
  } = req.dataTableLayoutOptions

  const data = listData({
    ...req.renderOptions.dataTable,
    sortColumnName: dataFormat[req.renderOptions.dataTable.sortColumn].name,
    filters: req.renderOptions.filterValues,
    dataFormat
  })

  const dataTableLayout = '../components/data-table-layout/views/layout.html'

  res.render(`main-ui/${version}/views/lists-list`, {
    ...req.renderOptions,
    title,
    head: getHeaders(dataFormat, req.renderOptions.columns),
    rows: mapData(data, dataFormat, req.renderOptions.columns),
    filters: getFilters(dataFormat, req.renderOptions.filterValues),
    totalRowCount: countData(req.renderOptions.filterValues, dataFormat),
    createUrlForParametersPaging: getCreateUrlForParametersFunction(req.query, dataTableQueryParameterPrefix),
    createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, filtersQueryParameterPrefix),
    dataTableLayout,
    classification: req.query.classification ?? 'OFFICIAL SENSITIVE',
    printable: !(req.query.printable === 'false')
  })
}

module.exports = {
  filterTableLayoutHandlers: [
    configureDataTableOptions,
    configureFilterOptions,
    columnFilterOptions,
    dataTableLayoutOptions
  ]
}
