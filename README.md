# SPACORSRAILSSample

In this project we'll try to build a  sample architecture consisting of;
- a container API server, (the "container" rails application under this repo)
- a content API server, (the "content" rails application under this repo)
- an SPA page (which is also in the "container" rails application under this repo)
using Ruby on Rails and ReactJS. (ReactJS is not that relevant for our purpose.)

The algorithm is like that:

```mermaid
sequenceDiagram
	Browser -->> Container Server: Request for SPA Page
	Container Server -->> Container Server: Generate a dummy user id (via rails' controller)
	Container Server -->> Container Server: Generate a dummy HTML page (via rails' view)
	Container Server -->> Container Server: Generate and add the Application.js  
	Container Server -->> Browser: SPA Page served
	Browser -->> JavaScript OnLoad Event: Fire
	JavaScript OnLoad Event -->> Container Server: Request some data (format JSON)
	Container Server -->> JavaScript OnLoad Event: Data Served
	JavaScript OnLoad Event -->> JavaScript OnLoad Event: Save user_id part of data to the local storage
	JavaScript OnLoad Event -->> JavaScript OnLoad Event: Update container div content
	JavaScript OnLoad Event -->> Content Server: Request some other data
	Content Server -->> JavaScript OnLoad Event: Server some JSON Data
	JavaScript OnLoad Event -->> JavaScript OnLoad Event: Update content div content
```
![alt tag](readme_images/SequenceDiagram.jpg)



Rails and React Arrangements for Container Application:
=======================================================
The newly added gems to ```Gemfile``` are as follows:
```Ruby
gem 'haml'
gem 'haml-rails'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'react-rails'
gem 'bootstrap-sass'
gem 'autoprefixer-rails'
```
Do not forget to install the gems.
```Ruby
bundle install
```
Add a controller to serve the container page and also the to serve the request for JSON data:
```Ruby
cd container/
rails g controller container
```
We'll have 3 routes. First one is the main container page. The other two are responding API's for the requests that are coming from JavaSciript code of the main container page.

```Ruby
  get '/', :to => 'container#root'
  post '/datapost', :to => 'container#datapost', :constraint => {:format => :json}
  get '/dataget', :to => 'container#dataget'
```
```Ruby
rake routes
```


In the directory ```app/assets``` generate a new file named ```usagesample.js``` which will be the main entrance point for our client side codes (by calling ```window.onload``` function). Since we need the page first be loaded, will modify the eventhandler:
```JavaScript
window.onload
```

We'll skip request forgery control for only the JSON data post action at container side. The related text that Rails documentation provides is as follows:

Source [here](http://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection.html):
```
...
We may want to disable CSRF protection for APIs since they are typically designed to be state-less. That is, the request API client will handle the session for you instead of Rails.
...
```


```app/container/controllers/container_controller.rb```:
```Ruby
	skip_before_action :verify_authenticity_token, only: [:datapost]
```

Optional 1 React
--------

In the file ```app/assets/javascripts/application.js``` add following lines to include ReactJS support:
```JavaScript
//= require react
//= require react_ujs
```

Run following command to include new react items:
```Ruby
rails g react:install
```
*The most important property is after you do this, you can generate react components in ```.jsx``` files.* For a good explanation of usage, visit: https://github.com/reactjs/react-rails/blob/master/README.md#use-with-asset-pipeline.



Add following component class definitions:
```container/app/assets/javascripts/components/container.jsx```
```JavaScript
class Container extends React.Component {
  render() {
    return <div><i>{this.props.kaplancustomtext}</i></div>    
  }
}
```
```container/app/assets/javascripts/components/content.jsx```
```JavaScript
class Content extends React.Component {
  render() {
    return <div><i>{this.props.kaplancustomtext}</i></div>    
  }
}
```
*At the server*, to add an instance of a react component, in view side you can use:
```haml
= react_component("Container", {kaplancustomtext: "Container: this text is coming from root.html.haml"})

= react_component("Content", {kaplancustomtext: "Content: this text is coming from root.html.haml"})
```

*At the client*, React objects can be generated like, sending props as ```kaplancustomtext``` and adding components to HTML elements by finding the elements from document:
```JavaScript
			ReactDOM.render(React.createElement(Container, {kaplancustomtext: "This text is coming from usagesample.js: " + l_text_to_add}), 
				document.getElementById("containerreact2")
			);
```

Optional 2 Bootstrap
--------
A good description is here: https://launchschool.com/blog/integrating-rails-and-bootstrap-part-1

We'll follow it, with respect to our purpose:

- Rename ```app/assets/stylesheets/application.css``` to ```app/assets/stylesheets/application.css.sass```
- Add following to ```app/assets/stylesheets/application.css.sass```:
```css
@import "bootstrap-sprockets";
@import "bootstrap";
```
- Include following line to ```app/assets/javascripts/application.js```, somewhere **after*** ```//= require jquery``` and ```//= require_tree .``` **must be the last line**.
```JavaScript
//= require jquery
...
//= require bootstrap-sprockets
...
//= require_tree .
```

- Place your CSS and JS files to related app/assets directories.

At this point the most important thing to know is, by adding bootstrap html templates to your ReactDOM, you can enjoy bootstrap appearances.

One final note about Bootstrap CSS classes. HTML elements are mapped to CSS classes by adding ```class``` attribute to elements. The most commonly used ones are for, ```div```; ```container```,```row```, ```col-XXXXXX```. And also exists special classes for tables, buttons, etc...


Rails and React Arrangements for Client Application:
====================================================

The newly added gems to ```Gemfile``` are as follows:
```Ruby
gem 'rack-cors'
```
Do not forget to install the gems.
```Ruby
bundle install
```
Add a controller to serve the container page and also the to serve the request for JSON data:
```Ruby
cd content/
rails g controller content
```

We'll have 2 routes. They are going to be responsible for GET and POST requests coming from the main container page. 

```Ruby
  post '/datapost', :to => 'content#datapost', :constraint => {:format => :json}
  get '/dataget', :to => 'contet#dataget'
```

```Ruby
rake routes
```
Allow the incoming CORS requests with the help of ```rack-cors``` gem, by configuring file ```config/initializers/cors.rb```:

```Ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000'
    resource '*',
      headers: :any,
      methods: %i(get post put patch delete options head)
  end
end
```
*Above code only allows requests that are originated by the javascript codes that are originally served to browser by localhost:3000. For security reasons do not allow every url if possible. As a principle, always try to allow only known sites!*
**So modify your configuration of "origins" above accordingly.**
