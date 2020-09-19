# frozen_string_literal: true

# == Schema Information
#
# Table name: jwt_denylists
#
#  id         :uuid             not null, primary key
#  exp        :datetime
#  jti        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_jwt_denylists_on_jti  (jti)
#
FactoryBot.define do
  factory :jwt_denylist do
    jti { "MyString" }
    exp { "2020-09-16 23:58:27" }
  end
end
