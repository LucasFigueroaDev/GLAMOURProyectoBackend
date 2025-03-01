const url = 'http://localhost:8080/api/products';
const containerProducts = document.getElementById('container-products');

const getProducts = async () => {
    try {
        const response = await axios.get(url);
        return response.data.payload;  
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};

const renderProducts = async () => {
    const products = await getProducts(); 

    containerProducts.innerHTML = ''; 

    products.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('card-product');

        const h3 = document.createElement('h3');
        h3.classList.add('card-title');
        h3.textContent = element.title;

        const divImagen = document.createElement('div');
        divImagen.classList.add('card-img');

        const img = document.createElement('img');
        img.src = element.thumbnail;
        img.alt = element.title;
        divImagen.appendChild(img);

        const divContent = document.createElement('div');
        divContent.classList.add('card-content');

        const textPrice = document.createElement('p');
        textPrice.classList.add('card-price');
        textPrice.textContent = `Precio: $${element.price}`;

        const textDescription = document.createElement('p');
        textDescription.classList.add('card-description');
        textDescription.textContent = element.description;

        const link = document.createElement('a');
        link.textContent = 'Más detalles';
        link.classList.add('card-link');
        link.href = `/home/${element._id}`;

        divContent.appendChild(textPrice);
        divContent.appendChild(textDescription);
        div.appendChild(h3);
        div.appendChild(divImagen);
        div.appendChild(divContent);
        div.appendChild(link);
        containerProducts.appendChild(div);
    });
};

renderProducts();
