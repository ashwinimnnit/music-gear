class AddPhoneNumberIdToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :phone_number_id, :integer
  end
end
