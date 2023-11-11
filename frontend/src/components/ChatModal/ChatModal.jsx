import React, { useEffect, useState } from 'react';
import '../ChatModal/ChatModal.css';
import { FaPaperPlane } from 'react-icons/fa';
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';
import { addMessage, rooms, showMessages } from '../../utils/api';
function check(id,obj){
  if(id == obj.userId._id){
    return obj.ownerId.name
  }else if(id == obj.ownerId._id){
    return obj.userId.name
  }
}
const ChatModal = ({ isOpen, onClose, ownerId, chatRoomId ,rid}) => {
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatRooms, setChatRooms] = useState([])
  const [currentRoomId, setCurrentRoomId] = useState()
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    async function run() {
      setChatRooms(await rooms(userInfo._id,rid))
    }
    run()
    const newSocket = io(import.meta.env.VITE_SERVER_URL, { transports: ['websocket'] });
    setSocket(newSocket);
    newSocket.on('message', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message])
    });
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  console.log({ chatMessages });

  const sendMessage = async () => {
    if (socket && messageInput) {
      const newMessage = {
        message: messageInput,
        sender: userInfo?._id,

      };
      await addMessage(newMessage.message, currentRoomId, newMessage.sender,)
      socket.emit('sendMessage', currentRoomId, newMessage);
      setMessageInput('');
    }

  };

  const handleRoom = (id) => {
    setCurrentRoomId(id)

  };

  useEffect(() => {
    async function run() {
      setChatMessages(await showMessages(currentRoomId))
    }
    run()
    if (socket && currentRoomId) {
      socket.emit('joinRoom', currentRoomId);
    }

  }, [currentRoomId])

  return (
    <div className={`chat-modal ${isOpen ? 'open' : ''}`}>
      <div className="chat-modal-content">
        <div className="chat-header">
          {chatRooms.length > 0 && chatRooms.map(ele => (
            <div className='chat-room' key={ele._id} onClick={() => handleRoom(ele._id)}>
              <div className='chat-room-img'>
                <img src={ele.residencyId.images[0]} alt="" />
              </div>
              {/* <p>{ele.residencyId.title}</p> */}
              <p>{check(userInfo?._id,ele)}</p>
            </div>
          ))}
        </div>


        <div className="chat-box">
          <div className="chat-messages-container">
            <div className="chat-messages">
              {currentRoomId ? (
                chatMessages.length > 0 ? (
                  chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={message.sender === userInfo?._id ? 'user-message' : 'owner-message'}
                    >
                      {message.message}
                      <span className='time-stamp'>{message.timestamp}</span>
                    </div>
                  ))
                ) : (
                  <p>No messages here</p>
                )
              ) : (
                <p>Choose your chat room</p>
              )}

            </div>
          </div>

        </div>
        <div className="input-container" >
          <input
            type="text"
            placeholder='Type a Message...'
            style={{ width: '340px', borderRadius: '20px' }}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}

          />
          <FaPaperPlane
            onClick={sendMessage}
            style={{
              position: 'absolute',
              right: '45px',
              top: '45%',
              transform: 'translateY(-30%)',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
