let cartId = localStorage.getItem('cartId');
document.addEventListener('DOMContentLoaded', async () => {
    const cartLink = document.getElementById('nav-cart');
    cartLink.href = `/api/carts/${cartId}`;
    updateCartCounter();
});


export async function updateCartCounter() {
    const counter = document.getElementById('nav-counter');

    try {
        const response = await axios.get(`http://localhost:8080/home/cart/${cartId}`);
        const data = response.data.products;
        const productCount = data.length;

        if (productCount > 0) {
            counter.textContent = productCount;
            counter.style.display = 'inline';
        } else {
            counter.style.display = 'none';
        }
    } catch (error) {
        throw new Error('Error al actualizar el contador del carrito', error);
    }
};