# commentss
class Item < ActiveRecord::Base
  has_many :images, as: :imageable
  belongs_to :user_profile
  has_many :recommend_items, class_name: 'RecommendItem', dependent: :destroy,
                             foreign_key: 'item_id'
  validates :title, :description, presence: true
  def self.display_item(param)
    response = {}
    temp = {}
    item = find_by_id(param[:id].to_i)
    unless item.nil?
    item_images = item.images
      item_images.each do |img|
        temp[img.id] = "/system/#{img.imageable_type.downcase}/#{img.class.name.downcase.pluralize }/#{img.id}/medium/#{img.picture_file_name}"
      end
    end
    response[:item] = item.as_json
    response[:item][:image] = temp unless response[:item].nil?
    response[:item]
  end

  def self.user_item(user_profile)
    user_items = Item
                 .includes(:images)
                 .where("items.user_profile_id=#{user_profile.id}")
    items_list = {}
    user_items.each do |i|
      items_list[i.id] = i.as_json
      temp = {}
      thumbnail = {}
      i.images.each do |img|
        # /system/item/21/medium/guitar1.jpeg
        temp[img.id] = "/system/#{img.imageable_type.downcase}/#{img.class.name.downcase.pluralize }/#{img.id}/medium/#{img.picture_file_name}"  #path.picture.url(:medium)
        thumbnail[img.id] = "/system/#{img.imageable_type.downcase}/#{img.class.name.downcase.pluralize }/#{img.id}/thumb/#{img.picture_file_name}" #img.picture.url(:thumb)
      end
      items_list[i.id][:images] = temp
      items_list[i.id][:thumbnail] = thumbnail
    end
    items_list
  end

  def self.update_user_item(param)
    response = {}
    item = find_by_id(param[:id].to_i)
    item.update(param[:item].as_json)
    response[:item] = item.as_json
    image_url = update_item_image(param[:image], item)
    response[:item][:images] = image_url[:image]
    response[:item][:thumbnail] = image_url[:thumbnail]
    response
  end

  def self.update_item_image(new_images, item)
    if new_images
      new_images.to_hash.each do |id, img|
        Image.update(id.to_i, picture: img)
      end
    end
    extract_image_url(item)
  end

  def self.extract_image_url(item)
    image_path = {}
    image_path[:image] = {}
    image_path[:thumbnail] = {}
    item.images.each do |img|
      image_path[:image][img.id] = img.picture.url(:medium)
      image_path[:thumbnail][img.id] = img.picture.url(:thumb)
    end
    image_path
  end

  def self.search_items(query)
    item = {}
    index = 1
    Item.where('title LIKE :query', query: "#{query}%").each do |i|
      temp = {}
      temp[:id] = i.id
      temp[:title] = i.title
      item[index] = temp
      index += 1
    end
  end

  def self.dynamic_sql_statement(columns_name = [])
    size = columns_name.size
    statement = ''
    columns_name.each_with_index do |i, index|
      statement += i
      statement += ', ' unless size - 1 == index
    end
    statement
  end

  def self.item_listing(params)
    offset = params[:offset].to_i
    limit = params[:limit].to_i ||= 5
    statement = dynamic_sql_statement(params.except(:offset, :limit).values)
    items = Item.select(statement).offset(offset).limit(limit)
    RecommendItem.find_recommended_items items
  end
end
