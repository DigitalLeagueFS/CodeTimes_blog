class RegController < ApplicationController

  skip_before_action :verify_authenticity_token
  def create
    @user=User.new(user_params)
    @user.save
  end

  def getToken
    render json: {csrf:form_authenticity_token}
  end

  def user_params()
    params.require(:user).permit(:login, :name, :password, :bio, :avatar, :email)
  end
end
