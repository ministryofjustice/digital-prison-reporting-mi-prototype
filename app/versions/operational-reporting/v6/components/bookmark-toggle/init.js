(async () => {
  const baseUrl = `${window.location.origin}/operational-reporting/v6/`
  const currentUrl = window.location.href
  const addBookmark = async (id) => {
    await axios
      .post(`${baseUrl}/addBookmark/`, {
        data: JSON.stringify({ id })
      })
      .catch(function (error) {
        console.log(error)
      });

    if (!currentUrl.includes('catalogue') && !currentUrl.includes('recently-viewed') && !currentUrl.includes('/report/')) {
      location.reload()
    }
  }

  const removeBookmark = async (id) => {
    await axios
      .post(`${baseUrl}/removeBookmark/`, {
        data: JSON.stringify({ id })
      })
      .catch(function (error) {
        console.log(error)
      });

    if (!currentUrl.includes('catalogue') && !currentUrl.includes('recently-viewed') && !currentUrl.includes('/report/')) {
      location.reload()
    }
  }

  document
    .querySelectorAll('.bookmark-input[type=checkbox]')
    .forEach((bookmarkToggle) => {
      bookmarkToggle.addEventListener('change', () => {
        if (bookmarkToggle.checked) {
          bookmarkToggle.parentNode.setAttribute('tooltip', 'Remove Bookmark')
          addBookmark(bookmarkToggle.id)
        } else {
          bookmarkToggle.parentNode.setAttribute('tooltip', 'Add Bookmark')
          removeBookmark(bookmarkToggle.id)
        }
      })
    })
})();