// Obtener datos:
const cajaEntrada = document.querySelector('#entrada-valor');
const cajaInformacion = document.querySelector('#informacion');
// Botones:
const btnEnviar = document.querySelector('#resultado');
const btnJuegoNuevo = document.querySelector('#juegoNuevo');
// Colocar datos:
const intentosAnteriores = document.querySelector('#intentos-anteriores');
const cajaAlerta = document.querySelector('#caja-alerta');
const alerta = document.querySelector('#alerta');
const pista = document.querySelector('#pista');

let intentos = 0;
let numeroAleatorio = Math.floor(Math.random() * 100 + 1);

const removerClaseCaja = (nombreCaja, propiedad) => {
	nombreCaja.classList.contains(propiedad)
		? nombreCaja.classList.remove(propiedad)
		: null;
};

const mensajesCaja = (txtAlerta, claseColor, txtPista) => {
	alerta.textContent = txtAlerta;
	cajaAlerta.classList.add(claseColor);
	pista.textContent = txtPista;
};

const numeroMayorMenor = (numero, adivino) => {
	if (adivino) {
		removerClaseCaja(cajaAlerta, 'w3-red');
		mensajesCaja('Adivinaste :D ', 'w3-green', 'Bien Jugado');
	} else {
		intentosAnteriores.textContent += numero + ' ';

		mensajesCaja(
			'Equivocado :C ',
			'w3-red',
			numero > numeroAleatorio
				? ' El numero es muy grande'
				: 'El numero es muy pequeño'
		);
	}
};

btnEnviar.addEventListener('click', () => {
	const valorCaja = Number(cajaEntrada.value); // Pasamos el valor por parametro de number, para asegurarnos que sea un numero
	if (!valorCaja) {
		alert('ingrese un valor en la caja');
		return;
	}

	intentos++;

	if (intentos == 10) {
		mensajesCaja('¡¡¡Fin del juego!!!', 'w3-red', '');
		btnEnviar.classList.add('w3-hide');
		removerClaseCaja(btnJuegoNuevo, 'w3-hide');
		return;
	}

	removerClaseCaja(cajaInformacion, 'w3-hide');

	if (valorCaja != numeroAleatorio) {
		numeroMayorMenor(valorCaja, false);
	} else if (valorCaja == numeroAleatorio) {
		numeroMayorMenor(valorCaja, true);
		removerClaseCaja(btnJuegoNuevo, 'w3-hide');
	}
	cajaEntrada.value = ''; // Limmpia el input field
	cajaEntrada.focus(); // Posiciona el puntero en el input field
});

const comenzarJuego = () => {
	numeroAleatorio = Math.floor(Math.random() * 100 + 1);
	intentos = 0;
	intentosAnteriores.textContent = '';
	cajaInformacion.classList.add('w3-hide');
	btnJuegoNuevo.classList.add('w3-hide');
	removerClaseCaja(btnEnviar, 'w3-hide');
};

comenzarJuego();

btnJuegoNuevo.addEventListener('click', () => {
	comenzarJuego();
});
