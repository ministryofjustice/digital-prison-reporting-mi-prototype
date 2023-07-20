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
  createUrlForParameters: parameters => JSON.stringify(parameters),
  filters: [
    { text: 'Direction', name: 'direction', type: 'radio', options: [{ value: 'in', text: 'In' }, { value: 'out', text: 'Out' }], value: 'in' },
    { text: 'Type', name: 'type', type: 'select', options: [{ value: 'a', text: 'A' }, { value: 'b', text: 'B' }], value: 'b' }
  ]
}

describe('Filters options render correctly', () => {
  it('Select filter renders successfully', () => {
    document.body.innerHTML = env.render('template.html', defaultOptions)

    const typeFilterSelect = $('#filters\\.type')
    expect(typeFilterSelect.length).toEqual(1)
    expect(typeFilterSelect.is('select')).toBe(true)
    expect(typeFilterSelect.val()).toEqual('b')
  })

  it('Radio filter renders successfully', () => {
    document.body.innerHTML = env.render('template.html', defaultOptions)

    const firstDirectionRadio = $('#filters\\.direction')
    expect(firstDirectionRadio.length).toEqual(1)
    expect(firstDirectionRadio.is('input')).toBe(true)
    expect(firstDirectionRadio.attr('type')).toBe('radio')
    expect(firstDirectionRadio.val()).toBe('in')
    expect(firstDirectionRadio.attr('checked')).toBe('checked')

    const secondDirectionRadio = $('#filters\\.direction-2')
    expect(secondDirectionRadio.length).toEqual(1)
    expect(secondDirectionRadio.is('input')).toBe(true)
    expect(secondDirectionRadio.attr('type')).toBe('radio')
    expect(secondDirectionRadio.val()).toBe('out')
    expect(secondDirectionRadio.attr('checked')).toBeFalsy()
  })
})
