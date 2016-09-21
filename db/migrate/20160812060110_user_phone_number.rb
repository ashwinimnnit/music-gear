class UserPhoneNumber < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.bigint :contact_number
      t.timestamps null: false
    end

    create_table :users_phone_number, id: false do |t|
      t.belongs_to :user_profile, index: true
      t.belongs_to :phone_number, index: true
    end
  end
end
