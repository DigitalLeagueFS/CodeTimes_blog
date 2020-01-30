class AddingNotNUllInCategoryId < ActiveRecord::Migration[6.0]
  def change
    change_column_null :posts, :category_id, false,1
  end
end
