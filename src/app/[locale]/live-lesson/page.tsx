"use client"
import React, { useState, useEffect } from 'react';
import '../../../components/live-lesson/styles/whiteboard.css';
import Connector from '../../../components/live-lesson/connector';
import {reportWindowSize} from '../../../components/live-lesson/connector';
import VideoLayout from '../../../components/live-lesson/VideoLayout';
import VideoChatControls from '../../../components/live-lesson/VideoChatControls';
import Chat from '../../../components/live-lesson/Chat';
import '../../../components/live-lesson/styles/home.css';
import Iframe from 'react-iframe';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

function Index() {
  const [whiteBoard, setWhiteBoard] = useState(false);
  const [whiteBoardUrl, setWhiteBoardUrl] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isChatActiveMobile, setIsChatActiveMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(Connector.getInstance().isMobile());
  
  const [videoStyle, setVideoStyle] = useState({});
  const [whiteBoardStyle, setWhiteboardStyle] = useState({});
  const [started, setStarted] = useState(false);

  const user = useAuthStore(state=>state.user)
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId');


//   we will use lessonId as roomId

  useEffect(() => {
    if (!user) return;
    try {
        setStarted(true);
        console.log('came here ----');

        Connector.getInstance().is_teacher = user?.role == "Tutor" ? true : "false";
        Connector.getInstance().user_name = user?.firstName;
        Connector.getInstance().room  = lessonId;
        reportWindowSize();


        Connector.getInstance().connect();
        Connector.getInstance().start();
        Connector.getInstance().registerHomeStyleUpdate(updateVideoStyle);
        Connector.getInstance().registerSessionTerminatedUpdateListener(onSessionTerminated);
        updateSize();
        window.addEventListener('resize', updateSize);

    } catch(e) {
        console.log('[Home:useEffect] exception ' + e);
    }

  },  [user]);
  
  useEffect(() => {
    setIsChatActive(Connector.getInstance().isChatActive);
  }, [Connector.getInstance().isChatActive]);
  


  const onSessionTerminated = (is_teacher:any) => {
    try {

	    
     if(is_teacher == false || is_teacher === false) {
      	console.log('---- is_teacher ' + is_teacher);
     	alert("Session terminated by host");
      	router.push("/");
     } else {
      	router.push("/");
     }
    } catch(e) {
      console.log('[Home:onSessionTerminated] exception ' + e);
    }

  }

  const updateVideoStyle = (wrapPanel:any, whiteboardPanel:any) => {

    try {

      console.log('updateVideoStyle wrapPanel.style ' + JSON.stringify(wrapPanel.style));
      
      setVideoStyle(wrapPanel.style);
      setWhiteboardStyle(whiteboardPanel.style);
      
      setWhiteBoard(Connector.getInstance().is_whiteboard_active);
      setWhiteBoardUrl(Connector.getInstance().whiteBoardUrl);
    
    } catch(e) {
        console.log('[Home:updateVideoStyle] exception ' + e);
    }
  }

  const updateSize = () => {
    reportWindowSize();
  }

  console.log('whiteBoard 1111 ' + whiteBoard + " , style " + JSON.stringify(whiteBoardStyle), isChatActive);

  // 

  return (
    <>
      <div className='relative'>
          <div>
            <div className = "wrappanel" style={videoStyle}>
                  <VideoLayout/>
              </div>
            
              {(whiteBoard || whiteBoardUrl) &&
                <div className="wrappanel" style={whiteBoardStyle}>
                    <Iframe url={Connector.getInstance().whiteBoardUrl}
                  id="myId"
                  width="100%"
                    height="100%"
                  />
                </div>
              }

              {!isChatActiveMobile && <VideoChatControls chatStatus = { isChatActive } changeChatStatus = { setIsChatActive } changeChatStatusMobile = {setIsChatActiveMobile} chatStatusMobile = { isChatActiveMobile }/>}
              {isChatActive && <Chat chatStatusMobile = { isChatActiveMobile } changeChatStatusMobile = { setIsChatActiveMobile }/>} 
          </div>
      </div>
    </>
  );
}

export default Index;
