var rootscriptloader = window.ScriptLoader.getScriptLoader('rootloader');

//include all global js files here 
rootscriptloader.push_script('./js/src/config.js');
rootscriptloader.push_script('./js/src/constants.js');

rootscriptloader.push_script('./includes/modules/common/global.js');

rootscriptloader.push_script('./js/src/xtra/xtra-config.js');


// perform load
rootscriptloader.load_scripts();


//libs
var libscriptloader = rootscriptloader.getChildLoader('libloader');

//jquery
libscriptloader.push_script('./includes/lib/jquery-3.1.0.js');

libscriptloader.push_script('./includes/lib/bootstrap.min-3.3.7.js');

libscriptloader.push_script('./includes/lib/web3-0.20.3.js');
libscriptloader.push_script('./includes/lib/truffle-contract-1.1.11.js');

libscriptloader.push_script('./includes/lib/ethereumjs-all-2017-10-31.min.js');
libscriptloader.push_script('./includes/lib/keythereum.min-1.0.2.js');
libscriptloader.push_script('./includes/lib/bitcore.min-0.11.7.js');
libscriptloader.push_script('./includes/lib/bitcore-ecies.min-0.9.2.js');

// interfaces to abstract the previous libs
libscriptloader.push_script('./includes/lib/ethereum-node-access.js');
libscriptloader.push_script('./includes/lib/account-encryption.js');


//perform load
libscriptloader.load_scripts();



// modules
var modulescriptloader = libscriptloader.getChildLoader('moduleloader');
var dappsscriptloader = modulescriptloader.getChildLoader('dappmodulesloader');

// common
modulescriptloader.push_script('./includes/modules/common/module.js');
//chain reader
modulescriptloader.push_script('./includes/modules/chainreader/module.js');

// dapps
modulescriptloader.push_script('./dapps/module.js', function() {
	// let /dapps/module push scripts in 'dappsloader' then load them
	dappsscriptloader.load_scripts();
});

//perform load
modulescriptloader.load_scripts();



//app
var angularscriptloader = dappsscriptloader.getChildLoader('angularloader');

//angular
var angular_app;

angularscriptloader.push_script('./angular-ui/lib/angular-1.6.9.js');
//angularscriptloader.push_script('./angular-ui/lib/angular-1.7.0.js');

angularscriptloader.push_script('./angular-ui/lib/ui-bootstrap-2.5.0.js');

angularscriptloader.push_script('./angular-ui/lib/angular-ui-router-1.0.18.js');

angularscriptloader.push_script('./angular-ui/lib/angular-breadcrumb-0.5.0.js');

//perform load
angularscriptloader.load_scripts();

//mvc
var mvcscriptloader = angularscriptloader.getChildLoader('mvcloader');

mvcscriptloader.push_script('./angular-ui/js/src/module.js', 
	function() {
		var global = GlobalClass.getGlobalObject();	
		
		var allmodulesscriptloader = global.loadModule('mvc', modulescriptloader, function() {
			// and finally loading the app
			var appscriptloader = allmodulesscriptloader.getChildLoader('apploader');
			
			appscriptloader.push_script('./angular-ui/js/app.js');

			//perform load
			appscriptloader.load_scripts();
		});
		
	});

//perform load
mvcscriptloader.load_scripts();




