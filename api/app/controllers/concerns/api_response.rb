# frozen_string_literal: true

module APIResponse
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActiveModel::ValidationError, with: :handle_validation_error
    rescue_from Pundit::NotAuthorizedError, with: :handle_unauthorized_error
  end

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
    render_jsonapi_error(mapped)
  end

  def handle_unauthorized_error(error)
    render_jsonapi_error(JsonapiErrorsHandler::Errors::Forbidden.new)
  end

  def render_jsonapi_error(error, status: nil)
    render json: JsonapiErrorsHandler::ErrorSerializer.new(error), status: status || error.status
  end
end
