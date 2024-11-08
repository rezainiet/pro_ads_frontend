import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const ApplyAdManager = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [adAccountType, setAdAccountType] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [pageUrls, setPageUrls] = useState([]);
    const [domainNumber, setDomainNumber] = useState('');
    const [domains, setDomains] = useState([]);
    const [isApp, setIsApp] = useState(false);
    const [shopifyShop, setShopifyShop] = useState('');
    const [adAccountCount, setAdAccountCount] = useState('');
    const [adAccounts, setAdAccounts] = useState([]);
    const [timezones, setTimezones] = useState([]);

    useEffect(() => {
        const tzList = moment.tz.names().map((tz) => ({
            name: tz,
            offset: moment.tz(tz).format('Z'),
            fullName: `${moment.tz(tz).format('z')} ${tz}`,
        }));

        tzList.sort((a, b) => {
            const offsetA = a.offset.replace(':', '');
            const offsetB = b.offset.replace(':', '');
            return offsetA.localeCompare(offsetB);
        });

        setTimezones(tzList);
    }, []);

    useEffect(() => {
        if (adAccountCount) {
            setAdAccounts(
                Array.from({ length: parseInt(adAccountCount, 10) }, () => ({
                    name: '',
                    timezone: '',
                    deposit: '',
                }))
            );
        } else {
            setAdAccounts([]);
        }
    }, [adAccountCount]);

    const handleAdAccountTypeChange = (e) => setAdAccountType(e.target.value);
    const handlePageNumberChange = (e) => setPageNumber(e.target.value);
    const handlePageUrlChange = (index) => (e) => {
        const newPageUrls = [...pageUrls];
        newPageUrls[index] = e.target.value;
        setPageUrls(newPageUrls);
    };
    const handleDomainNumberChange = (e) => setDomainNumber(e.target.value);
    const handleDomainChange = (index) => (e) => {
        const newDomains = [...domains];
        newDomains[index] = e.target.value;
        setDomains(newDomains);
    };
    const handleAdAccountCountChange = (e) => setAdAccountCount(e.target.value);
    const handleAdAccountChange = (index) => (e) => {
        const { name, value } = e.target;
        const newAdAccounts = [...adAccounts];
        newAdAccounts[index] = { ...newAdAccounts[index], [name]: value };
        setAdAccounts(newAdAccounts);
    };

    const handleNextStep = () => {
        if (validateCurrentStep()) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => setActiveStep((prev) => prev - 1);

    const validateCurrentStep = () => {
        switch (activeStep) {
            case 0:
                return adAccountType !== '';
            case 1:
                return pageNumber > 0 && pageUrls.every(url => url.trim() !== '');
            case 2:
                return domainNumber > 0 && domains.every(domain => domain.trim() !== '');
            case 3:
                return !isApp || (shopifyShop.trim() !== '' && adAccountCount > 0 && adAccounts.every(acc => acc.name.trim() !== '' && acc.timezone.trim() !== '' && acc.deposit.trim() !== ''));
            default:
                return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted');
    };

    return (
        <div className={`p-6 max-w-4xl mx-auto rounded-lg shadow-lg ${document.documentElement.classList.contains('dark') ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h1 className="text-3xl font-semibold mb-6 text-center">Apply for Ad Manager</h1>

            <form onSubmit={handleSubmit}>
                {activeStep === 0 && (
                    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Ad Account Type</h2>
                        <select
                            id="adAccountType"
                            value={adAccountType}
                            onChange={handleAdAccountTypeChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                        >
                            <option value="">Select an option</option>
                            <option value="facebook">Facebook</option>
                            <option value="google">Google</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={!validateCurrentStep()}
                                className={`px-6 py-3 font-semibold rounded-md shadow-md ${validateCurrentStep() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {activeStep === 1 && adAccountType && (
                    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Page Details</h2>
                        <div>
                            <label htmlFor="pageNumber" className="block text-sm font-medium">Page Number</label>
                            <select
                                id="pageNumber"
                                value={pageNumber}
                                onChange={handlePageNumberChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                            >
                                <option value="">Select number of pages</option>
                                {[1, 2, 3, 4, 5].map((number) => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                        </div>

                        {pageNumber > 0 && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Page URLs</label>
                                {Array.from({ length: parseInt(pageNumber, 10) }).map((_, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="url"
                                            value={pageUrls[index] || ''}
                                            onChange={handlePageUrlChange(index)}
                                            placeholder={`Page URL ${index + 1}`}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex justify-between">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={!validateCurrentStep()}
                                className={`px-6 py-3 font-semibold rounded-md shadow-md ${validateCurrentStep() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {activeStep === 2 && adAccountType && (
                    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Domain Details</h2>
                        <div>
                            <label htmlFor="domainNumber" className="block text-sm font-medium">Number of Domains</label>
                            <select
                                id="domainNumber"
                                value={domainNumber}
                                onChange={handleDomainNumberChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                            >
                                <option value="">Select number of domains</option>
                                {[1, 2, 3, 4, 5].map((number) => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                        </div>

                        {domainNumber > 0 && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Domains</label>
                                {Array.from({ length: parseInt(domainNumber, 10) }).map((_, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="text"
                                            value={domains[index] || ''}
                                            onChange={handleDomainChange(index)}
                                            placeholder={`Domain ${index + 1}`}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex justify-between">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={!validateCurrentStep()}
                                className={`px-6 py-3 font-semibold rounded-md shadow-md ${validateCurrentStep() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {activeStep === 3 && (
                    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-4">App Details</h2>
                        <div className="mb-4">
                            <input
                                type="checkbox"
                                checked={isApp}
                                onChange={() => setIsApp(!isApp)}
                                className="mr-2"
                            />
                            <label className="text-sm font-medium">Are you managing an app?</label>
                        </div>

                        {isApp && (
                            <div className="mb-4">
                                <label htmlFor="shopifyShop" className="block text-sm font-medium">Shopify Shop URL</label>
                                <input
                                    type="url"
                                    id="shopifyShop"
                                    value={shopifyShop}
                                    onChange={(e) => setShopifyShop(e.target.value)}
                                    placeholder="https://yourshopifyshop.com"
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="adAccountCount" className="block text-sm font-medium">Number of Ad Accounts</label>
                            <input
                                type="number"
                                id="adAccountCount"
                                value={adAccountCount}
                                onChange={handleAdAccountCountChange}
                                min="1"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                            />
                        </div>

                        {adAccountCount > 0 && adAccounts.length > 0 && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Ad Account Details</label>
                                {adAccounts.map((account, index) => (
                                    <div key={index} className="mb-4">
                                        <div>
                                            <label htmlFor={`adAccountName${index}`} className="block text-sm font-medium">Ad Account {index + 1} Name</label>
                                            <input
                                                type="text"
                                                id={`adAccountName${index}`}
                                                name="name"
                                                value={account.name}
                                                onChange={handleAdAccountChange(index)}
                                                placeholder="Account Name"
                                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`adAccountTimezone${index}`} className="block text-sm font-medium">Timezone</label>
                                            <select
                                                id={`adAccountTimezone${index}`}
                                                name="timezone"
                                                value={account.timezone}
                                                onChange={handleAdAccountChange(index)}
                                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                            >
                                                <option value="">Select Timezone</option>
                                                {timezones.map((tz) => (
                                                    <option key={tz.name} value={tz.name}>{tz.fullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor={`adAccountDeposit${index}`} className="block text-sm font-medium">Deposit</label>
                                            <input
                                                type="text"
                                                id={`adAccountDeposit${index}`}
                                                name="deposit"
                                                value={account.deposit}
                                                onChange={handleAdAccountChange(index)}
                                                placeholder="Deposit Amount"
                                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-800"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex justify-between">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ApplyAdManager;
