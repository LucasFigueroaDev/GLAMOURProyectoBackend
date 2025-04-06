const isLocal = window.location.hostname === 'localhost';
const url = isLocal ? 'http://localhost:8080/api/products' : 'https://glamour-proyecto-backend.vercel.app/api/products';
const containerProducts = document.getElementById('container-products');
const paginationContainer = document.getElementById('pagination');
const sortSelect = document.getElementById('sort-order');
const categorySelect = document.getElementById('category-filter');
const cartId = localStorage.getItem('cartId');

let currentPage = 1;
let totalPages = 1;
let currentSort = '';
let currentCategory = '';

const getProducts = async (page = 1, sort = '', category = '') => {
    try {
        const response = await axios.get(`${url}?page=${page}&sort=${sort}&category=${category}`);
        totalPages = response.data.totalPages;
        return response.data.payload;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};

const renderProducts = async (page = 1) => {
    const products = await getProducts(page, currentSort, currentCategory);

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
    renderPagination();
};

const renderPagination = () => {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) button.classList.add('active');

        button.addEventListener('click', () => {
            currentPage = i;
            renderProducts(currentPage);
        });

        paginationContainer.appendChild(button);
    }
};

sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderProducts(1);
});

categorySelect.addEventListener('change', () => {
    currentCategory = categorySelect.value;
    renderProducts(1);
});

renderProducts();
