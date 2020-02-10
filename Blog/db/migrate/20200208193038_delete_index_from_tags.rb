class DeleteIndexFromTags < ActiveRecord::Migration[6.0]
  def change
    remove_index :tags,:name
  end
end
