Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', :to => 'container#root'
  post '/datapost', :to => 'container#datapost', :constraint => {:format => :json}
  get '/dataget', :to => 'container#dataget'
end
