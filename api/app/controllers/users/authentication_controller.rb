# frozen_string_literal: true

module Users
  class AuthenticationController < ApiGuard::AuthenticationController
    before_action :find_resource, only: [:create]
    before_action :authenticate_resource, only: [:destroy]

    def create
      if resource.authenticate(sign_in_params[:password])
        create_token_and_set_header(resource, resource_name)
        render_success(message: I18n.t('api_guard.authentication.signed_in'))
      else
        render_error(422, message: I18n.t('api_guard.authentication.invalid_login_credentials'))
      end
    end

    def destroy
      blacklist_token
      render_success(message: I18n.t('api_guard.authentication.signed_out'))
    end

    private

    def find_resource
      self.resource = resource_class.find_by(email: sign_in_params[:email].downcase.strip) if sign_in_params[:email].present?
      render_error(422, message: I18n.t('api_guard.authentication.invalid_login_credentials')) unless resource
    end

    def sign_in_params
      params.require(:user).permit(:email, :password)
    end

    def render_invalid_login_error
      render_error(
        JsonapiErrorsHandler::Errors::Invalid.new(
          errors: [:user, I18n.t('api_guard.authentication.invalid_login_credentials')]
        )
      )
    end
  end
end
