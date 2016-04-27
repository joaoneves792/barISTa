	var Elem = document.getElementById("clock");

  function Horario(){ 
	var horasatuais = "";
    var Hoje = new Date(); 
    var Horas = Hoje.getHours(); 
    var Minutos = Hoje.getMinutes(); 
    var Segundos = Hoje.getSeconds(); 
    if(Horas < 10){ 
      Horas = "0"+Horas; 
    } 
    if(Minutos < 10){ 
      Minutos = "0"+Minutos; 
    } 
    if(Segundos < 10){ 
      Segundos = "0"+Segundos; 
    } 
    //em.innerHTML = Horas + ":" + Minutos + ":" + Segundos; 
	horasatuais = Horas + " : " + Minutos; //": + Segundos; 
	document.getElementById("clock").innerHTML = horasatuais;
    setTimeout(Horario,1);
    //document.write("<br>");
	
	var now = new Date();
	var mes = now.getMonth() +1 ;
	var dia = now.getDate();
	var ano =now.getYear();

	if(dia < 10){
	  dia = "0" + dia;
	}
	if(mes < 10){
	  mes = "0" + mes;
	}
	if(mes ==10){
	  mes = "10";
	}
	if(mes == 11){
	  mes = "11";
	}
	if( mes == 12){
	mes = "12";
	}
	if(ano < 2000) {ano = 1900 + ano;}
	else {ano = ano;}
	var data =(dia + "/" + mes + "/" + ano);

	//document.write(data);
    } 
