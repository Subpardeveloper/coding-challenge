# ClientPeaQ Coding Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and feeds data locally through a mock Service Worker - also used for testing.

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

## Solution Breakdown

The following is a breakdown of this solution based on the coding challenge criteria that was provided.

**Note: This is not intended as a complete reference of how I would develop an application for a production-level project.**

### Mock API

To replicate a production environment as closely as possible, I opted to create a mock server that feeds the JSON data into the solution via an API endpoint. This decouples the backend logic from the frontend - such as the filtering of the JSON data to remove the 'logo' and 'amount' assets.

The consumed JSON file is mapped by the API handlers and using the username as a unique identifier. From this a list of available portfolios is generated and displayed under "Manage Portfolios". The username is then replaced with the relevant client_name which the user sees in the frontend. Selecting a client_name uses the associated username value to filter out the appropriate portfolio and feed the asset data to the profile-breakdown.

### General Layout

To meet time constraints I used an existing React component library: PrimeReact (https://www.primefaces.org/primereact/).
I imported:

- Two menus (sidebar menu and actions menu)
- A horizontal bar chart
- A sortable table

General layout of the application follows the wireframe that was included in the challenge documentation. The solution is split into pages to demonstrate the expandability potential of this UI. Additional dummy options are included in the sidebar menu for reference - non-functional at this time.

Data is fed row by row in to the table which by default is grouped by "Asset Class" and sorted by "Total Value". Use of the CTRL metakey (hold down) allows for further/alternate sorting.

By default the chart is grouped by geographical_region (Group by Asset Location), but can be switched to display assets grouped by asset_class (Group by Asset Class).

The client's name and total investment value are displayed at the top.

**Note: There are inconsistencies in the JSON file regarding the total investment value of a client! Adding up the individual asset total values does not always reflect the investment total that is provided. To ensure consistency I opted to calculate the "Total Wealth" based on the mapped individual assets rather than the investment total value. This way, the asset total values listed in the table/chart will always line up with the "Total Wealth" value.**

### Testing

Testing for this solution focuses primarily around end-to-end due to time constraints. Rendered elements are targetted using the getByText function which verifies if the element is present against an expect(element)toBeInTheDocument() statement.

To ensure this testing extends to the chart as well, I have included a chart key to the right of the bar chart that details how assets are currently grouped, the investor profile they are associated with and the total asset count.

## Potential Further Refinement

Had this been a full production-level application I would have prefered to do the following:

- Use an alternative component library that provides more customization and options
- Do more extensive testing to ensure integrity of the application and cover more use-scenarios
- Introduce security logic to protect the data being displayed - such as a login screen behind which the application is locked
- Introduce logic that allows the editing of portfolios rather than just the displaying of them - such as the option to delete individual assets or change the details associated with them (value or quantity)
- Accomodate for multiple themes to allow users to tailor the application's appearance to their preferences - such as dark mode or colorblind mode
- Make the visualisation of data (the chart) more intuitive by introducing features such as sorting and intelligent color-coding
- Extend the applications capabilities to include historical data rather than just the current state of a portfolio - such as a way to display fluctuations in value of a specific asset over time
- Refine the sorting/grouping logic of the table to remove the need for a metakey and to make it more user-friendly - potentially with a custom grouping algorithm
- Introduce logic that allows the application to recognise name titles - such as "Dr." - and exclude them when sorting the portfolio list in alphabetical order
- Make the whole application more responsive by introducing @media profiles in my CSS
