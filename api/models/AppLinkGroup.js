/**
* AppLinkGroup.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	origin:{
  		type: 'array'

  	},
  	landing:{
  		type: 'array'

  	},
  	officesite:{
  		type: 'array'

  	},
  	market:{
  		type: 'array'
  	},
    
    owner: {
      model: 'mso'
    }

  }
};

