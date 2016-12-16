module Auth
  class UserSessionController < ApplicationController
  	#skip_before_filter :authenticate_user!
    def user_login
    	#debugger
      render json: {
        status: user_signed_in?
      }
    end
  end
end
