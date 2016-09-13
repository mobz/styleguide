const fs = require( 'fs' );
const handlebars = require( 'handlebars' );
const installPath = require( 'get-installed-path' );

const template = `<iframe src="{{src}}" style="height: 200px; width: 100%"></iframe>`;

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
