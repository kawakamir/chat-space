$(function(){
  function buildHTML(message){
    var html = `<p>
                  ${message.user_name}
                  ${message.created_at}
                  ${message.content}
                  ${message.image}
                <p>`
    return html;
  }
  $(".form").on("submit", function(e){
    e.preventDefault();
    console.log(this);
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
      $('.messages').append(html);
      $('.lower-message__content').val('');
      $('.lower-message__image').val('');
    })
    .fail(function(){
      alert('error');
   });
  });
})
