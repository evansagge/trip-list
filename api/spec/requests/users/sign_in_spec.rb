# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /users/sign_in', type: :request do
  let(:user) { create(:user) }
  let(:url) { '/users/sign_in' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns valid JWT token with refresh token and expiry in header' do
      expect(response.headers['Access-Token']).to be_present
      expect(response.headers['Refresh-Token']).to be_present
      expect(response.headers['Expire-At']).to be_present

      token_from_request = response.headers['Access-Token']
      decoded_token = JWT.decode(token_from_request, Rails.application.credentials.secret_key_base, true)
      expect(decoded_token.first['email']).to eq(user.email)
    end
  end

  context 'when sign_in email does not exist' do
    before { post url, params: { user: { email: 'uknown@email.com' } } }
   
    it 'returns unprocessable entity status' do
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
