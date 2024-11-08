import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { getProducts } from '../../../utils/apiUtils';

const InventoryTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lowStockProducts, setLowStockProducts] = useState([]); // Track low stock products
    const [showLowStockProducts, setShowLowStockProducts] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);

                // Check for low stock products
                const lowStock = data.filter(product => product.stock < 10 && product.stock > 0);
                setLowStockProducts(lowStock); // Set low stock products for alert

            } catch (error) {
                setError('Failed to fetch products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Breadcrumb pageName="Inventory List" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="py-4 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Inventory List
                    </h4>
                </div>

                {/* Low Stock Alert */}
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
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Product Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    SKU
                                </th>
                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Stock
                                </th>
                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Price
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Category
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                // Determine stock status
                                let stockStatus;
                                if (product.stock === 0) {
                                    stockStatus = 'Stock Out';
                                } else if (product.stock < 10) {
                                    stockStatus = 'Low Stock';
                                } else {
                                    stockStatus = 'In Stock';
                                }

                                return (
                                    <tr key={product._id}>
                                        <td className="border-b border-[#eee] py-5 px-4 xl:pl-11 dark:border-strokedark">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12.5 w-15 rounded-md object-cover"
                                                />
                                                <p className="text-sm font-medium text-black dark:text-white">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-sm text-black dark:text-white">
                                                {product.sku}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                            <p className={`text-sm ${product.stock === 0 ? 'text-danger' : 'text-black'} dark:text-white`}>
                                                {product.stock === 0 ? 'Stock Out' : product.stock < 10 ? 'Low Stock' : product.stock}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                            <p className="text-sm text-black dark:text-white">
                                                ${product.price}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-sm text-black dark:text-white">
                                                {product.category}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                            <p
                                                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${stockStatus === 'In Stock'
                                                    ? 'bg-success bg-opacity-10 text-success'
                                                    : stockStatus === 'Low Stock'
                                                        ? 'bg-warning bg-opacity-10 text-warning'
                                                        : 'bg-danger bg-opacity-10 text-danger'
                                                    }`}
                                            >
                                                {stockStatus}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
