class AddAvatarsToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :avatars, :string
  end
end
