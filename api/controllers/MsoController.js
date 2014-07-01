/**
 * MsoController
 *
 * @description :: Server-side logic for managing msoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
// var fs = require('fs');
// var path = require('path');
var url=require('url');
// var mkdirp = require('mkdirp');
var UPLOAD_PATH = 'angular/app/img';
var NG_UPLOAD_PATH ="./angular/app/img/ttt2/";


var testFildname='testfieldlala';

var _res={
	filename: testFildname+'.jpg',
	dirname: NG_UPLOAD_PATH 
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

module.exports = {

	

	index: function(req, res) {

		

		res.writeHead(200, {
			'content-type': 'text/html'
		});
		res.end(
			'<form action="http://localhost:1337/mso/upload?myname=love" enctype="multipart/form-data" method="post">' +
			'<input type="text" name="title"><br>' +
			'<input type="file" name="promote1" multiple="multiple"><br>' +
			'<input type="submit" value="Upload">' +
			'</form>'+testFildname
		)
	},


	upload: function(req, res) {


		var _res={
			filename: req.query.myname+'.jpg',
			dirname: NG_UPLOAD_PATH 
		}





		
        // var tempfiledName=req._fileparser.upstreams[0].fieldName;  //get fieldName
       // var tempfiledName=req._fileparser.upstreams[0].fieldName;  //get fieldName
		//console.log('req=',Object.getOwnPropertyNames(req),'|',req._fileparser.upstreams[0],'??',req._fileparser.textParams,'tempfiledName=',req.url,'===atfer url===',req.params,'@',url.parse(req.url, true),'query=',req.query);
        
        

		req.file('file').upload(_res,function (err, files) {
			if (err) return res.serverError(err);


			res.json({
				message: files.length + ' file(s) uploaded successfully!',
				files: files
			});

		});

	}

};