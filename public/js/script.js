// Cargar dinamicamente el id del carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartId = localStorage.getItem('cartId');  
    const cartLink = document.getElementById('nav-cart');
    cartLink.href = `/api/carts/${cartId}`; 
});
