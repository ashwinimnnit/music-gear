# comments
class ItemsController < ApplicationController
  def index
    # later it has to be current_user
    @user_profile = UserProfile.find(params[:user_profile_id].to_i)
    @user_item = Item.user_item @user_profile
  end

  def new
    @item = Item.new
    # later it has to be current_user
    @user_profile = UserProfile.find_by_id(params[:user_profile_id])
    @address = Address.new
  end

  def show
    @item = Item.display_item(params)
  end

  def create
    # user_id later it has to be current_user
    @item = Item.new(items_params.merge(user_profile_id: params[:user_profile_id]))
    @address = Address.user_address params if params[:address]
    @response = {}
    if @item.save
      images = Image.item_image(params[:image], @item) if params[:image]
      @response[:item] = @item.as_json
      @response[:status] = 200
      @response = @response.merge(images)
    else
      @response[:status] = 500
      @response[:item] = @item.errors.full_messages
    end
  end

  def update
    @response = Item.update_user_item(params)
    render json: {
      msg: @response
    }
  end

  def search
    @search_response = Item.search_items(params[:query]) unless params[:query].empty?
  end

  private

  def items_params
    params.require(:item).permit(:title,
                                 :description,
                                 :catagory_id)
  end
end
