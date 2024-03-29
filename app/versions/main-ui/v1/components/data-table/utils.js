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
    .map(f => ({
      text: f.data ? f.data(d) : d[f.name],
      format: f.format,
      classes: f.wrap ? `data-table-cell-wrap-${f.wrap}` : ''
    }))))),

  mapDate: isoDate => new Date(isoDate).toLocaleDateString(LOCALE).replace(/\/20(\d\d)/, '/$1')
}
