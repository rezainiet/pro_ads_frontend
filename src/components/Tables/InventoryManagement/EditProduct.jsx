import { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import Select from 'react-select'; // Importing the Select component for searchable dropdown
import { getProducts, getSuppliers, updateProduct } from '../../../utils/apiUtils';

const EditProduct = () => {
    const [productData, setProductData] = useState({
        category: '',
        name: '',
        colors: [],
        sizes: [],
        stock: 0,
        price: 0,
        supplier: '',
        image: '',
        description: '',
    });

    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products and suppliers on component mount
    useEffect(() => {
        const loadProductsAndSuppliers = async () => {
            try {
                const [fetchedProducts, fetchedSuppliers] = await Promise.all([
                    getProducts(),
                    getSuppliers()
                ]);
                setProducts(fetchedProducts);
                setSuppliers(fetchedSuppliers);
            } catch (error) {
                console.error('Error fetching products or suppliers:', error);
            }
        };
        loadProductsAndSuppliers();
    }, []);

    // Fetch product details when a product is selected
    useEffect(() => {
        if (selectedProduct) {
            const fetchProductDetails = async () => {
                try {
                    const response = await fetch(`https://ads-agency-backend.vercel.app/api/v1/products/${selectedProduct}`);
                    const data = await response.json();
                    setProductData(data);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            };
            fetchProductDetails();
        }
    }, [selectedProduct]);

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handles color input changes
    const handleColorChange = (e) => {
        setProductData(prev => ({ ...prev, colors: e.target.value.split(',').map(c => c.trim()) }));
    };

    // Handles size input changes
    const handleSizeChange = (e) => {
        setProductData(prev => ({ ...prev, sizes: e.target.value.split(',').map(s => s.trim()) }));
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(selectedProduct, productData);
            alert('Product updated successfully');
            console.log('Product updated:', productData);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    Edit Product
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    {/* Product Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">
                            Select Product
                        </label>
                        <Select
                            options={products.map(product => ({ value: product._id, label: product.name }))}
                            onChange={(option) => setSelectedProduct(option.value)}
                            className="mt-1"
                            classNamePrefix="react-select"
                            placeholder="Select a product to edit"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#24303F',
                                    borderColor: '#4B4B4B',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: '#4B4B4B',
                                    }
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#24303F',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected ? '#4B4B4B' : '#24303F',
                                    color: state.isSelected ? '#FFFFFF' : '#B0B0B0',
                                    '&:hover': {
                                        backgroundColor: '#4B4B4B',
                                        color: '#FFFFFF',
                                    }
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: '#B0B0B0',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#FFFFFF',
                                }),
                                dropdownIndicator: (provided) => ({
                                    ...provided,
                                    color: '#B0B0B0',
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    color: 'white', // Red text color for input
                                }),
                            }}
                        />
                    </div>

                    {/* Product Details Form */}
                    {selectedProduct && (
                        <>
                            {/* Product Name */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter product name"
                                />
                            </div>

                            {/* Product Category */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Product Category
                                </label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                >
                                    <option value="">Select Product Category</option>
                                    <option value="T-Shirt">T-Shirt</option>
                                    <option value="Leather">Leather</option>
                                </select>
                            </div>

                            {/* Supplier */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Supplier
                                </label>
                                <Select
                                    options={suppliers.map(supplier => ({ value: supplier._id, label: supplier.name }))}
                                    onChange={(option) => setProductData(prev => ({ ...prev, supplier: option.value }))}
                                    value={suppliers.find(supplier => supplier._id === productData.supplier)}
                                    className="mt-1"
                                    classNamePrefix="react-select"
                                    placeholder="Select or search supplier"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#24303F',
                                            borderColor: '#4B4B4B',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#4B4B4B',
                                            }
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#24303F',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '#4B4B4B' : '#24303F',
                                            color: state.isSelected ? '#FFFFFF' : '#B0B0B0',
                                            '&:hover': {
                                                backgroundColor: '#4B4B4B',
                                                color: '#FFFFFF',
                                            }
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#B0B0B0',
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#FFFFFF',
                                        }),
                                        dropdownIndicator: (provided) => ({
                                            ...provided,
                                            color: '#B0B0B0',
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            color: 'white', // Red text color for input
                                        }),
                                    }}
                                />
                            </div>


                            {/* Colors */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Colors
                                </label>
                                <input
                                    type="text"
                                    value={productData.colors.join(', ')}
                                    onChange={handleColorChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter colors, separated by commas"
                                />
                            </div>

                            {/* Sizes */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Sizes
                                </label>
                                <input
                                    type="text"
                                    value={productData.sizes.join(', ')}
                                    onChange={handleSizeChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter sizes, separated by commas"
                                />
                            </div>

                            {/* Stock */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={productData.stock}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter product stock"
                                />
                            </div>

                            {/* Price */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter product price"
                                />
                            </div>

                            {/* Description */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter product description"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                                >
                                    Update Product
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
