class ORSearchBoxv6 {
  highlightText (text, searchValue) {
    const resetText = text.replaceAll('<b>', '').replaceAll('</b>', '')
    return resetText.replaceAll(new RegExp(`(${searchValue})`, 'gi'), '<b>$1</b>')
  }

  getMatchingFields (report, searchValue) {
    const matchingFields = []

    if (searchValue && searchValue.length > 0) {
      if (report.author.toLowerCase().includes(searchValue)) {
        matchingFields.push(`Author: ${report.author}`)
      }

      Object.keys(report.keywords)
        .filter(keywordType => report.keywords[keywordType].toLowerCase().includes(searchValue))
        .forEach(keywordType => matchingFields.push(`${keywordType}: ${report.keywords[keywordType]}`))
    }
    return matchingFields
  }

  showMatchesColumn (rows) {
    const matchesHeader = document.getElementById('matches-header')
    if (matchesHeader.classList.contains('hide-header-column')) {
      matchesHeader.classList.remove('hide-header-column')
      rows.forEach((row) => {
        const cells = Array.from(row.cells)
        cells[3].classList.remove('hide-column')
      })
    }
  }

  hideMatchesColumn (rows) {
    const matchesHeader = document.getElementById('matches-header')
    if (!matchesHeader.classList.contains('hide-header-column')) {
      rows.forEach((row) => {
        const cells = Array.from(row.cells)
        cells[3].classList.add('hide-column')
        matchesHeader.classList.add('hide-header-column')
      })
    }
  }

  highlightReportName (row, searchValue) {
    const cells = Array.from(row.cells)
    const nameCell = cells[1].getElementsByTagName('a')[0]
    const nameString = nameCell.innerHTML
    const highlighted = this.highlightText(nameString, searchValue)
    nameCell.innerHTML = highlighted
  }

  hightlightMatchesColumn (row, searchValue, values) {
    const cells = Array.from(row.cells)
    cells[3].innerHTML = this.highlightText(values, searchValue)
  }

  initInputFromQueryParam (inputElement) {
    const urlParams = new URLSearchParams(window.location.search)
    const value = urlParams.get('search')
    if (value) {
      inputElement.value = value
      this.updateSearchListing(value)
    }
  }

  addQueryParam (value) {
    const queryParams = new URLSearchParams(window.location.search)
    if (value.length) {
      queryParams.set('search', value)
      // eslint-disable-next-line no-undef
      history.replaceState(null, null, '?' + queryParams.toString())
    } else {
      queryParams.delete('search')
      window.history.pushState({}, document.title, window.location.pathname)
    }
  }

  updateSearchListing (value) {
    const table = document.getElementById('op-reports-table')
    const rowCountElement = document.getElementById('row-count')
    const rows = Array.from(table.rows)
    let rowCount = rows.length
    const searchValue = value.toLowerCase()

    const searchFilteredDef = document.definitions
      .filter(d => !value ||
        value.length === 0 ||
        d.name.toLowerCase().includes(searchValue) ||
        d.author.toLowerCase().includes(searchValue) ||
        d.tags.find(tag => tag.text.toLowerCase().includes(searchValue)) ||
        Object.values(d.keywords).find(keyword => keyword.toLowerCase().includes(searchValue))
      )

    rows.forEach((row) => {
      const rowId = row.getAttribute('rowid')

      const matches = []
      searchFilteredDef.forEach((def) => {
        const defId = def.id
        if (rowId === defId) matches.push(def)
      })

      if (!matches.length) {
        row.classList.add('hide-table-row')
        rowCount--
      } else {
        if (row.classList.contains('hide-table-row')) {
          row.classList.remove('hide-table-row')
        }

        this.highlightReportName(row, searchValue)

        const matchingFields = this.getMatchingFields(matches[0], searchValue)
        if (matchingFields.length) {
          this.hightlightMatchesColumn(row, searchValue, matchingFields.join(', '))
          this.showMatchesColumn(rows)
        } else {
          this.hideMatchesColumn(rows)
        }
      }
    })

    rowCountElement.innerHTML = rowCount
  }

  init () {
    const v6OrSearchBox = document.querySelector('#v6-or-search-box')

    if (v6OrSearchBox) {
      v6OrSearchBox.addEventListener('keyup', e => {
        this.updateSearchListing(e.target.value)
        this.addQueryParam(e.target.value)
      })

      v6OrSearchBox.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          window.location.reload()
        }
      })

      this.updateSearchListing('')
    }

    this.initInputFromQueryParam(v6OrSearchBox)
  }
}

new ORSearchBoxv6().init()
