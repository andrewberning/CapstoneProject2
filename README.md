# Shoply

[Shoply](https://shoply-frontend.onrender.com) is LIVE!!!


## Project Description
Shoply is an e-commerce website that uses the PayPal API for payment processing. It is currently using the sandbox environment. This means that no "REAL" purchases are being made. Only test accounts for the owner and customer are used. 

Users can browse through the website and see what the store has to offer but you must register an account to add items to the cart and to purchase the items. After a user registers or logs in, they can search for items in the store and add or remove items to their cart. Users must also have a Paypal Account to purchase the items. It is the only way to this website receives payment. Once a user successfully checks out, there is a order confirmation message to let you know the order was received.

## User Types
Users would visit the site if they were interested in general store item. Groceries, furniture, toys, and more.

## User Flow
The user flows for this website consists of:
<ul>
  <li>A navigation bar that includes a brand home link, a hamburger menu that shows all the categories to shop, a search bar to search for products, signin/account menu button, and a shopping cart link.</li>
  <li>A register page for new users to create an account.</li>
  <li>A login page for existing users to login</li>
  <li>An account page to display user info.</li>
  <li>A homepage with a welcome banner and a featured categories banner with links to categories</li>
  <li>A categories page that displays all categories the store has to offer</li>
  <li>A category page for each category that displays all products with a quantity picker and an add to cart option</li>
  <li>A product page for each product that displays the product title, description, and cost with a quantity picker and add to cart button</li>
  <li>A cart page that displays each item in the cart, its description and quantity with an edit quantity picker and a remove button and an order summary with the total of item(s), subtotal, and a checkout button </li>
  <li>A checkout page that displays the number of items being purchased with the subtotal and Paypal buttons to complete purchase</li>
  <li>A confirmation page with a message stating the order was successfully received with a home button.</li>
</ul>

## API Notes
This website uses the [Paypal](https://developer.paypal.com/api/rest/) API to handle payment processing. You must have a login for the developer website to get the proper credentials needed to make API calls to the sandbox environment.

After logging in the Paypal Developer website, users can use the Default Application or create a new project to get a clientID and client secret. These are needed to receive an access token. This token authenticates the app when calling Paypal REST APIs.

The Paypal developer website goes in much further detail. There are also several videos on Youtube for walkthroughs.

## Tech Stack
The tech stack used for this website consist of:
<ul>
  <li>Vite/React.js</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>PostgreSQL</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>Javascript</li>
</ul>

## Getting Started
These instruction should get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Be sure Node is on your local machine. Type "node -v" to find what version you have.

### Installation
1. Clone the [repo](https://github.com/andrewberning/CapstoneProject2.git)
2. Create a new folder to store the repo
3. Open the terminal to that new folder
4. Once in the project folder, type "git clone" with the repo url ex: "git clone (repo URL)" and hit enter
5. Navigate to the cloned repo with the "cd" command. This file contains both the client and server folders
   - Front-end
   1. Change directory into client folder in the terminal
   2. Run the "npm install" command to download the dependencies
   3.  After all dependencies are installed, use the "npm run dev" command to start the project
   
   - Back-end  
   1. Change directory into server folder in the terminal
   2. Run the "npm install" command to download the dependencies
   3. After all dependencies are installed, use the "npm run dev" command to start the project

### Schema Design
![Shoply_Shema_Design](images/E-commerce%20Database%20Schema%20Design.jpg)

### Deployment
I am using Render to deploy this application and ElephantSQL for my database. I am using the free tier for both. 
  #### ElephantSQL
  - Create an account with ElephantSQL using GitHub.
  - Select the US-West-1 Region and the Tiny Turtle for free tier.
  - Confirm and create
  - Click on new instance and make note of the URL for your database. You will need it for Seeding your new instance database and for Render.
  - You should build your new instance much like your database you have locally.
      - In terminal, in you project folder, use the command "$ pg_dump -O shoply | psql (elephantsql url here)"
        - "shoply" is your local database you are seeding from. If your database name is different, change it accordingly.
        - "(elephantsql url here)" is the url noted above. Paste the url without the parentheses.
    - To check your database instance, use "$ psql (elephantsql url here). You can now use regular queries to verify your database was seeded properly.

    #### Render
    ##### Setting up your app
    -  Be sure you have your project on your GitHub.
    -  Create your account on Render with your GitHub.
    -  For back-end, create a new instance of "Web Service".
    -  Connect to your repository on GitHub.
    -  Be sure you have the root directory set to where the server files are ex: "./server", build command is "npm install", and the start command is "node server.js"
    -  Enter your environmental variables:
        -  DATABASE_URL: this will be that URL from ElephantSQL. Be sure you change "postgres:" -> "postgresql:" if you are using postgreSQL, like I did.
        -  NODE_ENV: production
        -  SECRET_KEY: anything you want. Long and random is best!

    - Next is the front-end, create a new instance of "Static Site
      - Find the same repo again and connect
      - Choose the "clienct" directory
      - "npm run build" for build command
      - "dist" for public directory
  
    ##### NOTE
    - If you have your API Key and other variables in your in a separate file and have it in your .gitignore (like I do), you have to tell Render about this file. For front and back end.
      - Below your "Evironment Variables" in the "Environments" tab, there is a section called "Secret Files". 
      - You must add the specific file name (e.g ".env") and what is in the file to go into "Contents" and click "Save Changes"
    
    #### Debuggin app
    - In the dashboard, you can view the logs.
    
    #### Updating app
    - When you push your GitHub repo, it will automatically redeploy your site.
    - You can turn it off in the settings.
    
  ### 

  ## Extra Notes
  LOAD TIMES ARE SLOW!!!
  This website was deployed on free tiers of Render and ElephantSQl so requests for data will take time. Apologies in advance.


  ## Summary
  Thank you for checking out my Capstone Project. If you have any question or comments. You can check out my profile on [LinkedIn](https://www.linkedin.com/in/andrew-berning?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRJRwDTGYQsutUBc306VNaQ%3D%3D). Let me know what you think!
