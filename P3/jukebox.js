var playlist = [];

function createTrendingTable(){
	var table="<tr><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";
	var trending = [];
	var list = playlist.slice(0);
	trending = list;

	//for(i = 0; i<4; i++){
	//	var random = Math.floor(Math.random()*list.length);
	//	trending.push( list[random]);
	//	list.splice(random, 1);
	//}

	//Create the table from the sorted list
	for (i = 0; i <trending.length; i++) {
		table += createMusicTableRow(trending[i].a, trending[i].s);
	}
	document.getElementById("searchMusic").innerHTML = table;
}

function searchMusic(){
	var results = [];
	var i;

	var textInput = document.getElementById("musicSearchBox");
	var str = textInput.value;

	for (i = 0; i<playlist.length; i++){
		//if(results.length >= 4)
		//	break;
		var author = playlist[i].a.toUpperCase();
		var song = playlist[i].s.toUpperCase();
		if( (author.search(str.toUpperCase()) > -1) ||
			(song.search(str.toUpperCase()) > -1) ){
			results.push(playlist[i]);
		}
	}
	
	var table="<tr><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";
	for (i = 0; i <results.length; i++) {
		table += createMusicTableRow(results[i].a, results[i].s);
	}
	document.getElementById("searchMusic").innerHTML = table;
}

function voteFor(author, song){
	document.getElementById("votedMusicName").innerHTML = author + " - " + song;
	hide("searchMusicMenu");
	show("confirmVoteMenu");
}
