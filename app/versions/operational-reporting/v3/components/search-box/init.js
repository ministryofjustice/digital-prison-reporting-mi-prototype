const v3SearchBox = document.querySelector('#v3-search-box')

const highlightText = (text, searchValue) => text.replaceAll(new RegExp(`(${searchValue})`, 'gi'), '<b>$1</b>')

const addAndHighlightColumn = (row, content, searchValue) => {
  const column = document.createElement('td')
  column.innerHTML = highlightText(content, searchValue)
  column.classList.add('govuk-table__cell')
  row.appendChild(column)
}

if (v3SearchBox) {
  v3SearchBox.addEventListener('keyup', e => {
    const table = document.querySelector('.or-v3').querySelector('tbody')

    while (table.rows.length > 0) {
      table.deleteRow(0)
    }

    if (e.target.value && e.target.value.length > 2) {
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

          addAndHighlightColumn(row, report.name, searchValue)

          if (report.author.toLowerCase().includes(searchValue)) {
            matchingFields.push(`Author: ${report.author}`)
          }

          report.tags
            .filter(tag => tag.toLowerCase().includes(searchValue))
            .forEach(tag => matchingFields.push(`Tag: ${tag}`))

          Object.keys(report.keywords)
            .filter(keywordType => report.keywords[keywordType].toLowerCase().includes(searchValue))
            .forEach(keywordType => matchingFields.push(`${keywordType}: ${report.keywords[keywordType]}`))

          addAndHighlightColumn(row, matchingFields.join(', '), searchValue)

          return row
        })
        .forEach(row => table.appendChild(row))
    }
  })
}
