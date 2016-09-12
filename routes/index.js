const findit = require( 'findit2' );
const fs = require( 'fs' );
const installPath = require( 'get-installed-path' );
const mdParser = require( '../mdParser/mdParser' );

const STYLEGUIDE_DOCS = /\.guide\.md$/;

module.exports = function( req, res ) {
	let vm = {
		files: [],
		contents: null
	};
	let finder = findit( installPath( 'aconex-ui', true ), { followSymlinks: true } );
	let guideContents = null;

	finder.on( 'file', ( file ) => {
		buildNavigation( file );
		buildContents( file );
	} );

	finder.on( 'end', () => {
		res.render( 'index', vm );
	} );

	function buildNavigation( file ) {
		if ( STYLEGUIDE_DOCS.test( file ) ) {
			vm.files.push( file );
		}
	}

	function buildContents( file ) {
		let guideDoc = `${req.params.id}.guide.md`;

		if ( file.indexOf( guideDoc ) > -1 ) {
			let contents = fs.readFileSync( file, 'utf8' );
			guideContents = mdParser.render( contents );
			vm.contents = guideContents;
		}
	}
};
