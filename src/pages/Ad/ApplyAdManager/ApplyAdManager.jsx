import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseInit';
import { timeZoneList } from "./TimeZone"
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Tab,
    Tabs,
    Box,
    Divider,
    Snackbar,
    Alert
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

export default function ApplyAdManager() {
    const [user, loading] = useAuthState(auth);
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
    const [errors, setErrors] = useState({});
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [setupFee] = useState(30);
    const [chargePercentage] = useState(0.03);
    const [totalAmount, setTotalAmount] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        setTimezones(timeZoneList);
    }, []);

    useEffect(() => {
        if (adAccountCount) {
            setAdAccounts(
                Array.from({ length: parseInt(adAccountCount, 10) }, () => ({
                    adAccountType,
                    status: 'Pending',
                    id: uuidv4(),
                    name: '',
                    timezone: '',
                    deposit: '',
                }))
            );
        } else {
            setAdAccounts([]);
        }
    }, [adAccountCount, adAccountType]);

    useEffect(() => {
        const total = adAccounts.reduce((sum, account) => {
            const depositValue = parseFloat(account.deposit);
            return sum + (isNaN(depositValue) ? 0 : depositValue);
        }, 0);
        setTotalDeposit(total);
    }, [adAccounts]);

    useEffect(() => {
        const charge = totalDeposit * chargePercentage;
        const total = setupFee + totalDeposit + charge;
        setTotalAmount(total);
    }, [totalDeposit, setupFee, chargePercentage]);

    const handleAdAccountTypeChange = (event) => setAdAccountType(event.target.value);
    const handlePageNumberChange = (event) => setPageNumber(event.target.value);
    const handlePageUrlChange = (index) => (event) => {
        const newPageUrls = [...pageUrls];
        newPageUrls[index] = { id: uuidv4(), url: event.target.value };
        setPageUrls(newPageUrls);
    };
    const handleDomainNumberChange = (event) => setDomainNumber(event.target.value);
    const handleDomainChange = (index) => (event) => {
        const newDomains = [...domains];
        newDomains[index] = { id: uuidv4(), domain: event.target.value };
        setDomains(newDomains);
    };
    const handleAdAccountCountChange = (event) => setAdAccountCount(event.target.value);
    const handleAdAccountChange = (index) => (event) => {
        const { name, value } = event.target;
        const newAdAccounts = [...adAccounts];
        newAdAccounts[index] = { ...newAdAccounts[index], [name]: value };
        setAdAccounts(newAdAccounts);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!adAccountType) newErrors.adAccountType = 'Ad Account Type is required.';
        if (!pageNumber) newErrors.pageNumber = 'Page Number is required.';
        if (pageNumber > 0 && pageUrls.some((page) => !page.url)) newErrors.pageUrls = 'All Page URLs are required.';
        if (!domainNumber) newErrors.domainNumber = 'Number of Domains is required.';
        if (domainNumber > 0 && domains.some((domain) => !domain.domain)) newErrors.domains = 'All Domains are required.';
        if (adAccountCount > 0) {
            adAccounts.forEach((account, index) => {
                if (!account.name) newErrors[`adAccountName-${index}`] = `Ad Account Name is required for account ${index + 1}.`;
                if (!account.timezone) newErrors[`adAccountTimezone-${index}`] = `Timezone is required for account ${index + 1}.`;
                if (account.deposit === '') newErrors[`adAccountDeposit-${index}`] = `Deposit Amount is required for account ${index + 1}.`;
            });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                pageUrls,
                domains,
                isApp,
                shopifyShop,
                adAccounts,
                totalDeposit,
                setupFee,
                charge: totalDeposit * chargePercentage,
                totalAmount,
                userEmail: user?.email,
                status: 'pending',
            };
            console.dir(formData);
            fetch('https://ads-agency-backend.vercel.app/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === 'Order placed successfully') {
                        setSnackbar({
                            open: true,
                            message: `Your ad manager application has been successfully submitted. Updated balance: $${data.updatedBalance.toFixed(2)}`,
                            severity: "success"
                        });
                        // You might want to update the user's balance in your app state here
                    } else {
                        throw new Error(data.message || 'An error occurred');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setSnackbar({
                        open: true,
                        message: error.message || "There was an error submitting your application. Please try again.",
                        severity: "error"
                    });
                });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="dark:bg-slate-900 min-h-screen">
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Card className="dark:bg-slate-800">
                        <CardHeader
                            title={
                                <Typography variant="h4" className="dark:text-white">
                                    Apply for Ad Manager
                                </Typography>
                            }
                            subheader={
                                <Typography variant="subtitle1" className="dark:text-slate-300">
                                    Fill out the form below to apply for an ad manager account.
                                </Typography>
                            }
                        />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleTabChange}
                                    aria-label="ad manager application tabs"
                                    className="dark:text-white"
                                >
                                    <Tab label="Account" className="dark:text-white" />
                                    <Tab label="Pages" className="dark:text-white" />
                                    <Tab label="Domains" className="dark:text-white" />
                                </Tabs>
                                <Box sx={{ mt: 2 }}>
                                    {activeTab === 0 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="ad-account-type-label" className="dark:text-white">Ad Account Type</InputLabel>
                                                    <Select
                                                        labelId="ad-account-type-label"
                                                        id="adAccountType"
                                                        value={adAccountType}
                                                        label="Ad Account Type"
                                                        onChange={handleAdAccountTypeChange}
                                                        error={!!errors.adAccountType}
                                                        className="dark:text-white dark:bg-slate-700"
                                                    >
                                                        <MenuItem value="facebook">Facebook</MenuItem>
                                                    </Select>
                                                    {errors.adAccountType && (
                                                        <Typography variant="caption" color="error" className="dark:text-red-400">
                                                            {errors.adAccountType}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="ad-account-count-label" className="dark:text-white">Number of Ad Accounts</InputLabel>
                                                    <Select
                                                        labelId="ad-account-count-label"
                                                        id="adAccountCount"
                                                        value={adAccountCount}
                                                        label="Number of Ad Accounts"
                                                        onChange={handleAdAccountCountChange}
                                                        className="dark:text-white dark:bg-slate-700"
                                                    >
                                                        {[1, 2, 3, 4, 5].map((number) => (
                                                            <MenuItem key={number} value={number.toString()}>{number}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {adAccountCount > 0 && adAccounts.map((account, index) => (
                                                <Grid item xs={12} key={account.id}>
                                                    <Card variant="outlined" className="dark:bg-slate-700">
                                                        <CardContent>
                                                            <Typography variant="h6" gutterBottom className="dark:text-white">
                                                                Ad Account {index + 1}
                                                            </Typography>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        fullWidth
                                                                        id={`adAccountName-${index}`}
                                                                        name="name"
                                                                        label="Ad Account Name"
                                                                        value={account.name}
                                                                        onChange={handleAdAccountChange(index)}
                                                                        error={!!errors[`adAccountName-${index}`]}
                                                                        helperText={errors[`adAccountName-${index}`]}
                                                                        className="dark:text-white dark:bg-slate-600"
                                                                        InputLabelProps={{
                                                                            className: "dark:text-slate-300"
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id={`timezone-label-${index}`} className="dark:text-white">Timezone</InputLabel>
                                                                        <Select
                                                                            labelId={`timezone-label-${index}`}
                                                                            id={`adAccountTimezone-${index}`}
                                                                            name="timezone"
                                                                            value={account.timezone}
                                                                            label="Timezone"
                                                                            onChange={handleAdAccountChange(index)}
                                                                            error={!!errors[`adAccountTimezone-${index}`]}
                                                                            className="dark:text-white dark:bg-slate-600"
                                                                        >
                                                                            {timezones.map((tz) => (
                                                                                <MenuItem key={tz.title} value={tz.title}>{tz.title}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {errors[`adAccountTimezone-${index}`] && (
                                                                            <Typography variant="caption" color="error" className="dark:text-red-400">
                                                                                {errors[`adAccountTimezone-${index}`]}
                                                                            </Typography>
                                                                        )}
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        fullWidth
                                                                        id={`adAccountDeposit-${index}`}
                                                                        name="deposit"
                                                                        label="Deposit Amount"
                                                                        type="number"
                                                                        value={account.deposit}
                                                                        onChange={handleAdAccountChange(index)}
                                                                        error={!!errors[`adAccountDeposit-${index}`]}
                                                                        helperText={errors[`adAccountDeposit-${index}`]}
                                                                        className="dark:text-white dark:bg-slate-600"
                                                                        InputLabelProps={{
                                                                            className: "dark:text-slate-300"
                                                                        }}
                                                                        inputProps={{
                                                                            min: 100  // Set minimum value to 100
                                                                        }}
                                                                    />
                                                                </Grid>

                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                    {activeTab === 1 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="page-number-label" className="dark:text-white">Number of Pages</InputLabel>
                                                    <Select
                                                        labelId="page-number-label"
                                                        id="pageNumber"
                                                        value={pageNumber}
                                                        label="Number of  Pages"
                                                        onChange={handlePageNumberChange}
                                                        error={!!errors.pageNumber}
                                                        className="dark:text-white dark:bg-slate-700"
                                                    >
                                                        {[1, 2, 3, 4, 5].map((number) => (
                                                            <MenuItem key={number} value={number.toString()}>{number}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.pageNumber && (
                                                        <Typography variant="caption" color="error" className="dark:text-red-400">
                                                            {errors.pageNumber}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            {pageNumber > 0 && Array.from({ length: parseInt(pageNumber, 10) }).map((_, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <TextField
                                                        fullWidth
                                                        id={`pageUrl-${index}`}
                                                        label={`Page URL ${index + 1}`}
                                                        value={pageUrls[index]?.url || ''}
                                                        onChange={handlePageUrlChange(index)}
                                                        error={!!errors.pageUrls}
                                                        helperText={index === 0 && errors.pageUrls}
                                                        className="dark:text-white dark:bg-slate-700"
                                                        InputLabelProps={{
                                                            className: "dark:text-slate-300"
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                    {activeTab === 2 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="domain-number-label" className="dark:text-white">Number of Domains</InputLabel>
                                                    <Select
                                                        labelId="domain-number-label"
                                                        id="domainNumber"
                                                        value={domainNumber}
                                                        label="Number of Domains"
                                                        onChange={handleDomainNumberChange}
                                                        error={!!errors.domainNumber}
                                                        className="dark:text-white dark:bg-slate-700"
                                                    >
                                                        {[1, 2, 3, 4, 5].map((number) => (
                                                            <MenuItem key={number} value={number.toString()}>{number}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.domainNumber && (
                                                        <Typography variant="caption" color="error" className="dark:text-red-400">
                                                            {errors.domainNumber}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            {domainNumber > 0 && Array.from({ length: parseInt(domainNumber, 10) }).map((_, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <TextField
                                                        fullWidth
                                                        id={`domain-${index}`}
                                                        label={`Domain ${index + 1}`}
                                                        value={domains[index]?.domain || ''}
                                                        onChange={handleDomainChange(index)}
                                                        error={!!errors.domains}
                                                        helperText={index === 0 && errors.domains}
                                                        className="dark:text-white dark:bg-slate-700"
                                                        InputLabelProps={{
                                                            className: "dark:text-slate-300"
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>
                                <Divider sx={{ my: 4 }} className="dark:bg-slate-600" />
                                <Typography variant="h6" gutterBottom className="dark:text-white">
                                    Total Charges
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-slate-300">Setup Fee:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-white">${setupFee.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-slate-300">Total Deposit:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-white">${totalDeposit.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-slate-300">Charge (3%):</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="dark:text-white">${(totalDeposit * chargePercentage).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className="dark:bg-slate-600" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" className="dark:text-white">Total Amount:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" className="dark:text-white">${totalAmount.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        className="dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Submit Application
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
}