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
	hide("voteButton");
	show("jukeboxExtended");
	loadMusicXMLDoc("database/Musicas.xml");
}
function closeVote(){
	show("voteButton");
	hide("jukeboxExtended");
	hide("confirmVoteMenu");
	show("searchMusicMenu");
}

function showMusicSearch(){
	hide("confirmVoteMenu");
	show("searchMusicMenu");
}

function showBill(){
	updateBill();
	hide("billCollapsed");
	show("billExtended");
}

function hideBill(){
	hide("billExtended");
	show("billCollapsed");
}

function pressPrizes(){
	pressBack();
	currentMainMenuScreen = "prizeMenu";
	show("prizesMenu");
}

function pressOrder(){
	updatePendingOrders();
	pressBack();
	currentMainMenuScreen = "mainMenu";
	show("orderMenu");
}

function pressPersonalize(xmlDocumentName){
	//updatePendingOrders();
	pressBack();
	currentMainMenuScreen = "personalizeMenu";
	showOptionsPersonalize(xmlDocumentName);
	show("personalizeMenu");
}

function pressBack(){
	if (currentMainMenuScreen == "choiceMenu")
		backToMainMenu();
	else if (currentMainMenuScreen == "mainMenu")
		closeOrder();
	else if (currentMainMenuScreen == "prizeMenu")
		closePrize();
	else if (currentMainMenuScreen == "personalizeMenu")
		closePersonalize();
}

function closeOrder(){
	//show("homeButtons");
	hide("orderMenu");
}

function closePrize(){
	//show("homeButtons");
	hide("prizesMenu");
}

function closePersonalize(){
	//show("homeButtons");
	hide("personalizeMenu");
}

function showOptionsPersonalize(xmlDocumentName){
	currentMainMenuScreen = "personalizeMenu";
	show("ingredientsMenu");
	loadIngredientsXMLDoc(xmlDocumentName);
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

function pressPay(){
	window.location.href = "index.html"; 
}

function onPageLoad(){
	Horario();
	loadPrizes();
}
