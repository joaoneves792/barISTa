function loadXMLDoc(documentName){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			fillTable(xmlhttp);
		}
	};
	xmlhttp.open("GET", documentName, true);
	xmlhttp.send();
}

function fillTable(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	var table="<tr><td class=\"name\"><b>Nome</b></td><td class=\"credits\"><b>Créditos</b></td><td class=\"price\"><b>Preço</b></td><td class=\"add\"></td><td class=\"remove\"></td></tr>";
	var x = xmlDoc.getElementsByTagName("OPTION");
	var list = [];

	//Get it into an array of objects so we can sort it
	for (i = 0; i <x.length; i++) {
		var name = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
		var credits = x[i].getElementsByTagName("CREDITS")[0].childNodes[0].nodeValue;
		var price = x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;
		var newElement ={
			n:name,
			c:credits,
			p:price
		};
		list.push(newElement);
	}

	list.sort(function(a, b) {
		return a.n.localeCompare(b.n);
		});

	//Create the table from the sorted list
	for (i = 0; i <list.length; i++) {
		table += createTableRow(list[i].n, list[i].c, list[i].p);
	}
	document.getElementById("choiceMenuTable").innerHTML = table;
}

function createTableRow(name, credits, price){
	return  "<tr><td>" + name +
		"</td><td>" + credits +
		"</td><td style=\"text-align:right\">" + price + "&euro;" +
		"</td><td>" + "<img src=\"img/plus.png\" width=\"32\" onclick=\"placePendingOrder(\'" + escapeQuotes(name) + "\', " + credits + ", " + price + ")\" >" +
		"</td><td>" + "<img src=\"img/minus.png\" width=\"32\" onclick=\"removePendingOrder(\'" + escapeQuotes(name) + "\')\" >" +
		"</td></tr>";

}

function loadIngredientsXMLDoc(documentName){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			fillIngredientsTable(xmlhttp);
		}
	};
	xmlhttp.open("GET", documentName, true);
	xmlhttp.send();
}

function fillIngredientsTable(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	var table="<tr><td class=\"name\"><b>Nome</b></td><td class=\"credits\"><b>Créditos</b></td><td class=\"price\"><b>Preço</b></td><td class=\"add\"></td><td class=\"remove\"></td></tr>";
	var x = xmlDoc.getElementsByTagName("OPTION");
	var list = [];

	//Get it into an array of objects so we can sort it
	for (i = 0; i <x.length; i++) {
		var name = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
		var credits = x[i].getElementsByTagName("CREDITS")[0].childNodes[0].nodeValue;
		var price = x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;
		var newElement ={
			n:name,
			c:credits,
			p:price
		};
		list.push(newElement);
	}

	list.sort(function(a, b) {
		return a.n.localeCompare(b.n);
		});

	//Create the table from the sorted list
	for (i = 0; i <list.length; i++) {
		table += createPersonalizeTableRow(list[i].n, list[i].c, list[i].p);
	}
	document.getElementById("ingredientsMenuTable").innerHTML = table;
}



function createPersonalizeTableRow(name, credits, price){
	return  "<tr><td>" + name +
		"</td><td>" + credits +
		"</td><td style=\"text-align:right\">" + price + "&euro;" +
		"</td><td>" + "<img src=\"img/plus.png\" width=\"32\" onclick=\"placePendingOrderPersonalize(\'" + escapeQuotes(name) + "\', " + credits + ", " + price + ")\" >" +
		"</td><td>" + "<img src=\"img/minus.png\" width=\"32\" onclick=\"removePendingPersonalize(\'" + escapeQuotes(name) + "\')\" >" +
		"</td></tr>";

}


function escapeQuotes(string){
	string = string.replace(/["']/g, "\\\'");
	return string;
}

function loadMusicXMLDoc(documentName){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			createMusicList(xmlhttp);
		}
	};
	xmlhttp.open("GET", documentName, true);
	xmlhttp.send();
}

function createMusicList(xml) {
	if( playlist.length > 0){
		createTrendingTable();
		return;
	}
	
	var i;
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("OPTION");

	//Get it into an array of objects so we can sort it
	for (i = 0; i <x.length; i++) {
		var author = x[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
		var song = x[i].getElementsByTagName("SONG")[0].childNodes[0].nodeValue;
		var newElement ={
			a:author,
			s:song
		};
		playlist.push(newElement);
	}

	playlist.sort(function(a, b) {
		return a.s.localeCompare(b.s);
		});

	createTrendingTable();

}

function createMusicTableRow(author, song){
	return  "<td>" + author +
		"</td><td>" + song +
		"</td><td>" + "<img src=\"img/plus.png\" width=\"32\" onclick=\"voteFor(\'" + escapeQuotes(author) + "\', \'" + escapeQuotes(song) + "\')\" >" +
		"</td>";

}
