import React from 'react';
import '../ChatModal/ChatModal.css';
import { FaPaperPlane } from 'react-icons/fa';
import {io} from 'socket.io-client'

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <div className={`chat-modal ${isOpen ? 'open' : ''}`}>
      <div className="chat-modal-content">
        <div className="chat-header">
          <h3 style={{ fontSize: '2rem', color: 'white', marginLeft: '5rem' }}>
            <b>Homes.com</b>
          </h3>
          <h6 style={{ color: 'whitesmoke', marginLeft: '8rem' }}>Welcome !</h6>
        </div>
        <div className="chat-box">
          <div className="chat-messages-container">
            <div className="chat-messages">
              <div className="user-message">Hello, I'm interested in the property. jdhsfjdh bdhfh fseuuw</div>
              <div className="owner-message">Great! What would you like to know?</div>
              <div className="user-message">fhhh hhjsdu jnheuhf nhh jjhrunk.</div>
              <div className="user-message">Hello, I'm interested in the property. jdhsfjdh bdhfh fseuuw</div>
              <div className="owner-message">Great! What would you like to know?</div>
              <div className="user-message">fhhh hhjsdu jnheuhf nhh jjhrunk.</div>
            </div>
          </div>
          
        </div>
        <div className="input-container" >
            <input type="text" placeholder='Type a Message...' style={{ width: '340px',borderRadius:'20px' }} />
            <FaPaperPlane
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
