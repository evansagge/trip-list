module API
  class ApplicationController < ::ApplicationController
    before_action :authenticate_and_set_user
  end
end
