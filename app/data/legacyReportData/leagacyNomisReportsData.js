const alphaListWithOffences = require('./alphaListWithOffences')
const csraReportData = require('./csraReportData')
const educationScoresData = require('./educationScoresData')
const alertsReportData = require('./alertsReportData')

const convertToRows = (data) => {
  return data.map((item) => {
    return Object.entries(item).map((col) => {
      return {
        text: col[1]
      }
    })
  })
}

const createHead = (data) => {
  return Object.keys(data[0]).map((key) => {
    return { text: key }
  })
}

const legacyReportData = [
  {
    id: 'alpha-list-with-offences',
    data: {
      rows: convertToRows(alphaListWithOffences),
      head: createHead(alphaListWithOffences)
    }
  },
  {
    id: 'csra-report-(or)',
    data: {
      rows: convertToRows(csraReportData),
      head: createHead(csraReportData)
    }
  },
  {
    id: 'alerts-report',
    data: {
      rows: convertToRows(alertsReportData),
      head: createHead(alertsReportData)
    }
  },
  {
    id: 'education-scores-report',
    data: {
      rows: convertToRows(educationScoresData),
      head: createHead(educationScoresData)
    }
  }
]

module.exports = legacyReportData