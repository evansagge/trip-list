# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    create?
  end

  def create?
    user.admin? || user.manager?
  end

  def show?
    update?
  end

  def update?
    user.admin? || user.manager? || user.id == record.id
  end
end
