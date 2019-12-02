class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.datetime :date_of_publication
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :likes_count
      t.integer :comments_count

      t.timestamps
    end
  end
end
