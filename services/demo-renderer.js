const fs = require( 'fs' );
const handlebars = require( 'handlebars' );
const path = require( 'path' );

const template = fs.readFileSync( 'views/demo-iframe.handlebars', 'utf8' );

module.exports = {
	getDemoContainer: ( demoFilePath ) => {
		let iframeName = path.basename( demoFilePath );
		let iframeSrc = `/demo?file=${encodeURIComponent( demoFilePath )}`;
		let code = fs.readFileSync( demoFilePath, 'utf8' );
		let vm = { iframeName, iframeSrc, code };

		return handlebars.compile( template )( vm );
	},
	getIframeContents: ( demoFilePath ) => {
		let contents = fs.readFileSync( demoFilePath, 'utf8' );
		return contents;
	}
};
