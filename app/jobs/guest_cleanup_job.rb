class GuestCleanupJob < ActiveJob::Base
  queue_as :default

  def perform(*args)
    # Do something later
  end

  class User < ActiveRecord::Base
    has_attached_file :avatar, styles: { small: '25x25#',
                                         medium: '50x50#',
                                         large: '200x200#' }, only_process: [:small]
    process_in_background :avatar, only_process: [:medium, :large]
  end
end
