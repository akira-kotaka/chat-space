$(function () {
  function buildHTML(message) {
      var html = `<li class="chat__body__list">
                  <span class="chat__body__list__user-name">${ message.user_name }</span>
                  <span class="chat__body__list__creation-time">${ message.created_at }</span>
                  <div class="chat__body__list__message">`
                    + `<div class="chat__body__list__message__body">${message.body}</div>`
                    + `${message.image_url ? `<img src="${message.image_url}">` : ``}`
                  + `</div>
                </li>`
    return html;
    }
  $('.js-form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
        console.log('OK');
        var html = buildHTML(message);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('.js-form')[0].reset();
      })
      .fail(function () {
        alert('error');
      });
    return false;
  });
});