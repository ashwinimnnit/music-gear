Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with 'rake routes'.

  # You can have the root of your site routed with 'root'
  # root 'welcome#index'
   
    get '/user_login' => "auth/user_session#user_login"
    resources :user_profile do
      resources :items
      resources :address
    end
    post '/search' => 'items#search'
    resources :address
    resources :user_profile do
      resources :items do
        resources :image
      end
    end
   resources :items do
     resources :recommended_item
   end

   post ":controller(/:action(/*params))", controller: /apis\/[^\/]+/
   get ":controller(/:action(/*params))", controller: /apis\/[^\/]+/
   put ":controller(/:action(/*params))", controller: /apis\/[^\/]+/
   patch ":controller(/:action(/*params))", controller: /apis\/[^\/]+/
   delete ":controller(/:action(/*params))", controller: /apis\/[^\/]+/
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
