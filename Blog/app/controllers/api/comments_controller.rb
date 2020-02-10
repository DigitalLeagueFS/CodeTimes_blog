module Api
  class CommentsController < ApiController
    before_action :authenticate_request!

    def create
      @resource=resource_class.new(resource_params)
      @resource.user_id=@current_user.id
      logger.error
      if @resource.save!

        render json: @resource.as_json(as_json_resource)
      else
        render json: {error:@resource.errors},status: :unprocessable_entity
      end
    end

    private

    def resource_class
      Comment
    end

    def resource_params
      params.require(:comment).permit(:description, :post_id, :created_at, :updated_at)
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
