module Api
  class LikesController < ApiController

    before_action :authenticate_request!


    def create
      @post=Post.find(params[:like][:post_id])
      @resource=resource_class.new(resource_params)

      logger.error
      if @resource.save!
        if @post
          @post.likes_count=@post.likes_count+1
          @post.save
        end
        render json: @resource.as_json(as_json_resource)
      else
        render json: {error:@resource.errors},status: :unprocessable_entity
      end
    end



    def show
      pp params
      resource_params
      @resource=resource_class.where(post_id:params[:post_id], user_id:params[:user_id])
      render json: @resource.as_json(as_json_resource)
    end

    private

    def resource_class
      Like
    end

    def resource_params
      params.require(:like).permit(:post_id,:user_id,:created_at,:updated_at)
    end

  end
end
