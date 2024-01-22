/* global $ */
/* global axios */

$(function async () {
  $('[data-remove-target]').each((index, element) => {
    $(element).on('click', async (event) => {
      event.stopPropagation()

      const baseUrl = window.location.origin
      const id = $(element).attr('data-list-id')

      await axios.post(`${baseUrl}/main-ui/v5/removeFromMyList/`, { id })
        .catch(function (error) {
          console.log(error)
        })

      window.location.reload()
    })
  })
})
