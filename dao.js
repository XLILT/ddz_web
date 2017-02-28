#!/usr/bin/env node

var mysql = require('mysql');

exports = module.exports = UserDAO;

function UserDAO() {
	this.host = '10.1.41.30';
	this.port = 3306;
	this.user = 'vod_web';
	this.passwd = 'qwe123';
	this.db = 'xl_ddz';
}

UserDAO.prototype.get_user_by_name = function(name, handler) {
	var conn = mysql.createConnection({
		host: this.host,
		user: this.user,
		password: this.passwd,
		database: this.db
	});

	conn.connect();

	var user = [];
	conn.query('select name, passwd from xl_ddz.user where name = ?', [name], function(err, rows, fields) {
		if(err) {
			console.error(err);
			return false;
		}

		if(rows.length === 1) {
			user = rows;
		}
		
		conn.end();

		if(handler) {
			handler.on_db_result(rows);
		}
	});
}

UserDAO.prototype.add_user = function(name, passwd) {
	var conn = mysql.createConnection({
		host: this.host,
		user: this.user,
		password: this.passwd,
		database: this.db

	});

	conn.connect();

	conn.query('insert into xl_ddz.user(name, passwd) values(?, ?)', [name, passwd], function(err, result) {
		if(err) {
			console.error(err);
			return false;
		}

		console.log(result);
	});

	conn.end();
	return true;
}

