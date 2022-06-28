## Description
A responsive grid view for all countries with column sort, search by country name and pages. Provides a detailed view for selected country.

## Requirements
1. Create a basic React.js application using a backend API provided by

- `API1. All countries`
GET https://excitel-countries.azurewebsites.net/countries
	
- `API2. Search by name`
GET https://excitel-countries.azurewebsites.net/countries/{name}

- `search - name of country`
e.g. https://excitel-countries.azurewebsites.net/countries/z - returns all countries containing in their name the letter z

2. Present in a responsive grid view (table) the results of API1. Provide a filter on name, sorting of columns and paging.

3. Implement details view with the same fields present in the table. Show that details view when the user presses and holds left mouse button over table’s row for several seconds. Implement some form of small countdown (or progress) indicator so that the user can see how long he should keep pressing until the details view is shown.

4. Implement an autocomplete filter box for the countries using API2 (on each symbol entered in the filter box a suggestions dropdown with up to 10 items is displayed). Prevent multiple requests on each symbol entered (wait until the typing is complete).
When a country is selected show more information about it using the API2 results.


## Available Scripts


- `npm start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test` - no tests for the moment
- `npm run build` - builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.