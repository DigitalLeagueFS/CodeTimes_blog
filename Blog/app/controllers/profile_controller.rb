class ProfileController < ApplicationController

  def index
    @id = current_user.id
    @user = User.find(@id)
    @posts = Post.where("user_id = ?", @id)

  end
end
