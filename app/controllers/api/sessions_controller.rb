class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by!(user_params)
    if @user.is_password?(params["user"]["password"])
      @user.reset_token()
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:username)
  end

end