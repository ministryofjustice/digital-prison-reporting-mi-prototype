const { createTagsCol, showTagsColumn } = require('./services/tagService')
const { createBookMarkToggleHtml } = require('./services/bookmarkService')

const createRows = (definitions, req) => {
  return definitions.map((def) => {
    const rows = []
    const tagsColHtml = createTagsCol(def.tags, req)
    const bookmarkColumnHtml = createBookMarkToggleHtml(def.id)

    rows.push({ html: bookmarkColumnHtml, attributes: { cellid: def.id } })
    rows.push({ html: '<a href="./report/' + def.id + '">' + def.name + '</a>' })

    if (tagsColHtml.length) rows.push({ html: tagsColHtml, text: 'tags' })

    rows.push({ text: '', classes: 'hide-column' })

    return rows
  })
}

const createHead = (rows) => {
  const headings = []
  headings.push({ text: '', classes: 'dpr-table__bm_head bg-color--grey' }) // Bookmark column
  headings.push({ text: 'Name', classes: 'bg-color--grey' })

  // Only show tags if there are tags to show
  if (showTagsColumn(rows)) headings.push({ text: 'Tags', classes: 'bg-color--grey' })
  headings.push({ text: 'Match(es)', classes: 'bg-color--grey hide-header-column', attributes: { id: 'matches-header' } })
  return headings
}

const baseBreadCrumbs = [
  { text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' },
  { text: 'Prototype', href: '/' },
  { text: 'Operational Reporting', href: '/operational-reporting/' }
]

module.exports = {
  baseBreadCrumbs,
  createRows,
  createHead
}
