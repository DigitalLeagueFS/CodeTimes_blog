module Api
  class CategoriesController < ApiController

    private

    def resource_class
      Category
    end

    def resource_params
      params.require(:category).permit(:name)
    end

  end
end
