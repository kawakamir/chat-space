
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|created_at|datetime|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups
- has_many :users


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false |
|email|string|null: false, unique: true |
|password|string|null: false |
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups, through: :group_users
- has_many :messages
- accepts_nested_attributes_for :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|

### Association
- has_many :users, through: :group_users
- has_many :messages
- accepts_nested_attributes_for :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


