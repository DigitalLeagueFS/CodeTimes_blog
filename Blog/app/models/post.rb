class Post < ApplicationRecord
  serialize :avatars, JSON
  mount_uploaders :avatars, AvatarUploader
  belongs_to :category
  has_many :like, dependent: :delete_all
  belongs_to :user
  has_many :tags_posts,dependent: :delete_all
  has_many :tags, through: :tags_posts, dependent: :delete_all
  has_many :comments, dependent: :delete_all
  accepts_nested_attributes_for :tags_posts, :allow_destroy => true




end
