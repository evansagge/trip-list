# frozen_string_literal: true

class ApplicationController < ActionController::API

  respond_to :json

  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
  rescue_from ActiveModel::ValidationError, with: :handle_validation_error

  protected

  def render_resource(resource, status: :ok)
    render json: serialized_resource(resource), status: status
  end

  def serialized_resource(resource)
    resource_serializer(resource).new(resource)
  end

  def resource_serializer(resource)
    "#{resource.class.name}Serializer".safe_constantize
  end

  def handle_validation_error(error)
    error_model = error.try(:model) || error.try(:record)
    mapped = JsonapiErrorsHandler::Errors::Invalid.new(errors: error_model.errors)
    render_error(mapped)
  end

  def render_error(error)
    render json: ::JsonapiErrorsHandler::ErrorSerializer.new(error), status: error.status
  end
end
