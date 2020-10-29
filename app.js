/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path'),
	busboy = require("then-busboy"),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'test'
});
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// table creation
let sql="CREATE TABLE IF NOT EXISTS `ubisoft` (\n" +
	"  `id` int(5) NOT NULL AUTO_INCREMENT,\n" +
	"  `title` varchar(255) NOT NULL,\n" +
	"  `desc` varchar(255) NOT NULL,\n" +
	"  `image` varchar(255) NOT NULL,\n" +
	"  PRIMARY KEY (`id`)\n" +
	") ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;\n";
db.query(sql,function (err,res){
	console.log('table created')
})

//homepage
app.get('/',routes.profile);

//register page
app.get('/register', routes.index);
//homepage
app.post('/', routes.index);

//Middleware
app.listen(8080)
