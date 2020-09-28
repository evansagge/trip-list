# frozen_string_literal: true

require 'json_matchers/rspec'

JsonMatchers.schema_root = 'spec/support/api/schemas'

module JsonAPIHelpers
  def json
    JSON.parse(response.body)
  end
end

RSpec.shared_context 'auth' do
  let!(:current_user) { create(:user) }

  let(:auth_headers) {
    access_token, _ = jwt_and_refresh_token(current_user, 'user')
    {
      'Authorization': "Bearer #{access_token}"
    }
  }

  before do |ex|
    current_user.update!(role: ex.metadata[:role]) if ex.metadata[:role]
  end
end

RSpec.shared_examples 'unauthorized user' do
  it "renders forbidden" do
    subject
    expect(response).to have_http_status(:forbidden)
  end
end

RSpec.configure do |config|
  config.include JsonAPIHelpers, type: :request
  config.include ApiGuard::Test::ControllerHelper, type: :request
  config.include_context 'auth', type: :request
end
