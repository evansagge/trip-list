# frozen_string_literal: true

_admin = User.create!(email: 'admin@example.com', role: :admin, password: 'Pass1234!', password_confirmation: 'Pass1234!')
_manager = User.create!(email: 'manager@example.com', role: :manager, password: 'Pass1234!', password_confirmation: 'Pass1234!')
_user = User.create!(email: 'user@example.com', password: 'Pass1234!', password_confirmation: 'Pass1234!')
