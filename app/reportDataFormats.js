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
  ],

  externalMovements: [
    { header: 'Book Number', name: 'bookNumber' },
    { header: 'Date', name: 'date', data: d => dataTableUtils.mapDate(d.date), format: 'numeric' },
    { header: 'Time', name: 'time' },
    { header: 'From', name: 'from' },
    { header: 'To', name: 'to' },
    { header: 'Direction', name: 'direction' },
    { header: 'Type', name: 'type' },
    { header: 'Reason', name: 'reason' }
  ]
}
