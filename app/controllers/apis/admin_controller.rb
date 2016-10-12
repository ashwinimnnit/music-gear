module Apis
  class AdminController < ApiController
    def map_recommended_items
      @mapped_item_list = RecommendItem.recommended_item_mapping except_params
    end
  end
end
