const express = require('express')
const router = express.Router()

const reportingService = require('../../../services/reportingService')
const dataFormats = require('../../../data/reportDataFormats')
const { filterTableLayoutHandlers } = require('../v2/components/data-table-layout/handlers')
const { configureFilterOptions } = require('../v1/components/filters/handlers')
const { renderVisualisation } = require('../v1/visualisationHandlers')
const handlers = require('../../../utils/handlers')
const { getBreadcrumbs } = require('../../../utils/utils')

const version = 'v3'

const getFieldByName = (name, format) => {
  const field = format.find(f => f.name === name)

  return field || {}
}

const getTodayMinusDays = days => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().substring(0, 10)
}

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'Version 2',
    cards: [{
      text: 'Lists',
      href: './lists/',
      description: 'Data presented in tables.'
    }, {
      text: 'Visualisations',
      href: './visualisations/',
      description: 'Data presented as graphs.'
    }],
    breadcrumbs: getBreadcrumbs(['Main UI'])
  })
}])

router.get('/lists/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'External movements',
    cards: [{
      text: 'All',
      href: './external-movements',
      description: 'A record of all prisoner external movements.'
    }, {
      text: 'Admissions last week',
      href: './external-movements?filters.date.start=' + getTodayMinusDays(8) + '&filters.date.end=' + getTodayMinusDays(0) + '&filters.direction=in&filters.type=admission&classification=OFFICIAL',
      description: 'A list of admissions in the past week. Classified as OFFICIAL.'
    }, {
      text: 'Yesterday\'s transfers out',
      href: './external-movements?filters.date.start=' + getTodayMinusDays(1) + '&filters.date.end=' + getTodayMinusDays(0) + '&filters.direction=out&filters.type=transfer&printable=false',
      description: 'A list of yesterday\'s transfers out. Not printable.'
    }],
    breadcrumbs: getBreadcrumbs(['Main UI', version.toUpperCase()])
  })
}])

router.get('/lists/external-movements', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.externalMovements,
      title: 'External movements',
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements,
      version: 'v2',
      currentVersion: 'v3'
    }
    req.renderOptions.breadcrumbs = getBreadcrumbs(['Main UI', version.toUpperCase(), 'Lists'])
    next()
  },
  ...filterTableLayoutHandlers
])

router.get('/visualisations/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'External movements by',
    cards: [
      {
        text: 'Day of the Week',
        href: './external-movements-by-weekday-line',
        description: 'External movements by Day of the Week.'
      },
      {
        text: 'Direction',
        href: './external-movements-by-direction-bar',
        description: 'External movements by Direction.'
      },
      {
        text: 'Reason',
        href: './external-movements-by-reason-bar-y',
        description: 'External movements by Reason.'
      }
    ],
    breadcrumbs: getBreadcrumbs(['Main UI', version.toUpperCase()])
  })
}])

router.get('/visualisations/external-movements-by-:groupField-:chartType', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const groupField = getFieldByName(req.params.groupField, dataFormats.externalMovements)
    const chartType = req.params.chartType

    req.reportOptions = {
      dataFormat: dataFormats.externalMovements,
      reportData: reportingService.reportExternalMovements,
      countData: reportingService.countExternalMovements,
      groupField,
      chartType
    }
    req.renderOptions = {
      ...req.renderOptions,
      title: 'External movements',
      breadcrumbs: getBreadcrumbs(['Main UI', version.toUpperCase(), 'Visualisations'])
    }
    next()
  },
  configureFilterOptions,
  (req, res) => renderVisualisation(req, res, 'v1')
])

module.exports = router
