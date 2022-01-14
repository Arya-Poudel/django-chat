import { render } from "react-dom";
import React, { useState, useEffect } from 'react';


const App = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const roomName = location.pathname.substr(1);
        const socketPath = 'ws://' + window.location.host + '/ws/' + roomName;
        const chatSocket = new WebSocket(socketPath);
        
        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message_userId = data['user_id']
            const loggedIn_userId = JSON.parse(document.getElementById('user_id').textContent) 
            
            const message = {id: data.id, text: data.message, date: data.utc_time, user_sender: message_userId === loggedIn_userId};
            message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');
            messages.push(message);
            setMessages([...messages]);
        };

        chatSocket.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#chat-message-input').focus();

        document.querySelector('#chat-message-submit').onclick = (e) => {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;

            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
        };
    }, [messages]);


    return (
        <div>
        <p>hun</p>
          {messages.map(message => (
                <div key={message.id} className={message.user_sender ? 'message-sender' : 'message-receiver'}>
                    {message.text}
                </div>
            )
          )}
            <textarea id="chat-message-input" type="text" cols="100" /><br />
            <input id="chat-message-submit" type="button" className="button" value="Send" />
        </div>
    );
}


export default App;

const container = document.getElementById("app");
render(<App />, container);