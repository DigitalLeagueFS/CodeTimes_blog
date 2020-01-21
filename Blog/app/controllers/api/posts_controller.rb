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
    pp params
    params.require(:post).permit(:user_id,:title, :content, :date_of_publication   ,tags:[])
    @tag=params[:post][:tags]

    @post_id=Post.last.id
    for value in @tag
      @t=Tag.find_by_name(value)
      if @t
        {}
      else
        @t=Tag.create(name:value)
      end
      TagsPost.create(tag_id:@t.id, post_id:Post.last.id)
      end
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
    params.require(:post).permit(:user_id,:title, :content, :date_of_publication )
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
