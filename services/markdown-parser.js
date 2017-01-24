const fs = require( 'fs' );
const path = require( 'path' );
const md = require( 'markdown-it' )();
const tocAndAnchorPlugin = require( 'markdown-it-toc-and-anchor' ).default;
const demoRenderer = require( './demo-renderer' );

let folderPath;

// convert custom syntax `--$ demoFileName $--` to render demo html files
function demoRendererPlugin( md ) {
	const BEGIN_SEQUENCE = '--$';
	const END_SEQUENCE = '$--';
	const RULE_KEY = 'styleguideDemo';

	md.inline.ruler.push( RULE_KEY, function tokenise( state ) {
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
	} );

	md.renderer.rules[ RULE_KEY ] = ( tokens, idx /* , options, env, renderer*/ ) => {
		let demoFileName = tokens[ idx ].content;
		let demoFilePath = path.join( folderPath, demoFileName + '.html' );
		return demoRenderer.getDemoContainer( demoFilePath );
	};
}

// automatically insert `@[toc]` placeholders (used by markdown-it-toc-and-anchor) into markdown
function tocInserterPlugin( md ) {
	const RULE_KEY = 'styleguideToc';
	const TOC_MARKUP = '@[toc]';

	md.core.ruler.push( RULE_KEY, function tokenise( state ) {
		let Token = state.Token;

		for ( let i = 0; i < state.tokens.length; i++ ) {
			let token = state.tokens[ i ];

			if ( token.tag === 'h1' && token.type === 'heading_close' ) {
				let open = new Token( 'toc_open', 'toc', 1 );
				let body = new Token( 'toc_body', '', 0 );
				let close = new Token( 'toc_close', 'toc', -1 );

				open.markup = TOC_MARKUP;

				state.tokens.push( open );
				state.tokens.push( body );
				state.tokens.push( close );

				return true;
			}
		}

		return true;
	} );
}

md.use( demoRendererPlugin );
md.use( tocInserterPlugin );
md.use( tocAndAnchorPlugin, {
	tocFirstLevel: 2,
	tocClassName: 'styleguide-toc',
	anchorLinkBefore: false,
	anchorClassName: 'styleguide-tocAnchor'
} );

module.exports = {
	render: ( filePath ) => {
		folderPath = path.dirname( filePath );

		let contents = fs.readFileSync( filePath, 'utf8' );
		return md.render( contents );
	}
};
