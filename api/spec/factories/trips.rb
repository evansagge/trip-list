# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id          :uuid             not null, primary key
#  comment     :text
#  destination :string           not null
#  end_date    :date             not null
#  start_date  :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :uuid             not null
#
# Indexes
#
#  index_trips_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :trip do
    user
    destination { "Honolulu, HI" }
    start_date { 2.months.from_now }
    end_date { 5.months.from_now }
  end
end

