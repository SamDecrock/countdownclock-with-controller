App = {
	sounds : {
		_2minutes: {
			audioEl: null,
			src: '/sounds/2minuten.mp3'
		},
		_1minute: {
			audioEl: null,
			src: '/sounds/1minuut.mp3'
		},
		_12sec: {
			audioEl: null,
			src: '/sounds/12sec.mp3'
		},
		banana: {
			audioEl: null,
			src: '/sounds/banana.mp3'
		}
	},

	init: function(){
		if(!App.socket){
			// socket.io initialiseren
			App.socket = io.connect(window.location.hostname);
			// some debugging statements concerning socket.io
			App.socket.on('reconnecting', function(seconds){
				console.log('reconnecting in ' + seconds + ' seconds');
			});
			App.socket.on('reconnect', function(){
				console.log('reconnected');
			});
			App.socket.on('reconnect_failed', function(){
				console.log('failed to reconnect');
			});
		}

		for(var s in App.sounds){
			App.sounds[s].audioEl = document.createElement("audio");
			App.sounds[s].audioEl.setAttribute("src", App.sounds[s].src);
		}

		App.socket.on('starttimer', App.starttimer);
		App.socket.on('banana', App.banana);
		App.socket.on('stopbanana', App.stopbanana);
	},

	starttimer: function(){
		$("body").empty();

		if(App.timer0) clearTimeout(App.timer0);
		if(App.timer1) clearTimeout(App.timer1);
		if(App.timer1) clearTimeout(App.timer2);

		var maxWidth = $(window).width();
		var maxHeight = $(window).height();

		var width, height;
		if(80/200 > maxHeight/maxWidth){
			height = maxHeight;
			width = maxHeight*200/80;
		}else{
			width = maxWidth;
			height = maxWidth*80/200;
		}

		App.playSound('_2minutes');

		App.timer0 = setTimeout(function(){
			App.countdown = new Countdown({
				time: 120,
				width: width,
				height: height,
				rangeHi:"minute"
			});

			App.timer1 = setTimeout(function(){
				App.playSound('_1minute');
			}, 59*1000);

			App.timer2 = setTimeout(function(){
				App.playSound('_12sec');
			},107*1000);

		}, 8000);
	},

	banana: function(){
		App.playSound('banana');
	},

	stopbanana: function(){
		App.stopSound('banana');
	},

	playSound: function(sound){
		App.sounds[sound].audioEl.currentTime = 0;
		App.sounds[sound].audioEl.volume = 1;
		App.sounds[sound].audioEl.play();
	},

	stopSound: function(sound){
		$(App.sounds[sound].audioEl).animate({volume: 0}, 500);

		setTimeout(function(){
			App.sounds[sound].audioEl.pause();
		}, 600);
	}
};

$(App.init);