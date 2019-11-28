require 'test_helper'

class TagsPostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tags_post = tags_posts(:one)
  end

  test "should get index" do
    get tags_posts_url
    assert_response :success
  end

  test "should get new" do
    get new_tags_post_url
    assert_response :success
  end

  test "should create tags_post" do
    assert_difference('TagsPost.count') do
      post tags_posts_url, params: { tags_post: { post_id: @tags_post.post_id, tag_id: @tags_post.tag_id } }
    end

    assert_redirected_to tags_post_url(TagsPost.last)
  end

  test "should show tags_post" do
    get tags_post_url(@tags_post)
    assert_response :success
  end

  test "should get edit" do
    get edit_tags_post_url(@tags_post)
    assert_response :success
  end

  test "should update tags_post" do
    patch tags_post_url(@tags_post), params: { tags_post: { post_id: @tags_post.post_id, tag_id: @tags_post.tag_id } }
    assert_redirected_to tags_post_url(@tags_post)
  end

  test "should destroy tags_post" do
    assert_difference('TagsPost.count', -1) do
      delete tags_post_url(@tags_post)
    end

    assert_redirected_to tags_posts_url
  end
end
