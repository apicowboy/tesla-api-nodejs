/*!
 * tesla-api-nodejs
 * Copyright(c) 2016 Carsten Jacobsen, API Cowboy
 * MIT Licensed
 */

'use strict';

var request = require('request');

/**********************************************************************
* Module exports
**********************************************************************/

exports.authenticate = authenticate
exports.vehicleCollection = vehicleCollection
exports.vehicleState = vehicleState
exports.vehicleCommand = vehicleCommand

/**********************************************************************
*  Function:    authenticate()
*  Description: Create access token, required for all other requests
*  Parameters:  String email 
*               String password
*               String client_id
*               String client_secret
*               Function callback
*  Returns:     Object access token
**********************************************************************/

function authenticate (email, password, client_id, client_secret, callback) {
  
  if (!callback) callback = function(error, response, body) {};

  // Configure the request
  var options = {
    url: 'https://owner-api.teslamotors.com/oauth/token',
    method: 'POST',
    form: {
      grant_type: 'password',
      client_id: client_id,
      client_secret: client_secret,
      email: email,
      password: password
    }
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      var authObj = JSON.parse(body);
      return callback(authObj)
    }
    else {
      return callback(error)
    }
  })
}      

/**********************************************************************
*  Function:    vehicleCollection()
*  Description: List all vehicles associated with the user account
*  Parameters:  String vehicle_id 
*               String access_token
*               Function callback
*  Returns:     Object all associated vehicles
**********************************************************************/

function vehicleCollection (vehicle_id, access_token, callback) {
  
  if (!callback) callback = function(error, response, body) {};
  
  // Configure the request
  var options = {
    url: 'https://owner-api.teslamotors.com/api/1/vehicles',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var respObj = JSON.parse(body);
      return callback(respObj)
    }
    else {

      return callback(error)
    }
  })
} 

/**********************************************************************
*  Function:    vehicleState()
*  Description: Create access token, required for all other requests
*  Parameters:  String vehicle_id 
*               String state_type
*               String access_token
*               Function callback
*  Returns:     Object vehicle states
*
*  State Types: charge_state, climate_state, driving_state, 
*               gui_settings, vehicle_state
**********************************************************************/

function vehicleState (vehicle_id, state_type, access_token, callback) {
  
  if (!callback) callback = function(error, response, body) {};
  
  // Configure the request
  var options = {
    url: 'https://owner-api.teslamotors.com/api/1/vehicles/' + vehicle_id + '/data_request/' + state_type,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var respObj = JSON.parse(body);
      return callback(respObj)
    }
    else {

      return callback(error)
    }
  })
} 

/**********************************************************************
*  Function:    vehicleCommand()
*  Description: Create access token, required for all other requests
*  Parameters:  String vehicle_id 
*               String command_type
*               String parameters
*               String access_token
*               Function callback
*  Returns:     Object command result/reason
*
*  State Types: set_valet_mode, reset_valet_pin, charge_port_door_open, 
*               charge_standard, charge_max_range, set_charge_limit,
*               charge_start, charge_stop, flash_lights, honk_horn,
*               door_unlock, door_lock, set_temps, auto_conditioning_start,
*               auto_conditioning_stop, sun_roof_control, remote_start_drive,
*               trunk_open
**********************************************************************/

function vehicleCommand (vehicle_id, command_type, parameters, access_token, callback) {
  
  if (!callback) callback = function(error, response, body) {};
  
  var params = (parameters) ? '?' + parameters : ''
  
  // Configure the request
  var options = {
    url: 'https://owner-api.teslamotors.com/api/1/vehicles/' + vehicle_id + '/command/' + command_type + params,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var respObj = JSON.parse(body);
      return callback(respObj)
    }
    else {

      return callback(error)
    }
  })
} 
