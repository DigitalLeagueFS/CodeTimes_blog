class HomeController < ApplicationController
  respond_to :json
  before_action :authenticate_request!

  def index
    render json: {'logged_in' => true}
  end
end
