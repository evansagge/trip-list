# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  role            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user-#{n}@example.com" }
    password { 'Pass1234!'}
    password_confirmation { 'Pass1234!'}
    
    factory :manager do
      role { 'manager' }
    end

    factory :admin do
      role { 'admin' }
    end
  end
end
