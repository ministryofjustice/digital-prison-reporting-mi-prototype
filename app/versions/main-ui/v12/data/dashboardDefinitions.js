const { pndMetrics, pndScoreRagThresholdRules, pndMonthFilterValues } = require('./pnd')
const { pndEstablishment } = require('./reportDataFormats')

const pndMetricsMarch = pndMetrics.filter(m => m.month === '2024-03')
const pndMetricsApril = pndMetrics.filter(m => m.month === '2024-04')
const pndMetricsMay = pndMetrics.filter(m => m.month === '2024-05')

const getEstablishmentMetrics = (metrics, metricName, descriptionMetricName) => {
  const establishmentMetrics = {}
  metrics
    .filter(m => m[metricName] != null)
    .forEach(m => {
      if (descriptionMetricName !== metricName && (m[descriptionMetricName] || m[descriptionMetricName] === 0)) {
        establishmentMetrics[m.code] = {
          headline: m[metricName],
          description: descriptionMetricName.endsWith('Percent') ? `${m[descriptionMetricName]}%` : m[descriptionMetricName]
        }
      } else {
        establishmentMetrics[m.code] = m[metricName]
      }
    })
  return establishmentMetrics
}

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
    filters: [{ type: 'SelectComparison', name: 'month', options: pndMonthFilterValues, text: 'Month' }],
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
    filters: [{ type: 'SelectComparison', name: 'month', options: pndMonthFilterValues, text: 'Month' }],
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
        status: {
          colour: 'red',
          threshold: {
            greaterThan: 0
          }
        },
        meta: {
          lastUpdated: ''
        },
        breakdown: '../disappearances-by-day/'
      },
      {
        id: 'releases',
        name: 'Releases',
        type: 'headline',
        values: {
          '2024-03': 61,
          '2024-04': 50
        },
        status: {
          colour: 'yellow',
          threshold: {
            greaterThan: 10,
            lessThan: 100
          }
        },
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
        status: {
          colour: 'green',
          threshold: {
            lessThan: 10
          }
        },
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
    filters: [{ type: 'SelectComparison', name: 'month', options: pndMonthFilterValues, text: 'Month' }],
    metrics: [
      {
        id: 'desc',
        name: 'Disappearance context',
        type: 'description',
        value: 'This page provides a summary of mysterious disappearances, due to various factors. This may include: Drone-based escape, UFO abduction, evaporation, and The Rapture.'
      },
      {
        id: 'off-wing',
        name: 'Off wing',
        type: 'headline',
        values: {
          '2024-03': 0,
          '2024-04': 1
        },
        status: {
          colour: 'red',
          threshold: {
            greaterThan: 0
          }
        },
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'from-cell',
        name: 'From cell',
        type: 'headline',
        values: {
          '2024-03': 3,
          '2024-04': 3
        },
        status: {
          colour: 'yellow',
          threshold: {
            greaterThan: 0,
            lessThan: 10
          }
        },
        meta: {
          lastUpdated: ''
        }
      },
      {
        id: 'mysterious',
        name: 'Mysterious',
        type: 'headline',
        values: {
          '2024-03': 30,
          '2024-04': 24
        },
        status: {
          colour: 'green',
          threshold: {
            lessThan: 100
          }
        },
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
  },
  {
    id: 'pnd-establishment',
    product: 'Prison NOMIS Dashboard',
    name: 'Establishment score breakdown',
    keywords: { Origin: 'Prison NOMIS Dashboard spreadsheet', Related: 'PND' },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['MIS'],
    author: 'Triss Burly',
    filters: [
      { type: 'SelectComparison', name: 'month', options: pndMonthFilterValues, text: 'Month' },
      { type: 'Select', name: 'establishment', options: pndMetricsMarch.map(m => ({ value: m.code, text: m.name })), text: 'Establishment' }
    ],
    metrics: [
      { id: 'overallBandScore', name: 'Overall Band', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'overallBandScore', 'overallBandPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'overallBandScore', 'overallBandScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'overallBandScore', 'overallBandScore') } },
      { id: 'overallRawScore', name: 'Overall Raw', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'overallRawScore', 'overallRawPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'overallRawScore', 'overallRawScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'overallRawScore', 'overallRawScore') } },
      { id: 'offendersMissingCsraScore', name: 'Offenders Missing CSRA', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'offendersMissingCsraScore', 'offendersMissingCsraPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'offendersMissingCsraScore', 'offendersMissingCsraScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'offendersMissingCsraScore', 'offendersMissingCsraScore') } },
      { id: 'highRiskOffendersWithUnapprovedCsraScore', name: 'High Risk Offenders with Unapproved CSRA', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'highRiskOffendersWithUnapprovedCsraScore', 'highRiskOffendersWithUnapprovedCsraPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'highRiskOffendersWithUnapprovedCsraScore', 'highRiskOffendersWithUnapprovedCsraScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'highRiskOffendersWithUnapprovedCsraScore', 'highRiskOffendersWithUnapprovedCsraScore') } },
      { id: 'highRiskOffendersOverdueAReviewScore', name: 'High Risk Offenders Overdue a Review', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'highRiskOffendersOverdueAReviewScore', 'highRiskOffendersOverdueAReviewPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'highRiskOffendersOverdueAReviewScore', 'highRiskOffendersOverdueAReviewScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'highRiskOffendersOverdueAReviewScore', 'highRiskOffendersOverdueAReviewScore') } },
      { id: 'offendersMissingASecurityCategoryScore', name: 'Offenders Missing a Security Category', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'offendersMissingASecurityCategoryScore', 'offendersMissingASecurityCategoryPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'offendersMissingASecurityCategoryScore', 'offendersMissingASecurityCategoryScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'offendersMissingASecurityCategoryScore', 'offendersMissingASecurityCategoryScore') } },
      { id: 'incompleteValidationOfKeyDatesScore', name: 'Incomplete Validation of Key Dates', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'incompleteValidationOfKeyDatesScore', 'incompleteValidationOfKeyDatesPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'incompleteValidationOfKeyDatesScore', 'incompleteValidationOfKeyDatesScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'incompleteValidationOfKeyDatesScore', 'incompleteValidationOfKeyDatesScore') } },
      { id: 'missingPncScore', name: 'Missing PNC', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'missingPncScore', 'missingPncPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'missingPncScore', 'missingPncScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'missingPncScore', 'missingPncScore') } },
      { id: 'missingCroScore', name: 'Missing CRO', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'missingCroScore', 'missingCroPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'missingCroScore', 'missingCroScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'missingCroScore', 'missingCroScore') } },
      { id: 'nonReturnsFromCourtScore', name: 'Non-returns From Court', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'nonReturnsFromCourtScore', 'nonReturnsFromCourt'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'nonReturnsFromCourtScore', 'nonReturnsFromCourtScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'nonReturnsFromCourtScore', 'nonReturnsFromCourtScore') } },
      { id: 'releaseDateInPastScore', name: 'Release Date In Past', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'releaseDateInPastScore', 'releaseDateInPastPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'releaseDateInPastScore', 'releaseDateInPastScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'releaseDateInPastScore', 'releaseDateInPastScore') } },
      { id: 'facialImageCaptureMissingScore', name: 'Facial Image Capture Missing', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'facialImageCaptureMissingScore', 'facialImageCaptureMissingPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'facialImageCaptureMissingScore', 'facialImageCaptureMissingScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'facialImageCaptureMissingScore', 'facialImageCaptureMissingScore') } },
      { id: 'facialImageOver2YearsOldScore', name: 'Facial Image Over 2 Years Old', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'facialImageOver2YearsOldScore', 'facialImageOver2YearsOldPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'facialImageOver2YearsOldScore', 'facialImageOver2YearsOldScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'facialImageOver2YearsOldScore', 'facialImageOver2YearsOldScore') } },
      { id: 'noNextOfKinScore', name: 'No Next of Kin', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'noNextOfKinScore', 'noNextOfKinPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'noNextOfKinScore', 'noNextOfKinScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'noNextOfKinScore', 'noNextOfKinScore') } },
      { id: 'missingNationalityScore', name: 'Missing Nationality', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'missingNationalityScore', 'missingNationalityPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'missingNationalityScore', 'missingNationalityScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'missingNationalityScore', 'missingNationalityScore') } },
      { id: 'missingReligionScore', name: 'Missing Religion', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'missingReligionScore', 'missingReligionPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'missingReligionScore', 'missingReligionScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'missingReligionScore', 'missingReligionScore') } },
      { id: 'missingEthnicityScore', name: 'Missing Ethnicity', ragThresholdRules: pndScoreRagThresholdRules, type: 'headline', values: { '2024-03': getEstablishmentMetrics(pndMetricsMarch, 'missingEthnicityScore', 'missingEthnicityPercent'), '2024-04': getEstablishmentMetrics(pndMetricsApril, 'missingEthnicityScore', 'missingEthnicityScore'), '2024-05': getEstablishmentMetrics(pndMetricsMay, 'missingEthnicityScore', 'missingEthnicityScore') } }
    ]
  },
  {
    id: 'pnd-aggregate-view',
    product: 'Prison NOMIS Dashboard',
    name: 'Overview',
    keywords: { Origin: 'Prison NOMIS Dashboard spreadsheet', Related: 'PND' },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['MIS'],
    author: 'Jeremiah Hugo',
    filters: [{ type: 'Select', name: 'month', options: pndMonthFilterValues, text: 'Month' }],
    metrics: [
      {
        id: 'desc',
        name: 'Details',
        type: 'description',
        value: 'An overview of PND scores for all establishments.'
      },
      {
        id: 'pnd-aggregate-view-pie',
        type: 'chartCard',
        values: {
          '2024-03': {
            card: {
              title: 'Establishment scores',
              width: 'full'
            },
            chart: [
              {
                id: 'chart2sss',
                type: 'doughnut',
                labels: ['Score: 1', 'Score: 2', 'Score: 3'],
                data: [21, 24, 80],
                total: 24
              }],
            table: {
              headings: ['Score', 'Establishments'],
              values: [{
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-03&filters.overallBandScore=1">1</a>',
                value: 21
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-03&filters.overallBandScore=2">2</a>',
                value: 24
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-03&filters.overallBandScore=3">3</a>',
                value: 80
              }]
            }
          },
          '2024-04': {
            card: {
              title: 'Establishment scores',
              width: 'full'
            },
            chart: [
              {
                id: 'chart2sss',
                type: 'doughnut',
                labels: ['Score: 1', 'Score: 2', 'Score: 3'],
                data: [21, 24, 80],
                total: 24
              }],
            table: {
              headings: ['Score', 'Establishments'],
              values: [{
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-04&filters.overallBandScore=1">1</a>',
                value: 21
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-04&filters.overallBandScore=2">2</a>',
                value: 3
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-04&filters.overallBandScore=3">3</a>',
                value: 101
              }]
            }
          },
          '2024-05': {
            card: {
              title: 'Establishment scores',
              width: 'full'
            },
            chart: [
              {
                id: 'chart2sss',
                type: 'doughnut',
                labels: ['Score: 1', 'Score: 2', 'Score: 3'],
                data: [21, 24, 80],
                total: 24
              }],
            table: {
              headings: ['Score', 'Establishments'],
              values: [{
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-05&filters.overallBandScore=1">1</a>',
                value: 21
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-05&filters.overallBandScore=2">2</a>',
                value: 24
              },
              {
                label: '<a href="../../lists/pnd-all-establishments/?filters.code=&filters.month=2024-05&filters.overallBandScore=3">3</a>',
                value: 80
              }]
            }
          }
        },
        meta: {
          lastUpdated: ''
        }
      }
    ]
  },
  {
    id: 'pnd-score-over-time',
    product: 'Score over time',
    name: 'Score over time',
    keywords: { Origin: 'Prison NOMIS Dashboard spreadsheet', Related: 'PND' },
    lastUpdated: '30/04/24',
    updateSchedule: 'Monthly',
    tags: ['MIS'],
    author: 'Triss Burly',
    filters: [
      { type: 'Select', name: 'establishment', options: pndMetricsMarch.map(m => ({ value: m.code, text: m.name })), text: 'Establishment' },
      { type: 'Select', name: 'score', options: pndEstablishment.filter(e => e.name.endsWith('Score')).map(e => ({ value: e.name, text: e.header })), text: 'Score' }
    ],
    metrics: [
      {
        id: 'scores',
        name: 'Scores',
        type: 'chartCard',
        values: pndMetrics.reduce((metrics, m) => {
          const scores = metrics[m.code] ?? {}

          Object.keys(m).filter(k => k.endsWith('Score')).forEach(scoreName => {
            if (!scores[scoreName]) {
              scores[scoreName] = {
                card: {
                  width: 'full'
                },
                chart: [{
                  type: 'line',
                  labels: [],
                  data: [{
                    title: 'Score',
                    data: []
                  }],
                  yMinValue: 0,
                  yMaxValue: 3
                }]
              }
            }

            scores[scoreName].chart[0].data[0].data = scores[scoreName].chart[0].data[0].data.concat(m[scoreName])

            scores[scoreName].chart[0].labels = scores[scoreName].chart[0].labels.concat([m.month])
          })

          return {
            ...metrics,
            [m.code]: scores
          }
        }, {})
      }
    ]
  }
]
