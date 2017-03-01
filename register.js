#!/usr/bin/env node

var DAO = require('./dao');

exports = module.exports = Register;

function Register(req, res) {
	this.req = req;
	this.res = res;
}

Register.prototype.try_register = function(){
	var dao = new DAO;
	dao.add_user(this.req.body.username, this.req.body.passwd, this);
};

Register.prototype.on_db_result = function(err, db_result){
	var result = {result: -1};

	if(err){
		result.msg = JSON.stringify(err);
	}
	else{
		if(db_result.affectedRows === 1){
			 result.result = 0;
		}
	}
	
	this.res.setHeader('Content-Type', 'application/json');
    this.res.end(JSON.stringify(result));
};

