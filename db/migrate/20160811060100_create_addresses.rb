class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :house_no
      t.string :street
      t.string :city
      t.string :state
      t.integer :pin
      t.belongs_to :user_profile
      t.timestamps null: false
    end
  end
end
