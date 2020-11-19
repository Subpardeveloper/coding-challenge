# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Solution Breakdown

The following is a breakdown of this solution based on the coding challenge criteria that was provided.

**Note: This is not intended as a complete reference of how I would develop an application for a production-level project.**

To replicate a production environment as closely as possible, I opted to create a mock server that feeds the JSON data into the solution via an API endpoint. This allowed me to decouple the backend logic - such as the filtering of the JSON data to remove the 'logo' and 'amount' assets - from the frontend.

To reduce the amount of time I had to invest in creating frontend components, and ensure I met the time constraints of the challenge, I used an existing React component library: PrimeReact (https://www.primefaces.org/primereact/). I imported two menus, a bar chart and a sortable table which I then styled and refined to meet my needs.

The general layout of the application is based on the wireframe that was provided in the challenge documentation. Using a grid layout I split the application into two sections: the static sidebar menu, which is persistent throughout navigation, on the left column and the portfolio breakdown on the right column which re-renders depending on which portfolio is selected from the sidebar. I believe this is the most user-friendly layout for such an interface that allows fluid transition from one portfolio to the other without the need of unecessary navigation of multiple pages/menus.

As a way of demonstrating how expandable such a layout is, I also included some additonal dummy submenus in the sidebar and separated my solution into pages.

The consumed JSON file is mapped by the api handlers and using the username as a unique identifier a list of portfolios is compiled and generated under "Manage Portfolios". If additional data was to be added to the JSON following the current format, this would appear in the application without issue. Selecting an individual portfolio uses the mapped "portfolio" object to retrieve and display a breakdown of the assets listed within it. The data is fed row by row in to the table which by default is grouped by "Asset Class" and sorted by "Total Value". The data is also passed to the chart where it can be displayed using two separate grouping options: "by Asset Location" or "by Asset Class".

The client_name is displayed on the top left of the screen and is generated based on which portfolio is selected. The "Total Wealth" is displayed on the top right.

**Note: There are inconsistencies in the JSON file regarding the total investment value of a client! Adding up the individual asset total values does not always reflect the investment total that is provided. To ensure consistency I opted to calculate the "Total Wealth" based on the mapped individual assets rather than the investment total value. This way, the asset total values listed in the table/chart will always line up with the "Total Wealth" value.**

The testing regime for this solution focuses primarily on end-to-end tests due to time constraints. Targeting rendered elements on the page via getByText and asserting that they should be present I verify that the application is displaying the expected components. To ensure this testing extends to the chart as well, I included a chart key to the right of the bar chart that details how assets are currently grouped, the investor profile they are associated with and the total asset count.

### Potential Further Refinement

Had this been a full production-level application I would have prefered to do the following:

> Use an alternative component library that provides more customization and options
> Do more extensive testing to ensure integrity of the application and cover more use-scenarios
> Introduce security logic to protect the data being displayed - such as a login screen behind which the application is locked
> Introduce logic that allows the editing of portfolios rather than just the displaying of them - such as the option to delete individual assets or change the details associated with them (value or quantity)
> Accomodate for multiple themes to allow users to tailor the application's appearance to their preferences - such as dark mode or colorblind mode
> Make the visualisation of data (the chart) more intuitive by introducing features such as sorting and intelligent color-coding
> Extend the applications capabilities to include historical data rather than just the current state of a portfolio - such as a way to display fluctuations in value of a specific asset over time
> Refine the sorting/grouping logic of the table to remove the need for a metakey and to make it more user-friendly - potentially with a custom grouping algorithm
> Introduce logic that allows the application to recognise name titles - such as "Dr." - and exclude them when sorting the portfolio list in alphabetical order
> Make the whole application more responsive by introducing @media profiles in my CSS
