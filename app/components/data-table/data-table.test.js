const nunjucks = require('nunjucks')
const path = require('path')
const filters = require('./filters')

const env = nunjucks.configure([
  path.join(__dirname, '../../../node_modules/govuk-frontend'),
  path.join(__dirname, '/views')
], { autoescape: true })

Object.keys(filters).forEach(function (filterName) {
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
  dataTableOptions: defaultDataTableOptions,
  createUrlForParameters: parameters => JSON.stringify(parameters)
}

describe('Content renders correctly', () => {
  it('Headers render successfully', () => {
    const rendered = nunjucks.render('template.html', defaultOptions)

    defaultOptions.head.forEach(header => expect(rendered).toContain(header.text))
  })

  it('Data renders successfully', () => {
    const rendered = nunjucks.render('template.html', defaultOptions)

    defaultOptions.rows.forEach(row => row.forEach(cell => expect(rendered).toContain(cell.text)))
  })
})

describe('Sorting renders correctly', () => {
  it.each([
    [0, true],
    [0, false],
    [1, true],
    [1, false]
  ])('Column %p sorted ascending: %p', (column, ascending) => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      sortColumn: column,
      sortedAsc: ascending
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }
    const expectedDirection = ascending ? 'ascending' : 'descending'
    const otherColumn = (column === 0 ? 1 : 0)

    const rendered = nunjucks.render('template.html', options)

    expect(rendered).toContain('<button data-index="' + column + '" ' +
      'aria-sort="' + expectedDirection + '" ' +
      'class="data-table-header-button data-table-header-button-sort-' + expectedDirection + '"')
    expect(rendered).toContain('<button data-index="' + otherColumn + '" ' +
      'aria-sort="none" ' +
      'class="data-table-header-button data-table-header-button-sort-none"')

    expect(rendered).toContain('window.location.href=\'{"sortColumn":' + column + ',"sortedAsc":' + !ascending + '}\'')
    expect(rendered).toContain('window.location.href=\'{"sortColumn":' + otherColumn + ',"sortedAsc":true}\'')
  })
})

describe('Page picker renders correctly', () => {
  it('Displays correctly for page 1 of 10', () => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      selectedPage: 1
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }

    const rendered = nunjucks.render('template.html', options)

    expectNoPreviousButton(rendered)
    expectSelectedPage(rendered, 1)
    expectPage(rendered, 2)
    expectNoPage(rendered, 3)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  it('Displays correctly for page 3 of 10', () => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      selectedPage: 3
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }

    const rendered = nunjucks.render('template.html', options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectPage(rendered, 2)
    expectSelectedPage(rendered, 3)
    expectPage(rendered, 4)
    expectNoPage(rendered, 5)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  it('Displays correctly for page 5 of 10', () => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      selectedPage: 5
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }

    const rendered = nunjucks.render('template.html', options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectNoPage(rendered, 2)
    expectNoPage(rendered, 3)
    expectPage(rendered, 4)
    expectSelectedPage(rendered, 5)
    expectPage(rendered, 6)
    expectNoPage(rendered, 7)
    expectNoPage(rendered, 8)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 2)
  })

  it('Displays correctly for page 10 of 10', () => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      selectedPage: 10
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }

    const rendered = nunjucks.render('template.html', options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectNoPage(rendered, 2)
    expectNoPage(rendered, 8)
    expectPage(rendered, 9)
    expectSelectedPage(rendered, 10)
    expectNoNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  const expectPage = (content, pageNumber) => {
    expect(content).toMatch(new RegExp(`aria-label="Page ${pageNumber}">\\s+${pageNumber}\\s+<\\/a>`))
  }

  const expectSelectedPage = (content, pageNumber) => {
    expect(content).toMatch(new RegExp(`aria-label="Page ${pageNumber}" aria-current="page">\\s+${pageNumber}\\s+<\\/a>`))
  }

  const expectNoPage = (content, pageNumber) => {
    expect(content).not.toMatch(new RegExp(`"Page ${pageNumber}"`))
  }

  const expectEllipses = (content, numberOfEllipses) => {
    expect(content.match(/<li class="govuk-pagination__item govuk-pagination__item--ellipses">&ctdot;<\/li>/g).length).toEqual(numberOfEllipses)
  }

  const expectPreviousButton = (content) => {
    expect(content).toContain('<span class="govuk-pagination__link-title">Previous</span>')
  }

  const expectNoPreviousButton = (content) => {
    expect(content).not.toContain('<span class="govuk-pagination__link-title">Previous</span>')
  }

  const expectNextButton = (content) => {
    expect(content).toContain('<span class="govuk-pagination__link-title">Next</span>')
  }

  const expectNoNextButton = (content) => {
    expect(content).not.toContain('<span class="govuk-pagination__link-title">Next</span>')
  }
})

describe('Page size picker renders correctly', () => {
  it('Displays correctly', () => {
    const dataTableOptions = {
      ...defaultDataTableOptions,
      pageSize: 100
    }
    const options = {
      ...defaultOptions,
      ...dataTableOptions,
      dataTableOptions
    }

    const rendered = nunjucks.render('template.html', options)

    expectPageSizeOption(rendered, 10)
    expectPageSizeOption(rendered, 20)
    expectSelectedPageSizeOption(rendered, 100)
    expectPageSizeOption(rendered, 200)
  })

  const expectPageSizeOption = (content, pageSize) => {
    expect(content).toContain(`<option value="${pageSize}">${pageSize}</option>`)
  }

  const expectSelectedPageSizeOption = (content, pageSize) => {
    expect(content).toContain(`<option value="${pageSize}" selected>${pageSize}</option>`)
  }
})
