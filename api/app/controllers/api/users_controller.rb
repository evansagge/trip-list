# frozen_string_literal: true

module API
  class UsersController < API::ApplicationController
    before_action :authorize_user

    # GET /users
    def index
      users = User.all

      render_resource(users)
    end

    # GET /users/1
    def show
      render_resource(user)
    end

    # POST /users
    def create
      user = User.create!(
        user_params.merge(
          password_confirmation: user_params[:password]
        )
      )

      render_resource(user, status: :created)
    end

    # PATCH/PUT /users/1
    def update
      user.update!(user_params)

      render_resource(user)
    end

    # DELETE /users/1
    def destroy
      user.destroy
      head :ok
    end

    private

    def authorize_user
      authorize(params[:id] ? user : User)
    end

    def user
      @user ||= User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.from_jsonapi.require(:user).permit(:email, :password)
    end

    def resource_serializer(_)
      UserSerializer
    end
  end
end
