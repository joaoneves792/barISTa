function selectDeveloper(id) {  
	var photo = document.getElementById("photo" + id);
	photo.width=200;
        var name = document.getElementById("name" + id);
	name.style.color = '#336600';
	name.style.fontSize = '200%';
      	var num = document.getElementById("num" + id);
	num.style.color = '#336600';
	num.style.fontSize = '200%';
}
function unselectDeveloper(id) {    
	var photo = document.getElementById("photo" + id);
	photo.width=98;
      	var name = document.getElementById("name" + id);
	name.style.color = '#000000';
	name.style.fontSize = '100%';
      	var num = document.getElementById("num" + id);
	num.style.color = '#000000';
	num.style.fontSize = '100%';
}

function pressVote(){
	
}
