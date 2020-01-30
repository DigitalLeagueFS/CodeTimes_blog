module Api
  class LikesController < ApiController

    before_action :authenticate_request!

    def show
      @resource=resource_class.find_by_post_id(params[:id])
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
