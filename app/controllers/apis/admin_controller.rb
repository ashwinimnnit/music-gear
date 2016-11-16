module Apis
  class AdminController < ApiController
    def map_recommended_items
      @mapped_item_list = RecommendItem.recommended_item_mapping except_params
    end

    def api_one
      sleep(5)
      render json: {
        api_one: 'api one'
      }
    end

    def api_two
      render json: {
        api_two: 'api two'
      }
    end

    def api_three
      sleep(8)
      render json: {
        api_three: 'api three'
      }
    end

    def ajax_one
      sleep(13)
      render json: {
        ajax_one: 'ajax one'
      }
    end

    def ajax_two
      render json: {
        ajax_two: 'ajax_two'
      }
    end

    def ajax_three
      sleep(5)
      render json: {
        ajax_three: 'ajax three'
      }
    end
  end
end
