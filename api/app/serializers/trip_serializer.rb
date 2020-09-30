# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id          :uuid             not null, primary key
#  comments    :text
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
class TripSerializer
  include FastJsonapi::ObjectSerializer

  set_type :trips

  belongs_to :user, record_type: :users, serializer: UserSerializer

  attributes :destination, :start_date, :end_date, :comments
end
