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
class Trip < ApplicationRecord
  belongs_to :user

  validates :destination, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
