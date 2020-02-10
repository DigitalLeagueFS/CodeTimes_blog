class DeleteCommentId < ActiveRecord::Migration[6.0]
  def change
    remove_column :comments,:comment_id
  end
end
