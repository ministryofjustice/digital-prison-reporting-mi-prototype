class SearchBoxV2 {
  hiddenClass = 'hidden'

  updateSectionVisibility = (section, searchValue) => {
    const header = document.querySelector(`[data-type="${section}-header"]`)
    let matching = 0

    document.querySelectorAll(`[data-type="${section}"]`).forEach(option => {
      if (option.dataset.content.toLowerCase().includes(searchValue)) {
        option.classList.remove(this.hiddenClass)
        matching++
      } else if (!option.classList.contains(this.hiddenClass)) {
        option.classList.add(this.hiddenClass)
      }
    })

    if (matching > 0) {
      header.classList.remove(this.hiddenClass)
    } else {
      header.classList.add(this.hiddenClass)
    }
  }

  appendContentToUrlOnClick = section => {
    document.querySelectorAll(`[data-type="${section}"]`).forEach(row => {
      row.querySelector('button').addEventListener('click', e => {
        document.location = document.location + `&${section}s=${row.dataset.content}`
        e.preventDefault()
      })
    })
  }

  init () {
    const searchBox = document.querySelector('#v2-search-box')

    if (searchBox) {
      searchBox.addEventListener('keyup', e => {
        const searchHeader = document.querySelector('[data-type="search-header"]')

        if (e.target.value) {
          const searchValue = e.target.value.toLowerCase()

          this.updateSectionVisibility('tag', searchValue)
          this.updateSectionVisibility('author', searchValue)
          this.updateSectionVisibility('keyword', searchValue)

          const matchingReports = document.definitions.filter(d => d.name.toLowerCase().includes(searchValue)).length

          searchHeader.classList.remove(this.hiddenClass)
          searchHeader.querySelector('button').innerHTML = `Search report names for "${e.target.value}" <i>(${matchingReports} matches</i>)`
        } else {
          document.querySelectorAll('.search-box-prompt li').forEach(option => {
            if (!option.classList.contains(this.hiddenClass)) {
              option.classList.add(this.hiddenClass)
            }
          })
        }
      })
    }

    document.querySelectorAll('[data-type="list-filter"]').forEach(filter => {
      filter.addEventListener('click', () => {
        const form = filter.closest('form')
        filter.remove()
        form.submit()
      })
    })

    const searchHeader = document.querySelector('[data-type="search-header"]')

    if (searchHeader) {
      document.querySelector('[data-type="search-header"]').addEventListener('click', e => {
        e.target.closest('form').submit()
      })
    }

    this.appendContentToUrlOnClick('tag')
    this.appendContentToUrlOnClick('author')
    this.appendContentToUrlOnClick('keyword')
  }
}

new SearchBoxV2().init()
