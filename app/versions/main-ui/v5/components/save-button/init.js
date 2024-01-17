/* global $ */

$(function async () {
  $('[data-save-target]').each((index, element) => {
    $(element).on('click', async (event) => {
      event.stopPropagation()

      const base_url = window.location.origin

      const data = {
        id: 2,
        text: 'My Title',
        href: `${window.location.href}`,
        description: 'I saved a list!'
      }

      const res = await axios.post(`${base_url}/main-ui/v5/addToMyList/`, {
        body: JSON.stringify(data)
      }).catch(function (error) {
        console.log(error)
      });

      console.log(res)
    })
  })
})
