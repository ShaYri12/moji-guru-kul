"use client";
import './styles/chat.css';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Connector, { reportWindowSize } from './connector';
import Image from 'next/image';

const Back = "/assets/images/live-lesson/back.png";
const Send = "/assets/images/live-lesson/send.png";

function Chat(props) {
  const [formValue, setFormValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isWindowMobileSize, setIsWindowMobileSize] = useState(false);
  //const [receivedMessages, setReceivedMessages] = useState(0);
  const [receivedMessagesCount, setReceivedMessagesCount] = useState(0);
  const [readUpdate, setReadUpdate] = useState(true);

  const messagesEndRef = useRef(null);
  //const inputRef = useRef(null);

  useLockBodyScroll();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesEndRef.current?.scrollIntoView();
  }
   
  useEffect(() => {
    Connector.getInstance().registerIncomingChatUpdateListener(receivedMessage);
    Connector.getInstance().registerCharReadStatus(applyReadStatus);
    let messages = Connector.getInstance().messages;	  
    for (let i = 0; i < messages.length; i++) {
        setMessages(prevState => [...prevState, messages[i]]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if(window.outerWidth <= 779){
      setIsWindowMobileSize(true);
    } else {
      setIsWindowMobileSize(false);
    }
  }, [window.outerWidth]);

  const sendMessage = async (e) => {
    e.preventDefault();

    disableAnimation();
    const time = new Date();

    let obj = {
      value : formValue,
      style : 'send',
      animation : true,
      timeStamp : time.getHours() + ":" + ('0'+time.getMinutes()).slice(-2),
    };
    
    if(Connector.getInstance().isChatWindowOpen){
      obj.read = true;
    }

    setMessages(prevState => [...prevState, obj]);

    Connector.getInstance().sendMessage(formValue);	   

    setFormValue('');
    //inputRef.current?.focus();
  }

  const receivedMessage = (msg) => {
    disableAnimation();
    const time = new Date();

    let obj = {
      value : msg,
      style : 'receive',
      animation : true,
      timeStamp : time.getHours() + ":" + ('0'+time.getMinutes()).slice(-2),
    }

    setMessages(prevState => [...prevState, obj]);
    setReceivedMessagesCount(receivedMessagesCount + 1);
  }

  const applyReadStatus = () => {
   
    let message = Connector.getInstance().messages;	  
    setMessages([...message]);

    setReadUpdate(!readUpdate);
  }

  const disableAnimation = async () => {
    messages.map(element => {
      element.animation = false;
    });
  }

  const toggleChatMobile = () => {
    Connector.getInstance().isChatActive = !Connector.getInstance().isChatActive;
    props.changeChatStatusMobile(false);
    reportWindowSize();
  }

  return (
    <StyleRoot style={{position:"relative", display:"table-cell"}}>
      <div className="chat-room-header">
        <header>
          {(Connector.getInstance().isMobile() || isWindowMobileSize ) && <button onClick={() => toggleChatMobile()}><div><Image src={Back}width={30} height={30} alt='' /></div></button>}
          <span>Chat Room</span>
        </header>
      </div>
      <div className='container'>

        {messages && messages.map(msg => {
        return(<>
          {msg.animation ?
            <p className={msg.style} style={styles.zoomIn}>{msg.value}<span>{msg.timeStamp + " " + (msg.read && msg.style === 'send'? '✓R' : '')}</span></p>
          :
            <p className={msg.style}>{msg.value}<span>{msg.timeStamp + " " + ( msg.read && msg.style === 'send' ? '✓R' : '')}</span></p>
          }
          </>)
        })}
        <div ref={messagesEndRef} />
      </div>
      {
          <form onSubmit={sendMessage}>
            <input /*ref={inputRef}*/ className='input-container' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter text here" />
            {formValue && <button className='input-container-button' disabled={!formValue}><Image src={Send} width={30} height={30} alt=''/></button>}
          </form>
        }
    </StyleRoot>
  );
}

const styles = {
  zoomIn: {
    animation: 'x 0.22s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  }
}

function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}

export default Chat;
