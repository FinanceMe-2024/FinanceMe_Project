import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                const sign = type === 'expense' ? '-' : '+';
                const color = type === 'expense' ? 'red' : 'var(--color-green)';

                return (
                    <div key={_id} className="history-item">
                        <p style={{ color }}>{title}</p>
                        <p style={{ color }}>{`${sign}${Math.abs(amount).toFixed(2)}`}</p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    h2 {
        margin-bottom: 20px;
    }

    .history-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`;

export default History;
