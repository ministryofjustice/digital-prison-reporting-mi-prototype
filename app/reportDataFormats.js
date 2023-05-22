const dataTableUtils = require('./components/data-table/utils')

module.exports = {
  personRegister: [
    { header: 'Book Number', name: 'bookNumber' },
    { header: 'Agency Location Code', name: 'agencyLocationCode' },
    { header: 'Prison Number', name: 'prisonNumber' },
    { header: 'First Name', name: 'firstName' },
    { header: 'Last Name', name: 'lastName' },
    { header: 'Date Of Birth', name: 'dateOfBirth', data: d => dataTableUtils.mapDate(d.dateOfBirth), format: 'numeric' },
    { header: 'Establishment', name: 'establishment' },
    { header: 'Cell', name: 'cell' }
  ]
}
