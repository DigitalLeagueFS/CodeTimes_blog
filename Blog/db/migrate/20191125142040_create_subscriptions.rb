class CreateSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :subscriptions do |t|
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
