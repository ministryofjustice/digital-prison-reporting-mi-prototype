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

const weekdayGroups = [
  {
    value: 'monday',
    text: 'Monday'
  },
  {
    value: 'tuesday',
    text: 'Tuesday'
  },
  {
    value: 'wednesday',
    text: 'Wednesday'
  },
  {
    value: 'thursday',
    text: 'Thursday'
  },
  {
    value: 'friday',
    text: 'Friday'
  },
  {
    value: 'saturday',
    text: 'Saturday'
  },
  {
    value: 'sunday',
    text: 'Sunday'
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
    { header: 'Name', name: 'name', data: d => (`${d.lastName}, ${d.firstName[0]}`), wrap: 'none' },
    { header: 'Date', name: 'date', data: d => dataTableUtils.mapDate(d.date), format: 'numeric', filter: { type: 'date-range' } },
    { header: 'Time', name: 'time' },
    { header: 'From', name: 'from', wrap: 'none' },
    { header: 'To', name: 'to', wrap: 'none' },
    { header: 'Direction', name: 'direction', filter: { type: 'radio', options: movementDirectionOptions } },
    { header: 'Type', name: 'type', filter: { type: 'radio', options: movementTypeOptions } },
    { header: 'Reason', name: 'reason' },
    { header: 'Day of week', name: 'weekday', display: false, grouping: { groups: weekdayGroups } }
  ]
}
