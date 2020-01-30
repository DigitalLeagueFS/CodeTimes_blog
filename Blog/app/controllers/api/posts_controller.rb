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

  def create
    @resource=resource_class.new(resource_params)
    pp @resource
    if @resource.save
      render json: @resource.as_json(as_json_resource)
    else
      render json: {error:@resource.errors},status: :unprocessable_entity
    end
  end

  private

  def resource_class
    Post
  end

  def resource_params
    params.require(:post).permit(:user_id,:title,:category_id, :content, :date_of_publication, tags_posts_attributes: [tag_attributes: [:name]],images:[] )
  end

  def as_json_collection
    {
        include: {
            user: {only:[:name] }
        }
    }
  end

  def as_json_resource
    {
        include:{
            user:{only:[:name]}
        }
    }
  end


end
end
