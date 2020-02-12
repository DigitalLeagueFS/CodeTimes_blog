class Post < ApplicationRecord
  serialize :avatars, JSON
  mount_uploaders :avatars, AvatarUploader
  belongs_to :category
    has_many :like,   dependent: :destroy
  belongs_to :user
  has_many :tags_posts,  dependent: :destroy
  has_many :tags, through: :tags_posts,   dependent: :destroy
  has_many :comments,   dependent: :destroy
  accepts_nested_attributes_for :tags_posts, :allow_destroy => true




end
