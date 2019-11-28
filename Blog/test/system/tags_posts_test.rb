require "application_system_test_case"

class TagsPostsTest < ApplicationSystemTestCase
  setup do
    @tags_post = tags_posts(:one)
  end

  test "visiting the index" do
    visit tags_posts_url
    assert_selector "h1", text: "Tags Posts"
  end

  test "creating a Tags post" do
    visit tags_posts_url
    click_on "New Tags Post"

    fill_in "Post", with: @tags_post.post_id
    fill_in "Tag", with: @tags_post.tag_id
    click_on "Create Tags post"

    assert_text "Tags post was successfully created"
    click_on "Back"
  end

  test "updating a Tags post" do
    visit tags_posts_url
    click_on "Edit", match: :first

    fill_in "Post", with: @tags_post.post_id
    fill_in "Tag", with: @tags_post.tag_id
    click_on "Update Tags post"

    assert_text "Tags post was successfully updated"
    click_on "Back"
  end

  test "destroying a Tags post" do
    visit tags_posts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Tags post was successfully destroyed"
  end
end
