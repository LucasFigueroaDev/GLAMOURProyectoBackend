const socket = io();

const container = document.getElementById('container');

socket.on('realTime', (data) => {
    container.innerHTML = '';
    data.forEach(el => {
        const div = document.createElement('div');
        div.classList.add('real-time-card');

        const h3 = document.createElement('h3');
        h3.classList.add('real-time-title-secundary');
        h3.textContent = el.title;

        const divImg = document.createElement('div');
        divImg.classList.add('real-time-img');

        const img = document.createElement('img');
        img.classList.add('real-time-foto');
        img.src = el.image;
        img.alt = el.title;

        const pId = document.createElement('p');
        pId.classList.add('real-time-id');
        pId.textContent = `Id del producto: ${el.id}`;

        const price = document.createElement('p');
        price.classList.add('real-time-price');
        price.textContent = `Precio: $${el.price}`;

        const description = document.createElement('p');
        description.classList.add('real-time-description');
        description.textContent = `Descripción: ${el.description}`;

        divImg.appendChild(img);
        div.appendChild(h3);
        div.appendChild(divImg);
        div.appendChild(pId);
        div.appendChild(price);
        div.appendChild(description);

        container.appendChild(div);
    });
});

// Funcion agregar producto
const addProduct = () => {
    // Obtener valores del formulario
    const title = document.getElementById('form-title').value;
    const description = document.getElementById('form-description').value;
    const price = document.getElementById('form-price').value;
    const stock = document.getElementById('form-stock').value;
    const code = document.getElementById('form-code').value;
    const category = document.getElementById('form-category').value;
    const imagen = document.getElementById('form-imagen').value;

    // newproduct obtiene todos los valores
    const newProduct = { title, description, price, stock, code, category };
    
    // emitimos newproduct
    socket.emit('new-product', newProduct);

    // Restablecemos los valores del formulario
    document.getElementById('form-title').value = '';
    document.getElementById('form-description').value = '';
    document.getElementById('form-price').value = '';
    document.getElementById('form-stock').value = '';
    document.getElementById('form-code').value = '';
    document.getElementById('form-category').value = '';
    document.getElementById('form-imagen').value = '';

};
document.getElementById('add-button').addEventListener('click', () => {
    addProduct();
});

// Funcion modificar datos del producto
const updateProduct = () => {
    const id = document.getElementById('update-id').value.trim();
    const key = document.getElementById('update-data').value;
    const newValue = document.getElementById('new-value').value.trim();
    
    const updateProduct = { id, key, newValue };
    socket.emit('update-product', updateProduct);

    document.getElementById('idproduct').value = '';
    document.getElementById('new-value').value = '';
};
document.getElementById('update-button').addEventListener('click', () => {
    updateProduct();
});

// Funcion eliminar producto
const deleteProduct = (id) =>{
    socket.emit('delete-product', id);
};
document.getElementById('delete-button').addEventListener('click', () =>{
    const idDelete = document.getElementById('id-delete').value;
    deleteProduct(idDelete);
});


