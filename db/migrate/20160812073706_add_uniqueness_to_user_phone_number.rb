class AddUniquenessToUserPhoneNumber < ActiveRecord::Migration
  def change
    add_index :users_phone_number, [:user_profile_id, :phone_number_id], unique: true
  end
end
