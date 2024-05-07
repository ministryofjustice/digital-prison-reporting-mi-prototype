class MUSearchBoxv11 {
  highlightText (text, searchValue) {
    return text.replaceAll(new RegExp(`(${searchValue})`, 'gi'), '<b>$1</b>')
  }

  addAndHighlightColumn = (row, content, searchValue, id) => {
    const column = document.createElement('td')
    if (id) {
      column.innerHTML = `<a href="./${id}/">` + this.highlightText(content, searchValue) + '</a>'
    } else {
      column.innerHTML = this.highlightText(content, searchValue)
    }
    column.classList.add('govuk-table__cell')
    row.appendChild(column)
  }

  init () {
    const v11MuSearchBox = document.querySelector('#v11-mu-search-box')

    if (v11MuSearchBox) {
      v11MuSearchBox.addEventListener('keyup', e => {
        const table = document.querySelector('.mu-v11').querySelector('tbody')

        while (table.rows.length > 0) {
          table.deleteRow(0)
        }

        if (e.target.value && e.target.value.length > 0) {
          const searchValue = e.target.value.toLowerCase()
          document.definitions
            .filter(d => d.name.toLowerCase().includes(searchValue) ||
              d.author.toLowerCase().includes(searchValue) ||
              d.tags.find(tag => tag.toLowerCase().includes(searchValue)) ||
              Object.values(d.keywords).find(keyword => keyword.toLowerCase().includes(searchValue))
            )
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(report => {
              const row = document.createElement('tr')
              const matchingFields = []

              row.classList.add('govuk-table__row')

              this.addAndHighlightColumn(row, report.name, searchValue, report.id)
              this.addAndHighlightColumn(row, report.product, searchValue)

              if (report.author.toLowerCase().includes(searchValue)) {
                matchingFields.push(`Author: ${report.author}`)
              }

              report.tags
                .filter(tag => tag.toLowerCase().includes(searchValue))
                .forEach(tag => matchingFields.push(`Tag: ${tag}`))

              Object.keys(report.keywords)
                .filter(keywordType => report.keywords[keywordType].toLowerCase().includes(searchValue))
                .forEach(keywordType => matchingFields.push(`${keywordType}: ${report.keywords[keywordType]}`))

              this.addAndHighlightColumn(row, matchingFields.join(', '), searchValue)

              return row
            })
            .forEach(row => table.appendChild(row))
        }
      })
    }
  }
}

new MUSearchBoxv11().init()
