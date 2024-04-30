const variant2 = {
  id: 'admissions-last-week',
  name: 'Admissions last week',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    fields: [
      {
        name: 'prison-number',
        display: 'Prison Number',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'name',
        display: 'Name',
        sortable: true,
        type: 'string',
        mandatory: true,
        visible: true
      },
      {
        name: 'date',
        display: 'Date',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          defaultValue: '2003-02-01 - 2006-05-04',
          min: '2003-02-01',
          max: '2007-05-04',
        }
      },
      {
        name: 'time',
        display: 'Time',
        visible: false,
        sortable: false,
        type: 'string'
      },
      {
        name: 'from',
        display: 'From',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false
      },
      {
        name: 'to',
        display: 'To',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'direction',
        display: 'Direction',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'in', display: 'In' },
            { name: 'out', display: 'Out' }
          ],
          defaultValue: 'in'
        }
      },
      {
        name: 'type',
        display: 'Type',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'transfer', display: 'Transfer' },
            { name: 'admission', display: 'Admission' }
          ],
          defaultValue: 'admission'
        }
      },
      {
        name: 'reason',
        display: 'Reason',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      }
    ]
  }
}

const variant3 = {
  id: 'yesterdays-transfers-out',
  name: 'Yesterdays transfers out',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    fields: [
      {
        name: 'prison-number',
        display: 'Prison Number',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'name',
        display: 'Name',
        sortable: true,
        type: 'string',
        mandatory: true,
        visible: true
      },
      {
        name: 'date',
        display: 'Date',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          defaultValue: '2003-02-01 - 2006-05-04',
          min: '2003-02-01',
          max: '2007-05-04'
        }
      },
      {
        name: 'time',
        display: 'Time',
        visible: false,
        sortable: false,
        type: 'string'
      },
      {
        name: 'from',
        display: 'From',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false
      },
      {
        name: 'to',
        display: 'To',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'direction',
        display: 'Direction',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'in', display: 'In' },
            { name: 'out', display: 'Out' }
          ],
          defaultValue: 'out'
        }
      },
      {
        name: 'type',
        display: 'Type',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'transfer', display: 'Transfer' },
            { name: 'admission', display: 'Admission' }
          ],
          defaultValue: 'transfer'
        }
      },
      {
        name: 'reason',
        display: 'Reason',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      }
    ]
  }
}

const variant1 = {
  id: 'all',
  name: 'All',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    fields: [
      {
        name: 'prison-number',
        display: 'Prison Number',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'name',
        display: 'Name',
        sortable: true,
        type: 'string',
        mandatory: true,
        visible: true
      },
      {
        name: 'date',
        display: 'Date',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          min: '2003-02-01',
          max: '2007-05-04'
        }
      },
      {
        name: 'time',
        display: 'Time',
        visible: false,
        sortable: false,
        type: 'string'
      },
      {
        name: 'from',
        display: 'From',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false
      },
      {
        name: 'to',
        display: 'To',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      },
      {
        name: 'direction',
        display: 'Direction',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'in', display: 'In' },
            { name: 'out', display: 'Out' }
          ]
        }
      },
      {
        name: 'type',
        display: 'Type',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'transfer', display: 'Transfer' },
            { name: 'admission', display: 'Admission' }
          ]
        }
      },
      {
        name: 'reason',
        display: 'Reason',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: true
      }
    ]
  }
}

module.exports = {
  report: {
    id: 'external-movements',
    name: 'External Movements',
    variants: [variant1, variant2, variant3]
  }
}
