#!/usr/bin/env node

var mysql = require('mysql');

exports = module.exports = UserDAO;

function UserDAO() {
	this.host = '10.1.41.30';
	this.port = 3306;
	this.user = 'vod_web';
	this.passwd = 'qwe123';
}

UserDAO.prototype.get_user_by_name = function(name, handler) {
	var conn = mysql.createConnection({
		host: this.host,
		user: this.user,
		password: this.passwd,
	});

	conn.connect();

	conn.query('select id, name, passwd from xl_ddz.user where name = ?', [name], function(err, rows, fields) {
		if(handler) {
			handler.on_db_result(err, rows, fields);
		}
		
		conn.end();
	});
}

UserDAO.prototype.get_user_by_id = function(id, handler, handler_args) {
	var conn = mysql.createConnection({
		host: this.host,
		user: this.user,
		password: this.passwd,
	});

	conn.connect();

	conn.query('select id, name, passwd from xl_ddz.user where id = ?', [id], function(err, rows, fields) {

	if(handler) {
		handler(err, rows, handler_args);
	}
		
		conn.end();
	});
}

UserDAO.prototype.add_user = function(name, passwd, handler) {
	var conn = mysql.createConnection({
		host: this.host,
		user: this.user,
		password: this.passwd,
	});

	conn.connect();

	conn.query('insert into xl_ddz.user(name, passwd) values(?, ?)', [name, passwd], function(err, result) {
		if(handler){
			handler.on_db_result(err, result);
		}
	
		conn.end();
	});
}

