# comments
class Address < ActiveRecord::Base
  belongs_to :user_profile, dependent: :destroy
  validates :pin, numericality: { only_integer: true }
  belongs_to :phone_number
  def self.user_address(param)
    user_profile = UserProfile.find_by_id(param[:user_profile_id])
    create(
      user_profile: user_profile,
      house_no: param[:address][:house_num],
      street: param[:address][:street],
      city: param[:address][:city],
      phone_number: param[:address][:phone_num]
    )
  end

  def self.user_phone_number(user_addresses)
    user_address_with_number = {}
    @count = 1
    user_addresses.each do |address|
      temp = {}
      temp = address.as_json
      user_contact_number = address.phone_number.contact_number
      temp["phone_number"] = user_contact_number
      user_address_with_number[@count] = temp
      @count += 1
    end
    user_address_with_number
  end

  def self.update_address(params)
    address = params.to_hash
    id = params[:user_id]
    phone = params[:phone]
    address.delete("user_id")
    address.delete("phone")
    user_address = find_by_id(id)
    if user_address
      user_address.update_attributes(address)
      phone = PhoneNumber.update_user_phone_number(params[:user_id], params[:phone])
    end
    user_address
  end
end
