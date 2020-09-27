# frozen_string_literal: true

class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips, id: :uuid do |t|
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.string :destination, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.text :comment

      t.timestamps
    end
  end
end
