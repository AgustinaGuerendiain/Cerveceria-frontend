document.addEventListener('DOMContentLoaded', function(){
    "use strict";

    let btnEnviar = document.getElementById("boton-enviar").addEventListener("click",VerificarCaptcha);


    function VerificarCaptcha(){
        let textIngresado = document.getElementById("txtcaptcha");
        let cap = document.getElementById("captcha");
        let textvalidacion= document.getElementById("validacionCaptcha");

        if (textIngresado.value == cap.innerHTML){
            textvalidacion.innerHTML = ("La suscripcion al newsletter se ha efectuado con exito");
            textvalidacion.classList.remove("incorrecto");
            textvalidacion.classList.add("correcto");
            btnEnviar.disabled = true;
        } else {
            textvalidacion.innerHTML = ("El texto ingresado es Incorrecto");
            textvalidacion.classList.add("incorrecto");
            GeneradorCaptcha();
            
        };
    }

    function GeneradorCaptcha(){
        let indice;
        let character;
        let captcha = "";

        for (indice = 0; indice <6; indice++){

            character = GeneradorLetraONumero();
            captcha = captcha + character;
        } 

        let tituloCaptcha = document.getElementById("captcha");
        tituloCaptcha.innerHTML = captcha;
    }

    function GeneradorLetraONumero(){

        let Num_o_Letra = Math.floor((Math.random()*10)+1);
        let valor;
        if (Num_o_Letra %2 == 0) {
            valor = numeroRandom();
        }else {
            valor = letraRandom();
        }
        return valor;    
    }

    function letraRandom (){
        let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 

        let letra = Math.floor((Math.random()*26));
        return abecedario [letra];
    }

    function numeroRandom (){
        let numero = Math.floor((Math.random()*10));
        
        return numero.toString();
    }
    
    GeneradorCaptcha();
});