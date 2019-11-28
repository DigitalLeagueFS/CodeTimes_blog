json.extract! attachment, :id, :type, :link, :post_id, :created_at, :updated_at
json.url attachment_url(attachment, format: :json)
