# frozen_string_literal: true

module Users
  class RegistrationController < ApiGuard::RegistrationController
    include APIResponse

    before_action :authenticate_resource, only: [:destroy]

    def create
      init_resource(sign_up_params)

      resource.save!

      create_token_and_set_header(resource, resource_name)

      render_resource(resource)
    end

    def destroy
      current_resource.destroy
      render_success(message: I18n.t('api_guard.registration.account_deleted'))
    end

    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end
