module Api
  class ApiController < ApplicationController
    respond_to :json
    skip_before_action :verify_authenticity_token

   def index
     @collection=resource_class.all
     render json: @collection.as_json(as_json_collection)
   end

    def show
      @resource=resource_class.find(params[:id])
      render json: @resource.as_json(as_json_resource)
    end

    def create
      @resource=resource_class.new(resource_params)
      if @resource.save
        render json: @resource.as_json(as_json_resource)
      else
        render json: {error:@resource.errors},status: :unprocessable_entity
      end
    end

    def update
      @resource=resource_class.find(params[:id])
      @resource.assign_attributes(resource_class)
      if @resource.save
        render json: @resource.as_json(as_json_resource)
      else
        render json: {errors:@resource.errors}, status: :unprocessable_entity
      end
    end

    def destroy
      @resource= resource_class.find(params[:id])
      @resource.destroy
      render json: {success:true}
    end

    private

    def resource_class
      raise NotImplementedError
    end

    def resource_params
      raise NotImplementedError
    end


    def as_json_collection
      {}
    end

    def as_json_resource
      {}
    end

  end
end
