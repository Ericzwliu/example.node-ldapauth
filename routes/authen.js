var express = require('express');
var router = express.Router();

var LdapAuth = require('LdapAuth-fork');

// Config from a .json or .ini file or whatever.
// reference configuration : https://github.com/vesse/node-ldapauth-fork/blob/master/lib/ldapauth.js#L25-93
// reference npm package : https://www.npmjs.com/package/ldapauth
var config = {
	ldap: {
		url: "LDAP_URL:PORT",
		bindDn: "ADMINISTRATOR BASE | SERVICE_ACCOUNT BASE",
		bindCredentials: "ADMINISTRATOR PASSWORD | SERVICE_ACCOUNT PASSWORD",
		searchBase: "SEARCH BASE",
		searchScope  : "sub",
		searchFilter: "(sAMAccountName={{username}})" // or other filter
	}
};

router.route('/')

	.post(function( req, res ) {
		// Add cross-origin header 
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");

  		var u = req.body.u;
  		var p = req.body.p;

  		var ldap = new LdapAuth({
			url: config.ldap.url,
			bindDn: config.ldap.bindDn,
			bindCredentials: config.ldap.bindCredentials,
			searchBase: config.ldap.searchBase,
			searchFilter: config.ldap.searchFilter,
			cache: true
		});

		ldap.authenticate(u, p, function (err, user) {
			if(err) res.send(err);
			else res.json(user);

			ldap.close();
		});

  		

		// res.end();
	})

	.get(function( req, res ){
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");

		res.end();		
	});

module.exports = router;
