module Apis
  class UserAddressController < ApiController
    def update_user_address
      @user_address = Address.update_address params[:updated_address]
    end
  end
end
