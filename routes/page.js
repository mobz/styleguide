const findit = require( 'findit2' );
const installPath = require( 'get-installed-path' );
const mdParser = require( '../services/markdown-parser' );
const constants = require( '../constants' );

module.exports = function( req, res ) {
	let vm = {
		files: [],
		contents: null
	};
	let finder = findit( installPath( 'aconex-ui', true ), { followSymlinks: true } );

	finder.on( 'file', ( filePath ) => {
		buildNavigation( filePath );
		buildContents( filePath );
	} );

	finder.on( 'end', () => {
		res.render( 'index', vm );
	} );

	function buildNavigation( filePath ) {
		if ( constants.GUIDE_EXTENSION_REGEX.test( filePath ) ) {
			vm.files.push( filePath );
		}
	}

	function buildContents( filePath ) {
		let guideDoc = req.params.id + constants.GUIDE_EXTENSION;

		if ( filePath.indexOf( guideDoc ) > -1 ) {
			vm.contents = mdParser.render( filePath );
		}
	}
};
