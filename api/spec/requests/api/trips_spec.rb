require 'rails_helper'

RSpec.describe "/api/trips", type: :request do
  let!(:user) { create(:user) }

  let(:valid_attributes) {
    attributes_for(:trip).merge(user_id: user.id)
  }

  let(:invalid_attributes) {
    valid_attributes.merge(destination: nil)
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # TripsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /api/trips" do
    let!(:trip) { create(:trip, user: user) }

    it "renders a successful response" do
      get '/api/trips', headers: valid_headers, as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /api/trips/:id" do
    let!(:trip) { create(:trip, user: user) }

    it "renders a successful response" do
      get "/api/trips/#{trip.id}", as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Trip" do
        expect {
          post '/api/trips',
               params: { trip: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Trip, :count).by(1)
      end

      it "renders a JSON response with the new trip" do
        post '/api/trips',
             params: { trip: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/vnd.api+json; charset=utf-8"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Trip" do
        expect {
          post '/api/trips',
               params: { trip: invalid_attributes }, as: :json
        }.to change(Trip, :count).by(0)
      end

      it "renders a JSON response with errors for the new trip" do
        post '/api/trips',
             params: { trip: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    let!(:trip) { create(:trip, user: user) }

    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested trip" do
        patch "/api/trips/#{trip.id}",
              params: { trip: invalid_attributes }, headers: valid_headers, as: :json
        trip.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the trip" do
        patch "/api/trips/#{trip.id}",
              params: { trip: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/vnd.api+json; charset=utf-8")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the trip" do
        patch "/api/trips/#{trip.id}",
              params: { trip: invalid_attributes }, headers: valid_headers, as: :json
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
