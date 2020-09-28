# frozen_string_literal: true

Rails.application.routes.draw do
  api_guard_routes for: :users, controller: {
    registration: 'users/registration',
    authentication: 'users/authentication',
    passwords: 'users/passwords',
    tokens: 'users/tokens'
  }

  namespace :api do
    resources :trips
    resources :users
  end
end
