const path = require( 'path' );
const auiBuilder = require( 'aconex-ui/build' );

auiBuilder( {
	outputPath: path.resolve( __dirname + '/static/aconex-ui' ),
}, function() {
	console.log( 'aconex-ui built.' );
} );
