/* global document */

const nunjucks = require('nunjucks')
const path = require('path')
const $ = require('jquery')

const env = nunjucks.configure([
  path.join(__dirname, '../../../node_modules/govuk-frontend'),
  path.join(__dirname, '../../../node_modules/@ministryofjustice/frontend'),
  path.join(__dirname, '.'),
  path.join(__dirname, './views'),
  path.join(__dirname, '..')
], { autoescape: true })

const filters = require('../../filters')()
Object.keys(filters).forEach((filterName) => {
  env.addFilter(filterName, filters[filterName])
})

const defaultDataTableOptions = {
  selectedPage: 1,
  pageSize: 2,
  sortColumn: 0,
  sortedAsc: true
}

const defaultOptions = {
  caption: 'Data table',
  head: [
    { text: 'Header 1' },
    { text: 'Header 2' }
  ],
  rows: [
    [{ text: 'Value 1.1' }, { text: 'Value 1.2' }],
    [{ text: 'Value 2.1' }, { text: 'Value 2.2' }]
  ],
  totalRowCount: 20,
  ...defaultDataTableOptions,
  dataTable: defaultDataTableOptions,
  createUrlForParametersFilters: parameters => JSON.stringify(parameters),
  createUrlForParametersPaging: parameters => JSON.stringify(parameters),
  parentLayout: '../test-layout.html',
  filters: [
    { text: 'Direction', name: 'direction', type: 'radio', options: [{ value: 'in', text: 'In' }, { value: 'out', text: 'Out' }], value: 'in' },
    { text: 'Type', name: 'type', type: 'select', options: [{ value: 'a', text: 'A' }, { value: 'b', text: 'B' }], value: 'b' }
  ]
}

describe('Content renders correctly', () => {
  it('Headers render successfully', () => {
    document.body.innerHTML = env.render('layout.html', defaultOptions)

    defaultOptions.head.forEach((heading, index) =>
      expect($(`.govuk-table__header button[data-index=${index}]`).text()).toEqual(heading.text)
    )
  })

  it('Data renders successfully', () => {
    document.body.innerHTML = env.render('layout.html', defaultOptions)

    defaultOptions.rows.forEach((row) => row.forEach(cell =>
      expect($(`.govuk-table__cell:contains('${cell.text}')`).length).toEqual(1)
    ))
  })
})

describe('Filters render correctly', () => {
  it('Data table selected filters render successfully', () => {
    document.body.innerHTML = env.render('layout.html', defaultOptions)

    expect($('.filter-summary-remove-button:contains(\'Direction: In\')').length).toEqual(1)
    expect($('.filter-summary-remove-button:contains(\'Type: B\')').length).toEqual(1)
  })
})
