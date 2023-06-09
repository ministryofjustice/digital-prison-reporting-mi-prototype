const dataTableUtils = require('./components/data-table/utils')

const movementDirectionOptions = [
  {
    value: 'in',
    text: 'In'
  },
  {
    value: 'out',
    text: 'Out'
  }
]

const movementTypeOptions = [
  {
    value: 'transfer',
    text: 'Transfer'
  },
  {
    value: 'admission',
    text: 'Admission'
  }
]

module.exports = {
  personRegister: [
    { header: 'Book Number', name: 'bookNumber' },
    { header: 'Agency Location Code', name: 'agencyLocationCode' },
    { header: 'Prison Number', name: 'prisonNumber' },
    { header: 'First Name', name: 'firstName' },
    { header: 'Last Name', name: 'lastName' },
    { header: 'Date Of Birth', name: 'dateOfBirth', data: d => dataTableUtils.mapDate(d.dateOfBirth), format: 'numeric', filter: { type: 'date-range' } },
    { header: 'Establishment', name: 'establishment' },
    { header: 'Cell', name: 'cell' }
  ],

  externalMovements: [
    { header: 'Prison Number', name: 'prisonNumber' },
    { header: 'Date', name: 'date', data: d => dataTableUtils.mapDate(d.date), format: 'numeric', filter: { type: 'date-range' } },
    { header: 'Time', name: 'time' },
    { header: 'From', name: 'from' },
    { header: 'To', name: 'to' },
    { header: 'Direction', name: 'direction', filter: { type: 'radio', options: movementDirectionOptions } },
    { header: 'Type', name: 'type', filter: { type: 'radio', options: movementTypeOptions } },
    { header: 'Reason', name: 'reason' }
  ]
}
