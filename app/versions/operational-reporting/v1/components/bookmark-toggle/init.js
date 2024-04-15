/* global $ */

$(function () {
  $('.bookmark-input:input[type=checkbox]').each(function () {
    const toggle = $(this)
    const id = toggle.attr("id")
    toggle.change(() => {
      let row = +id
      row = row - 1;
      if (toggle.is(':checked')) {
        $('.card-group__item--bookmark[data-id=' + id + ']').css("display", "flex");
        $('#my-bookmarks-table .govuk-table__body tr:eq(' + row + ')').css("display", "table-row");
      }
      if (!toggle.is(':checked')) {
        $('.card-group__item--bookmark[data-id=' + id + ']').css("display", "none");
        $('#my-bookmarks-table .govuk-table__body tr:eq(' + row + ')').css("display", "none");
      }

      const hidden = $('li.card-group__item--bookmark[style*="display: none"]')
      $('#Bookmark-count').html(8 - hidden.length)
    })
  });
})