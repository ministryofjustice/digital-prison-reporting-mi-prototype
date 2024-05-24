const dataTableUtils = require('../../../../versions/main-ui/v12/components/data-table/utils')
const { pndScoreRagThresholdRules, pndMetrics, pndMonthFilterValues } = require('./pnd')

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

const deduplicateOptions = options => (
  Object.values(options.reduce(
    (optionMap, currentOption) => ({
      ...optionMap,
      [currentOption.value]: currentOption
    }),
    {}
  ))
)

const pndEstablishmentOptions = deduplicateOptions(pndMetrics.map(m => ({ value: m.code, text: m.name })))
const pndCategoryOptions = deduplicateOptions(pndMetrics.map(m => ({ value: m.category, text: m.category })))
const pndScoreOptions = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' }
]

const getLink = (source, scoreName, valueName) => {
  if (source[scoreName] === null) {
    return 'N/A'
  }

  let value = source[scoreName]

  if (valueName) {
    value = `${source[scoreName]} (${source[valueName]}`

    if (valueName.endsWith('Percent')) {
      value += '%)'
    } else {
      value += ')'
    }
  }

  return `<a href="../../metrics/pnd-score-over-time?filters.establishment=${source.code}&filters.score=${scoreName}">${value}</a>`
}

module.exports = {
  externalMovements: [
    { header: 'Prison Number', name: 'prisonNumber', mandatoryDisplay: true },
    { header: 'Name', name: 'name', data: d => (`${d.lastName}, ${d.firstName[0]}`), wrap: 'none' },
    { header: 'Date', name: 'date', data: d => dataTableUtils.mapDate(d.date), format: 'numeric', filter: { type: 'date-range' } },
    { header: 'Time', name: 'time' },
    { header: 'From', name: 'from', wrap: 'none' },
    { header: 'To', name: 'to', wrap: 'none' },
    { header: 'Direction', name: 'direction', filter: { type: 'radio', options: movementDirectionOptions } },
    { header: 'Type', name: 'type', filter: { type: 'radio', options: movementTypeOptions } },
    { header: 'Reason', name: 'reason' },
    { header: 'Day of week', name: 'weekday', display: false, grouping: { groups: weekdayGroups }, filter: { type: 'radio', options: weekdayGroups } }
  ],
  pndEstablishment: [
    { name: 'code', header: 'Establishment', wrap: 'none', data: d => `<a href="../../metrics/pnd-establishment/?filters.establishment=${d.code}&filters.month=${d.month}">${d.name}</a>`, filter: { type: 'Select', options: pndEstablishmentOptions } },
    { name: 'month', header: 'Month', wrap: 'none', filter: { type: 'Select', options: pndMonthFilterValues } },
    { name: 'category', header: 'Category', wrap: 'none', filter: { type: 'Select', options: pndCategoryOptions } },
    { name: 'myCaseload', header: 'My caseload', display: false, filter: { type: 'Radio', options: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }] } },
    { name: 'overallBandScore', header: 'Overall Band (Score)', ragThresholdRules: pndScoreRagThresholdRules, filter: { type: 'Select', options: pndScoreOptions }, data: d => (getLink(d, 'overallBandScore')) },
    { name: 'overallRawScore', header: 'Raw Score', data: d => (getLink(d, 'overallRawScore')) },
    { name: 'offendersMissingCsraScore', header: 'Offenders Missing CSRA Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'offendersMissingCsraScore', 'offendersMissingCsraPercent')) },
    { name: 'highRiskOffendersWithUnapprovedCsraScore', header: 'High Risk Offenders with Unapproved CSRA Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'highRiskOffendersWithUnapprovedCsraScore', 'highRiskOffendersWithUnapprovedCsraPercent')) },
    { name: 'highRiskOffendersOverdueAReviewScore', header: 'High Risk Offenders Overdue a Review Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'highRiskOffendersOverdueAReviewScore', 'highRiskOffendersOverdueAReviewPercent')) },
    { name: 'offendersMissingASecurityCategoryScore', header: 'Offenders Missing a Security Category Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'offendersMissingASecurityCategoryScore', 'offendersMissingASecurityCategoryPercent')) },
    { name: 'incompleteValidationOfKeyDatesScore', header: 'Incomplete Validation of Key Dates Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'incompleteValidationOfKeyDatesScore', 'incompleteValidationOfKeyDatesPercent')) },
    { name: 'missingPncScore', header: 'Missing PNC Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'missingPncScore', 'missingPncPercent')) },
    { name: 'missingCroScore', header: 'Missing CRO Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'missingCroScore', 'missingCroPercent')) },
    { name: 'nonReturnsFromCourtScore', header: 'Non-returns From Court Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'nonReturnsFromCourtScore', 'nonReturnsFromCourt')) },
    { name: 'releaseDateInPastScore', header: 'Release Date In Past Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'releaseDateInPastScore', 'releaseDateInPastPercent')) },
    { name: 'facialImageCaptureMissingScore', header: 'Facial Image Capture Missing Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'facialImageCaptureMissingScore', 'facialImageCaptureMissingPercent')) },
    { name: 'facialImageOver2YearsOldScore', header: 'Facial Image Over 2 Years Old Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'facialImageOver2YearsOldScore', 'facialImageOver2YearsOldPercent')) },
    { name: 'noNextOfKinScore', header: 'No Next of Kin Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'noNextOfKinScore', 'noNextOfKinPercent')) },
    { name: 'missingNationalityScore', header: 'Missing Nationality Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'missingNationalityScore', 'missingNationalityPercent')) },
    { name: 'missingReligionScore', header: 'Missing Religion Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'missingReligionScore', 'missingReligionPercent')) },
    { name: 'missingEthnicityScore', header: 'Missing Ethnicity Score', ragThresholdRules: pndScoreRagThresholdRules, display: false, data: d => (getLink(d, 'missingEthnicityScore', 'missingEthnicityPercent')) }
  ]
}
