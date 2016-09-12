const md = require( 'markdown-it' )();

// --$ demoFileName $--
const BEGIN_SEQUENCE = '--$';
const END_SEQUENCE = '$--';

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

	token = state.push( 'styleguideDemo', '', 0 );
	token.content = content;

	state.pos = state.posMax + 1;
	state.posMax = max;

	return true;
}

function render( tokens, idx, options, env, renderer ) {
	return `
	<div>
		<p>Start styleguide contents</p>
		<div>${tokens[idx].content}</div>
		<p>End styleguide contents</p>
	</div>`;
}

function plugin( md ) {
	md.inline.ruler.push( 'styleguideDemo', tokenise );
	md.renderer.rules[ 'styleguideDemo' ] = render;
}

md.use( plugin );

module.exports = md;
