# == Schema Information
#
# Table name: refresh_tokens
#
#  id         :uuid             not null, primary key
#  token      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_refresh_tokens_on_token    (token) UNIQUE
#  index_refresh_tokens_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe RefreshToken, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
