# frozen_string_literal: true

# == Schema Information
#
# Table name: blacklisted_tokens
#
#  id         :uuid             not null, primary key
#  expire_at  :datetime
#  token      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_blacklisted_tokens_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe BlacklistedToken, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
