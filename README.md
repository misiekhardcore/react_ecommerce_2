# react_ecommerce_2

another ecommerce project with react
[video](https://youtu.be/TRCDsB9i3bI?t=15154)

### server with express

- install `express` and `nodemon`
- added a start script in package.json
- use axios to get data from api instead of from data.js

### mongodb and mongoose

- install `mongoose`
- made `backend/models/userModel.js` and create userSchema

### eslint

- eslint extension from vs extensions
- in root folder `./node_modules/.bin/eslint --init`
- added `.env` in frontent with `SKIP_PREFLIGHT_CHECK=true`

### redux

- instaling redux, react-redux and redux-thunk
- creating redux folder and creating store
- adding redux devtools to store
- added `<Provider store={store}>` to **index.js**
- added folder for product stuff(actions, types, reducers)
- modified **HomePage** to use store instead of **Hooks**
- modified **ProductPage** to use store instead of **Hooks**
- changing `<a href=>` to `<Link to=>` to prevent page from refreshing

### cart

- making cart template
- adding cart to redux store
- using `localStore` to keep cartList reducer params in memory
