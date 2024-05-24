import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const FloatingChat = () => {
    const { totalBalance, getFinancialRecommendations, recommendation, getIncomeRecommendations, getExpenseRecommendations, incomeRecommendation, expenseRecommendation } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: '¡Hola! Soy tu asistente financiero. ¿En qué puedo ayudarte hoy?', from: 'bot' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleToggleOptions = async () => {
        setIsLoading(true);
        try {
            await getFinancialRecommendations();
            setMessages(prevMessages => [
                ...prevMessages,
                { text: recommendation, from: 'bot' }
            ]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIncomeRecommendation = async () => {
        setIsLoading(true);
        try {
            await getIncomeRecommendations();
            setMessages(prevMessages => [
                ...prevMessages,
                { text: incomeRecommendation, from: 'bot' }
            ]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExpenseRecommendation = async () => {
        setIsLoading(true);
        try {
            await getExpenseRecommendations();
            setMessages(prevMessages => [
                ...prevMessages,
                { text: expenseRecommendation, from: 'bot' }
            ]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            <OpenButton onClick={toggleChat}>{isOpen ? 'Cerrar' : 'Asistente'}</OpenButton>
            {isOpen && (
                <ChatContainer>
                    <CloseButton onClick={toggleChat}>×</CloseButton>
                    <ChatBox>
                        <ChatMessages>
                            {messages.map((msg, index) => (
                                <Message key={index} from={msg.from}>
                                    {msg.text}
                                </Message>
                            ))}
                        </ChatMessages>
                        <OptionsButton onClick={handleToggleOptions} disabled={isLoading}>
                            {isLoading ? 'Obteniendo recomendación financiera...' : 'Obtener recomendación financiera'}
                        </OptionsButton>
                        <OptionsButton onClick={handleIncomeRecommendation} disabled={isLoading}>
                            {isLoading ? 'Obteniendo recomendación de ingresos...' : 'Obtener recomendación de ingresos'}
                        </OptionsButton>
                        <OptionsButton onClick={handleExpenseRecommendation} disabled={isLoading}>
                            {isLoading ? 'Obteniendo recomendación de gastos...' : 'Obtener recomendación de gastos'}
                        </OptionsButton>
                    </ChatBox>
                </ChatContainer>
            )}
        </React.Fragment>
    );
};

const OpenButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
`;

const ChatContainer = styled.div`
    position: fixed;
    bottom: 80px; /* Espacio para el botón de abrir */
    right: 20px;
    z-index: 1000;
`;

const CloseButton = styled.button`
    background-color: transparent;
    color: #999;
    border: none;
    font-size: 20px;
    cursor: pointer;
    align-self: flex-end;
    margin-right: 10px;
`;

const ChatBox = styled.div`
    background-color: white;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ChatMessages = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
`;

const Message = styled.div`
    background-color: ${(props) => (props.from === 'bot' ? '#f1f1f1' : '#007bff')};
    color: ${(props) => (props.from === 'bot' ? 'black' : 'white')};
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-self: ${(props) => (props.from === 'bot' ? 'flex-start' : 'flex-end')};
    max-width: 80%;
`;

const OptionsButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
`;

export default FloatingChat;