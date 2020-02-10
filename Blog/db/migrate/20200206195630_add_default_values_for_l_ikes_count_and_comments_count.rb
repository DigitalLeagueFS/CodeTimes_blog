class AddDefaultValuesForLIkesCountAndCommentsCount < ActiveRecord::Migration[6.0]
  def change
    change_column_default :posts, :likes_count,0
    change_column_default :posts,:comments_count,0
  end
end
