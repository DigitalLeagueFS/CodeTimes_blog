Rails.application.routes.draw do
  post 'auth_user',to: 'authentication#authenticate_user'
  get 'auth',to:'application#authenticate_request!'
  get 'home',to: 'home#index'
  #get 'profile/index'
  get '/profile', to: 'profile#index'
  get 'main/index'
  root 'main#index'




  devise_for :users

    resources :subscriptions
    resources :tags_posts
    resources :likes
    resources :comments
    resources :attachments
    resources :posts
    resources :users
    resources :tags
    resources :categories



  namespace :api do
    resources :tags, except:[:new,:edit]
    resources :tags_posts, except:[:new,:edit]
    resources :posts, except: [:new, :edit]
    resources :likes, except: [:new, :edit]
    resources :users, except: [:new, :edit]
    resources :categories, except: [:new, :edit]
    resources :comments, except:[:new,:edit]
  end

  post '/api/posts/deleteImage', to: 'api/posts#deleteImage'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end