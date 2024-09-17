"use client";
// thus file is good
import React, { useState, useEffect} from 'react';
import './styles/videoControls.css';


const Mic = "/assets/images/live-lesson/microphone.png";
const Mute = "/assets/images/live-lesson/mute.png";
const Video = "/assets/images/live-lesson/video.png";
const VideoDisabled = "/assets/images/live-lesson/videoDisabled.png";
const FullScreen = "/assets/images/live-lesson/fullscreen.png";
const Stop = "/assets/images/live-lesson/stop.png";
const Whiteboard = "/assets/images/live-lesson/whiteboard.png";
const WhiteboardDisabled = "/assets/images/live-lesson/whiteboarddisabled.png";
const Grid = "/assets/images/live-lesson/grid.png";
const GridDisabled = "/assets/images/live-lesson/griddisabled.png";
const Whiteboard_min = "/assets/images/live-lesson/whiteboard_min.png";
const Whiteboard_max = "/assets/images/live-lesson/whiteboard_max.png";
const Chat = "/assets/images/live-lesson/chat.png";
const ChatDisabled = "/assets/images/live-lesson/chatDisabled.png";

import Connector from './connector';
import {reportWindowSize} from './connector';
import Image from 'next/image';

const VideoChatControls = (props) => {
    const [number, setNumber] = useState(0);
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isWebCamDisabled, setIsWebCamDisabled] = useState(false);
    const [whiteBoard, setWhiteBoard] = useState(false);
    const [gridView, setGridView] = useState(false);
    const [isWhiteboardFullscreen, setWhiteboardScreen] = useState(false);
    //const [isChatActive, setIsChatActive] = useState(false);
  
    const elem = document.documentElement;

