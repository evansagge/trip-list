# frozen_string_literal: true

require 'json_matchers/rspec'

JsonMatchers.schema_root = 'spec/support/api/schemas'

module JsonAPIHelpers
  def json
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include JsonAPIHelpers, type: :request
end
