# comments
class AddAttachmentToImage < ActiveRecord::Migration
  def change
    add_attachment :images, :picture
  end
end
