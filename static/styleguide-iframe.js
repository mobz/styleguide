/* eslint-env browser */
( function onIframeRendered() {
	if ( window.parent.styleguide ) {
		window.parent.styleguide.onIframeRendered( window );
	}
} )();
