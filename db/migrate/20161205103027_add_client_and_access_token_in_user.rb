class AddClientAndAccessTokenInUser < ActiveRecord::Migration
  def change
    add_column :users, :client, :string
    add_column :users, :access_token, :string
  end
end
