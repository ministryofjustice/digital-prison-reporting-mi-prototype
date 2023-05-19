/*
These utils expect a 'format' array that describes the data table layout and content.
Each item in the array needs the following fields:
- header: The header to display at the top of the column.
- data: A function that accepts a row of data in the format { field1, field2, ...} and converts it into this cell's format.
- format (optional): 'numeric' to align right, blank otherwise.

For example:
const personRegisterDataFormat = [
  { header: 'Last Name', data: d => d.lastName },
  { header: 'Date Of Birth', data: d => dataTableUtils.mapDate(d.dateOfBirth), format: 'numeric' },
  ...
]
 */

module.exports = {
  getHeaders: format => (format.map(f => ({
    text: f.header,
    format: f.format
  }))),

  mapData: (data, format) => (data.map(d => (format.map(f => ({
    text: f.data(d),
    format: f.format
  }))))),

  mapDate: isoDate => isoDate
}
