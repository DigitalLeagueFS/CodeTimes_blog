module Api
class PostsController < ApiController

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
