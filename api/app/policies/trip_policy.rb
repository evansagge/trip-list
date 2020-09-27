# frozen_string_literal: true

class TripPolicy < ApplicationPolicy

  def show?
    owns?
  end

  def update?
    owns?
  end

  def destroy?
    owns?
  end

  protected

  def owns?
    record.user_id == user.id
  end
end
