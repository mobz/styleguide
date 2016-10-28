const path = require("path");
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll( require("fs-extra") );

const UI_LIBRARY = require( './constants' ).UI_LIBRARY;
const PUBLISH_BASE_DIR = "./publish";

var argsParser = new require('argparse').ArgumentParser({
	addHelp: true,
	description: "Deploy Stylguide to the cloud and beyond"
});
argsParser.addArgument('--app', { required: true, help: "rhcloud app name to deploy to" } );

var args = argsParser.parseArgs();


const publishDir = path.join( PUBLISH_BASE_DIR, args.app );

const builderAsync = bluebird.promisify( require( path.join( UI_LIBRARY, 'build' ) ) );

const copyDirs = [ 'constants', 'routes', 'services', 'static', 'views', 'index.js' ];
const UILIB_COPY_OPTS = {
	dereference: true,
	filter: ( file ) => ! /aconex-ui\/(node_modules|\.git)/.test(file)
}


builderAsync({ outputPath: path.resolve( __dirname + '/static/aconex-ui' ) })
	.then( () => fs.ensureDirAsync( publishDir ) )
	.then( () => {
		return fs.readJsonAsync( './package.json' )
			.then( ( content ) => {
				delete content.dependencies[ UI_LIBRARY ];
				return fs.writeJsonAsync( path.join( publishDir, 'package.json' ), content );
			});
	})
	.then( () => Promise.all( copyDirs.map( dir => fs.copyAsync( dir, path.join( publishDir, dir ) ) ) ) )
	.then( () => fs.copyAsync( path.join('./node_modules', UI_LIBRARY ), path.join( publishDir, UI_LIBRARY), UILIB_COPY_OPTS ) )
	.then( () => fs.copyAsync( './openshift/.openshift', path.join( publishDir, '.openshift' ) ) )
	.then( () => console.log( `${publishDir} is ready to commit` ) )
	.catch( (e) => console.error( e ) );
