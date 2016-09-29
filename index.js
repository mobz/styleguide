const express = require( 'express' );
const logger = require( 'morgan' );
const viewEngine = require( 'express-handlebars' );

const app = express();
const pageHandler = require( './routes/page' );
const demoHandler = require( './routes/demo' );

const PORT = process.env.NODE_PORT || 3080;
const IP = process.env.NODE_IP || 'localhost';

app
	.engine( 'handlebars', viewEngine( { defaultLayout: 'main' } ) )
	.set( 'view engine', 'handlebars' )
	.use( logger( 'dev' ) )
	.use( '/static', express.static( __dirname + '/static' ) )
	.use( '/components/:id', pageHandler )
	.use( '/basics/:id', pageHandler )
	.use( '/demo', demoHandler )
	.use( '/', pageHandler )
	.listen( PORT, IP, () => process.stdout.write( `styleguide running at http:\/\/${IP}:${PORT}\n` ) );
