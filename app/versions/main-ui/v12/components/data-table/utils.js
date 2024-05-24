/*
These utils expect a 'format' array that describes the data table layout and content.
Each item in the array needs the following fields:
- header: The header to display at the top of the column.
- name: The name of the field in the source data.
- data: A function that accepts a row of data in the format { field1, field2, ...} and converts it into this cell's format - optional, mapped using 'name' by default.
- format (optional): 'numeric' to align right, blank otherwise.

For example:
const personRegisterDataFormat = [
  { header: 'Last Name', name: 'lastName' },
  { header: 'Date Of Birth', name: 'dateOfBirth', data: d => dataTableUtils.mapDate(d.dateOfBirth), format: 'numeric' },
  ...
]
 */

const { getRagStatus } = require('../../utils/metrics')
const LOCALE = 'en-GB'

module.exports = {
  getHeaders: (format, columns) => (format
    .filter(f => columns.includes(f.name))
    .map(f => ({
      text: f.header,
      format: f.format
    }))),

  mapData: (data, format, columns) => (data.map(d => (format
    .filter(f => columns.includes(f.name))
    .map(f => {
      let ragTag = ''

      if (f.ragThresholdRules && d[f.name] !== null) {
        ragTag = `govuk-tag--${getRagStatus(d[f.name], f.ragThresholdRules)}`
      }

      let html = d[f.name]

      if (f.data) {
        html = f.data(d)
      } else if (d[f.name] !== null && f.filter && f.filter.options) {
        const matchingOption = f.filter.options.find(o => o.value === d[f.name])
        if (matchingOption) {
          html = matchingOption.text
        }
      }

      return {
        html,
        format: f.format,
        classes: f.wrap ? `data-table-cell-wrap-${f.wrap} ${ragTag}` : ragTag
      }
    })))),

  mapDate: isoDate => new Date(isoDate).toLocaleDateString(LOCALE).replace(/\/20(\d\d)/, '/$1')
}
