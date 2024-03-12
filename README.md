[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14123143&assignment_repo_type=AssignmentRepo)
# 320-Final-Project


********************* README updated *************************
- the public facing url: Firebase : https://journal-app-ca1c5.web.app/
HomeMadeFood App Summary:
  The HomeMadeFood app caters to individuals living away from home, longing for the comfort and nourishment of homemade meals. Our platform bridges this gap by connecting those craving homemade goodness with skilled home cooks eager to share their culinary creations and earn income from the comfort of their own kitchens.

Project Flow:
* Registering a Kitchen:
  Users can click on "Register Kitchen" and proceed to login.
  Upon login, the kitchen registration form will appear, allowing users to add details about their kitchen.
  After completing the registration, kitchen owners can add items to their menu.
  Users can view the menu by clicking on "Menu" and sign out when done.

* Managing Kitchen:
  Registered kitchen owners can easily update their menu by adding more items.
  They can view incoming orders in the order tab, update order statuses, and delete orders once delivered.
  
* Ordering Process:
  Customers can select a kitchen and browse its menu.
  They can select items they wish to order and add them to their cart.
  Upon checkout, customers are prompted to login and provide their shipping address.
  After submission, customers can view their order status.
  
* Returning Customers:
  Returning customers can easily view their order status by clicking on "Orders" in the navigation bar from the home page.
External Libraries: Bootstrap, Firebase
The answers to the following questions Fill out each of these with a few sentences (50 characters minimum):
  - What worked well in this project (what was easy/straightforward)?
    * The idea of getting the kitchen -> displaying menu -> add to cart -> shopping cart
    featues worked very well. Took me a day as those logics were already implemented in previous assignments, which made it little straight forward for me to implement. 
    * Building the database structure was easy for me as I have background in relational databases , so building a database architecture with the idea of connecting one collection to other and building "one to one" or "one to many relationships"

  - What didn't work well (what was difficult to understand or parse)?
    * With a background in relational databases and working on non-relational database was little difficult to understand. Considering collections as tables and fields as columns and data as rows. It took me some time to get used to object based collections and documents.
    * In addition to this, figuring out the syntax to query data with where clause was difficult. Had to do lot of google, chatgpt, stack overflow. So utilized all these resources to implement the queries to show orders for particular kitchen user in dashboard and showing menu for paticular kicthen in homepage.
    * Have to figure out --force thing in workflows, flowing the directions mentioned in debugging done by james.


  - What changes would you make to this project now that it's deployed?
    * The changes that I would do in the current deployed project is that currently one customer can only order once at a time from the app. If he visits again and tries to order again the shopping cart  show previous order until it is completed and delivered. Will be working on it more to allow customer to order from other kitchens too even if he has ordered from a kitchen before.
    * In order to think about the app with larger scope and thinking about in practical. The database architecture has to be little more complex. Will utilize the skills that we will learn in backend course. To make it more flexible and user friendly.

  - What would you improve and/or add to this project now that it's deployed?"
    * Sending email as well to let kitchen admin if he has an order or to the customer if there is a change in the status of his order.
    * Getting reviews from the customer. To let users differentiate which kitchen is liked more by people.
    * The payment portal integration. As it is an ecommerce app it should have that feature.
    * The other feature that I want to add is the spatial search feature( autocomplete address field) in the address input field in the shopping cart page. As it should be a proper address that actually exist if we think about the application practically. I have implemented that feature before using python Django. So have to figure out to implement in Reactjs or nodejs ( third course scope)
    * The tracking of delivery person who is on his way to deliver on a map. That would be the most challenging one for me. 

Documentation on how to run tests:
On command line run: npm run test
There is one test on component KitchenRegister. By using dummy kitchen register user object. It checks whether the screen shows loading... before it shows the forms or retrieves the data from firebase.

Project requirements:

- Application is functional and provides an experience to the user
  - Your app runs and a user can interact with it to do something. Very open ended what this will be like. Use your creativity to make something fun!
- Application uses routes
  - App must include at least two routes, ideally one that takes params to call API data, but at minimum loads two or more routes in your Single Page Application. React Router strongly encouraged.
- Fetches external API
  - Whether an api you have created (like a firebase collection, or similar), or a published API, but it must pull data from an external source. **Must use the native fetch api.** No external libraries for data fetching (like axios or react-query). **EXCEPTION**: Can use Firebase SDK if you are using a Firebase App
- Application is deployed
  - Deployed and visible to the public. GitHub Pages, Vercel, Firebase, etc
- Submitted to GitHub properly
  - All work done on a feature branch and merged into the main branch
- Utilizes reusable components
  - As needed components will be flexible and reusable
- Uses prop-types
  - All components that take in props must use prop-types, no generic proptypes, they must be specific. For example, if it takes an array of data, it must be detailed to what that array of data looks like, not just a general array
- README updated
  - README updated to include:
  - the public facing url
  - a brief summary of your project
  - The answers to the following questions Fill out each of these with a few sentences (50 characters minimum):
  - What worked well in this project (what was easy/straightforward)?
  - What didn't work well (what was difficult to understand or parse)?
  - What changes would you make to this project now that it's deployed?
  - What would you improve and/or add to this project now that it's deployed?"
- Incorporates unit testing
  - At least one unit test must be included and working. Components reliant on api calls will not need to be unit tested, but anything that just relies on props will be easy to test. Must document how to run tests
- Utilzes Modern JavaScript
  - Utilizes modern methods of writing JS, no var keyword. Uses arrow functions where appropriate and uses modern methods (for example .map())
- App has styling and is polished
- Incorporate custom CSS to your project. Outside CSS libraries are allowed (Bootstrap, Tailwind, etc), Remove `console.log` statements once you're finished with development. Check for and remove Check for any React errors in the console. Fix linting issues




