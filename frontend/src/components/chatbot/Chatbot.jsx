import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { HiX } from 'react-icons/hi';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [closeButtonVisible, setCloseButtonVisible] = useState(false);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (inputValue.trim() === '') return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { fromUser: true, text: inputValue },
        ]);
        setInputValue('');
        setGeneratingAnswer(true);
        setCloseButtonVisible(false);

        try {
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBTD3ihOFhcgzg7WvAoK0EKLXhg9AasLgk',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    contents: [{ parts: [{ text: inputValue }] }],
                },
            });

            console.log('API Response:', response.data);

            const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that.';
            setMessages((prevMessages) => [
                ...prevMessages,
                { fromUser: false, text: botReply },
            ]);
        } catch (error) {
            console.error('Error sending message:', error.response || error.message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { fromUser: false, text: 'Sorry, something went wrong. Please try again later.' },
            ]);
        } finally {
            setGeneratingAnswer(false);
            setCloseButtonVisible(true);
        }
    };

    const handleClearChat = () => {
        setMessages([]);  // Clear the chat messages
        setInputValue(''); // Clear the input field
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="relative w-full max-h-screen max-w-3xl mx-auto p-4 backdrop-blur-lg shadow-lg rounded-lg flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 max-h-60"> {/* Adjusted height */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${message.fromUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
                            }`}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="relative flex items-center border border-gray-300 rounded-full px-4 py-2 bg-transparent shadow-md">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 text-base text-white bg-transparent focus:outline-none rounded-full placeholder-white"
                    placeholder="Ask AI..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    onClick={sendMessage}
                    className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    {generatingAnswer ? 'Sending...' : 'Ask'}
                </button>
                {closeButtonVisible && (
                    <button
                        onClick={handleClearChat}
                        className="absolute top-0 right-0 mt-1 mr-1 text-gray-500 hover:text-gray-700 transition"
                        title="Clear"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
