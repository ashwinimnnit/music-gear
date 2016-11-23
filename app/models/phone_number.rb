# comments
class PhoneNumber < ActiveRecord::Base
  has_and_belongs_to_many :user_profiles, join_table: :users_phone_number
  has_many :addresses # a phone number can be used in many addresses
  validates :contact_number, presence: true
  def self.update_userphonenumber(user_profile, contacts)
    user_numbers = user_profile.phone_numbers.collect(&:contact_number)
    contacts.each do |id, num|
      phone_number = find_by_id(id)
      unless user_numbers.include? num.to_i
        phone_number.update_attributes(contact_number: num)
      end
    end
  end

  def self.update_user_phone_number(user_id, phone)
    query = "select phone_number_id from users_phone_number where user_profile_id =  #{user_id}"
    records_array = ActiveRecord::Base.connection.exec_query(query).to_hash
    unless records_array.empty?

    end
  end
end
