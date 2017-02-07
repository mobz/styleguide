#!/usr/bin/env node

/* eslint-disable no-console */

const path = require( 'path' );
const bluebird = require( 'bluebird' );
const fs = bluebird.promisifyAll( require( 'fs-extra' ) );
const exec = bluebird.promisify( require( 'child_process' ).exec );

const STYLEGUIDE_DIR = __dirname;
const PUBLISH_BASE_DIR = '.publish';

let argsParser = new require( 'argparse' ).ArgumentParser( {
	addHelp: true,
	description: `Deploy the Styleguide to the cloud and beyond`
} );
argsParser.addArgument( '--app', { required: true, help: 'RHCloud app name to deploy to' } );
argsParser.addArgument( '--ui-library', { required: false, help: 'The directory containing the UI library. Defaults to the current directory', defaultValue: '.' } );
argsParser.addArgument( '--output', { required: false, help: 'The directory to output the published files. Defaults to node_modules/styleguide/publish' } );

let args = argsParser.parseArgs();

const uiLib = path.resolve( args.ui_library );

const publishDir = args.output ?
	path.resolve( process.cwd(), path.join( args.output, PUBLISH_BASE_DIR, args.app ) ) :
	path.join( STYLEGUIDE_DIR, PUBLISH_BASE_DIR, args.app );

console.log( `STYLEGUIDE: Publishing UI library from '${uiLib}' to '${publishDir}'.` );

fs.ensureDirAsync( publishDir )
	.then( () => {
		// copy UI lib files
		let dest = publishDir;
		const copyOpts = {
			dereference: true,
			filter: file => !/(node_modules|\.git|\.publish)/.test( file )
		};
		return fs.copyAsync( uiLib, dest, copyOpts );
	} )
	.then( () => {
		const packageName = 'styleguide';
		// remove the `styleguide` dependency from package.json so that RHCloud doesn't try to npm
		// install it. They can't access our Git servers.
		return fs.readJsonAsync( path.join( publishDir, 'package.json' ) )
			.then( content => {
				delete content.dependencies[ packageName ];
				return fs.writeJsonAsync( path.join( publishDir, 'package.json' ), content );
			} );
	} )
	.then( () => {
		// copy styleguide files
		let copyDirs = [ 'constants', 'routes', 'services', 'static', 'views', 'index.js', 'publish.js', 'package.json' ];
		let dest = path.join( publishDir, 'node_modules/styleguide' );
		return Promise
			.all( copyDirs.map( dir => fs.copyAsync( path.join( STYLEGUIDE_DIR, dir ), path.join( dest, dir ) ) ) )
			.then( () => {
				// npm install styleguide dependencies
				console.log( 'STYLEGUIDE: Installing styleguide in', dest );
				return exec( 'npm install', { cwd: dest } );
			} );
	} )
	.then( () => {
		// copy styleguide Openshift files
		let openshiftDir = path.join( STYLEGUIDE_DIR, './openshift/.openshift' );
		let dest = path.join( publishDir, '.openshift' );
		return fs.copyAsync( openshiftDir, dest );
	} )
	.then( () => console.log( `STYLEGUIDE: '${publishDir}' is ready to commit` ) )
	.catch( ( e ) => console.error( e ) );
