# comments
class UserProfile < ActiveRecord::Base
  has_one :image, as: :imageable
  has_many :items
  has_many :addresses
  has_and_belongs_to_many :phone_numbers, join_table: :users_phone_number
end
