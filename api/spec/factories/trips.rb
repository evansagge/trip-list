FactoryBot.define do
  factory :trip do
    user
    destination { "Honolulu, HI" }
    start_date { 2.months.from_now }
    end_date { 5.months.from_now }
  end
end

