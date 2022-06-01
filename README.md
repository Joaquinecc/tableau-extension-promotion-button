# Tableu Extension - Create Promotion
JS component to extend Tableau functionality to act as a CART system . The user select a set of filter in different sheet to select a set of recomendation, then decide if they want to add the cart.
A sheet called "Carrito.Lista" Containing all recomendation selected. After that the user, then can decide to create a campaing with all item in the CART.
## Setup and Running 

### Prerequisites
* You must have Node.js and npm installed. You can get these from [http://nodejs.org](http://nodejs.org).

### Install Extensions API SDK Components and Start Server

1. Open a command prompt window to the location where you cloned this repo.

2. Install the Extensions API SDK components.

    **npm install**

3. Build the TypeScript samples and install the Extensions API types library.

   **npm run build**

4. Start the local Dashboard Extension server.

   **npm start**

5. Launch Tableau and try the sample extensions in a dashboard. 

### Settings
In the local directory create a var-env.json. This file is meant to be used as a env variables

```
{
    "api_url":"api url https post request"
}
```
Modify the url FROM  file src/main.trex to the url host. By default is localhost
```
    <source-location>
      <url>HOST-URL/src/main.html</url>
    </source-location>
```
