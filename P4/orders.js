var pendingOrder = [];
var pendingOrderPersonalize = [];
var placedOrders = [];
var personalizedDrinks = [];
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

function wipePendingOrders(){
	pendingOrder = [];
	updatePendingOrders();
}

//Personalize Drink functions
function placePendingOrderPersonalize(orderName, orderCredits, orderPrice){
	var i;
	for (i=0; i<pendingOrderPersonalize.length; i++){
		if(pendingOrderPersonalize[i].name == orderName){
			pendingOrderPersonalize[i].amount += 1;
			updatePendingOrdersPersonalize();
			return;
		}
	}
	/*if (orderName == "Bebida Personalizada"){
		var newOrder = {
			name:orderName,
			credits:orderCredits,
			price:orderPrice,
			amount:1
		};
		
	}else{*/
		var newOrder = {
			name:orderName,
			credits:orderCredits,
			price:orderPrice,
			amount:1
		};
	//}
	
	pendingOrderPersonalize.push(newOrder);
	updatePendingOrdersPersonalize();
}

function removePendingPersonalize(orderName){
	var i;
	for (i=0; i<pendingOrderPersonalize.length; i++){
		if(pendingOrderPersonalize[i].name == orderName){
			pendingOrderPersonalize[i].amount -= 1;
			if (pendingOrderPersonalize[i].amount < 1){
				pendingOrderPersonalize.splice(i, 1);
			}
			updatePendingOrdersPersonalize();
			return;
		}
	}
	updatePendingOrdersPersonalize();
}

function updatePendingOrdersPersonalize(){
	var i;
	var table="<tr><td class=\"name\"></td><td></td><td class=\"price\"></td></tr>";
	for (i = 0; i <pendingOrderPersonalize.length; i++) {
		var name = pendingOrderPersonalize[i].name;
		var price = pendingOrderPersonalize[i].price;
		var amount = pendingOrderPersonalize[i].amount;
		table += "<tr><td width=\"100\">" + name +
			"</td><td>" + "x" + amount +
			"</td><td style=\"text-align:right\">" + (price*amount) + "&euro;" +
			"</td></tr>";
	}
	document.getElementById("pendingOrderTablePersonalize").innerHTML = table;
}

function wipePendingOrdersPersonalize(){
	pendingOrderPersonalize = [];
	updatePendingOrdersPersonalize();
}

function confirmPendingOrdersPersonalize(){
	
	if(pendingOrderPersonalize.length > 0){
		//Update the current credits
		var i;
		var creditos = 0;
		var preco = 0;
		var ingredientes = [];
		for (i=0; i< pendingOrderPersonalize.length; i++){
			ingredientes += pendingOrderPersonalize[i].name + "/" + pendingOrderPersonalize[i].amount + ";";
			preco += pendingOrderPersonalize[i].price * pendingOrderPersonalize[i].amount;
			creditos += (pendingOrderPersonalize[i].price * pendingOrderPersonalize[i].amount);
		}
		//ingredientes -= ";";
		currentCredits +=creditos;
		var newOrder = {
			name:"Bebida Personalizada",
			credits:creditos,
			price:preco,
			amount:1
		};
		
		var newPersonalized = {
			name:ingredientes,
			credits:creditos,
			price:preco,
			amount:1
		};
		
		
		//Put the new order on the bill
		personalizedDrinks = personalizedDrinks.concat(newPersonalized);
		placedOrders = placedOrders.concat(newOrder);
		pendingOrderPersonalize = [];
		updatePendingOrdersPersonalize();
		updatePersonalizedDrinks()
		backToMainMenu();
		closePersonalize();
		updateBill();
	}
}

function updatePersonalizedDrinks(){
	var i;
	var newDrink = 0;
	var table="<tr><td></td><td class=\"name\"></td><td></td><td class=\"price\"></td></tr>";
	for (i = 0; i <personalizedDrinks.length; i++) {
		table += "<td> " + (i+1) + "</td>";
		var info = personalizedDrinks[i].name;
		var div1 = info.split(";"); 
		var price = personalizedDrinks[i].price;
		var amount = personalizedDrinks[i].amount;
		for (e = 0; e <div1.length-1; e++) {
			var ingrediente = div1[e];
			var div2 = ingrediente.split("/");
				if (newDrink == 0){
					table += "<tr bgcolor=\"#0075b3\"><td width=\"100\">";
				}else{
					table += "<tr><td width=\"100\">";				
				}
				for (a = 0; a <div2.length; a++) {
					var name = div2[a];
					var quantidade =div2[a + 1];
					a++;
						table +=  	name + 
									"</td><td>" + "x" + quantidade +
									"</td>";
					
					
				}
				table += "<br>";
			
		}
		table += "<td style=\"text-align:right\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (price*amount) + "&euro;" +
			"</td>"+
			"</td><td>" + "<img src=\"img/plus.png\" width=\"32\" onclick=\"placePendingOrderPersonalize('Bebida Personalizada " + (i+1) + "', " + price*amount + ", " + price + ")\" >" +
			"</tr>";
		if (newDrink == 0){
				newDrink = 1;
			}else{
				newDrink = 0;		
			}
	}
	document.getElementById("OrderTablePersonalize").innerHTML = table;
	
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
	table="<tr><td width=\"110px\"><hr><b>Total:</b></td><td width=\"210px\"><hr>" + currentCredits + "</td><td width=\"50px\" style=\"text-align:right\"><hr>" + totalPrice.toFixed(2) + "&euro;" + "</td></tr>";
	table += "<tr><td></td><td></td><td><div id=\"payBill\" class=\"button\" onclick=\"pressPay()\">Pagar</div></td></tr>";
	document.getElementById("billTotalTable").innerHTML = table;

	//Update the collapsed bill
	var collapsedTotal = "<b>Total:&nbsp;</b>" + totalPrice.toFixed(2) + "&euro;<br>";
	document.getElementById("billTotal").innerHTML = collapsedTotal;
	var collapsedCredits = "<b>Creditos:&nbsp;</b>" + currentCredits;
	document.getElementById("billCredits").innerHTML = collapsedCredits;
	document.getElementById("prizeCredits").innerHTML = collapsedCredits;
}

