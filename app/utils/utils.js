const getBreadcrumbs = breadcrumbTitles => {
  let href = ''
  return breadcrumbTitles.map(t => {
    href += '/'
    href += t.toLowerCase().replace(/ /g, '-')
    return {
      text: t,
      href
    }
  })
}

module.exports = {
  getBreadcrumbs
}
