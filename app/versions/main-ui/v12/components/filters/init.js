document.querySelectorAll('[data-update-url-on-change=true]').forEach(element => {
  element.addEventListener('change', e => {
    const currentUrl = document.location.toString()

    const filterRegex = new RegExp(`&{0,1}${e.target.id}=[^&]+`)
    const filterValue = (currentUrl.includes('?') ? '&' : '?') +
      `${e.target.id}=${e.target.value}`

    document.location = currentUrl.replace(filterRegex, '') + filterValue
  })
})
