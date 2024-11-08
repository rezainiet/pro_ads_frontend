import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import AddProduct from './AddProduct'; // Adjust the import path as necessary
import EditProduct from './EditProduct'; // Adjust the import path as necessary

// Mock function to fetch products, replace with your API call
const fetchProducts = async () => {
    // Example products, replace with actual data fetching logic
    return [
        { _id: 'productId1', name: 'Product 1', colors: ['Red'], sizes: ['M'] },
        { _id: 'productId2', name: 'Product 2', colors: ['Blue'], sizes: ['L'] },
    ];
};

const AddEditProduct = () => {
    const [isEditMode, setIsEditMode] = useState(false); // Add/Edit mode toggle
    const [products, setProducts] = useState([]); // State to hold products
    const [productData, setProductData] = useState({
        product: '',
        name: '',
        colors: [],
        sizes: [],
        quantity: 0,
        description: '',
    });
    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');

    // Fetch products on component mount
    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handle color input changes
    const handleColorChange = (e) => {
        setColorInput(e.target.value);
    };

    // Handle size input changes
    const handleSizeChange = (e) => {
        setSizeInput(e.target.value);
    };

    // Add color to the colors array
    const addColor = () => {
        if (colorInput && !productData.colors.includes(colorInput)) {
            setProductData({
                ...productData,
                colors: [...productData.colors, colorInput],
            });
            setColorInput('');
        }
    };

    // Add size to the sizes array
    const addSize = () => {
        if (sizeInput && !productData.sizes.includes(sizeInput)) {
            setProductData({
                ...productData,
                sizes: [...productData.sizes, sizeInput],
            });
            setSizeInput('');
        }
    };

    // Remove color from the colors array
    const removeColor = (color) => {
        setProductData({
            ...productData,
            colors: productData.colors.filter(c => c !== color),
        });
    };

    // Remove size from the sizes array
    const removeSize = (size) => {
        setProductData({
            ...productData,
            sizes: productData.sizes.filter(s => s !== size),
        });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Logic for updating an existing product record
            console.log('Product updated:', productData);
        } else {
            // Logic for adding a new product record
            console.log('Product added:', productData);
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Add/Edit Product" />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                {/* Toggle buttons for Add or Edit */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-6 py-2 mx-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${!isEditMode
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                            }`}
                        onClick={() => setIsEditMode(false)}
                    >
                        Add Product
                    </button>
                    <button
                        className={`px-6 py-2 mx-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${isEditMode
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                            }`}
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit Product
                    </button>
                </div>

                {/* Conditional rendering based on isEditMode */}
                {isEditMode ? (
                    <EditProduct
                        products={products}
                        productData={productData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        colorInput={colorInput}
                        sizeInput={sizeInput}
                        handleColorChange={handleColorChange}
                        handleSizeChange={handleSizeChange}
                        addColor={addColor}
                        addSize={addSize}
                        removeColor={removeColor}
                        removeSize={removeSize}
                    />
                ) : (
                    <AddProduct
                        productData={productData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        colorInput={colorInput}
                        sizeInput={sizeInput}
                        handleColorChange={handleColorChange}
                        handleSizeChange={handleSizeChange}
                        addColor={addColor}
                        addSize={addSize}
                        removeColor={removeColor}
                        removeSize={removeSize}
                    />
                )}
            </div>
        </div>
    );
};

export default AddEditProduct;
