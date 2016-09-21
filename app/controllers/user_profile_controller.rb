# comments
class UserProfileController < ApplicationController
  before_filter :current_user, only: [:show, :edit, :update]
  # execute current_user before add_members

  def show
  end

  def edit
  end

  def update
    if params['image']
      image = Image.user_profile_image params['image'], @user_profile
      update_record = profile_params.merge(image_id: image)
    else
      update_record = profile_params
    end
    PhoneNumber.update_userphonenumber(@user_profile, params[:contact_number])
    @user_profile.update(update_record)
    redirect_to(action: 'show')
  end

  private

  def current_user
    # TODO: later it has to be current user
    @user_profile = UserProfile.find(params[:id])
  end

  # Never trust parameters from the scary internet,
  # only allow the white list through.
  def profile_params
    params.require(:user_profile).permit(:name,
                                         :contact_number,
                                         :default_address,
                                         :imageable)
  end
end
