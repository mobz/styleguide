const fs = require( 'fs' );
const handlebars = require( 'handlebars' );
const path = require( 'path' );

const template = fs.readFileSync( 'views/demo-iframe.handlebars', 'utf8' );

module.exports = {
	getIframeContainer: ( demoFilePath ) => {
		let name = path.basename( demoFilePath );
		let src = `/demo?file=${encodeURIComponent( demoFilePath )}`;
		let vm = { name, src };

		return handlebars.compile( template )( vm );
	},
	getIframeContents: ( demoFilePath ) => {
		let contents = fs.readFileSync( demoFilePath, 'utf8' );
		return contents;
	}
};
