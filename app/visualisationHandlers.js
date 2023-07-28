const { getFilters } = require('./components/filters/utils')
const { getCreateUrlForParametersFunction } = require('./utils/urlHelper')
const { queryParameterPrefix } = require('./components/filters/handlers')

const renderVisualisation = (req, res) => {
  const {
    dataFormat,
    reportData,
    groupField,
    chartType
  } = req.reportOptions

  const data = reportData({
    filters: req.renderOptions.filterValues,
    dataFormat,
    groupFieldName: groupField.name
  })

  const rows = Object.keys(data).map(d => [
    { text: d },
    { text: data[d], format: 'numeric' }
  ])

  res.render('visualisations-chart', {
    ...req.renderOptions,
    head: groupField.header,
    rows,
    chart: {
      labels: Object.keys(data),
      data: Object.values(data),
      type: chartType.startsWith('bar') ? 'bar' : chartType,
      indexAxis: chartType === 'bar-y' ? 'y' : 'x',
      borderWidth: chartType === 'line' ? 3 : 1
    },
    filters: getFilters(dataFormat, req.renderOptions.filterValues),
    createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, queryParameterPrefix)
  })
}

module.exports = {
  renderVisualisation
}
