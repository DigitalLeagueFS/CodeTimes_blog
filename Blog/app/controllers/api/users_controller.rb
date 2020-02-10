module Api
class UsersController < ApiController

  before_action :authenticate_request!

  def index
    pp params
    if params[:only_my] then
      @collection=User.find(@current_user.id)
    else
      @collection=resource_class.all
    end
    render json: @collection.as_json(as_json_collection)
  end

  def update
    @resource=resource_class.find(params[:id])
    @resource.assign_attributes(resource_params)
    if @resource.save
      render json: @resource.as_json(as_json_resource)
    else
      render json: {errors:@resource.errors}, status: :unprocessable_entity
    end
  end


  def show
    if params[:id]=="only_my"
      @resource=resource_class.find(@current_user.id)
    else
    @resource=resource_class.find(params[:id])
    end
    render json: @resource.as_json(as_json_resource)
  end

  private

  def resource_class
    User
  end

  def resource_params
    params.require(:user).permit(:email, :name, :avatar,:bio)
  end

end
end
