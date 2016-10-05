module Apis
  class ItemsController < ApiController
    def index
      @items = Item.item_listing(except_params)
    end
  end
end
