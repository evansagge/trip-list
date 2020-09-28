# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "/api/users", type: :request do

  let(:valid_attributes) {
    attributes_for(:user)
  }

  let(:invalid_attributes) {
     { email: 'invalid-email' }
  }

  describe "GET /api/users" do
    let!(:user_a) { create(:user) }
    let!(:user_b) { create(:user) }

    subject { get '/api/users', headers: auth_headers, as: :json }

    shared_examples 'authorized user' do
      it "renders a successful response" do
        subject
        expect(response).to have_http_status(:success)
      end

      it "returns all users" do
        subject
        expect(json['data'].size).to eq(3)
        expect(json['data'].map { |data| data['id'] }).to contain_exactly(
          current_user.id, user_a.id, user_b.id
        )
      end
    end

    context 'and current user is an admin', role: :admin do
      it_behaves_like 'authorized user'
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'authorized user'
    end

    context 'and current user is not an admin nor a manager' do
      it_behaves_like 'unauthorized user'
    end
  end

  describe "POST /create" do
    subject { post '/api/users', params: { user: user_parameters },  headers: auth_headers,  as: :json }
    
    let(:user_parameters) { valid_attributes }

    shared_examples 'authorized user' do
      context "with valid parameters" do
        it "creates a new user for current user" do
          expect { subject  }.to change { User.count }.by(1)
        end

        it "renders a JSON response with the new user" do
          subject
          aggregate_failures do
            expect(response).to have_http_status(:created)
            expect(response.content_type).to match(a_string_including("application/vnd.api+json; charset=utf-8"))
          end
        end
      end

      context "with invalid parameters" do
        let(:user_parameters) { invalid_attributes }
        
        it "does not create a new user" do
          expect { subject }.to change { User.count }.by(0)
        end

        it "renders a JSON response with errors for the new user" do
          subject
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end
    end

    context 'and current user is an admin', role: :admin do
      it_behaves_like 'authorized user'
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'authorized user'
    end

    context 'and current user is not an admin nor a manager' do
      it_behaves_like 'unauthorized user'
    end
  end

  describe "GET /api/users/:id" do
    subject { get "/api/users/#{user.id}", headers: auth_headers, as: :json }

    let!(:user) { create(:user) }

    shared_examples 'authorized user' do
      it "renders a successful response" do
        subject
        expect(response).to have_http_status(:success)
      end
    end

    context 'and current user is an admin', role: :admin do
      it_behaves_like 'authorized user'
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'authorized user'
    end

    context 'and current user is not an admin nor a manager' do
      context 'and id is for current user' do
        let!(:user) { current_user }

        it_behaves_like 'authorized user'
      end

      context 'and id is for another user' do
        it_behaves_like 'unauthorized user'
      end
    end
  end

  describe "PATCH /update" do
    subject { patch "/api/users/#{user.id}", params: { user: user_parameters }, headers: auth_headers, as: :json }

    let!(:user) { create(:user) }

    let(:user_parameters) { { email: 'a-different-email@example.com' } }

    shared_examples 'authorized user' do
      context "with valid parameters" do
        it "updates the requested user" do
          expect { subject }.to change { user.reload.email }
        end

        it "renders a JSON response with the user" do
          subject
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end

      context "with invalid parameters" do
        let(:user_parameters) { invalid_attributes }

        it "renders a JSON response with errors for the user" do
          subject
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end
    end

    context 'and current user is an admin', role: :admin do
      it_behaves_like 'authorized user'
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'authorized user'
    end

    context 'and current user is not an admin nor a manager' do
      context 'and id is for current user' do
        let!(:user) { current_user }

        it_behaves_like 'authorized user'
      end

      context 'and id is for another user' do
        it_behaves_like 'unauthorized user'
      end
    end
  end

  describe "DELETE /destroy" do
    subject { delete "/api/users/#{user.id}", headers: auth_headers, as: :json }

    let!(:user) { create(:user) }

    shared_examples 'authorized user' do
      it "destroys the requested user" do
        expect { subject }.to change { User.count }.by(-1)
          .and change { User.exists?(user.id) }.from(true).to(false)
      end
    end

    context 'and current user is an admin', role: :admin do
      it_behaves_like 'authorized user'
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'authorized user'
    end

    context 'and current user is not an admin nor a manager' do
      context 'and id is for current user' do
        let!(:user) { current_user }

        it_behaves_like 'authorized user'
      end

      context 'and id is for another user' do
        it_behaves_like 'unauthorized user'
      end
    end
  end
end
