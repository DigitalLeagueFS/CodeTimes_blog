json.extract! like, :id, :post_id, :comment_id, :user_id, :created_at, :updated_at
json.url like_url(like, format: :json)
