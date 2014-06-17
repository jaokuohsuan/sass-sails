/**
* Mso.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	keyword:{
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	msoTitle:{
  		type: 'string',
  		required: true
  	},
    icon:{
      type: 'string'
    },
  	longDescription:{
  		type: 'string'
  	},
  	shortDescription:{
  		type: 'string'
  	},
  	calltoaction:{
  		type: 'string'
  	},
  	zone:{
  		type: 'string'  		
  	},
  	//for show player only
  	playeronly:{
  		type: 'boolean'
  	},
 	  //for youtube icon clickable
  	playerControl:{
  		type: 'boolean'
  	},
  	social:{
  		collection: 'socialLink',
		  via: 'owner'
  	},
  	promote:{
  		collection: 'promoteLink',
		  via: 'owner'
  	},
  	ios:{
  		collection: 'appLinkGroup',
      via: 'owner'
  	},
  	android:{
  		collection: 'appLinkGroup',
      via: 'owner'
  	}


  }
};

