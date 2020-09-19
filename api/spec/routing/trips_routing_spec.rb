require "rails_helper"

RSpec.describe "/api/trips", type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/trips").to route_to("api/trips#index")
    end

    it "routes to #show" do
      expect(get: "/api/trips/1").to route_to("api/trips#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/api/trips").to route_to("api/trips#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/trips/1").to route_to("api/trips#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/trips/1").to route_to("api/trips#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/trips/1").to route_to("api/trips#destroy", id: "1")
    end
  end
end
