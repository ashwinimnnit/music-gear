# comments
class Image < ActiveRecord::Base
  has_attached_file :picture, styles: { medium: '300x300>', thumb: '100x100>' },
                              default_url: '/images/:style/missing.png',
                              path: 'public/system/:custom_class/:id/:style/:filename',
                              url: '/system/:custom_class/:id/:style/:basename.:extension'
  validates_attachment_content_type :picture, content_type: %r{\Aimage\/.*\Z}

  belongs_to :imageable, polymorphic: true

  Paperclip.interpolates :custom_class do |attachment, style|
    attachment.instance.imageable.class.to_s.downcase
  end

  def self.user_profile_image(image, user_profile)
    user_image = where("imageable_id = #{user_profile.id}
                        AND imageable_type = 'UserProfile'").first
    if user_image
      user_image.update_attribute('picture', image)
    else
      create(imageable: user_profile, picture: image)
    end
  end

  def self.item_image(image, item)
    created_image = {}
    created_image[:image] = {}
    created_image[:thumbnail] = {}
    item_image = where("imageable_id = #{item.id}
                        AND imageable_type = 'Item'")
    if item_image.empty?
      image.each do |img|
        temp = create(imageable: item, picture: img)
        created_image[:image][temp.id] = temp.picture.url(:medium)
        created_image[:thumbnail][temp.id] = temp.picture.url(:thumb)
      end
    end
    created_image
  end
end
