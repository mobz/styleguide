const installPath = require("get-installed-path");
const findit = require("findit2");

const STYLEGUIDE_DOC = /\.guide\.md$/;

module.exports = function( req, res ) {
	const vm = {
		files: []
	};
	const finder = findit( installPath('aconex-ui', true), { followSymlinks: true });
	finder.on("file", function( file, stat ) {
		if( STYLEGUIDE_DOC.test( file ) ) {
			vm.files.push( file );
		}
	});
	finder.on("end", () => {
		res.render('index', vm);
	});
};
