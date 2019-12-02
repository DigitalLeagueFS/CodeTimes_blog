Rails.application.routes.draw do
  resources :subscriptions
  resources :tags_posts
  resources :likes
  resources :comments
  resources :attachments
  resources :posts
  resources :users
  resources :tags
  resources :categories
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
