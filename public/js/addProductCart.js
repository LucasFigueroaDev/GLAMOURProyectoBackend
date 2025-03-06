const addProduct = document.getElementById('detail-button');

addProduct.addEventListener('click', async (e) => {
    const productId = e.target.getAttribute('data-product-id');

    if (!productId) {
        throw new Error('ID de producto no encontrado.');
    }

    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
        throw new Error("No se encontro el carrito");
    }

    try {
        const response = await axios.post(`/api/carts/${cartId}/product/${productId}`);

        if (response.status === 200) {
            Swal.fire({
                position: "top-end",
                title: "Producto agregado con exito",
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                    container: 'sweet-container',
                    popup: 'sweet-popup',
                    title: 'sweet-title',
                    icon: 'sweet-icon'
                }
            });
        } else {
            Swal.fire({
                position: "top-end",
                title: "No se pudo agregar el producto al carrito",
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                    container: 'sweet-container',
                    popup: 'sweet-popup',
                    title: 'sweet-title'
                }
            });
        }
    } catch (error) {
        throw new Error(error);
    }
});
