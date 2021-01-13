document.addEventListener('DOMContentLoaded', function(){
    "use strict";

    let botonMenu = document.getElementById("menuBtn").addEventListener("click",activarMenu);

    let menuActivo = false;

    function activarMenu () {
        document.getElementById("menuNav").classList.toggle("menuVisible");

        if ( menuActivo==false){
            document.getElementById("btnIcon").src="img/equis.png";
            menuActivo = true;
        }else {
            document.getElementById("btnIcon").src="img/btnMenu.png";
            menuActivo = false; 
        };
    }
});
