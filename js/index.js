const productos = [
    {
        id: 1,
        imgSrc: "assets/img/alpha.png",
        modelo: "Alpha",
        tipo: "Mochila",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 12000,
        agregadoCarrito: false,
    },
    {
        id: 2,
        imgSrc: "assets/img/dunquerke.png",
        modelo: "Dunquerke",
        tipo: "Bolso",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 20000,
        agregadoCarrito: false,
    },
    {
        id: 3,
        imgSrc: "assets/img/halcones.png",
        modelo: "Halcones",
        tamanio:"35x20x15cm",
        tipo: "Bolso",
        genero: "unisex",
        precio: 10000,
        agregadoCarrito: false,
    },
    {
        id: 4,
        imgSrc: "assets/img/1000ftwallet.png",
        modelo: "Wallet - FT",
        tipo: "Accesorio",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 3500,
        agregadoCarrito: false,
    },
]

let container = document.querySelector('.container')

for (producto of productos){
    container.innerHTML +=`<article class="cardBox">
    <figure class="fotoProducto">
        <img src="${producto.imgSrc}" alt="">
    </figure>
    <div class="marcoSkew">
        <h4 class="modelo">${producto.modelo}</h4>
    </div>
    <figure class="estrellaFigure">
        <img class="afueraCarrito" id="${producto.id}" src="assets/img/estrella_tienda.svg" alt="">
    </figure>
    <div class="agregadoACarrito">
    </div>
    <div class="caracteristicas">
        <p class="tipo">${producto.tipo}</p>
        <div class="barra"></div>
        <p class="medida">${producto.tamanio}</p>
    </div>
    <p class="precio">$ ${producto.precio}</p>
</article>`
}


let estrellas = document.querySelectorAll('.agregadoACarrito')
let canastoCarrito = document.querySelector('.canasto')
let recuperoStorage = localStorage.getItem('carrito')
let carrito = []


if(recuperoStorage != null){
    carrito = JSON.parse(recuperoStorage)
    console.log(carrito)
    mostrarYGuardarProductos()

}else{
    mostrarYGuardarProductos()
}


let carritoContador = document.querySelector(".carritoContador")
let contador = 0

function mostrarYGuardarProductos(){
    for(estrella of estrellas){
        estrella.onclick = (e) => {
            let element = e.target.previousElementSibling.childNodes[1]
            let id = element.attributes.id.value    
            let productoElegido = productos.find(e => e.id == id)


            if(carrito.includes(productoElegido)){
                element.classList.remove('adentroCarrito')
                let productoASacar = carrito.indexOf(productoElegido)
                carrito.splice(productoASacar, 1)
                let productoRepetido = document.querySelector(`#id-${productoElegido.id}`)
                resta()
                canastoCarrito.removeChild(productoRepetido)
            }else{
                element.classList.add('adentroCarrito')
                carrito.push(productoElegido)
                
                swal({
                    title: "Buena Elección!",
                    text: `Sumaste el modelo ${productoElegido.modelo} a tu carrito!`,
                    icon: "success",
                });
                
                canastoCarrito.innerHTML +=`<article class="canastoBox" id="id-${productoElegido.id}">
                <figure class="fotoCanasto">
                    <img src="${productoElegido.imgSrc}" alt="">
                </figure>
                <article class="canastoCaracteristicas">
                    <div class="marcoSkewCanasto">
                        <h4 class="modeloCanasto">${productoElegido.modelo}</h4>
                    </div>
                        <p class="tipoCanasto">${productoElegido.tipo}</p>
                        <p class="medidaCanasto">${productoElegido.tamanio}</p>
                    <p class="precio">$ ${productoElegido.precio}</p>
                </article>
                <div class="contadorCanasto">
                    <button id="quitar">-<button>
                    <span class="carritoContador2">1</span>
                    <button id="agregar">+<button>
                </div>
                <div id="tachoBasura">
                    <img src="assets/img/tacho_tienda.svg" alt="">
                </div>

            </article>`
            
                agregar.addEventListener("click", suma)
                quitar.addEventListener("click", resta)
                tachoBasura.addEventListener("click", eliminar)

                suma()
                
            }
            function suma (e){
                contador += 1
                carritoContador.innerText = contador
                carritoContador2.innerText = contador
            }

            function resta (e){
                contador -= 1
                carritoContador.innerText = contador
                if(carritoContador < 0){
                    carritoContador = 0
                }
            }
            function eliminar (e){
                let productoASacar = carrito.indexOf(productoElegido)
                carrito.splice(productoASacar, 1)
                let productoRepetido = document.querySelector(`#id-${productoElegido.id}`)
                canastoCarrito.removeChild(productoRepetido)
                contador = 0
                carritoContador.innerText = contador
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }
}


