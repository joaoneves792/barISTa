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
	for (i = 0; i <x.length; i++) {
		var name = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
		var credits = x[i].getElementsByTagName("CREDITS")[0].childNodes[0].nodeValue;
		var price = x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;
		table += "<tr><td>" + name +
			"</td><td>" + credits +
			"</td><td style=\"text-align:right\">" + price + "&euro;" +
			"</td><td>" + "<img src=\"plus.png\" width=\"32\" onclick=\"placePendingOrder(\'" + name + "\', " + credits + ", " + price + ")\" >" +
			"</td><td>" + "<img src=\"minus.png\" width=\"32\" onclick=\"removePendingOrder(\'" + name + "\')\" >" +
			"</td></tr>";
	}
	document.getElementById("choiceMenuTable").innerHTML = table;
}
