import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { getProducts, updateProductStock } from '../../../utils/apiUtils'; // Import API utilities

const StockTracking = () => {
    const [stockData, setStockData] = useState([]); // Store product data from API
    const [adjustmentAmount, setAdjustmentAmount] = useState({}); // Track adjustment amounts
    const [lowStockProducts, setLowStockProducts] = useState([]); // Track low stock products
    const [showLowStockProducts, setShowLowStockProducts] = useState(false);

    // Fetch products from the API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const products = await getProducts(); // Fetch products from the API
                setStockData(products);
                // Check for low stock products
                const lowStock = products.filter(product => product.stock < 10 && product.stock > 0);
                setLowStockProducts(lowStock); // Set low stock products for alert
            } catch (error) {
                console.error('Error fetching product stock data:', error);
            }
        };
        fetchStockData();
    }, []);

    // Handle stock adjustment
    const handleStockChange = async (id, amount) => {
        const updatedProducts = stockData.map((product) =>
            product._id === id
                ? {
                    ...product,
                    stock: product.stock + amount >= 0 ? product.stock + amount : 0,
                }
                : product
        );
        setStockData(updatedProducts);

        try {
            // Update the stock in the database via API
            const updatedProduct = updatedProducts.find((product) => product._id === id);
            await updateProductStock(id, { stock: updatedProduct.stock });
        } catch (error) {
            console.error('Error updating product stock:', error);
            // Optionally, revert changes if the update fails
            setStockData(prevStockData => prevStockData); // Revert back to the previous state
        }
    };

    // Handle adjustment input change
    const handleAmountChange = (id, value) => {
        if (value >= 0) { // Prevent negative values
            setAdjustmentAmount({
                ...adjustmentAmount,
                [id]: value,
            });
        }
    };

    // Get stock status based on stock levels
    const getStockStatus = (product) => {
        if (product.stock === 0) {
            return 'Out of Stock';
        } else if (product.stock < 10) {
            return 'Low Stock';
        } else {
            return 'In Stock';
        }
    };

    // Get color based on stock status
    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-green-100 text-green-600';
            case 'Low Stock':
                return 'bg-yellow-100 text-yellow-600';
            case 'Out of Stock':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Stock Tracking" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Stock Tracking
                </h2>

                {lowStockProducts.length > 0 && (
                    <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md dark:bg-yellow-800 dark:text-yellow-200">
                        <p>
                            <strong>Low Stock Alert:</strong> The following products are running low on stock: <strong className='cursor-pointer' onClick={() => setShowLowStockProducts(!showLowStockProducts)}>
                                {showLowStockProducts ? 'Hide' : 'Show'} {lowStockProducts.length} Products
                            </strong>
                        </p>
                        {
                            showLowStockProducts && <ul className="list-disc list-inside">
                                {lowStockProducts.map(product => (
                                    <li key={product._id}>
                                        {product.name} (Stock: {product.stock})
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                )}

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    Product Name
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    SKU
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Current Stock
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Stock Status
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Adjust Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((product) => (
                                <tr key={product._id} className="border-b dark:border-strokedark">
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {product.sku}
                                    </td>
                                    <td className="py-4 px-6 text-center text-black dark:text-white">
                                        {product.stock}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                getStockStatus(product)
                                            )}`}
                                        >
                                            {getStockStatus(product)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* Input field for adjustment amount */}
                                            <input
                                                type="number"
                                                value={adjustmentAmount[product._id] || ''}
                                                onChange={(e) => handleAmountChange(product._id, Number(e.target.value))}
                                                min="0"
                                                className="w-24 px-2 py-1 text-center border border-gray-300 rounded-md dark:border-strokedark"
                                                placeholder="Amount"
                                            />
                                            {/* Decrease Stock Button */}
                                            <button
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                                onClick={() => handleStockChange(product._id, -(adjustmentAmount[product._id] || 0))}
                                            >
                                                -
                                            </button>

                                            {/* Increase Stock Button */}
                                            <button
                                                className="px-3 py-1 bg-primary hover:bg-blue-600 text-white rounded-md"
                                                onClick={() => handleStockChange(product._id, adjustmentAmount[product._id] || 0)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockTracking;
