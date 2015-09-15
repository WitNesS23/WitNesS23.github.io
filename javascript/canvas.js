var canvasBigWhite = document.getElementById('canvas-bigwhite');

canvasBigWhite.width = 500;
canvasBigWhite.height = 300;

var contextBigWhite = canvasBigWhite.getContext('2d');

contextBigWhite.clearRect(0, 0, canvasBigWhite.width, canvasBigWhite.height);
contextBigWhite.beginPath();

contextBigWhite.fillStyle = 'white';
contextBigWhite.arc(30, 100, 30, 0, Math.PI * 2, false);

contextBigWhite.fill();

contextBigWhite.closePath();

contextBigWhite.beginPath();

contextBigWhite.fillStyle = 'white';
contextBigWhite.arc(300, 30, 30, 0, Math.PI * 2, false);

contextBigWhite.fill();

contextBigWhite.closePath();

contextBigWhite.beginPath();

contextBigWhite.strokeStyle = 'white';
contextBigWhite.lineWidth = 10;
contextBigWhite.moveTo(30, 100);

contextBigWhite.quadraticCurveTo(167, 85, 300, 30);

contextBigWhite.stroke();

contextBigWhite.closePath();

function eyeBlinkWrap(){

	var key = 0;

	var changeState = 1;

	function ReDraw(step){
		contextBigWhite.clearRect(0, 0, canvasBigWhite.width, canvasBigWhite.height);
		contextBigWhite.beginPath();

		contextBigWhite.fillStyle = 'white';
		contextBigWhite.arc(30, 100, 30, Math.PI * (0.58 + step), Math.PI * (2.58 - step), false);

		contextBigWhite.fill();

		contextBigWhite.closePath();

		contextBigWhite.beginPath();

		contextBigWhite.fillStyle = 'white';
		contextBigWhite.arc(300, 30, 30, Math.PI * (0.25 + step), Math.PI * (2.25 - step), false);

		contextBigWhite.fill();

		contextBigWhite.closePath();

		contextBigWhite.beginPath();

		contextBigWhite.strokeStyle = 'white';
		contextBigWhite.lineWidth = 10;
		contextBigWhite.moveTo(30, 100);

		contextBigWhite.quadraticCurveTo(167, 85, 300, 30);

		contextBigWhite.stroke();

		contextBigWhite.closePath();
	}

	var timer = setInterval(eyeBlink, 6);

	function eyeBlink(){
		if(key <= 0){
			changeState = 1;
			key += 0.0008 * changeState;
		}else if(key > 0 && key <= 0.2){
			ReDraw(key);
			key += 0.0008 * changeState;
		}else{
			timer = 0;
		}
	}
}