var isHeaderSet=true;
function headerToggle(){
	timer=1500;
	if(isHeaderSet){
		$(".leftButton").each(function(e,t){$(this).animate({"margin-left":"+=-1000"},timer,"easeInOutElastic");timer+=250});
	}
	else{
		$(".leftButton").each(function(e,t){$(this).animate({"margin-left":"+=+1000"},timer,"easeInOutElastic");timer+=250});
	}
	isHeaderSet=!isHeaderSet;
}
// put this in 3script later
function setEvents()
{
	var transformTime = 1500;
	
	var button = document.getElementById( 'page' );
	button.addEventListener( 'click', function ( event ) {transform(currentPage.WGLobjects, currentPage.targets.page, transformTime, transformTime, currentPage.tweens );}, false );

	var button = document.getElementById( 'sphere' );
	button.addEventListener( 'click', function ( event ) {transform(currentPage.WGLobjects, currentPage.targets.sphere, transformTime, transformTime, currentPage.tweens );}, false );

	var button = document.getElementById( 'helix' );
	button.addEventListener( 'click', function ( event ) {transform(currentPage.WGLobjects, currentPage.targets.helix, transformTime, transformTime, currentPage.tweens );}, false );

	var button = document.getElementById( 'grid' );
	button.addEventListener( 'click', function ( event ) {transform(currentPage.WGLobjects, currentPage.targets.grid, transformTime, transformTime, currentPage.tweens );}, false );

	var button = document.getElementById( 'next' );
	button.addEventListener( 'click', function ( event ) {getNextPage();}, false );
	
	window.addEventListener( 'resize', onWindowResize, false );
}

var alpha=0;
function VScroll(isScrollUp)
{
	var resultTable=[];
	var maxAngle = ( currentPage.pageRect.bottom - currentPage.pageRect.top - window.innerHeight + headerLength + footerLength ) / pivot.z ;
	//console.log(maxAngle+":::::"+alpha);
	if ( !isScrollUp)
	{
		if (alpha - Math.PI/180 < maxAngle) return;
		alpha-=Math.PI/180;
	}
	else
	{
		if (alpha + Math.PI/180 > 0) return;
		alpha+=Math.PI/180;
	}
	getNextScroll(currentPage.targets.page, currentPage.initialPositions, resultTable, alpha);
	transform(currentPage.WGLobjects, resultTable, 1000, 1000, currentPage.tweens);
}

function extractDelta(e) 
{
    if (e.wheelDelta) 
	{
        return e.wheelDelta;
    }
    if (e.originalEvent.detail) 
	{
        return e.originalEvent.detail * -40;
    }
    if (e.originalEvent && e.originalEvent.wheelDelta) 
	{
        return e.originalEvent.wheelDelta;
    }
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
$(window).bind(mousewheelevt, function(event) 
{
	var delta = extractDelta(event);
	if (delta >= 0)
	VScroll(true);
	else 
	VScroll(false);
});

function system()
{
	// in 3script.js
	start();
	$(".logo").click(headerToggle);
	headerToggle();
	//headerToggle();
	// controlling mouse
	var colors = ["Mech Events", "Engineer", "Mathematica", "yellow", "brown", "black"];
	//console.log(camera.position);
	$('.searchBox').typeahead({source: colors});
}
window.onload=system;
