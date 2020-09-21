module API
  class TripsController < API::ApplicationController
    before_action :set_trip, only: [:show, :update, :destroy]

    # GET /trips
    def index
      @trips = Trip.all

      render_resource(@trips)
    end

    # GET /trips/1
    def show
      render_resource(@trip)
    end

    # POST /trips
    def create
      @trip = Trip.create!(trip_params)

      render_resource(@trip, status: :created)
    end

    # PATCH/PUT /trips/1
    def update
      @trip.update!(trip_params)

      render_resource(@trip)
    end

    # DELETE /trips/1
    def destroy
      @trip.destroy
      head :ok
    end

    private
      # Use callbacks to share common setup or constraints between actions.
    def set_trip
      @trip = Trip.find(params[:id])
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
