var playlist = [];
var votedFor = null;
var favorites = [];

function toFirst(list, author, song){
	for (i=0; i<list.length; i++){
		if((list[i].a == author) && (list[i].s == song)){
			var element = list[i];
			list.splice(i, 1);
			list.splice(0, 0, element);
			return true;
		}
	}
	return false;
}

function createHighlightedRow(author, song){
	return "<td>" + author + "</td><td>" + song + "</td><td>&nbsp;</td>";

}

function createTrendingTable(){
	var table="<tr><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";
	var trending = [];
	var list = playlist.slice(0);
	trending = list;

	//Get the music that was previously voted for in first place
	if (votedFor != null){
		toFirst(trending, votedFor.a, votedFor.s);
	}

	//Create the table from the sorted list
	for (i = 0; i <trending.length; i++) {
		if(votedFor != null && i == 0)
			table += "<tr class=\"votedFor\">" + createHighlightedRow(trending[i].a, trending[i].s) + "</tr>";
		else
			table += "<tr>" + createMusicTableRow(trending[i].a, trending[i].s) + "</tr>";
	}
	document.getElementById("searchMusic").innerHTML = table;
}

function showFavorites(){
	var table="<tr><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";

	if(favorites.length == 0){
		document.getElementById("searchMusic").innerHTML = "<br>Ainda não tem favoritos. Para adicionar musicas aos seus favoritos tem de votar primeiro.";
		return;
	}

	for (i = 0; i <favorites.length; i++) {
		if(votedFor != null && i == 0)
			table += "<tr class=\"votedFor\">" + createHighlightedRow(favorites[i].a, favorites[i].s) + "</tr>";
		else
			table += "<tr>" + createMusicTableRow(favorites[i].a, favorites[i].s) + "</tr>";
	}
	document.getElementById("searchMusic").innerHTML = table;
}

function showTrending(){
	var table="<tr><td class=\"pos\"></td><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";
	var trending = [];
	var list = playlist.slice(0);

	for(i = 0; i<10; i++){
		var random = Math.floor(Math.random()*list.length);
		trending.push( list[random]);
		list.splice(random, 1);
	}
	

	//Get the music that was previously voted for in first place
	if (votedFor != null){
		trending.push(votedFor);
		toFirst(trending, votedFor.a, votedFor.s);
	}

	for (i = 0; i <trending.length; i++) {
		if(votedFor != null && i == 0)
			table += "<tr class=\"votedFor\">" + "<td>" + (i+1) + ".</td>" + createHighlightedRow(trending[i].a, trending[i].s) + "</tr>";
		else
			table += "<tr>" + "<td>" + (i+1) + ".</td>" +  createMusicTableRow(trending[i].a, trending[i].s) + "</tr>";
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

	var includesVotedFor = false;
	if(votedFor!= null){
		includesVotedFor = toFirst(results, votedFor.a, votedFor.s);
	}

	var table="<tr><td class=\"autor\"><b>Autor</b></td><td class=\"musica\"><b>Musica</b></td><td class=\"add\"></td></tr>";
	for (i = 0; i <results.length; i++) {
		if(includesVotedFor && i == 0)
			table += "<tr class=\"votedFor\">" + createHighlightedRow(results[i].a, results[i].s) + "</tr>";
		else
			table += "<tr>" + createMusicTableRow(results[i].a, results[i].s) + "</tr>";
	}
	document.getElementById("searchMusic").innerHTML = table;
}

function voteFor(author, song){
	document.getElementById("votedMusicName").innerHTML = author + " - " + song;
	votedFor = {
		a:author,
		s:song
	};
	favorites.push(votedFor);
	toFirst(favorites, author, song);
	hide("searchMusicMenu");
	show("confirmVoteMenu");
}

function cancelVote(){
	votedFor = null;
	showMusicSearch();
}
