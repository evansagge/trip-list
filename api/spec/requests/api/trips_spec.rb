# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "/api/trips", type: :request do
  let!(:user) { create(:user) }

  let(:valid_attributes) {
    attributes_for(:trip).merge(user_id: user.id)
  }

  let(:invalid_attributes) {
    valid_attributes.merge(destination: nil)
  }

  let(:valid_headers) {
    access_token, _ = jwt_and_refresh_token(user, 'user')
    {
      'Authorization': "Bearer #{access_token}"
    }
  }

  describe "GET /api/trips" do
    let!(:trip_a) { create(:trip, user: user) }
    let!(:trip_b) { create(:trip, user: user) }
    let!(:other_trip) { create(:trip) }

    subject {  get '/api/trips', headers: valid_headers, as: :json }

    it "renders a successful response" do
      subject
      expect(response).to have_http_status(:success)
    end

    context 'and current user is not an admin' do
      it "returns only Trips created by current user" do
        subject
        expect(json['data'].size).to eq(2)
        expect(json['data'].map { |data| data['id'] }).to contain_exactly(trip_a.id, trip_b.id)
        expect(json['data'].map { |data| data['id'] }).to_not include(other_trip.id) 
      end
    end

    context 'and current user is an admin' do
      before { user.update!(role: :admin) }

      it "returns all trips" do
        subject
        expect(json['data'].size).to eq(3)
        expect(json['data'].map { |data| data['id'] }).to contain_exactly(
          trip_a.id, trip_b.id, other_trip.id
        )
      end
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      subject do
        post '/api/trips',
             params: { trip: valid_attributes }, 
             headers: valid_headers, 
             as: :json
      end

      it "creates a new Trip for current user" do
        expect { subject  }.to change { user.trips.count }.by(1)
      end

      it "renders a JSON response with the new trip" do
        subject
        aggregate_failures do
          expect(response).to have_http_status(:created)
          expect(response.content_type).to match(a_string_including("application/vnd.api+json; charset=utf-8"))
        end
      end
    end

    context "with invalid parameters" do
      subject do
        post '/api/trips',
             params: { trip: invalid_attributes }, 
             headers: valid_headers, 
             as: :json
      end

      it "does not create a new Trip" do
        expect { subject }.to change(Trip, :count).by(0)
      end

      it "renders a JSON response with errors for the new trip" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
      end
    end
  end

  describe "GET /api/trips/:id" do
    subject { get "/api/trips/#{trip.id}", headers: valid_headers, as: :json }

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: user) }
      
      it "renders a successful response" do
        subject
        expect(response).to have_http_status(:success)
      end
    end

    context 'if Trip was created by another user' do
      context 'and current user is a regular user' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is a manager' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is an admin' do
        before { user.update!(role: :admin) }

        let!(:trip) { create(:trip) }
        
        it "renders success response" do
          subject
          expect(response).to have_http_status(:success)
        end
      end
    end
  end

  describe "PATCH /update" do
    subject { patch "/api/trips/#{trip.id}", params: parameters, headers: valid_headers, as: :json }

    let(:parameters) { { trip: { destination: 'Osaka, JP' } } }

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: user) }

      context "with valid parameters" do

        it "updates the requested trip" do
          expect { subject }.to change { trip.reload.destination }
        end

        it "renders a JSON response with the trip" do
          subject
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end

      context "with invalid parameters" do
        let(:parameters) { { trip: invalid_attributes } }

        it "renders a JSON response with errors for the trip" do
          subject
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end
    end

    context 'if Trip was created by another user' do
      context 'and current user is a regular user' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is a manager' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is an admin' do
        before { user.update!(role: :admin) }

        let!(:trip) { create(:trip) }
        
        it "renders success response" do
          subject
          expect(response).to have_http_status(:success)
        end
      end
    end
  end

  describe "DELETE /destroy" do
    subject { delete "/api/trips/#{trip.id}", headers: valid_headers, as: :json }

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: user) }

      it "destroys the requested trip" do
        expect { subject }.to change(Trip, :count).by(-1)
      end
    end

    context 'if Trip was created by another user' do
      context 'and current user is a regular user' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is a manager' do
        let!(:trip) { create(:trip) }
        
        it "renders forbidden response" do
          subject
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'and current user is an admin' do
        before { user.update!(role: :admin) }

        let!(:trip) { create(:trip) }
        
        it "renders success response" do
          subject
          expect(response).to have_http_status(:success)
        end
      end
    end
  end
end
