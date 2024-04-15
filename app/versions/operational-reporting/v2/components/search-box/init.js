const hiddenClass = 'hidden'

const updateSectionVisibility = (section, searchValue) => {
  const header = document.querySelector(`[data-type="${section}-header"]`)
  let matching = 0

  document.querySelectorAll(`[data-type="${section}"]`).forEach(option => {
    if (option.dataset.content.toLowerCase().includes(searchValue)) {
      option.classList.remove(hiddenClass)
      matching++
    } else if (!option.classList.contains(hiddenClass)) {
      option.classList.add(hiddenClass)
    }
  })

  if (matching > 0) {
    header.classList.remove(hiddenClass)
  } else {
    header.classList.add(hiddenClass)
  }
}

const appendContentToUrlOnClick = section => {
  document.querySelectorAll(`[data-type="${section}"]`).forEach(row => {
    row.querySelector('button').addEventListener('click', e => {
      document.location = document.location + `&${section}s=${row.dataset.content}`
      e.preventDefault()
    })
  })
}

document.querySelector('#v2-search-box').addEventListener('keyup', e => {
  const searchHeader = document.querySelector('[data-type="search-header"]')

  if (e.target.value) {
    const searchValue = e.target.value.toLowerCase()

    updateSectionVisibility('tag', searchValue)
    updateSectionVisibility('author', searchValue)

    const matchingReports = document.definitions.filter(d => d.name.toLowerCase().includes(searchValue)).length

    searchHeader.classList.remove(hiddenClass)
    searchHeader.querySelector('button').innerHTML = `Search report names for "${e.target.value}" <i>(${matchingReports} matches</i>)`
  } else {
    document.querySelectorAll('.search-box-prompt li').forEach(option => {
      if (!option.classList.contains(hiddenClass)) {
        option.classList.add(hiddenClass)
      }
    })
  }
})

document.querySelectorAll('[data-type="list-filter"]').forEach(filter => {
  filter.addEventListener('click', () => {
    const form = filter.closest('form')
    filter.remove()
    form.submit()
  })
})

document.querySelector('[data-type="search-header"]').addEventListener('click', e => {
  e.target.closest('form').submit()
})

appendContentToUrlOnClick('tag')
appendContentToUrlOnClick('author')
