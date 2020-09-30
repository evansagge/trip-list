class RenameTripCommentToComments < ActiveRecord::Migration[6.0]
  def change
    rename_column :trips, :comment, :comments
  end
end
