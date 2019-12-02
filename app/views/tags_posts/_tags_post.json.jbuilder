json.extract! tags_post, :id, :post_id, :tag_id, :created_at, :updated_at
json.url tags_post_url(tags_post, format: :json)
