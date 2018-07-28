class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.create(text: message_params[:text], image: message_params[:image], user: current_user.id, group: message_params[:group])
  end

  def message_params
    permit.params(:text, :image)
end
