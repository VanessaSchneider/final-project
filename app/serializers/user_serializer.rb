class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest

  has_one :task
  has_many :riddles
  has_many :words
end

