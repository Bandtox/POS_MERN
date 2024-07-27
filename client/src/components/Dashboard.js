import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Dashboard.css'; // Ensure this file exists and is correctly linked

const Dashboard = () => {
    const [dailySales, setDailySales] = useState({ totalSales: 0, count: 0 });
    const [monthlySales, setMonthlySales] = useState({ totalSales: 0, count: 0 });
    const [topProduct, setTopProduct] = useState("Loading...");
    const [monthlyGrowth, setMonthlyGrowth] = useState("Loading...");

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const [dailyResponse, monthlyResponse, topProductResponse] = await Promise.all([
                    axios.get('http://localhost/api/transactions/daily'),
                    axios.get('http://localhost/api/transactions/monthly'),
                    axios.get('http://localhost/api/transactions/top-product')
                ]);

                setDailySales(dailyResponse.data);
                setMonthlySales(monthlyResponse.data);
                setTopProduct(topProductResponse.data._id || "Product XYZ");

                const totalSalesThisMonth = monthlyResponse.data.totalSales;
                const totalSalesLastMonth = monthlyResponse.data.totalSales;

                const growth = totalSalesLastMonth > 0
                    ? ((totalSalesThisMonth - totalSalesLastMonth) / totalSalesLastMonth * 100).toFixed(2) + '%'
                    : "N/A";
                setMonthlyGrowth(growth);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    const calculateRevenue = (sales) => {
        return sales.totalSales;
    };

    const calculateSales = (sales) => {
        return sales.count;
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Sales Dashboard</h1>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Daily Sales</h2>
                    <p>Total Sales: ₹{calculateRevenue(dailySales).toLocaleString()}</p>
                    <p>Number of Transactions: {calculateSales(dailySales).toLocaleString()}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Monthly Sales</h2>
                    <p>Total Sales: ₹{calculateRevenue(monthlySales).toLocaleString()}</p>
                    <p>Number of Transactions: {calculateSales(monthlySales).toLocaleString()}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Revenue</h2>
                    <p>₹{calculateRevenue(monthlySales).toLocaleString()}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Top Product</h2>
                    <p>{topProduct}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Monthly Growth</h2>
                    <p>{monthlyGrowth}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
