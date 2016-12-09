module Auth
  class UserSessionController < ApplicationController
    def user_login
      render json: {
        status: user_signed_in?
      }
    end
  end
end
