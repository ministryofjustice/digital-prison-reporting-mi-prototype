(() => {
  document.querySelectorAll('[data-remove-tag]')
    .forEach((el) => {
      el.addEventListener("click", () => {
        const tag = el.dataset.removeTag
        let url = window.location.href
        url = url.replace(`${tag}/`, '')
        window.location.href = url
      })
    })
})()