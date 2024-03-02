import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    // Datos estáticos para ingresos
    const incomes = [
        { _id: 1, title: 'Salario', amount: 1000, date: '2022-01-01', category: 'Trabajo', description: 'Salario mensual', type: 'income' },
        { _id: 2, title: 'Venta de productos', amount: 200, date: '2022-01-05', category: 'Ventas', description: 'Ingresos de ventas', type: 'income' },
        // Agrega más datos de ingresos aquí si lo deseas
    ];

    // Función para eliminar un ingreso
    const deleteIncome = (id) => {
        // Implementa la lógica para eliminar un ingreso
        console.log('Eliminar ingreso con ID:', id);
    };

    // Función para calcular el total de ingresos
    const totalIncome = () => {
        // Implementa la lógica para calcular el total de ingresos
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => (
                            <IncomeItem
                                key={income._id}
                                id={income._id}
                                title={income.title}
                                description={income.description}
                                amount={income.amount}
                                date={income.date}
                                type={income.type}
                                category={income.category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        ))}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Income;
