class DeleteDateFieldsFromTagsPOsts < ActiveRecord::Migration[6.0]
  def change
    remove_column :tags_posts,:created_at
    remove_column :tags_posts,:updated_at
  end
end
