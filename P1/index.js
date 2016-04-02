function hide(id){
	var element = document.getElementById(id);
	element.style.display = 'none';
}

function show(id){
	var element = document.getElementById(id);
	element.style.display = 'block';
}

function pressVote(){
	
}

function showBill(){
	hide("billCollapsed");
	show("billExtended");
}

function hideBill(){
	hide("billExtended");
	show("billCollapsed");
}

function pressPrizes(){
	show("jukeboxCollapsed");
}

function pressOrder(){
	hide("orderButton");
	hide("prizesButton");
	show("orderMenu");
}

function closeOrder(){
	show("orderButton");
	show("prizesButton");
	hide("orderMenu");
}


