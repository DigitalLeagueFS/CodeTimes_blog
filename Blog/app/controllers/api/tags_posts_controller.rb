module Api
  class TagsPostsController < ApiController
    before_action :authenticate_request!


    def index
      pp params
      if (params.has_key?(:post_id)) then
        if(params[:post_id].nil?)
          return
        end
        pp params[:post_id]
        @collection=TagsPost.where(post_id:params[:post_id])
      else
        @collection=resource_class.all
      end
      render json: @collection.as_json(as_json_collection)
    end

    private

    def resource_class
      TagsPost
    end

    def resource_params
      params.require(:tags_posts).permit(:post_id)
    end

  end
end
