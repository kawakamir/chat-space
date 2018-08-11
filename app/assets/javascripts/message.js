$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = message.image.url;
    }
    var html = `<div class="messages" id=messages_message_${message.id} data-message-id="${message.id}">
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
    var href = $(this).attr('action');


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
      $('.right-contents').animate({scrollTop: $('#messages_message_' + data.id).position().top}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
  });


  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      if($('.messages')[0]){
        var message_id = $('.messages:last').data('messageId');
      } else {
        var message_id = 0;
      }
      $.ajax({
        type: 'GET',
        url: location.href,
        data: {
          message: {id: message_id}
        },
        dataType: 'json'
      })
      .done(function(messages) {
        if (messages.length !== 0){
          messages.forEach(function(message) {
            index_html = buildHTML(message);
            $('.upper-content').append(index_html);
          });
        }
      })
      .fail(function(messages){
        alert('自動更新機能に失敗しました。')
      });
    } else {
      clearInterval(interval);
  }} , 5000);
})
