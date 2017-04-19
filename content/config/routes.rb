Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/datapost', :to => 'content#datapost', :constraint => {:format => :json}
  get '/dataget', :to => 'content#dataget'
end
