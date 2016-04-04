var pendingOrder = [];
var placedOrders = [];
var currentCredits = 0;

function placePendingOrder(orderName, orderCredits, orderPrice){
	var i;
	for (i=0; i<pendingOrder.length; i++){
		if(pendingOrder[i].name == orderName){
			pendingOrder[i].amount += 1;
			updatePendingOrders();
			return;
		}
	}
	var newOrder = {
		name:orderName,
		credits:orderCredits,
		price:orderPrice,
		amount:1
	};
	pendingOrder.push(newOrder);
	updatePendingOrders();
}

function removePendingOrder(orderName){
	var i;
	for (i=0; i<pendingOrder.length; i++){
		if(pendingOrder[i].name == orderName){
			pendingOrder[i].amount -= 1;
			if (pendingOrder[i].amount < 1){
				pendingOrder.splice(i, 1);
			}
			updatePendingOrders();
			return;
		}
	}
	updatePendingOrders();
}


function updatePendingOrders(){
	var i;
	var table="<tr><td class=\"name\"></td><td></td><td class=\"price\"></td></tr>";
	for (i = 0; i <pendingOrder.length; i++) {
		var name = pendingOrder[i].name;
		var price = pendingOrder[i].price;
		var amount = pendingOrder[i].amount;
		table += "<tr><td width=\"110\">" + name +
			"</td><td>" + "x" + amount +
			"</td><td style=\"text-align:right\">" + (price*amount).toFixed(2) + "&euro;" +
			"</td></tr>";
	}
	document.getElementById("pendingOrderTable").innerHTML = table;
}

function confirmPendingOrders(){
	if(pendingOrder.length > 0){
		//Update the current credits
		var i;
		for (i=0; i< pendingOrder.length; i++){
			currentCredits += pendingOrder[i].credits * pendingOrder[i].amount;
		}

		//Put the new order on the bill
		placedOrders = placedOrders.concat(pendingOrder);
		pendingOrder = [];
		backToMainMenu();
		closeOrder();
		updateBill();
	}
}

function updateBill(){
	var i;
	var totalPrice = 0;

	//Update the Expanded bill
	var table="<thead><tr><th width=\"200px\">Nome</th><th width=\"100px\">Créditos</th><th width=\"50px\">Quantidade</th><th width=\"50px\">Preço</th></tr></thead><tbody>";
	for (i = 0; i <placedOrders.length; i++) {
		var name = placedOrders[i].name;
		var credits = placedOrders[i].credits;
		var price = placedOrders[i].price;
		var amount = placedOrders[i].amount;
		totalPrice += price * amount;

		table += "<tr><td>" + name +
			"</td><td>" + (amount*credits) +
			"</td><td>" + "x" + amount +
			"</td><td style=\"text-align:right\">" + (price*amount).toFixed(2) + "&euro;" +
			"</td></tr>";
	}
	table += "</tbody>";
	document.getElementById("billTable").innerHTML = table;

	//Update the expanded bill total section
	table="<tr><td width=\"110px\"><hr><b>Total:</b></td><td width=\"180px\"><hr>" + currentCredits + "</td><td width=\"50px\" style=\"text-align:right\"><hr>" + totalPrice.toFixed(2) + "&euro;" + "</td></tr>";
	table += "<tr><td></td><td></td><td><div id=\"payBill\" class=\"button\">Pagar</div></td></tr>";
	document.getElementById("billTotalTable").innerHTML = table;

	//Update the collapsed bill
	var collapsedTotal = "<b>Total:&nbsp;</b>" + totalPrice.toFixed(2) + "&euro;<br>";
	document.getElementById("billTotal").innerHTML = collapsedTotal;
	var collapsedCredits = "<b>Creditos:&nbsp;</b>" + currentCredits;
	document.getElementById("billCredits").innerHTML = collapsedCredits;
}


//Roda de Premios

var imgSlide;
var pic1 = 0;
var pic2 = 1;
var pic3 = 2;
var spinning = 0;
var timer = null;

window.onload = function (){
 
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
			hide("errorCredits");
			hide("errorSpining");
			spinning = 1;
			slide();			
		}else{
			show("errorCredits");
		}
	}
	else{
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
		hide("errorAlreadySpining");
		currentCredits -= 1;
		var collapsedCredits = "<b>Créditos:&nbsp;</b>" + currentCredits;
		document.getElementById("billCredits").innerHTML = collapsedCredits;
		clearTimeout(timer);
		spinning = 0;
	}else{
		show("errorSpining");	
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
	clearTimeout(timer);
	show("homeButtons");
	hide("prizesMenu");
	hide("errorCredits");
	hide("errorSpining");
	hide("errorAlreadySpining");
}

