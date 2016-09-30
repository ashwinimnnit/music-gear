# comments
class RecommendItem < ActiveRecord::Base
  attr_accessor :recommend_item, :recommend_items
  belongs_to :item

  def recommend_item
    Item.find_by_id(recommend_item_id)
  end

  def self.recommend_items(itemlist)
    ids = itemlist.map(&:recommend_item_id)
    list = ids.map(&:inspect).join(', ')
    unless list.empty?
      item = Item.where("id in (#{list})")
      item_images = find_item_images(item)
    end
    [item, item_images]
  end

  def self.find_item(param)
    item = Item.find_by_id(param[:item_id])
    recommend_items item.recommend_items_mapping
  end

  def self.find_item_images(items)
    item_images = {}
    item_ids = items.map(&:id)
    item_ids.each do |i|
      item_images[i] = {}
    end
    list = item_ids.map(&:inspect).join(', ')
    images = Image.where("imageable_id in (#{list}) and imageable_type = 'Item'")
    images.each do |img|
      item_images[img.imageable_id][img.id] = "/system/#{img.imageable_type.downcase}/#{img.id}/medium/#{img.picture_file_name}"
    end
    item_images
  end
end
