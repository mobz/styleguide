const express = require( 'express' );
const logger = require( 'morgan' );
const viewEngine = require( 'express-handlebars' );

const PORT = 3080;

const app = express();
const routeHandler = require( './routes/index.js' );

app
	.engine( 'handlebars', viewEngine( { defaultLayout: 'main' } ) )
	.set( 'view engine', 'handlebars' )
	.use( logger( 'dev' ) )
	.use( '/static', express.static( __dirname + '/static' ) )
	.use( '/components/:id', routeHandler )
	.use( '/basics/:id', routeHandler )
	.listen( PORT, () => console.log( 'styleguide running at http://localhost:' + PORT ) ); // eslint-disable-line no-console
