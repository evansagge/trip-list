# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /users/sign_up', type: :request do
  let(:url) { '/users/sign_up' }
  let(:params) do
    {
      user: {
        email: 'user@example.com',
        password: 'password',
        password_confirmation: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      expect(response.body).to match_json_schema('user')
    end
  end

  context 'when user already exists' do
    before do
      create(:user, email: params[:user][:email])
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'returns validation errors' do
      expect(json['errors'].first['title']).to eq('Invalid request')
    end
  end
end
