// apiUtils.js

// Updated API base URL for your local development environment
const API_BASE_URL = 'https://ads-agency-backend.vercel.app/api/v1';

/**
 * Utility function to handle API requests.
 * @param {string} url - The URL endpoint to fetch.
 * @param {object} options - The options for the fetch request (method, headers, body, etc.).
 * @returns {Promise<object>} - The response data as a JSON object.
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}



// API for Products
/**
 * Get a list of products from the inventory.
 * @returns {Promise<object[]>} - The list of products.
 */
export async function getProducts() {
    return apiRequest(`${API_BASE_URL}/products`);
}

/**
 * Get details of a single product by ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<object>} - The product details.
 */
export async function getProductById(productId) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`);
}

/**
 * Add a new product to the inventory.
 * @param {object} productData - The product data to be added.
 * @returns {Promise<object>} - The added product.
 */
export async function addProduct(productData) {
    return apiRequest(`${API_BASE_URL}/products/add`, {
        method: 'POST',
        body: JSON.stringify(productData),
    });
}

/**
 * Update an existing product in the inventory.
 * @param {string} productId - The ID of the product to be updated.
 * @param {object} productData - The updated product data.
 * @returns {Promise<object>} - The updated product.
 */
export async function updateProduct(productId, productData) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    });
}

/**
 * Delete a product from the inventory.
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {Promise<void>} - A promise indicating the deletion has been completed.
 */
export async function deleteProduct(productId) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });
}

// Update product stock
export async function updateProductStock(productId, data) {
    return apiRequest(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}


// api for suppliers

/**
 * Get a list of suppliers from the inventory.
 * @returns {Promise<object[]>} - The list of suppliers.
 */
export async function getSuppliers() {
    return apiRequest(`${API_BASE_URL}/suppliers`);
}

/**
 * Add a new supplier to the system.
 * @param {object} supplierData - The supplier data to be added.
 * @returns {Promise<object>} - The added supplier.
 */
export async function addSupplier(supplierData) {
    return apiRequest(`${API_BASE_URL}/suppliers/add`, {
        method: 'POST',
        body: JSON.stringify(supplierData),
    });
}



// order api 

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};