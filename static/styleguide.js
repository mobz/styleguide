/* eslint-env browser */
// eslint-disable-next-line no-unused-vars
var styleguide = {
	onIframeRendered: function() {
		var iframes = document.querySelectorAll( 'iframe' );
		setTimeout( function() {
			iframes.forEach( function( iframe ) {
				iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
			} );
		} );
	},
	showTab: function( tabEl, id ) {
		var context = tabEl.parentElement.parentElement;
		var tabs = context.querySelectorAll( '[data-tab-toggle]' );
		var tabContents = context.querySelectorAll( '[data-tab-id]' );

		tabs = Array.prototype.slice.call( tabs, 0 );
		tabContents = Array.prototype.slice.call( tabContents, 0 );

		tabs.forEach( function( t ) {
			t.classList.remove( 'active' );
		} );

		tabEl.classList.add( 'active' );

		tabContents.forEach( function( t ) {
			if ( t.getAttribute( 'data-tab-id' ) === id ) {
				t.classList.add( 'active' );
			} else {
				t.classList.remove( 'active' );
			}
		} );
	}
};
