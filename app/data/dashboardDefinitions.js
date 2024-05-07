const dashboardFilterValues = [
  { value: '2024-03', text: 'March 2024' },
  { value: '2024-04', text: 'April 2024' }
]

module.exports = [
  { id: 'mis-accommodation', product: 'Accommodation', name: 'MIS Accommodation Metrics', author: 'Sophia Jefferson', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-04-04', tags: ['MIS', 'Accommodation'] },
  {
    id: 'mis-activities-movements',
    product: 'Movements',
    name: 'MIS Activities Movements Metrics',
    keywords: { Origin: 'SAP Business Objects' },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['MIS', 'Activities', 'Movements'],
    author: 'Myles Padilla',
    filter: { type: 'Select', name: 'month', options: dashboardFilterValues },
    metrics: [
      {
        id: 'to-activities',
        name: 'To Activities',
        type: 'headline',
        values: {
          '2024-03': 683,
          '2024-04': 684
        },
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'from-activities',
        name: 'From Activities',
        type: 'headline',
        description: '',
        values: {
          '2024-03': 683,
          '2024-04': 684
        },
        meta: {
          lastUpdated: ''
        }
      }]
  },
  { id: 'mis-ethnic-monitoring', product: 'Demographics', name: 'MIS Ethnic Monitoring Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'Ethnic Monitoring'], author: 'Whoopi Larsen' },
  { id: 'mis-extracts-idp-reports', product: 'Extracts', name: 'MIS Extracts IDP Reports Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-14', tags: ['MIS', 'Extracts', 'IDP Reports'], author: 'Lacota Sutton' },
  { id: 'mis-extracts-ycs-i2-development', product: 'Extracts', name: 'MIS Extracts YCS i2 Development Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'Extracts', 'YCS i2 Development'], author: 'Hermione Bright' },
  { id: 'mis-finance', product: 'Finance', name: 'MIS Finance Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-15', tags: ['MIS', 'Finance'], author: 'Austin Shepherd' },
  { id: 'mis-hq-reports', product: 'HQ Reports', name: 'MIS HQ Reports Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'HQ Reports'], author: 'Angelica Carrillo' },
  { id: 'mis-hq-reports-business-development-group', product: 'HQ Reports', name: 'MIS HQ Reports Business Development Group Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'HQ Reports', 'Business Development Group'], author: 'Germaine Drake' },
  { id: 'mis-incidents-adjudication', product: 'Incidents', name: 'MIS Incidents Adjudication Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-03-01', tags: ['MIS', 'Incidents', 'Adjudication'], author: 'Christopher Rush' },
  { id: 'mis-inspectorate-of-prisons', product: 'Extracts', name: 'MIS Inspectorate of Prisons Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-03-06', tags: ['MIS', 'Inspectorate of Prisons'], author: 'Kimberly Fulton' },
  { id: 'mis-national-reports', product: 'Extracts', name: 'MIS National Reports Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-12', tags: ['MIS', 'National Reports'], author: 'Victor Morin' },
  { id: 'mis-oasys-bcs', product: 'Extracts', name: 'MIS OASys BCS Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'OASys', 'BCS'], author: 'Galena Mcleod' },
  { id: 'mis-police-intelligence', product: 'Intelligence', name: 'MIS Police Intelligence Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-07-08', tags: ['MIS', 'Police Intelligence'], author: 'Irma Conner' },
  { id: 'mis-prisoner-personal-information', product: 'Prisoner', name: 'MIS Prisoner Personal Information Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-06-07', tags: ['MIS', 'Prisoner Personal Information'], author: 'Gage Porter' },
  { id: 'mis-rehabilitation', product: 'Rehabilitation', name: 'MIS Rehabilitation Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'Rehabilitation'], author: 'Carlos Branch' },
  { id: 'mis-rehabilitation-shannon-trust', product: 'Rehabilitation', name: 'MIS Rehabilitation Shannon Trust Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'Rehabilitation', 'Shannon Trust'], author: 'Callie Fischer' },
  { id: 'mis-sentencing-hdc', product: 'Sentencing', name: 'MIS Sentencing HDC Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-03-14', tags: ['MIS', 'Sentencing', 'HDC'], author: 'Kameko Schwartz' },
  { id: 'mis-visits', product: 'Visits', name: 'MIS Visits Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['MIS', 'Visits'], author: 'Keane Medina' },
  { id: 'ors-accommodation', product: 'Accommodation', name: 'ORS Accommodation Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2024-01-19', tags: ['ORS', 'Accommodation'], author: 'Chava Ellis' },
  { id: 'ors-activities', product: 'Activities', name: 'ORS Activities Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-05-04', tags: ['ORS', 'Activities'], author: 'Inga Brooks' },
  { id: 'ors-adhoc', product: 'Adhoc', name: 'ORS Adhoc Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-01-25', tags: ['ORS', 'Adhoc'], author: 'Kaitlin Conner' },
  { id: 'ors-adjudication-incidents', product: 'Incidents', name: 'ORS Adjudication Incidents Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-10-19', tags: ['ORS', 'Adjudication', 'Incidents'], author: 'Nigel Farmer' },
  { id: 'ors-data-quality', product: 'Data Quality', name: 'ORS Data Quality Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2021-11-11', tags: ['ORS', 'Data Quality'], author: 'Callum Walker' },
  { id: 'ors-finance', product: 'Finance', name: 'ORS Finance Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-06-22', tags: ['ORS', 'Finance'], author: 'Maia Rhodes' },
  {
    id: 'ors-movements',
    product: 'Movements',
    name: 'ORS Movements Metrics',
    keywords: { Origin: 'SAP Business Objects' },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['ORS', 'Movements'],
    author: 'Hoyt Morin',
    filter: { type: 'Select', name: 'month', options: dashboardFilterValues },
    metrics: [
      {
        id: 'transfers-in',
        name: 'Transfers In',
        type: 'headline',
        values: {
          '2024-03': 23,
          '2024-04': 57
        },
        meta: {
          lastUpdated: ''
        },
        viewRecords: '../../lists/external-movements/?filters.direction=in&filters.type=transfer'
      },
      {
        id: 'transfers-out',
        name: 'Transfers Out',
        type: 'headline',
        category: { id: 'ors-movements', displayName: 'ORS Movements' },
        description: '',
        values: {
          '2024-03': 134,
          '2024-04': 200
        },
        meta: {
          lastUpdated: ''
        },
        viewRecords: '../../lists/external-movements/?filters.direction=out&filters.type=transfer'
      },
      {
        id: 'disappearances',
        name: 'Disappearances',
        type: 'headline',
        category: { id: 'ors-movements', displayName: 'ORS Movements' },
        values: {
          '2024-03': 0,
          '2024-04': 1
        },
        status: 'red',
        meta: {
          lastUpdated: ''
        },
        breakdown: '/main-ui/v11/metrics/disappearances-by-day/'
      },
      {
        id: 'releases',
        name: 'Releases',
        type: 'headline',
        values: {
          '2024-03': 61,
          '2024-04': 50
        },
        status: 'yellow',
        meta: {
          lastUpdated: ''
        },
        viewRecords: '../../lists/external-movements/?filters.direction=out&filters.type=admission'
      },
      {
        id: 'admissions',
        name: 'Admissions',
        type: 'headline',
        values: {
          '2024-03': 3,
          '2024-04': 1
        },
        status: 'green',
        meta: {
          lastUpdated: ''
        },
        viewRecords: '../../lists/external-movements/?filters.direction=in&filters.type=admission'
      }]
  },
  { id: 'ors-national-reports', product: 'National Reports', name: 'ORS National Reports Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2022-05-23', tags: ['ORS', 'National Reports'], author: 'Nehru Woodard' },
  { id: 'ors-prisoner-demographics', product: 'Demographics', name: 'ORS Prisoner Demographics Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-10-06', tags: ['ORS', 'Prisoner Demographics'], author: 'Ori Kent' },
  { id: 'ors-sentencing', product: 'Sentencing', name: 'ORS Sentencing Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-06-21', tags: ['ORS', 'Sentencing'], author: 'Brody Moran' },
  { id: 'ors-visits', product: 'Visits', name: 'ORS Visits Metrics', keywords: { Origin: 'SAP Business Objects' }, lastUpdated: '2023-11-18', tags: ['ORS', 'Visits'], author: 'Bree Chavez' },
  {
    id: 'disappearances-by-day',
    product: 'Movements',
    name: 'Disappearances by Day',
    keywords: { },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['External', 'Movements'],
    author: 'Jeremiah Hugo',
    filter: { type: 'Select', name: 'month', options: dashboardFilterValues },
    metrics: [
      {
        id: 'today',
        name: 'Today',
        type: 'headline',
        values: {
          '2024-03': 0,
          '2024-04': 1
        },
        status: 'red',
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'this-week',
        name: 'This week',
        type: 'headline',
        values: {
          '2024-03': 3,
          '2024-04': 3
        },
        status: 'yellow',
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'this-month',
        name: 'This month',
        type: 'headline',
        values: {
          '2024-03': 30,
          '2024-04': 24
        },
        status: 'green',
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'disappearances',
        name: 'Disappearances by Day',
        type: 'chartCard',
        values: {
          '2024-03': {
            card: {
              title: 'Disappearances by day of week',
              description: 'Based on newspaper articles.',
              width: 'full',
              date: 'last year'
            },
            chart: [{
              id: 'chart5',
              type: 'bar',
              labels: ['Week day'],
              data: [
                {
                  title: 'Monday',
                  data: [1]
                },
                {
                  title: 'Tuesday',
                  data: [4]
                },
                {
                  title: 'Wednesday',
                  data: [15]
                },
                {
                  title: 'Thursday',
                  data: [2]
                },
                {
                  title: 'Friday',
                  data: [4]
                },
                {
                  title: 'Saturday',
                  data: [3]
                },
                {
                  title: 'Sunday',
                  data: [1]
                }
              ],
              axis: 'y'
            },
            {
              id: 'chart2sss',
              type: 'doughnut',
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              data: [2, 5, 10, 1, 5, 1, 0],
              total: 24
            }],
            table: {
              headings: ['Day', 'Total'],
              values: [{
                label: '<a href="../../lists/external-movements/?filters.weekday=monday&filters.direction=out">Monday</a>',
                value: 2
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=tuesday&filters.direction=out">Tuesday</a>',
                value: 5
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=wednesday&filters.direction=out">Wednesday</a>',
                value: 10
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=thursday&filters.direction=out">Thursday</a>',
                value: 1
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=friday&filters.direction=out">Friday</a>',
                value: 5
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=saturday&filters.direction=out">Saturday</a>',
                value: 1
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=sunday&filters.direction=out">Sunday</a>',
                value: 0
              }]
            }
          },
          '2024-04': {
            card: {
              title: 'Disappearances by day of week',
              description: 'Based on newspaper articles.',
              width: 'full',
              date: 'last year'
            },
            chart: [{
              id: 'chart5',
              type: 'bar',
              labels: ['Week day'],
              data: [
                {
                  title: 'Monday',
                  data: [2]
                },
                {
                  title: 'Tuesday',
                  data: [5]
                },
                {
                  title: 'Wednesday',
                  data: [10]
                },
                {
                  title: 'Thursday',
                  data: [1]
                },
                {
                  title: 'Friday',
                  data: [5]
                },
                {
                  title: 'Saturday',
                  data: [1]
                },
                {
                  title: 'Sunday',
                  data: [0]
                }
              ],
              axis: 'y'
            },
            {
              id: 'chart2sss',
              type: 'doughnut',
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              data: [2, 5, 10, 1, 5, 1, 0],
              total: 24
            }],
            table: {
              headings: ['Day', 'Total'],
              values: [{
                label: '<a href="../../lists/external-movements/?filters.weekday=monday&filters.direction=out">Monday</a>',
                value: 2
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=tuesday&filters.direction=out">Tuesday</a>',
                value: 5
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=wednesday&filters.direction=out">Wednesday</a>',
                value: 10
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=thursday&filters.direction=out">Thursday</a>',
                value: 1
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=friday&filters.direction=out">Friday</a>',
                value: 5
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=saturday&filters.direction=out">Saturday</a>',
                value: 1
              },
              {
                label: '<a href="../../lists/external-movements/?filters.weekday=sunday&filters.direction=out">Sunday</a>',
                value: 0
              }]
            }
          }
        },
        meta: {
          lastUpdated: ''
        }
      }
    ]
  }
]
