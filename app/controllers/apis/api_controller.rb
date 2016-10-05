module Apis
  class ApiController < ApplicationController
    before_action :set_params_hash, if: :request_is_get?

    private

    def set_params_hash
      splitted_params = params[:params].split('/')
      Hash[splitted_params.each_slice(2).to_a].each do |key, value|
        params[key.to_sym] = value
      end
      params.delete('params')
    end

    def request_is_get?
      request.method == 'GET' && !params['params'].nil?
    end

    def except_params
      params.except(:action, :controller, :format)
    end
  end
end
