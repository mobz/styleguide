const demoRenderer = require( '../services/demo-renderer' );

module.exports = function( req, res ) {
	let demoFilePath = req.query.file;
	let contents = demoRenderer.getIframeContents( demoFilePath );
	let vm = { contents };
	res.render( 'demo-iframe', vm );
};
