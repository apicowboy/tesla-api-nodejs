#Simple NodeJS wrapper for Tesla Api

This is an unofficial wrapper for the Tesla API. It's probably one of the simplest NodeJS wrappers, 
with a very small footprint, but still useful for various projects. It's based on the API 
documentation at http://docs.timdorr.apiary.io.

##Installation

Install this NodeJS module with NPM:

```
npm install tesla-api-nodejs --save
```

Install this NodeJS module with Yarn:

```
yarn install
```

##Overview

The module has four functions, which groups the Tesla API in functional groups:

* authenticate()
* vehicleCollection()
* vehicleState()
* vehicleCommand()

###authenticate()

Tesla API calls require a valid access token and this can be obtained with the authenticate() function.

Authentication requires the email and password used for the user's account (used to login to the website 
and the mobile app) and client ID and client password. The current client ID and password can be obtained 
[here](http://pastebin.com/fX6ejAHd).

This is how to obtain the access token: 

```javascript
var teslaApiNodejs = require('tesla-api-nodejs')

var USER_EMAIL = 'your_email@address.com'
var USER_PASSWORD = 'your_password'
var TESLA_CLIENT_ID = 'e4a9949fcfa04068f59abb5a658f2bac0a3428e4652315490b659d5ab3f35a9e'
var TESLA_CLIENT_SECRET = 'c75f14bbadc8bee3a7594412c31416f8300256d7668ea7e6e7f06727bfb9d220'

var access_token = ''

teslaApiNodejs.authenticate(USER_EMAIL, USER_PASSWORD, TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, function (data) {
  //response is an object containing access_token, token type, expiration time etc. 
  access_token = data.access_token
})
```

###vehicleCollection()

The vehicleCollection() function will return all vehicles associated with the provided credentials, even 
undelivered vehicles. Both vehicle states and commands requires a vehicle ID, so actions can only be 
applied to one vehicle at a time. 

This is how to obtain the array of vehicles:

```javascript
//Assumed already obtained

var vehicleIds = []

teslaApiNodejs.vehicleCollection(ACCESS_TOKES, function (data) {
  //response is an object containing id, VIN, installed options etc. 
  vehicleIds = data.response
})
```





