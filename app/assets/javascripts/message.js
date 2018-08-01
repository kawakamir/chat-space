$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = message.image.url;
    }
    var html = `<div class="messages" id=last_message>
                  <div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                  </div>
                  <div class="messages__message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <img class="lower-message__image" src=${insertImage}>
                  </div>
                </div>`;
    return html;
    }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: href,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.upper-content').append(html);
      $('form')[0].reset();
      $('.right-contents').animate({scrollTop: $('#last_message').position().top}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
  });
})
