# comments
class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.timestamps :borrowed_on
      t.belongs_to :user_profile
      t.integer :catagory_id
      t.integer :price
      t.timestamps null: false
    end
  end
end
