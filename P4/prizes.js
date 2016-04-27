
//Roda de Premios

var imgSlide;
var pic1 = 0;
var pic2 = 1;
var pic3 = 2;
var spinning = 0;
var timer = null;
var images = [];

function loadPrizes(){
//window.onload = function (){
 
	imgSlide = document.getElementById('img');
	img2Slide = document.getElementById('img2');
	img3Slide = document.getElementById('img3');
	 
	// preload images
	images = new Array();
	for (i=0; i< 17; i++){
		images[i] = new Image();
		if(i == 3 || i == 10){
			images[i].src = "img/1bebida_1.png";
		}else if (i == 6)
			images[i].src = "img/1Comida.png";
		else if (i == 16)
			images[i].src = "img/1bebida_2.png";
		else
			images[i].src = "img/teve.png";
	}
 
}
 
function  startSlide(){
	if (spinning == 0){
		if (currentCredits >= 1){
			hideAllMessages();
			spinning = 1;
			slide();			
		}else{
			hideAllMessages();
			show("errorCredits");
		}
	}
	else{
		hideAllMessages();
		show("errorAlreadySpining");		
	}
}
 
function slide(){
	imgSlide.src = images[pic1].src;
	img2Slide.src = images[pic2].src;
	img3Slide.src = images[pic3].src;
	if(pic1 < 16){
		pic1++;
	}else{
		pic1 = 0;
	}
	if(pic2 < 16){ 
		pic2++;
	}else{
		pic2 = 0;
	}
	if(pic3 < 16){ 
		pic3++;
	}else{
		pic3 = 0;
	}
	timer = setTimeout(slide, 50);
}
 
function stopSlide(){
	if ( spinning == 1){		
		hideAllMessages();
		currentCredits -= 1;
		updateBill();
		clearTimeout(timer);
		spinning = 0;
	}else{
		hideAllMessages();
		show("errorSpining");
		return;	
	}
	var newPrize = {
		name:"",
		credits:0,
		price:0,
		amount:1
	};
	if ((img2Slide.src == images[3].src) || (img2Slide.src == images[16].src)){
		newPrize.name = "Prémio - Bebida (2€)";
		placedOrders.push(newPrize);
	}else if (img2Slide.src == images[6].src){
		newPrize.name = "Prémio - Comida";
		placedOrders.push(newPrize);
	}else if (img2Slide.src == images[10].src){
		newPrize.name = "Prémio - Bebida (5€)";
		placedOrders.push(newPrize);
	}
	updateBill();	
}

// Forces the Slide to stop.
function stopSlideForced(){
	spinning = 0;
	clearTimeout(timer);
	show("homeButtons");
	hide("prizesMenu");
	hideAllMessages();
}

function hideAllMessages(){
	hide("errorCredits");
	hide("errorSpining");
	hide("errorAlreadySpining");
}
