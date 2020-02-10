class Tag < ApplicationRecord
  has_many :tags_posts, dependent: :delete_all
  has_many :tags, through: :tags_posts
  accepts_nested_attributes_for :tags_posts, :allow_destroy => true

  before_create :check_exists

  def check_exists
    tag = Tag.find_by_name(self.name)
    if tag!=nil
      tags_posts.destroy
      Tag.destroy(tag.id)
    end
  end
end
