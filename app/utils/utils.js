const getBreadcrumbs = breadcrumbTitles => {
  let href = '/'
  return breadcrumbTitles.map(t => {
    href += t.toLowerCase().replace(/ /g, '-')
    href += '/'
    return {
      text: t,
      href
    }
  })
}

module.exports = {
  getBreadcrumbs
}
