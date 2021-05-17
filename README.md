# GLD web interface

This web app lets you manage your delayed GLD token transfers.

## Live demo

This app is already deployed on Vercel. You can find it here: <https://delayed-erc20-web.vercel.app>.

## How it works

On the home page, you can see your wallet information (address, GLD token balance) and current delayed transfers. Incoming and outcoming transfers are split into two panels to simplify the usage. Both lists are updated in real-time. Whenever you create or receive a new delayed transfer, it will appear on your page. The square left to your GLD balance is an identicon generated from your Ethereum address.

You can create a new delayed transfer by pressing a button down to your address. It will open a form you'll need to fill. After you fill out the form, a transaction will be sent to Ethereum blockchain. Transaction execution might take from 15 seconds to a few minutes. After that, the transfer will appear both on your and the recipient's page with a countdown, showing the time until your delayed transfer can be executed.

When the time will run out you'll need to wait for 1 more block to be mined before finishing the transfer. At this time the withdraw button will be disabled and the transfer will go into pending status. After that, the recipient will see a _Collect_ button that sends GLD to its wallet.

## Roadmap

- [ ] Improve transfer creation UX
- [x] Deploy to Vercel
- [ ] Display timestamps of important operations (potentially store them in some sort of database later)
- [ ] Add pending block tooltip
- [ ] Animate pending transactions to attract users' attention
- [ ] Handle different Ethereum JSON RPC error codes
- [ ] Display transfer history

## Local development

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run codegen`

Runs `graphql-codegen` CLI which generates TypeScript definitions from the projects' GraphQL schema. You don't need to run this script all the time because it's attached to `prebuild`, `prestart` and `postinstall` hooks.
