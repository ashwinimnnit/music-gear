# comments
class RecommendItem < ActiveRecord::Base
  attr_accessor :recommend_item, :recommend_items
  validates_uniqueness_of :item_id, scope: :recommend_item_id
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
    recommend_items item.recommend_items
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

  def self.recommended_item_mapping(params)
    response_array = []
    params[:parent_item].each do |parent|
      params[:recommended_item].each do |recommded|
        response_array << create(item_id: parent.to_i, recommend_item_id: recommded.to_i)
      end
    end
    response_array
  end

  def self.find_recommended_items(items)
    ids = items.map(&:id)
    list = ids.map(&:inspect).join(', ')
    item_recommended_item_mapping = where("item_id in (#{list})").order(:item_id)
    recommended_items_list = recommend_items(item_recommended_item_mapping)
    merge_item_recommended_items(items, item_recommended_item_mapping, recommended_items_list[0])
  end

  def self.merge_item_recommended_items(items, mapped_items, recommended_items)
    indexed_recommended_items = []
    recommended_items.each do |itm|
      indexed_recommended_items[itm.id] = itm
    end
    item_hash = {}
    items.each do |item|
      item = item.as_json
      item[:recommended_item] = map_recommended_items(item, mapped_items, indexed_recommended_items)
      item_hash[item['id']] = item
    end
    item_hash
  end

  def self.map_recommended_items(item, mapped_items, recommended_items)
    hash = {}
    mapped_items.each do |i|
      if item['id'].to_i == i.item_id
        hash[i.recommend_item_id] = recommended_items[i.recommend_item_id]
      end
    end
    hash
  end
end
