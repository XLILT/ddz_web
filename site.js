#!/usr/bin/env node

var DAO = require('./dao');

exports = module.exports = Site;

function Site() {
	this.seat_count = 3;
	this.player_count = 0;
	this.players = [null, null, null];
}

Site.prototype.get_players = function() {
	return this.players;
}

Site.prototype.try_seat = function(uid, handler, res) {
	var dao	= new DAO;
	dao.get_user_by_id(uid, handler, res);
}

Site.prototype.add_player = function(player, index) {
	if(this.player_count >= 3) {
		return;
	}
	
	var already_sited = false;
	this.players.forEach(function(p) {
		if(p && p.id === player.id) {
			already_sited = true;
		}
	});

	if(already_sited) {
		return;
	}

	if(index && index >= 0 && index < 3) {
		if(this.players[index] !== null) {
			this.players[index] = player;
			this.player_count++;
		}
	}
	else {
		for(var i = 0; i < this.seat_count; i++) {
			if(this.players[i] === null) {
				this.players[i] = player;
				this.player_count++;
				break;
			}			
		}
	}
}

Site.prototype.remove_player = function(player) {
	if(this.player_count <= 0) {
		return;
	}

	for(var i = 0; i < this.seat_count; i++) {
		if(this.players[i] !== null && this.players[i].id === palyer.id) {
			this.players[i] = null;
			this.player_count--;
		}
	}
}

