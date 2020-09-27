# frozen_string_literal: true

module API
  class ApplicationController < ::ApplicationController
    before_action :authenticate_and_set_user
    authorize :user, through: :current_user
  end
end
