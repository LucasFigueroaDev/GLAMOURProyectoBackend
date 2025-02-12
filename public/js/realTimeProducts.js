const socketClient = io();

function toggleForm() {
    const agregar = document.getElementById('agregar');
    const eliminar = document.getElementById('eliminar');

    if (agregar.checked) {
        eliminar.checked = false;  
    }

    if (eliminar.checked) {
        agregar.checked = false;  
    }

    // Mostrar u ocultar los formularios según la selección
    document.getElementById('formularioProducto').style.display = agregar.checked ? 'flex' : 'none';
    document.getElementById('formularioEliminar').style.display = eliminar.checked ? 'flex' : 'none';
}
document.getElementById('agregar').addEventListener('change', toggleForm);
document.getElementById('eliminar').addEventListener('change', toggleForm);


// Escuchar evento de nuevo producto
socketClient.on('newProduct', (product) => {
    const container = document.getElementById('container');
    const newProductHTML = `
        <div class="card">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-img">
                <img class="product-foto" src="${product.image}" alt="imagen del producto">
            </div>
            <p>ID: ${product.id}</p>
            <p class="product-price">Precio: $${product.price}</p>
            <p class="product-description">${product.description}</p>
        </div>
    `;
    container.innerHTML += newProductHTML;
    // Envia en alert de un producto nuevo
    Swal.fire({
        title: 'Se agrego un producto nuevo',
        text: `Producto nuevo ${product.title}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
});

// Escuchar evento de producto eliminado
socketClient.on('deleteProduct', (productId) => {
    const container = document.getElementById('container');
    const cards = container.getElementsByClassName('card');
    for (let card of cards) {
        if (card.querySelector('p').textContent === `ID: ${productId}`) {
            card.remove();
            break;
        }
    }
    // Envia un alert del producto eliminado
    if (productId) {
        Swal.fire({
            title: 'Producto Eliminado',
            text: `El producto con ID: ${productId} ha sido eliminado exitosamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
});
