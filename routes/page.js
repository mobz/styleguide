const findit = require( 'findit2' );
const installPath = require( 'get-installed-path' );
const path = require( 'path' );

const mdParser = require( '../services/markdown-parser' );
const constants = require( '../constants' );

module.exports = function( req, res ) {
	let vm = {
		categories: {},
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
			let parts = filePath.split( path.sep );

			let name = parts.pop().replace( constants.GUIDE_EXTENSION, '' );
			parts.pop();

			let category = parts.pop();
			let url = `/${category}/${name}`;

			vm.categories[ category ] = vm.categories[ category ] || [];

			let active = req.params.id === name;

			vm.categories[ category ].push( { name, url, active } );
			vm.categories[ category ].sort( sorter );
		}
	}

	function buildContents( filePath ) {
		let guideDoc = req.params.id + constants.GUIDE_EXTENSION;

		if ( filePath.indexOf( guideDoc ) > -1 ) {
			vm.contents = mdParser.render( filePath );
		}

		if ( !vm.contents ) {
			vm.contents = mdParser.render( 'index.guide.md' );
		}
	}

	function sorter( a, b ) {
		if ( a.name < b.name ) { return -1; }
		if ( a.name > b.name ) { return 1; }
		return 0;
	}
};
