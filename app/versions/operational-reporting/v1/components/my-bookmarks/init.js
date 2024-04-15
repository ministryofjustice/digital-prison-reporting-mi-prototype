$(function () {
  $('.remove-bookmark').each(function () {
    const removeBookmarkButton = $(this)
    const id = removeBookmarkButton.attr("data-id")
    removeBookmarkButton.click((event) => {
      event.stopPropagation();
      let row = +id
      row = row - 1;
      $("#" + id).prop('checked', false);
      $('.card-group__item[data-id=' + id + ']').css("display", "none");
      $('#my-bookmarks-table .govuk-table__body tr:eq(' + row + ')').css("display", "none");

      const hidden = $('li.card-group__item--bookmark[style*="display: none"]')

      $('#Bookmark-count').html(8 - hidden.length)
    })
  });

  $("#toggle-list-view").click(() => {
    $("#bookmark-card-view").css("display", "none")
    $("#my-bookmarks-table").css("display", "block")
    $("#toggle-list-view").addClass('active')
    $("#toggle-card-view").removeClass('active')
  })

  $("#toggle-card-view").click(() => {
    $("#bookmark-card-view").css("display", "block")
    $("#my-bookmarks-table").css("display", "none")
    $("#toggle-card-view").addClass('active')
    $("#toggle-list-view").removeClass('active')
  })
})