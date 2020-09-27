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
    let!(:trip) { create(:trip, user: user) }

    subject {  get '/api/trips', headers: valid_headers, as: :json }

    it "renders a successful response" do
      subject
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /api/trips/:id" do
    let!(:trip) { create(:trip, user: user) }
    
    subject { get "/api/trips/#{trip.id}", headers: valid_headers, as: :json }

    it "renders a successful response" do
      subject
      expect(response).to have_http_status(:success)
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

      it "creates a new Trip" do
        expect { subject  }.to change(Trip, :count).by(1)
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

  describe "PATCH /update" do
    let!(:trip) { create(:trip, user: user) }

    context "with valid parameters" do
      subject do
        patch "/api/trips/#{trip.id}",
              params: { trip: new_attributes }, 
              headers: valid_headers, 
              as: :json
      end

      let(:new_attributes) do
        {
          destination: 'Osaka, JP'
        }
      end

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
      subject do
        patch "/api/trips/#{trip.id}",
              params: { trip: invalid_attributes }, 
              headers: valid_headers, 
              as: :json
      end

      it "renders a JSON response with errors for the trip" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    let!(:trip) { create(:trip, user: user) }

    it "destroys the requested trip" do
      expect {
        delete "/api/trips/#{trip.id}", headers: valid_headers, as: :json
      }.to change(Trip, :count).by(-1)
    end
  end
end
