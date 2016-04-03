var currentMainMenuScreen = "mainMenu";

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

}

function pressOrder(){
	updatePendingOrders();
	hide("homeButtons");
	show("orderMenu");
}

function pressBack(){
	if (currentMainMenuScreen == "choiceMenu")
		backToMainMenu();
	else if (currentMainMenuScreen == "mainMenu")
		closeOrder();
}

function closeOrder(){
	show("homeButtons");
	hide("orderMenu");
}

function showOptions(xmlDocumentName){
	currentMainMenuScreen = "choiceMenu";
	hide("mainMenu");
	show("choiceMenu");
	loadXMLDoc(xmlDocumentName);
}

function backToMainMenu(){
	currentMainMenuScreen = "mainMenu";
	hide("choiceMenu");
	show("mainMenu");
}

