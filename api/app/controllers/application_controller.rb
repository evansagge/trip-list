# frozen_string_literal: true

class ApplicationController < ActionController::API
  include APIResponse
  include Pundit
end
