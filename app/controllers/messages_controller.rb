class MessagesController < ApplicationController
before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Message.new(message_params)
    if @message = @group.messages.new(message_params)
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end

  private
  def message_params
    permit.params(:text, :image)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
