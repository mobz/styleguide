const demoRenderer = require( '../services/demo-renderer' );

module.exports = function( req, res ) {
	let demoFilePath = req.query.file;
	let iframe = demoRenderer.getIframeContents( demoFilePath );
	let vm = {
		layout: false,
		contents: iframe.contents,
		isAngular: iframe.isAngular
	};
	res.render( 'demo-iframe-contents', vm );
};
