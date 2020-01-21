class Post < ApplicationRecord
  belongs_to :user
  has_many :tags_posts
  has_many :tags, through: :tags_posts
  accepts_nested_attributes_for :tags_posts, :allow_destroy => true
end
