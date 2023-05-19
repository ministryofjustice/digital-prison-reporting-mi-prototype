const dataTableUtils = require('./components/data-table/utils')

module.exports = {
  personRegister: [
    { header: 'Book Number', data: d => d.bookNumber },
    { header: 'Agency Location Code', data: d => d.agencyLocationCode },
    { header: 'Prison Number', data: d => d.prisonNumber },
    { header: 'First Name', data: d => d.firstName },
    { header: 'Last Name', data: d => d.lastName },
    { header: 'Date Of Birth', data: d => dataTableUtils.mapDate(d.dateOfBirth), format: 'numeric' },
    { header: 'Establishment', data: d => d.establishment },
    { header: 'Cell', data: d => d.cell }
  ]
}
