const path = require( 'path' );
const auiBuilder = require( 'aconex-ui/build' );

auiBuilder( {
	watch: true,
	outputPath: path.resolve( __dirname + '/static/aconex-ui' )
}, function() {
	// eslint-disable-next-line no-console
	console.log( 'aconex-ui built.' );
} );
