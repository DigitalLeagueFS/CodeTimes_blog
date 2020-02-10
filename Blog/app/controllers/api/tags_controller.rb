module Api
  class TagsController < ApiController
    before_action :authenticate_request!
    private

    def resource_class
      Tag
    end

    def resource_params
      params.require(:tag).permit(:name)
    end

  end
end
