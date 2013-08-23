App = {

	init: function(){
		$("#startimer").click(function(event){
			$.post('/rest/starttimer', {}, function (data){
				alert(data)
			});
		});

		$("#banana").click(function(event){
			$.post('/rest/banana', {}, function (data){
				alert(data)
			});
		});

		$("#stopbanana").click(function(event){
			$.post('/rest/stopbanana', {}, function (data){
				alert(data)
			});
		});
	}
};

$(App.init);