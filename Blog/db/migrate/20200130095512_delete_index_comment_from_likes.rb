class DeleteIndexCommentFromLikes < ActiveRecord::Migration[6.0]
  def change
    remove_index :likes,name:"index_likes_on_comment_id"
  end
end
