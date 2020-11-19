# react_ecommerce_2

another ecommerce project with react
[video](https://youtu.be/TRCDsB9i3bI?t=18327)

### server with express

- install `express` and `nodemon`
- added a start script in `package.json`
- use `axios` to get data from _api_ instead of from `data.js`
- install `expressAsyncHandler` to use _async_ functions to get data from **server**
- create **Router** for **Users**
- create **Router** for **Products**

### mongodb and mongoose

- install `mongoose`
- made `backend/models/userModel.js` and create **userSchema**
- made `backend/models/productModel.js` and create **productSchema**

### user handling

- install `jsonwebtoken` to generate authentication tokens
- install `dotenv` to keep private key for `jwt`
- using `localStore` to keep **userInfo** reducer params in memory

### eslint

- eslint extension from vs extensions
- in root folder `./node_modules/.bin/eslint --init`
- added `.env` in frontent with `SKIP_PREFLIGHT_CHECK=true`

### redux

- instaling `redux`, `react-redux` and `redux-thunk`
- creating `redux` folder and creating **store**
- adding redux devtools to store
- added `<Provider store={store}>` to `index.js`
- added folder for **product** stuff(_actions, types, reducers_)
- added folder for **user** stuff(_actions, types, reducers_)
- modified **HomePage** to use store instead of **Hooks**
- modified **ProductPage** to use store instead of **Hooks**
- changing `<a href=>` to `<Link to=>` to prevent page from refreshing

### cart handling

- making cart template
- adding cart to redux store
- using `localStore` to keep **cartList** reducer params in memory
