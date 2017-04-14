# SPACORSRAILSSample

In this project we'll try to build a  sample architecture consisting of;
	- a container server,
	- a content server,
	- an SPA page.

The structure is and the algorithms are like that:

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


Use the same ```Gemfile``` for both container and content for the sake of simplicity:
```Ruby
gem 'haml'
gem 'haml-rails'
gem 'mysql2', '>= 0.3.18', '< 0.5'
```