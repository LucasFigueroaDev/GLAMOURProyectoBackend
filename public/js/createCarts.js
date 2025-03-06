document.addEventListener('DOMContentLoaded', async () => {
    let cartId = localStorage.getItem('cartId');

    try {
        // Verifica si el carrito existe en localStorage y tiene un formato válido
        if (cartId && typeof cartId === 'string' && cartId.trim() !== '') {
            const cart = await getCart(cartId); 
        } else {
            // Si no hay carrito en localStorage, crea uno nuevo
            cartId = await createCart(); 
        }
    } catch (error) {
        // Si la solicitud GET falla (error 404), se maneja aquí
        localStorage.removeItem('cartId');  
        cartId = await createCart(); 
    } finally {
        if (cartId) {
            localStorage.setItem('cartId', cartId); 
        }
    }
});

const createCart = async () => {
    try {
        const response = await axios.post('/api/carts', {}, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201 && response.data.cart?._id) {
            return response.data.cart._id;
        } else {
            throw new Error('Error al crear el carrito: Respuesta inesperada del servidor.');
        }
    } catch (error) {
        throw new Error(`Error en la solicitud de creación del carrito: ${error.message}`);
    }
};

const getCart = async (id) => {
    try {
        const response = await axios.get(`/home/cart/${id}`);

        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error(`Carrito con ID ${id} no encontrado.`);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Respuesta inesperada al obtener el carrito.');
        } else {
            throw new Error(`Error en la solicitud de obtención del carrito: ${error.message}`);
        }
    }
};


