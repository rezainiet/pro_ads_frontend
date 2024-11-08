import { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import Select from 'react-select'; // Importing the Select component for searchable dropdown
import { addProduct, getSuppliers } from '../../../utils/apiUtils';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        category: '',
        name: '',
        colors: [],
        sizes: [],
        stock: 0,          // Stock field
        price: 0,          // Price per quantity field
        supplier: '',       // Supplier field
        image: '',          // Image link field
        description: '',    // Description field
    });

    const [suppliers, setSuppliers] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');

    // Fetch suppliers on component mount
    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const fetchedSuppliers = await getSuppliers();
                setSuppliers(fetchedSuppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        loadSuppliers();
    }, []);

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
        setColorInput(e.target.value);
    };

    // Handles size input changes
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make the API call to add the product
            const response = await addProduct(productData);
            alert('Product added successfully');
            console.log(response);

            // Clear the form data by resetting productData
            setProductData({
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
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    Add Product
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center justify-center gap-5">
                            {/* Product Name */}
                            <div className="w-full">
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

                            {/* Product Type */}
                            <div className="w-full">
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
                        </div>

                        <div className="flex w-full gap-5">
                            {/* Supplier with search */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-300 dark:text-white">
                                    Supplier
                                </label>
                                <Select
                                    options={suppliers.map(supplier => ({ value: supplier._id, label: supplier.name }))}
                                    onChange={selectedOption => setProductData({ ...productData, supplier: selectedOption.value })}
                                    className="mt-1"
                                    classNamePrefix="react-select"
                                    placeholder="Select or search supplier"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#24303F', // Dark background
                                            borderColor: '#4B4B4B', // Darker border
                                            boxShadow: 'none', // Remove default shadow
                                            '&:hover': {
                                                borderColor: '#4B4B4B', // Darker border on hover
                                            },
                                            color: '#FFFFFF', // White text color
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#24303F', // Dark menu background
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '#4B4B4B' : '#24303F', // Dark option background
                                            color: state.isSelected ? '#FFFFFF' : '#FFFFFF', // Light text for selected
                                            '&:hover': {
                                                backgroundColor: '#4B4B4B', // Darker background on hover
                                                color: '#FFFFFF', // Light text on hover
                                            }
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#B0B0B0', // Light placeholder text
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#FFFFFF', // Light text for selected value
                                        }),
                                        dropdownIndicator: (provided) => ({
                                            ...provided,
                                            color: '#B0B0B0', // Light color for dropdown indicator
                                        }),
                                        // Here we change the input text color to red
                                        input: (provided) => ({
                                            ...provided,
                                            color: 'white', // Red text color for input
                                        }),
                                    }}
                                />
                            </div>



                            {/* Available Colors */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Available Colors
                                </label>
                                <input
                                    type="text"
                                    value={colorInput}
                                    onChange={handleColorChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter color"
                                />
                                <button
                                    type="button"
                                    onClick={addColor}
                                    className="mt-2 px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                >
                                    Add Color
                                </button>
                                <div className="mt-2">
                                    {productData.colors.map((color) => (
                                        <span key={color} className="inline-flex items-center px-3 py-1 mr-2 text-sm font-medium text-white bg-indigo-500 rounded-full dark:bg-indigo-700">
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => removeColor(color)}
                                                className="ml-2 text-gray-300 hover:text-white"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full gap-5">
                            {/* Available Sizes */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Available Sizes
                                </label>
                                <input
                                    type="text"
                                    value={sizeInput}
                                    onChange={handleSizeChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter size"
                                />
                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="mt-2 px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                >
                                    Add Size
                                </button>
                                <div className="mt-2">
                                    {productData.sizes.map((size) => (
                                        <span key={size} className="inline-flex items-center px-3 py-1 mr-2 text-sm font-medium text-white bg-indigo-500 rounded-full dark:bg-indigo-700">
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(size)}
                                                className="ml-2 text-gray-300 hover:text-white"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stock */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={productData.stock}
                                    onChange={handleInputChange}
                                    min="0" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500" placeholder="Enter stock quantity" />
                            </div>
                        </div>
                        <div className="flex w-full gap-5">
                            {/* Price */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Price per Quantity
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter price"
                                />
                            </div>

                            {/* Image Link */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Image Link
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={productData.image}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter image URL"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                rows="4"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddProduct;