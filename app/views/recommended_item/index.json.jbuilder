hash = {}
index = 1
unless @recommended_items.nil?
  @recommended_items.each do |item|
    hash[index] = item.as_json.extract!('id', 'title', 'price')
    hash[index][:images] = @item_images[item.id]
    index += 1
  end
end
json.recommended_itmes(hash)
