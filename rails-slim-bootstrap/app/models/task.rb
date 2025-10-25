class Task < ApplicationRecord
  # Enums
  enum status: { todo: 0, in_progress: 1, done: 2 }
  enum priority: { low: 0, medium: 1, high: 2 }

  # Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validates :status, presence: true
  validates :priority, presence: true
  validates :due_date, presence: true

  # Scopes
  scope :by_status, ->(status) { where(status: status) if status.present? }
  scope :by_priority, ->(priority) { where(priority: priority) if priority.present? }
  scope :recent, -> { order(created_at: :desc) }

  # Custom validation
  validate :due_date_cannot_be_in_the_past, on: :create

  private

  def due_date_cannot_be_in_the_past
    if due_date.present? && due_date < Date.today
      errors.add(:due_date, "can't be in the past")
    end
  end
end
