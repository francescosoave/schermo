$(document).ready(function() {
	$('#myLog').hide();
	setTimer(0);
});

function setTimer(evt){

	var canvas = document.getElementById("myCanvas");
	var log = document.getElementById("myLog");
	canvas.style.color = "black";
	canvas.innerHTML = "00:00";

	$.ajax ({
		url: "ajax.php",
		data: { val : evt },
		success: function( result ) {
			if (result == evt){
				if(evt == 0){
					canvas.style.color = "black";
					canvas.innerHTML = "00:00";
				}else{
					$('#myLog').hide();
					countdown(evt, 0);
				}
			}else{
				canvas.style.color = "red";
				canvas.innerHTML = "ERR";
				$('#myLog').show();
				log.innerHTML = result;
			}
		}
	});

	function countdown(minutes, seconds)
	{
		var endTime, hours, mins, msLeft, time;

		function twoDigits( n )
		{
			return (n <= 9 ? "0" + n : n);
		}

		function updateTimer()
		{
			canvas.style.color = "black";
			canvas.innerHTML = "00:00"; //clear canvas
			msLeft = endTime - (+new Date);
			if ( msLeft < 1000 )				
				flashyText();
			else {
				canvas.style.color = "white";
				time = new Date( msLeft );
				hours = time.getUTCHours();
				mins = time.getUTCMinutes();
				canvas.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds());
				setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
			}
		}

		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	function flashyText() {
		var count = 1000000,
		timer = setInterval(function() {
			count--;
			if( count%2 == 1) {
				canvas.style.color = "red";
				canvas.innerHTML = "00:00"
			}
			else {
				canvas.style.color = "black";
				canvas.innerHTML = "00:00";
			}
			if( count == 0) clearInterval(timer);
		},1000);
	}

}