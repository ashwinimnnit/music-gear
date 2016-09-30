# comments
class CreateRecommendItems < ActiveRecord::Migration
  def change
    create_table :recommend_items do |t|
      t.integer  :item_id, null: false
      t.integer  :catagory_id
      t.integer  :recommend_item_id, null: false
      t.timestamps null: false
    end
  end
end
