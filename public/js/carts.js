import { updateCartCounter } from "./script.js";

const url = 'https://glamour-proyecto-backend.vercel.app/';
document.addEventListener('DOMContentLoaded', () => {
    const containerProducts = document.getElementById('container-products');
    const cartId = containerProducts.dataset.cartId;


    // Función para actualizar la cantidad
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put(`${url}/api/carts/${cartId}/product/${productId}`,
                { quantity: newQuantity },
                { headers: { "Content-Type": "application/json" } }
            );

            return response.data;
        } catch (error) {
            throw new Error("Error en la solicitud para actualizar cantidad del producto", error);
        }
    };

    // Función para eliminar un producto del carrito
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${url}/api/carts/${cartId}/product/${productId}`)

            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    title: "Producto eliminado con exito",
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                        container: 'sweet-container',
                        popup: 'sweet-popup',
                        title: 'sweet-title',
                        icon: 'sweet-icon'
                    }
                });
                updateCartCounter();
            } else {
                Swal.fire({
                    position: "top-end",
                    title: "No se pudo eliminar el producto",
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                        container: 'sweet-container',
                        popup: 'sweet-popup',
                        title: 'sweet-title'
                    }
                });
            }

            return response.data;
        } catch (error) {
            throw new Error("Error en la solicitud para eliminar un producto", error);
        }
    };

    // Función para vaciar el carrito
    const emptyCart = async () => {
        try {
            const getProducts = await axios.get(`${url}/home/cart/${cartId}`);
            const data = getProducts.data.products;
            const productCount = data.length;
            if (productCount < 1) {
                Swal.fire({
                    position: "top-end",
                    title: "El carrito ya está vacío",
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                        container: 'sweet-container',
                        popup: 'sweet-popup',
                        title: 'sweet-title'
                    }
                });
                return;
            }

            const response = await axios.delete(`${url}/api/carts/${cartId}`);

            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    title: "Se vacio el carrito con exito",
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                        container: 'sweet-container',
                        popup: 'sweet-popup',
                        title: 'sweet-title',
                        icon: 'sweet-icon'
                    }
                });
                updateCartCounter();
            } else {
                Swal.fire({
                    position: "top-end",
                    title: "No se pudo vaciar el carrito",
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                        container: 'sweet-container',
                        popup: 'sweet-popup',
                        title: 'sweet-title'
                    }
                });
            }
            return response.data;

        } catch (error) {
            throw new Error("Error en la solicitud para vaciar el carrito", error);
        }
    };

    containerProducts.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-increase')) {
            const productId = event.target.dataset.productId;
            const quantityElement = event.target.closest('li').querySelector('.product-quantity');
            const currentQuantity = parseInt(quantityElement.textContent, 10);

            // Incrementar la cantidad
            const newQuantity = currentQuantity + 1;

            const result = await updateQuantity(productId, newQuantity);

            // Si la actualización fue exitosa, actualizar la vista
            if (result) {
                quantityElement.textContent = newQuantity;
                location.reload();
            }
        }
    });

    containerProducts.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-decrease')) {
            const productId = event.target.dataset.productId;
            const quantityElement = event.target.closest('li').querySelector('.product-quantity');
            const currentQuantity = parseInt(quantityElement.textContent, 10);

            // Disminuir la cantidad (pero no menos de 1)
            const newQuantity = Math.max(1, currentQuantity - 1);

            const result = await updateQuantity(productId, newQuantity);

            if (result) {
                quantityElement.textContent = newQuantity;
                location.reload();
            }
        }
    });

    containerProducts.addEventListener('click', async (event) => {
        if (event.target.classList.contains('button-delete-product')) {
            const productId = event.target.dataset.productId;

            try {
                const result = await deleteProduct(productId);

                if (result && result.success) {
                    const productElement = event.target.closest('.product');
                    if (productElement) {
                        productElement.remove();
                    }
                }
            } catch (error) {
                throw new Error("Error al intentar eliminar el producto:", error);
            }
        }
    });


    containerProducts.addEventListener('click', async (event) => {
        if (event.target.id === 'empty-cart') {
            try {
                const result = await emptyCart();

                // Si se vació el carrito con éxito, actualizar el DOM
                if (result && result.success) {
                    const productList = document.querySelector('#container-products ul');
                    if (productList) {
                        productList.innerHTML = '';
                    }

                    const emptyMessage = document.createElement('p');
                    emptyMessage.textContent = 'El carrito está vacío.';
                    const container = document.querySelector('#container-products');
                    if (container) {
                        container.appendChild(emptyMessage);
                    }
                }
            } catch (error) {
                throw new Error('Error al vaciar el carrito:', error);
            }
        }
    });
});