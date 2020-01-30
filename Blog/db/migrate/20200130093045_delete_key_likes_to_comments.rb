class DeleteKeyLikesToComments < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :likes,:comments
  end
end
