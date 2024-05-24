import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const FloatingChat = () => {
    const { totalBalance, getFinancialRecommendations, recommendation } = useGlobalContext();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hi, I am your financial assistant. How can I help you today?', from: 'bot' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (recommendation) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: recommendation, from: 'bot' }
            ]);
        }
    }, [recommendation]);

    useEffect(() => {
        // Limpia los mensajes al cargar el componente
        setMessages([{ text: 'Hi, I am your financial assistant. How can I help you today?', from: 'bot' }]);
    }, []);

    const handleRecommendation = async () => {
        setIsLoading(true);
        try {
            await getFinancialRecommendations();
        } catch (error) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Lo siento, hubo un error obteniendo la recomendación. Inténtalo de nuevo.', from: 'bot' }
            ]);
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
                        <OptionsButton onClick={handleRecommendation} disabled={isLoading}>
                            {isLoading ? 'Obteniendo recomendación...' : 'Obtener recomendación financiera'}
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
    bottom: 5%; /* Espacio para el botón de abrir */
    right: 5%;
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
    width: 90vw; /* Ancho máximo del 90% del viewport */
    height: 70vh; /* Altura del 70% del viewport */
    max-width: 500px; /* Máximo ancho de 500px */
    max-height: 600px; /* Máxima altura de 600px */
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
