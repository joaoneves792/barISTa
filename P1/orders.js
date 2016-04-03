var pendingOrder = [];
var placedOrders = [];


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
		price:orderCredits,
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
			"</td><td>" + (price*amount).toFixed(2) + "&euro;" +
			"</td></tr>";
	}
	document.getElementById("pendingOrderTable").innerHTML = table;
}
