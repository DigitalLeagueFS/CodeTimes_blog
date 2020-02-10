class DeleteDateFieldsFromTags < ActiveRecord::Migration[6.0]
  def change
    remove_column :tags,:updated_at
    remove_column :tags,:created_at
  end
end
