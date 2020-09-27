# frozen_string_literal: true

module API
  class TripsController < API::ApplicationController
    before_action :authorize_trip, only: [:show, :update, :destroy]

    # GET /trips
    def index
      trips = current_user.trips

      render_resource(trips)
    end

    # GET /trips/1
    def show
      render_resource(trip)
    end

    # POST /trips
    def create
      trip = current_user.trips.create!(trip_params)

      render_resource(trip, status: :created)
    end

    # PATCH/PUT /trips/1
    def update
      trip.update!(trip_params)

      render_resource(trip)
    end

    # DELETE /trips/1
    def destroy
      trip.destroy
      head :ok
    end

    private

    def authorize_trip
      authorize(trip)
    end

    def trip
      @trip ||= Trip.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def trip_params
      params.require(:trip).permit(:user_id, :destination, :start_date, :end_date, :comment)
    end

    def resource_serializer(_)
      TripSerializer
    end
  end
end
