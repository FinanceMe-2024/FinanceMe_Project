import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const FloatingChat = () => {
    const { totalBalance, getFinancialRecommendations } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: '¡Hola! Soy tu asistente financiero. ¿En qué puedo ayudarte hoy?', from: 'bot' }
    ]);
    const [userMessage, setUserMessage] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleMessageSend = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { text: userMessage, from: 'user' }];
        setMessages(newMessages);

        // Aquí se llama a la función del contexto global para obtener recomendaciones financieras
        await getFinancialRecommendations(totalBalance());

        setUserMessage('');
    };

    return (
        <ChatContainer>
            <ChatButton onClick={toggleChat}>{isOpen ? 'Cerrar' : 'Asistente'}</ChatButton>
            {isOpen && (
                <ChatBox>
                    <ChatMessages>
                        {messages.map((msg, index) => (
                            <Message key={index} from={msg.from}>
                                {msg.text}
                            </Message>
                        ))}
                    </ChatMessages>
                    <ChatInputContainer>
                        <ChatInput
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                        />
                        <SendButton onClick={handleMessageSend}>Enviar</SendButton>
                    </ChatInputContainer>
                </ChatBox>
            )}
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
`;

const ChatButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
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

const ChatInputContainer = styled.div`
    display: flex;
    border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: none;
    outline: none;
`;

const SendButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
`;

export default FloatingChat;
