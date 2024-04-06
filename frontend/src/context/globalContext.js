import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "https://financeme-project-1.onrender.com/api/v1/";


export const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

<<<<<<< HEAD
    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': user ? `Bearer ${user.token}` : '',
            },
        });

        const fetchData = async () => {
            try {
                const incomesResponse = await axiosInstance.get('get-incomes');
                setIncomes(incomesResponse.data);

                const expensesResponse = await axiosInstance.get('get-expenses');
                setExpenses(expensesResponse.data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (user) {
            fetchData();
        }

        return () => {
            // Cleanup function if needed
        };
    }, [user]);
=======
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
>>>>>>> parent of b2d7da24 (POR FINNNNNNNNNNNNNNNNNNNN)

    //calculate incomes
    const addIncome = async (income) => {
<<<<<<< HEAD
        try {
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            await axiosInstance.post('add-income', income);
            getIncomes();
        } catch (error) {
            setError(error.message);
        }
    };

    const getIncomes = async () => {
        try {
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const response = await axiosInstance.get('get-incomes');
            setIncomes(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

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
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            await axiosInstance.post('add-expense', expense);
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const getExpenses = async () => {
        try {
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const response = await axiosInstance.get('get-expenses');
            setExpenses(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const axiosInstance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            await axiosInstance.delete(`delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };
=======
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
>>>>>>> parent of b2d7da24 (POR FINNNNNNNNNNNNNNNNNNNN)

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
<<<<<<< HEAD
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };
=======
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

>>>>>>> parent of b2d7da24 (POR FINNNNNNNNNNNNNNNNNNNN)

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
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}