# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionPolicy::Controller
  include APIResponse
end
