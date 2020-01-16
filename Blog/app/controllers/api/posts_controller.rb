module Api
class PostsController < ApiController

  before_action :authenticate_request!

  def index
    pp params
    if params[:only_my] then
      @collection=Post.where(user_id:@current_user.id)
    else
      @collection=resource_class.all
    end
    render json: @collection.as_json(as_json_collection)
  end

  private

  def resource_class
    Post
  end

  def resource_params
    params.require(:post).permit(:user_id,:title, :content, :date_of_publication)
  end

  def as_json_collection
    {
        include: {
            user: {only:[:name] }
        }
    }
  end









end
end
