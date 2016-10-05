var styleguide = { // eslint-disable-line no-unused-vars
	onIframeLoad: function( iframe ) {
		setTimeout( function() {
			iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
		}, 10 );
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
