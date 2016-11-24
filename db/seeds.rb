# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
  UserProfile.create(user_id: 1, name: "scott", default_address: "baner pune", image_id: 1)
  UserProfile.create(user_id: 2, name: "ashwini", default_address: "mumbai", image_id: 2)
  UserProfile.create(user_id: 3, name: "tiger", default_address: "delhi", image_id: 3)
