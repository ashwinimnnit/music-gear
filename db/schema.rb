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

ActiveRecord::Schema.define(version: 20161215083735) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "house_no"
    t.string   "street"
    t.string   "city"
    t.string   "state"
    t.integer  "pin"
    t.integer  "user_profile_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "phone_number_id"
    t.string   "name"
  end

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "items", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_profile_id"
    t.integer  "catagory_id"
    t.integer  "price"
  end

  create_table "phone_numbers", force: :cascade do |t|
    t.integer  "contact_number", limit: 8
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "recommend_items", force: :cascade do |t|
    t.integer  "item_id",           null: false
    t.integer  "catagory_id"
    t.integer  "recommend_item_id", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "user_profiles", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name"
    t.string   "default_address"
    t.integer  "image_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "client"
    t.string   "accesstoken"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  create_table "users_phone_number", id: false, force: :cascade do |t|
    t.integer "user_profile_id"
    t.integer "phone_number_id"
  end

  add_index "users_phone_number", ["phone_number_id"], name: "index_users_phone_number_on_phone_number_id", using: :btree
  add_index "users_phone_number", ["user_profile_id", "phone_number_id"], name: "index_users_phone_number_on_user_profile_id_and_phone_number_id", unique: true, using: :btree
  add_index "users_phone_number", ["user_profile_id"], name: "index_users_phone_number_on_user_profile_id", using: :btree

end
