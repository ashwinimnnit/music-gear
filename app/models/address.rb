# comments
class Address < ActiveRecord::Base
  belongs_to :user_profile, dependent: :destroy
  validates :pin, numericality: { only_integer: true }
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
end
