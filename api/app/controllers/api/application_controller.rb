# frozen_string_literal: true

module API
  class ApplicationController < ::ApplicationController
    include Pundit
    before_action :authenticate_and_set_user
  end
end
