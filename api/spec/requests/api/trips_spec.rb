# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "/api/trips", type: :request do
  let(:valid_attributes) {
    { 
      data: {
        type: 'trips',
        attributes: attributes_for(:trip)
      }
    }
  }

  let(:invalid_attributes) {
    { 
      data: {
        type: 'trips',
        attributes: {
          destination: nil
        }
      }
    }
  }

  describe "GET /api/trips" do
    let!(:trip_a) { create(:trip, user: current_user) }
    let!(:trip_b) { create(:trip, user: current_user) }
    let!(:other_trip) { create(:trip) }

    subject {  get '/api/trips', headers: auth_headers, as: :json }

    it "renders a successful response" do
      subject
      expect(response).to have_http_status(:success)
    end
    
    context 'and current user is an admin', role: :admin do
      it "returns all trips" do
        subject
        expect(json['data'].size).to eq(3)
        expect(json['data'].map { |data| data['id'] }).to contain_exactly(
          trip_a.id, trip_b.id, other_trip.id
        )
      end
    end

    shared_examples 'non-admin user' do
      it 'returns only Trips created by current user' do
        subject
        expect(json['data'].size).to eq(2)
        expect(json['data'].map { |data| data['id'] }).to contain_exactly(trip_a.id, trip_b.id)
        expect(json['data'].map { |data| data['id'] }).to_not include(other_trip.id) 
      end
    end

    context 'and current user is a manager', role: :manager do
      it_behaves_like 'non-admin user'
    end

    context 'and current user is not an admin nor a manager' do
      it_behaves_like 'non-admin user'
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      subject do
        post '/api/trips',
             params: valid_attributes, 
             headers: auth_headers, 
             as: :json
      end

      it "creates a new Trip for current user" do
        expect { subject  }.to change { current_user.trips.count }.by(1)
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
             params: invalid_attributes, 
             headers: auth_headers, 
             as: :json
      end

      it "does not create a new Trip" do
        expect { subject }.to_not change { Trip.count }
      end

      it "renders a JSON response with errors for the new trip" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
      end
    end
  end

  describe "GET /api/trips/:id" do
    subject { get "/api/trips/#{trip.id}", headers: auth_headers, as: :json }


    shared_examples 'authorized user' do
      it "renders a successful response" do
        subject
        expect(response).to have_http_status(:success)
      end
    end

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: current_user) }
      
      it_behaves_like 'authorized user'
    end

    context 'if Trip was created by another user' do
      let!(:trip) { create(:trip) }

      context 'and current user is a regular user' do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is a manager', role: :manager do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is an admin', role: :admin do
        it_behaves_like 'authorized user'
      end
    end
  end

  describe "PATCH /update" do
    subject { patch "/api/trips/#{trip.id}", params: parameters, headers: auth_headers, as: :json }

    let(:parameters) { { data: { type: 'trips', attributes: { destination: 'Osaka, JP' } } } }

    shared_examples 'authorized user' do
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
        let(:parameters) { invalid_attributes }

        it "renders a JSON response with errors for the trip" do
          subject
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
        end
      end
    end

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: current_user) }
      
      it_behaves_like 'authorized user'
    end

    context 'if Trip was created by another user' do
      let!(:trip) { create(:trip) }

      context 'and current user is a regular user' do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is a manager', role: :manager do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is an admin', role: :admin do
        it_behaves_like 'authorized user'
      end
    end
  end

  describe "DELETE /destroy" do
    subject { delete "/api/trips/#{trip.id}", headers: auth_headers, as: :json }

    shared_examples 'authorized user' do
      it "destroys the requested trip" do
        expect { subject }.to change { Trip.count }.by(-1)
          .and change { Trip.exists?(trip.id) }.from(true).to(false)
      end
    end

    context 'if Trip was created by current user' do
      let!(:trip) { create(:trip, user: current_user) }
      
      it_behaves_like 'authorized user'
    end

    context 'if Trip was created by another user' do
      let!(:trip) { create(:trip) }

      context 'and current user is a regular user' do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is a manager', role: :manager do
        it_behaves_like 'unauthorized user'
      end

      context 'and current user is an admin', role: :admin do
        it_behaves_like 'authorized user'
      end
    end
  end
end
