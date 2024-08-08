Rails.application.routes.draw do
  resources :page
  root 'page#home' 
  post 'submit_contact', to: 'page#submit_contact'

end
