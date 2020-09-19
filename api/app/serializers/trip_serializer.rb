class TripSerializer
  include FastJsonapi::ObjectSerializer

  belongs_to :user

  attributes :destination, :start_date, :end_date, :comment
end
