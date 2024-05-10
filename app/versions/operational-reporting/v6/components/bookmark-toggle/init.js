(async () => {
  const baseUrl = `${window.location.origin}/operational-reporting/v6/`

  const addBookmark = async (id) => {
    return await axios
      .post(`${baseUrl}/addBookmark/`, {
        data: JSON.stringify({ id })
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const removeBookmark = async (id) => {
    return await axios
      .post(`${baseUrl}/removeBookmark/`, {
        data: JSON.stringify({ id })
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  document
    .querySelectorAll('.bookmark-input[type=checkbox]')
    .forEach((bookmarkToggle) => {
      bookmarkToggle.addEventListener('change', () => {
        if (bookmarkToggle.checked) {
          addBookmark(bookmarkToggle.id)
        } else {
          removeBookmark(bookmarkToggle.id)
        }
      })
    })
})();