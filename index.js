const express = require( 'express' );
const viewEngine  = require('express-handlebars');
const logger = require( 'morgan' );

const PORT = 3080;

const app = express();

app
	.engine( 'handlebars', viewEngine({	defaultLayout: 'main' }) )
	.set( 'view engine', 'handlebars' )
	.use( logger( 'dev' ) )
	.use( "/static", express.static( __dirname + '/static' ) )
	.use( "/", require( './routes/index.js' ) )
	.listen( PORT, () => console.log( "styleguide running at http://localhost:" + PORT ) );
