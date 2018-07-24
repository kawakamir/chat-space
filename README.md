# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|created_at|datetime|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups, through: :group_users
- has_many :users, through: :group_users
- accepts_nested_attributes_for :group_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false |
|email|string|null: false, unique: true |
|created_at|datetime|null: false|
|updated_at|datetime| |
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups, through: :group_users
- has_many :messages
- accepts_nested_attributes_for :group_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- has_many :users, through: :group_users
- has_many :messages
- accepts_nested_attributes_for :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
