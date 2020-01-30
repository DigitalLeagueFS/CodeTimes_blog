class RemoveCategoryIdFromTags < ActiveRecord::Migration[6.0]
  def change

    remove_column :tags, :category_id, :integer
  end
end
