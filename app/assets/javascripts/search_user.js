$(function() {
  var preInput;
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  };

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    search_list.append(html);
  };

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    var inputbox_already = []
    var inputbox = []
    var inputbox = $("#chat-group-users .chat-group-user").map(function () {
      return $(this).children("input").val();
    });
    for (i = 0; i < inputbox.length; i++) {
      inputbox_already.push(inputbox[i]);
    }
    console.log(inputbox_already);
    $("#user-search-result").empty();
    if (input !== preInput && input.length !== 0) {
      $.ajax ({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done( function(users) {
        if (users.length !== 0 ) {
          users.forEach(function(user){
            if (inputbox_already.indexOf(String(user.id)) == -1) {
              appendUser(user);
            }
          });
        }
        else {
          appendNoUser("一致するユーザーはいません。")
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました。')
      })
    }
    preInput = input
  });



  function appendUserToGroup(userName, userId) {
    var group_list = $("#chat-group-users")
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_list.append(html)
  };

  $("#user-search-result").on("click", ".user-search-add",function() {
    var userName = $(this).data("userName");
    var userId = $(this).data("userId");
    appendUserToGroup(userName, userId);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function() {
    $(this).parent().remove();
  });
});
