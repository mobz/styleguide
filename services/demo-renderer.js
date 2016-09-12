const fs = require( 'fs' );
const handlebars = require( 'handlebars' );

const template = `<div>
	<hr />
	<div>{{{contents}}}</div>
	<hr />
</div>`;

module.exports = function( filePath ) {
	let contents = fs.readFileSync( filePath, 'utf8' );
	let vm = { contents };

	return handlebars.compile( template )( vm );
};
