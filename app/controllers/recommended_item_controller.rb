class RecommendedItemController < ApplicationController
  def index
    @recommended_items, @item_images = RecommendItem.find_item(params)
  end
end
