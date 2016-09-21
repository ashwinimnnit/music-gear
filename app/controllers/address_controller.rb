# comments
class AddressController < ApplicationController
  def index
    @user_profile = UserProfile.find_by_id(params[:user_profile_id])
    @user_addresses = @user_profile.addresses
  end

  def update
    address = Address.find_by_id(params[:id].to_i)
    response = address.update_attributes(address_params)
    flash[:notice] = if response
                       'Updated Successfully'
                     else
                       address.errors.full_messages[0]
                     end
    redirect_to action: :index, user_profile_id: address.user_profile_id
  end

  private

  def address_params
    params.require(:address).permit(:house_no, :street, :city, :state, :pin)
  end
end
