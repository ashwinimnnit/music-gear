# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161122094018) do

  create_table "addresses", force: :cascade do |t|
    t.string   "house_no",        limit: 255
    t.string   "street",          limit: 255
    t.string   "city",            limit: 255
    t.string   "state",           limit: 255
    t.integer  "user_profile_id", limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "pin",             limit: 4
    t.integer  "phone_number_id", limit: 4
    t.string   "name",            limit: 255
  end

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id",         limit: 4
    t.string   "imageable_type",       limit: 255
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "picture_file_name",    limit: 255
    t.string   "picture_content_type", limit: 255
    t.integer  "picture_file_size",    limit: 4
    t.datetime "picture_updated_at"
  end

  create_table "items", force: :cascade do |t|
    t.string   "title",           limit: 255
    t.string   "description",     limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "user_profile_id", limit: 4
    t.integer  "catagory_id",     limit: 4
    t.integer  "price",           limit: 4
  end

  create_table "phone_numbers", force: :cascade do |t|
    t.integer  "contact_number", limit: 8
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "recommend_items", force: :cascade do |t|
    t.integer  "item_id",           limit: 4, null: false
    t.integer  "catagory_id",       limit: 4
    t.integer  "recommend_item_id", limit: 4, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "user_profiles", force: :cascade do |t|
    t.integer  "user_id",         limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "name",            limit: 255
    t.string   "default_address", limit: 255
    t.integer  "image_id",        limit: 4
  end

  create_table "users_phone_number", id: false, force: :cascade do |t|
    t.integer "user_profile_id", limit: 4
    t.integer "phone_number_id", limit: 4
  end

  add_index "users_phone_number", ["phone_number_id"], name: "index_users_phone_number_on_phone_number_id", using: :btree
  add_index "users_phone_number", ["user_profile_id", "phone_number_id"], name: "index_users_phone_number_on_user_profile_id_and_phone_number_id", unique: true, using: :btree
  add_index "users_phone_number", ["user_profile_id"], name: "index_users_phone_number_on_user_profile_id", using: :btree

end
