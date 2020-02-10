class TagsPost < ApplicationRecord
  belongs_to :post
  belongs_to :tag
  accepts_nested_attributes_for :tag, :allow_destroy => true, :update_only=>true
end
