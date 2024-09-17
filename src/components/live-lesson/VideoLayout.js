"use client";
// this file is good

import React, { useState, useEffect, useRef} from 'react';
import './styles/videoLayout.css';
import Connector from './connector';
import {reportWindowSize} from './connector';

const VideoLayout = (props) => {

    const selfVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isRemoteVideoExist, setRemoteVideoExist] =  useState(false);
    const [number, setNumber] = useState(0);
    const [whiteBoard, setWhiteBoard] = useState(false);
    
    const [localVideoStyle, setLocalVideoStyle] = useState({});
    const [remoteVideoStyle, setRemoteVideoStyle] = useState({});
    const [remoteUserName, setRemoteUserName] = useState("");

    useEffect(() => {

        try {
          
            Connector.getInstance().registerSelfVideoUpdateListener(onSelfVideoUpdate);
            //Connector.getInstance().registerSelfRemoteVideoUpdateListener(reloadUI);
            Connector.getInstance().registerRemoteVideoUpdateListener(onRemoteVideoUpdate);
            //Connector.getInstance().registerSelfVideoUIReloadListener(reloadUI);
            //Connector.getInstance().registerSelfVideoUIReloadListener(reloadUI);
            Connector.getInstance().registerVideoStyleUpdate(updateVideoStyle);
            reloadUI();
           
        } catch(e) {
            console.log('[SelfVideo:useEffect] exception ' + e);
        }
    
    }, []);

    const updateVideoStyle = (localVideo, remoteVideo) => {

        try {

            setLocalVideoStyle(localVideo.style);
            setRemoteVideoStyle(remoteVideo.style);

	    setRemoteUserName(Connector.getInstance().remote_name ? Connector.getInstance().remote_name : "");
            
        } catch(e) {
            console.log('[SelfVideo:updateVideoStyle] exception ' + e);
        }
    }

    const reloadUI = () => {

        if(selfVideoRef && selfVideoRef.current) {
            Connector.getInstance().localVideo = selfVideoRef.current;
        }
        
        if(remoteVideoRef && remoteVideoRef.current) {
            Connector.getInstance().remoteVideo = remoteVideoRef.current;
        }

        setRemoteVideoExist(Connector.getInstance().remote_stream ? true : false);

        setNumber(number + 1);
        setWhiteBoard(isWhiteboardActive());
        //setGridView(isGridActive());
        
    }

    const onSelfVideoUpdate = (stream) => {

        try {
            
            selfVideoRef.current.srcObject = stream;
            reportWindowSize();
            reloadUI();

        } catch(e) {
            console.log('[Connector:onSelfVideoUpdate] Exception ' + e);
        }

    }

    const onRemoteVideoUpdate = (stream) => {

        try {

            if(stream) {
                remoteVideoRef.current.srcObject = stream
            } 

            reportWindowSize();
            reloadUI();
            
        } catch(e) {
            console.log('[Connector:onRemoteVideoUpdate] Exception ' + e);
        }

    }

    const isWhiteboardActive = () => {
        return Connector.getInstance().isWhiteboardActive();
    }

    const isGridActive = () => {
        if(!Connector.getInstance().remote_stream) {
            return true;
        }
        return Connector.getInstance().isGridActive();
    }

    const getRemoteVideoWidget = () => {

        return (
            <>
            {
                <div style={{width:remoteVideoStyle.width, height:remoteVideoStyle.height, position:remoteVideoStyle.position ? remoteVideoStyle.position : isRemoteVideoExist ? "relative" : "absolute", bottom:remoteVideoStyle.bottom, right:remoteVideoStyle.right, zIndex:remoteVideoStyle.zIndex, display:"inline-flex"}}>
                    <video ref={remoteVideoRef} style={{width:remoteVideoStyle.width, height:remoteVideoStyle.height, backgroundColor:"black"}} playsInline autoPlay/>
                    {((!Connector.getInstance().whiteBoardFullScreen && !isWhiteboardActive()) || !Connector.getInstance().whiteBoardFullScreen && isWhiteboardActive()) &&
                        <span className = "video-name-tag">{remoteUserName}</span>
                    }
                </div>
            }
            </>
        );
    
    }

    const getSelfVideoWidget = () => {

        return (
            <>
                <div style={{width:localVideoStyle.width, height:localVideoStyle.height, position:localVideoStyle.position ? localVideoStyle.position : Connector.getInstance().whiteBoardFullScreen ? null : "relative", bottom:localVideoStyle.bottom, right:localVideoStyle.right, zIndex:1, display:"inline-flex"}}>
                    <video ref={selfVideoRef} style={{width:localVideoStyle.width, height:localVideoStyle.height, backgroundColor:"black"}} className = "self-video-mirror" playsInline autoPlay muted/>
                    {((!Connector.getInstance().whiteBoardFullScreen && !isWhiteboardActive()) || !Connector.getInstance().whiteBoardFullScreen && isWhiteboardActive()) &&
                        <span className = "video-name-tag">You</span>
                    }
                </div>
            </>
        );
    
    }

    return(
        <>
            <div>
                {getRemoteVideoWidget()}
                {getSelfVideoWidget()}
            </div>
            
        </>
    );
    
}

export default VideoLayout
