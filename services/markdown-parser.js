const fs = require( 'fs' );
const path = require( 'path' );
const md = require( 'markdown-it' )();
const demoRenderer = require( './demo-renderer' );

// the custom syntax is --$ demoFileName $--
// where `demoFileName` will refer to a file named `demoFileName.html` in the same folder
const BEGIN_SEQUENCE = '--$';
const END_SEQUENCE = '$--';
const RULE_KEY = 'styleguideDemo';

let folderPath;

function tokenise( state ) {
	let content;
	let token;
	let max = state.posMax;
	let start = state.pos;

	// find --$
	if ( state.src.substr( 0, BEGIN_SEQUENCE.length ) !== BEGIN_SEQUENCE ) {
		return false;
	}

	// find $--
	if ( state.src.substr( state.src.length - END_SEQUENCE.length ) !== END_SEQUENCE ) {
		return false;
	}

	content = state.src.slice( start + BEGIN_SEQUENCE.length, state.src.length - END_SEQUENCE.length ).trim();

	token = state.push( RULE_KEY, '', 0 );
	token.content = content;

	state.pos = state.posMax + 1;
	state.posMax = max;

	return true;
}

function plugin( md ) {
	md.inline.ruler.push( RULE_KEY, tokenise );
	md.renderer.rules[ RULE_KEY ] = ( tokens, idx /* , options, env, renderer*/ ) => {
		let demoFileName = tokens[ idx ].content;
		let demoFilePath = path.join( folderPath, demoFileName + '.html' );
		return demoRenderer( demoFilePath );
	};
}

md.use( plugin );

module.exports = {
	render: ( filePath ) => {
		folderPath = path.dirname( filePath );

		let contents = fs.readFileSync( filePath, 'utf8' );
		return md.render( contents );
	}
};
