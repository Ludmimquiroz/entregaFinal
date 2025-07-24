// index.js
import fetch from 'node-fetch'; // Solo necesario si usas Node.js < 18

const API_URL = 'https://fakestoreapi.com/products';

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products = await response.json();
        console.log(products);
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchProductById(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        const product = await response.json();
        console.log(product);
    } catch (error) {
        console.error(error.message);
    }
}

async function addProduct(title, price, category) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, price, category }),
        });
        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }
        const newProduct = await response.json();
        console.log('Producto agregado:', newProduct);
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        const result = await response.json();
        console.log('Producto eliminado:', result);
    } catch (error) {
        console.error(error.message);
    }
}

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Por favor, proporciona un comando.');
} else {
    const command = args[0];
    const resource = args[1];

    if (command === 'GET' && resource === 'products') {
        fetchProducts();
    } else if (command === 'GET' && resource.startsWith('products/')) {
        const productId = resource.split('/')[1];
        fetchProductById(productId);
    } else if (command === 'POST' && resource === 'products' && args.length === 5) {
        const title = args[2];
        const price = parseFloat(args[3]);
        const category = args[4];
        addProduct(title, price, category);
    } else if (command === 'DELETE' && resource.startsWith('products/')) {
        const productId = resource.split('/')[1];
        deleteProduct(productId);
    } else {
        console.log('El comando no es reconocido. Usa "GET products", "GET products/<productId>", "POST products <title> <price> <category>", o "DELETE products/<productId>".');
    }
}
