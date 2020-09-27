# frozen_string_literal: true

class AddRolesToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :roles, :string, array: true
  end
end
