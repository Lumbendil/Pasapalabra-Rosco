var currentTimeout;
var lletres = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "X", "Y", "Z" ];
var current = 0;
var encerts = 0;
var temps	= 1200;
var continuo = false;

function toCercle( array, diametre )
{
	// Nomes funciona per nombres parells
	r = diametre/2;
	for( i = 0; i < array.length / 2; i++)
	{
		xFirst	= diametre*i*2/array.length;
		xLast	= xFirst + diametre*2/array.length;
		$("#" + array[i]).css({position: "absolute", top: xFirst, left: Math.sqrt(Math.pow(r,2) - Math.pow(xFirst-r,2)) + r});
		$("#" + array[array.length - i - 1]).css({position: "absolute", top: xLast, left: r - Math.sqrt(Math.pow(r,2) - Math.pow(xLast-r,2))});
	}
}
function timerRun()
{
	temps = temps - 1;
	if( temps > 0 )
	{
		$("#reloj").html( temps%10 == 0 ? temps/10 + ".0" : temps/10);
		currentTimeout = setTimeout("timerRun()",100);
		$("#" + lletres[current]).css({ backgroundImage: "url(./current.gif)" });
	}
	else
	{
		$("#" + lletres[current]).css({ backgroundImage: "url(./default.jpg)" });
	}
}

function timerStop()
{
	clearTimeout( currentTimeout );
}

function checkEnd()
{
	if ( Number($("#encerts").html()) + Number($("#errors").html()) == lletres.length )
	{
		timerStop();
		alert( "Rosco acabat amb " + Number($("#encerts").html()) + " encerts i " + Number($("#errors").html()) + " errors. Quedaven " + temps + " segons."); 
	}
}

function encertat()
{
	encerts++;
	var lletra = lletres.splice(current,1);
	if (current >= lletres.length)
	{
		current = 0;
	}
	$("#" + lletra).css({ backgroundImage: "url(./correct.jpg)" });
	$("#" + lletres[current]).css({ backgroundImage: "url(./current.gif)" });
	$("#encerts").html( Number($("#encerts").html()) + 1 );
}

function error()
{
	if(!continuo)
	{
		timerStop();
	}
	var lletra = lletres.splice(current,1);
	if (current >= lletres.length)
	{
		current = 0;
	}
	$("#" + lletra).css({ backgroundImage: "url(./wrong.jpg)" });
	$("#" + lletres[current]).css({ backgroundImage: "url(./default.jpg)" });
	$("#errors").html( Number($("#errors").html()) + 1 );
}

function pasapalabra()
{
	if(!continuo)
	{
		timerStop();
	}
	var lletra = lletres[current];
	current = current + 1;
	if (current >= lletres.length)
	{
		current = 0;
	}
	$("#" + lletra).css({ backgroundImage: "url(./default.jpg)" });
	$("#" + lletres[current]).css({ backgroundImage: "url(./default.jpg)" });
}
function acontinuo()
{
	continuo = true;
}
$(function()
{
	$("#start").click(timerRun);
	$("#encertat").click(encertat);
	$("#fallat").click(error);
	$("#pasapalabra").click(pasapalabra);
	$("#acontinuo").click(acontinuo);
	var i;
	for(i = 0; i < lletres.length; i++)
	{
		$("#content").append("<span id=\"" + lletres[i] + "\"><span>" + lletres[i] + "</span></span>");
	}
	toCercle(lletres,300);
});