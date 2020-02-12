require 'test_helper'

class UserCreateControllerTest < ActionDispatch::IntegrationTest
  test "should get Create" do
    get user_create_Create_url
    assert_response :success
  end

end
