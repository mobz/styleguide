const fs = require( 'fs' );
const handlebars = require( 'handlebars' );

const template = fs.readFileSync( 'views/demo-iframe.handlebars', 'utf8' );

module.exports = {
	getIframeContainer: ( demoFilePath ) => {
		demoFilePath = encodeURIComponent( demoFilePath );
		let src = `/demo?file=${demoFilePath}`;
		let vm = { src };

		return handlebars.compile( template )( vm );
	},
	getIframeContents: ( demoFilePath ) => {
		let contents = fs.readFileSync( demoFilePath, 'utf8' );
		return contents;
	}
};
