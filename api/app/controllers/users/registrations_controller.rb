# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    # before_action :configure_sign_in_params, only: [:create]

    # GET /resource/sign_in
    # def new
    #   super
    # end

    # POST /resource/sign_in
    def create
      build_resource(sign_up_params)

      resource.save!

      render_resource(resource)
    end

    # DELETE /resource/sign_out
    # def destroy
    #   super
    # end
  end
end
