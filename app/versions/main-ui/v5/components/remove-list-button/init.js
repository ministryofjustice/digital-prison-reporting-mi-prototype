/* global $ */

$(function async () {
  $('[data-remove-target]').each((index, element) => {
    $(element).on('click', async (event) => {
      event.stopPropagation()

      const base_url = window.location.origin
      const id = $(element).attr('data-list-id')
      
      await axios.post(`${base_url}/main-ui/v5/removeFromMyList/`, { id })
        .catch(function (error) {
          console.log(error)
        });
      
      location.reload();
    })
  })
})
