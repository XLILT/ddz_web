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
};

Login.prototype.on_db_result = function(err, rows) {
	var result = {result: -1};

	if(err) {
		result.msg = JSON.stringify(err);
	}
	else{
		if(rows.length === 1) {
			if(rows[0].passwd === this.req.body.passwd) {
				result.result = 0;
				this.req.session.is_login = 1;
				this.req.session.uid = rows[0].id;
			}
		}
		else if(rows.length === 0) {
			result.msg = "username not existed.";
		}	
	}	

	this.res.setHeader('Content-Type', 'application/json');
	this.res.end(JSON.stringify(result));
};

