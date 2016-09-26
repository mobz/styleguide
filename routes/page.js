const findit = require( 'findit2' );
const installPath = require( 'get-installed-path' );
const path = require( 'path' );

const mdParser = require( '../services/markdown-parser' );
const constants = require( '../constants' );

module.exports = function( req, res ) {
	let finder = findit( installPath( 'aconex-ui', true ), { followSymlinks: true } );
	let vm = {
		categories: [],
		contents: null
	};
	let defaultFile;
	let categories = {};

	finder.on( 'file', ( filePath ) => {
		buildNavigation( filePath );
		buildContents( filePath );
	} );

	finder.on( 'end', () => {
		setDefaultContents( vm );
		sortNavigation( vm );
		res.render( 'index', vm );
	} );

	function buildNavigation( filePath ) {
		if ( path.basename( filePath ) === constants.GUIDE_DEFAULT ) {
			defaultFile = filePath;
			return;
		}

		if ( constants.GUIDE_EXTENSION_REGEX.test( filePath ) ) {
			let parts = filePath.split( path.sep );

			let name = parts.pop().replace( constants.GUIDE_EXTENSION, '' );
			parts.pop();

			let category = parts.pop();
			let url = `/${category}/${name}`;

			categories[ category ] = categories[ category ] || [];

			let active = req.params.id === name;

			categories[ category ].push( { name, url, active } );
			// categories[ category ].sort( sorter );
		}
	}

	function buildContents( filePath ) {
		let guideDoc = req.params.id + constants.GUIDE_EXTENSION;

		if ( filePath.indexOf( guideDoc ) > -1 ) {
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
				name: key,
				items: categories[ key ]
			};
		} );

		vm.categories.sort( sorter );
		vm.categories.forEach( category => category.items.sort( sorter ) );
	}

	function sorter( a, b ) {
		if ( a.name < b.name ) { return -1; }
		if ( a.name > b.name ) { return 1; }
		return 0;
	}
};
