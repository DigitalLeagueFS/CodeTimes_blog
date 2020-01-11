module Api
class UsersController < ApiController


  private

  def resource_class
    User
  end

  def resource_params
    params.require(:user).permit(:email, :name, :avatar)
  end

end
end
