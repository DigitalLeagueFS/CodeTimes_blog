json.extract! user, :id, :login, :name, :password, :bio, :created_at, :updated_at
json.url user_url(user, format: :json)
