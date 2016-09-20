const express = require( 'express' );
const logger = require( 'morgan' );
const viewEngine = require( 'express-handlebars' );

const app = express();
const pageHandler = require( './routes/page' );
const demoHandler = require( './routes/demo' );

const PORT = 3080;

app
	.engine( 'handlebars', viewEngine( { defaultLayout: 'main' } ) )
	.set( 'view engine', 'handlebars' )
	.use( logger( 'dev' ) )
	.use( '/static', express.static( __dirname + '/static' ) )
	.use( '/components/:id', pageHandler )
	.use( '/basics/:id', pageHandler )
	.use( '/demo', demoHandler )
	.use( '/', pageHandler )
	.listen( PORT, () => console.log( 'styleguide running at http://localhost:' + PORT ) ); // eslint-disable-line no-console
