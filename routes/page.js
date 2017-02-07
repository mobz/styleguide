const findit = require( 'findit2' );
const path = require( 'path' );
const constants = require( '../constants' );
const mdParser = require( '../services/markdown-parser' );
const uiLibraryPath = require( '../services/ui-library-path' );

module.exports = function( req, res ) {
	let finder = findit( uiLibraryPath(), { followSymlinks: true } );
	let vm = {
		categories: [],
		contents: null
	};
	let defaultFile;
	let categories = {};

	finder.on( 'file', ( filePath ) => {
		buildNavigation( filePath );
		buildContents( filePath, vm );
	} );

	finder.on( 'end', () => {
		setDefaultContents( vm );
		sortNavigation( vm );
		res.render( 'index', vm );
	} );

	function buildNavigation( filePath ) {
		if ( path.basename( filePath ) === constants.GUIDE_DEFAULT_INDEX ) {
			// don't include the index on the navigation
			return;
		}

		if ( constants.GUIDE_EXTENSION_REGEX.test( filePath ) ) {
			let parts = filePath.split( path.sep );

			let id = parts.pop().replace( constants.GUIDE_EXTENSION, '' );
			parts.pop();

			let category = parts.pop();
			let url = `/styleguide/${category}/${id}`;

			categories[ category ] = categories[ category ] || [];

			let active = req.params.id === id;

			categories[ category ].push( { id, url, active } );
		}
	}

	function buildContents( filePath, vm ) {
		if ( path.basename( filePath ) === constants.GUIDE_DEFAULT_INDEX ) {
			defaultFile = filePath;
			return;
		}

		if ( !req.params.category || !req.params.id ) return;

		let category = req.params.category;
		let id = req.params.id;
		let guideDoc = `${id}${constants.GUIDE_EXTENSION}`;
		let found = `${category}${path.sep}${id}${path.sep}${guideDoc}`;

		if ( filePath.indexOf( found ) > -1 ) {
			vm.contents = mdParser.render( filePath );
		}
	}

	function setDefaultContents( vm ) {
		if ( !vm.contents && defaultFile ) {
			vm.contents = mdParser.render( defaultFile );
		}
	}

	function sortNavigation( vm ) {
		vm.categories = Object.keys( categories ).map( key => {
			return {
				id: key,
				items: categories[ key ]
			};
		} );

		vm.categories.sort( sorter );
		vm.categories.forEach( category => category.items.sort( sorter ) );
	}

	function sorter( a, b ) {
		// docs section goes first
		if ( a.id === 'docs' ) { return -1; }
		if ( b.id === 'docs' ) { return 1; }

		if ( a.id < b.id ) { return -1; }
		if ( a.id > b.id ) { return 1; }
		return 0;
	}
};
