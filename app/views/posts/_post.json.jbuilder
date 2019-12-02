json.extract! post, :id, :title, :content, :date_of_publication, :user_id, :likes_count, :comments_count, :created_at, :updated_at
json.url post_url(post, format: :json)
