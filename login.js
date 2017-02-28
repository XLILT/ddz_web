#!/usr/bin/env node

var DAO = require('./dao');

exports = module.exports = Login;

function Login(req, res) {
	this.req = req;
	this.res = res;
}

Login.prototype.try_login = function() {
	var dao = new DAO;
	dao.get_user_by_name(this.req.body.username, this);
}

Login.prototype.on_db_result = function(db_result) {
	var result = {result: -1};

	if(db_result.length === 1) {
		if(db_result[0].passwd === this.req.body.passwd) {
			result.result = 0;
		}
	}

	this.res.setHeader('Content-Type', 'application/json');
	this.res.end(JSON.stringify(result));
}

