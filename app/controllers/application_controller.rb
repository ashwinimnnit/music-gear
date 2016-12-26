class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # skip_before_filter :authenticate_user!, if: :signup
  protect_from_forgery with: :exception
  #before_action :loggedin_user
  before_action :authenticate_user!, unless: :devise_controller?
  skip_before_action :verify_authenticity_token,
  if: Proc.new { |c| c.request.format.json? }

  private

  def loggedin_user
    # TODO: later it has to be current_user
    @logged_in_user = UserProfile.find_by_id(params[:id].to_i)
  end

  def authenticate_user!
    p "=====accesstoken is ----------------> #{request.headers['accesstoken']}, client---> #{request.headers['client']} , uid---->   #{request.headers['uid']}"
    super
  end
end
