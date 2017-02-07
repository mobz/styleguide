const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const handlebars = require( 'handlebars' );
const path = require( 'path' );

const uiLibraryPath = require( '../services/ui-library-path' );

const CONTAINER_TEMPLATE = fs.readFileSync( path.resolve( __dirname, '../views/demo-iframe-container.handlebars' ), 'utf8' );
const SECTION_ATTR = 'styleguide-content';
const SECTION_SELECTOR = `[${SECTION_ATTR}]`;

module.exports = {
	getDemoContainer: ( demoFilePath ) => {
		let src = demoFilePath.substr( demoFilePath.indexOf( uiLibraryPath() ) + uiLibraryPath().length );
		let iframeName = path.basename( demoFilePath );
		let iframeSrc = `/demo?file=${encodeURIComponent( src )}`;

		let code;
		try {
			code = fs.readFileSync( demoFilePath, 'utf8' );
		} catch ( e ) {
			code = 'could not read ${demoFilePath}';
		}
		let $ = cheerio.load( code );

		let tabs = [];

		$( SECTION_SELECTOR ).each( ( idx, item ) => {
			let id = $( item ).attr( SECTION_ATTR );
			// replace tabs with spaces as tab indentations look huge in the browser
			let contents = $( item ).html().replace( /\t/g, '  ' );
			tabs.push( { id, contents } );
		} );

		let vm = { iframeName, iframeSrc, tabs };
		return handlebars.compile( CONTAINER_TEMPLATE )( vm );
	}
};
