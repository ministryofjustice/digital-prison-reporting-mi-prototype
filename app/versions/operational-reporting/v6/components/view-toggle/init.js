(() => {

  const toggles = document.getElementsByClassName('dpr-view-toggle')
  Array.from(toggles).forEach((toggle) => {
    const toggleContainer = toggle.parentNode.parentNode
    const contentContainers = Array.from(toggleContainer.getElementsByClassName('toggle-content'))
    const icons = Array.from(toggle.getElementsByClassName('icon-wrapper'))

    let active = ''
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        icons.forEach(icon => {
          icon.classList.remove('icon-active')
        })
        contentContainers.forEach((content) => {
          content.classList.remove('toggle-content--active')
        })

        active = icon.getAttribute('index')
        contentContainers[active].classList.add('toggle-content--active')
        icon.classList.add('icon-active')

        // Update Query Params
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set(toggle.id, active)
        history.replaceState(null, null, "?" + queryParams.toString());
      })
    })
  })

  const initToggleStateFromQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.keys().forEach(key => {
      const toggle = document.getElementById(key)
      const value = urlParams.get(key)
      const icons = Array.from(toggle.getElementsByClassName('icon-wrapper'))

      const toggleContainer = toggle.parentNode.parentNode
      const contentContainers = Array.from(toggleContainer.getElementsByClassName('toggle-content'))

      icons.forEach(icon => {
        const index = icon.getAttribute('index')
        if (value === index) {
          icon.classList.add('icon-active')
          contentContainers[index].classList.add('toggle-content--active')
        } else {
          icon.classList.remove('icon-active')
          contentContainers[index].classList.remove('toggle-content--active')
        }
      })
    })
  }

  initToggleStateFromQueryParams()
})()