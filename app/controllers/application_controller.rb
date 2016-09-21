class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # skip_before_filter :verify_authenticity_token, if: :check_request
  protect_from_forgery with: :exception
  before_action :loggedin_user
  skip_before_action :verify_authenticity_token,
   if: Proc.new { |c| c.request.format.json? }

  private

  def loggedin_user
    # TODO: later it has to be current_user
    @logged_in_user = UserProfile.find_by_id(params[:id].to_i)
  end
end
