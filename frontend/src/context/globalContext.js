import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const BASE_URL = "https://financeme-project-1.onrender.com/api/v1/";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${user ? user.token : ''}`,
        },
    });

    const addIncome = async (income) => {
        try {
            await axiosInstance.post('add-income', income);
            getIncomes();
        } catch (error) {
            setError(error.message);
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const response = await axiosInstance.get('get-incomes');
            setIncomes(response.data);
        } catch (error) {
            setError(error.message);
        }
    },[axiosInstance, setIncomes, setError])

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(`delete-income/${id}`);
            getIncomes();
        } catch (error) {
            setError(error.message);
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    const addExpense = async (expense) => {
        try {
            await axiosInstance.post('add-expense', expense);
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const getExpenses = setCallback(async () => {
        try {
            const response = await axiosInstance.get('get-expenses');
            setExpenses(response.data);
        } catch (error) {
            setError(error.message);
        }
    },[axiosInstance, setExpenses, setError])

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(`delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    useEffect(() => {
        if (user) {
            getIncomes();
            getExpenses();
        }
    }, [user,getIncomes,getExpenses]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
