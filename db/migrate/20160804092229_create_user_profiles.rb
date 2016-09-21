# comments
class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.belongs_to :user
      t.timestamps null: false
      t.string :name
      t.string :default_address
      t.belongs_to :image
    end
  end
end
