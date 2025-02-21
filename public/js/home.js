const socket = io();

const containerProducts = document.getElementById('container-products');

socket.on('home', (data)=>{
    containerProducts.innerHTML = '';
    data.forEach(el => {
        const div = document.createElement('div');
        div.classList.add('card-product');

        const h3 = document.createElement('h3');
        h3.classList.add('card-title');
        h3.textContent = el.title;

        const divImagen = document.createElement('div');
        divImagen.classList.add('card-img');

        const img = document.createElement('img');
        img.src = el.imagen;
        img.alt = el.title;
        divImagen.appendChild(img);

        const divContent = document.createElement('div');
        divContent.classList.add('card-content');

        const textPrice = document.createElement('p');
        textPrice.classList.add('card-price');
        textPrice.textContent = `Precio: $${el.price}`;

        const textDescription = document.createElement('p');
        textDescription.classList.add('card-description');
        textDescription.textContent = el.description;


        const link = document.createElement('a');
        link.textContent = 'Más detalles';
        link.classList.add('card-link');
        link.href = `/home/${el.id}`;

        divContent.appendChild(textPrice);
        divContent.appendChild(textDescription);
        div.appendChild(h3);
        div.appendChild(divImagen);
        div.appendChild(divContent);
        div.appendChild(link);
        containerProducts.appendChild(div);
    });
});