const teacher =Connector.getInstance().is_teacher;
    useEffect(() => {
        try {
          
            Connector.getInstance().registerVideoControlsUIReloadListener(reloadUI);
            
        } catch(e) {
            console.log('[SelfVideo:VideoChatControls] exception ' + e);
        }

        props.changeChatStatus(Connector.getInstance().isChatActive);
    
    }, []);
    console.log('___teacher ' + teacher);

    const micToggle = () => {
        try {
            if(isMicMuted){
                setIsMicMuted(false);
                Connector.getInstance().local_stream.getAudioTracks()[0].enabled = true;
            } else {
                setIsMicMuted(true);
                Connector.getInstance().local_stream.getAudioTracks()[0].enabled = false;
            }
        } catch(e) {
            console.log('[SelfVideo:micToggle] exception ' + e);
        }
    }

    const webCamToggle = () => {

        try {
            if(isWebCamDisabled){
                setIsWebCamDisabled(false);
                Connector.getInstance().local_stream.getVideoTracks()[0].enabled = true;
            } else {
                setIsWebCamDisabled(true);
                Connector.getInstance().local_stream.getVideoTracks()[0].enabled = false;
            }
        } catch(e) {
            console.log('[SelfVideo:webCamToggle] exception ' + e);
        }

    }

    const reloadUI = () => {
        
        setNumber(number + 1);
        setWhiteBoard(isWhiteboardActive());
        setGridView(isGridActive());
    }

    const toggleWhiteboard = () => {
        Connector.getInstance().toggleWhiteboard();
        reportWindowSize();
    }

    const toggleGirdView = () => {
        Connector.getInstance().is_gridview_active = !Connector.getInstance().is_gridview_active;
        console.log('Connector.getInstance().is_gridview_active ' + Connector.getInstance().is_gridview_active);
        Connector.getInstance().reloadUI();
        reportWindowSize();
    }

    const isWhiteboardActive = () => {
        return Connector.getInstance().isWhiteboardActive();
    }

    const isGridActive = () => {
        return Connector.getInstance().isGridActive();
    }
    
    const toggleFullscreen = () => {

        try {

            if (
                document.fullscreenElement || /* Standard syntax */
                document.webkitFullscreenElement || /* Safari and Opera syntax */
                document.msFullscreenElement /* IE11 syntax */
            ) {
                closeFullscreen();
            } else {
                openFullscreen();
            }

        } catch(e) {
            console.log('[SelfVideo:toggleFullscreen] exception ' + e);
        }
    }

    const toggleWhiteBoardFullScreen = () => {
     
        try {

            Connector.getInstance().whiteBoardFullScreen = !Connector.getInstance().whiteBoardFullScreen;
            reportWindowSize();
            setWhiteboardScreen(Connector.getInstance().whiteBoardFullScreen);

        } catch(e) {
            console.log('[SelfVideo:toggleFullscreen] exception ' + e);
        }

    }

    const openFullscreen = () => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    const hangup = () => {
        
        try {

            Connector.getInstance().stop();
            
        } catch(e) {
            console.log('[SelfVideo:hangup] exception ' + e);
        }

    }

    const toggleChat = () => {
        if(Connector.getInstance().isMobile()){
            Connector.getInstance().isChatActive = !Connector.getInstance().isChatActive;
            props.changeChatStatusMobile(!props.chatStatusMobile);
        } else {
            Connector.getInstance().isChatActive = !Connector.getInstance().isChatActive;
            props.changeChatStatus(Connector.getInstance().isChatActive);
        }
        Connector.getInstance().onChatWindowOpen();
        reportWindowSize();
    }

    console.log('reloadUI 11111111111111 teacher ' + teacher);

    const getUI = () => {
        let value = "" + teacher; 
        if(value == "true") {
            return (
                <div className = {props.chatStatus ? "video-controls-right-alignment-chat-active" : "video-controls-right-alignment"}>
                    <div className = {whiteBoard ? "video-controls-container-right" : "video-controls-container-right-whiteboard-inactive"}>
                        <div onClick = {() => toggleWhiteboard()}>
                            <Image src={ !whiteBoard ? Whiteboard : WhiteboardDisabled } className="video-controls-whiteboard" width={30} height={30} style = {{paddingRight : whiteBoard ? '3vmin' : '0vmin'}} alt=''/>
                            </div>
                        { !whiteBoard &&
                            <div onClick = {() => toggleGirdView()}><Image src={ !gridView ? Grid : GridDisabled } className="video-controls-grid"  width={30} height={30} alt='' /></div> 
                        }
                        { Connector.getInstance().whiteBoardUrl && <div onClick={() => toggleWhiteBoardFullScreen()} >
                            <Image src={!isWhiteboardFullscreen ? Whiteboard_max : Whiteboard_min } className= "video-controls-whiteboard-fullscreen"  width={30} height={30} alt='' />
                        </div>}
                        <div onClick={() => toggleFullscreen()} >
                            <Image src={FullScreen} className="video-controls-fullscreen"  width={30} height={30} alt=''   />
                        </div>
                        <div onClick={() => hangup()} >
                            <Image src={Stop} className="video-controls-stop"  width={30} height={30} alt=''  />
                        </div>


                        <div onClick={() => toggleChat()} >
                        <Image src={props.chatStatus ? ChatDisabled : Chat} className="video-controls-chat"  width={30} height={30}  alt=''  />
                    </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className = {props.chatStatus ? "video-controls-right-alignment-chat-active" : "video-controls-right-alignment"}>
                <div className = "video-controls-container-right-whiteboard-inactive-one">
                    { !whiteBoard &&
                        <div onClick = {() => toggleGirdView()}><Image src={ !gridView ? Grid : GridDisabled } className="video-controls-grid"  width={30} height={30} alt='' /></div> 
                    }
                    { Connector.getInstance().whiteBoardUrl && <div onClick={() => toggleWhiteBoardFullScreen()} >
                        <Image src={!isWhiteboardFullscreen ? Whiteboard_max : Whiteboard_min } className="video-controls-whiteboard-fullscreen"  width={30} height={30} alt='' />
                    </div>}
                    <div onClick={() => toggleFullscreen()} >
                        <Image src={FullScreen} className="video-controls-fullscreen"   width={30} height={30} alt=''  />
                    </div>


                    <div onClick={() => toggleChat()} >
                        <Image src={props.chatStatus ? ChatDisabled : Chat} className="video-controls-chat"   width={30} height={30} alt=''  />
                    </div>
                </div>
            </div>    
            );
        }
    }

    /*

    const getStudentUI = () => {

        if(is_teacher) {
            alert('get student ui teacher ' + teacher);
            return (
                <div className = "video-controls-right-alignment">
                <div className = "video-controls-container-right-whiteboard-inactive-one">
                    { !whiteBoard &&
                        <div onClick = {() => toggleGirdView()}><img src={ gridView ? Grid : GridDisabled } className="video-controls-grid" /></div> 
                    }
                    { Connector.getInstance().is_whiteboard_active && <div onClick={() => toggleWhiteBoardFullScreen()} >
                        <img src={Stop} className="video-controls-whiteboard-fullscreen" />
                    </div>}
                    <div onClick={() => toggleFullscreen()} >
                        <img src={FullScreen} className="video-controls-fullscreen"  />
                    </div>
                </div>
            </div>    
            );
        }
    }
    */

    return(
    <>
        <div className = "video-controls-left-alignment">
            <div className="video-controls-container-left">
                <div onClick = {() => micToggle()}><Image src={ isMicMuted ? Mute : Mic } className="video-controls-mic"  width={30} height={30} alt=''  /></div>
                <div onClick = {() => webCamToggle()}><Image src={ isWebCamDisabled ? VideoDisabled : Video} className="video-controls-video"  width={30} height={30} alt=''  /></div>
            </div>
        </div>

        {getUI()}
    </>
    );
}

export default VideoChatControls
