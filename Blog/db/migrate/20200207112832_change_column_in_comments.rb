class ChangeColumnInComments < ActiveRecord::Migration[6.0]
  def change
    rename_column :comments, :descriprion, :description
  end
end
