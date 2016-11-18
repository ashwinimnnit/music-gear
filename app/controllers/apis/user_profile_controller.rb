module Apis
  class UserProfileController < ApiController
    def index
      render json: {
      	msg: "hello"
      }
    end
  end
end
