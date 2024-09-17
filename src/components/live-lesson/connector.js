"use client"
// this file is good

import React from 'react';
import { PEERCONNECTION_CONFIGURATION, SOCKET_IO_URL, OFFER_OPTIONS } from './constants';
import io from 'socket.io-client';

var isMobile = {
    Android: function() {
        return global.navigator&& global.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return global.navigator&&global.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return global.navigator&&global.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return global.navigator&&global.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return global.navigator&&global.navigator.userAgent.match(/IEMobile/i) || global.navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return global.navigator&&(isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

let instance = null;

class Connector extends React.Component {

    constructor() {
        super();
        this.clear();
    }

    static getInstance() {
        if(instance == null) {
            instance = new Connector();
        }
        return instance;
    }
    

    clear() {
        
        this.is_teacher = false;
        this.is_initilized = false;
        this.room = null;
        this.user_name = null;
        this.remote_name = null;
        // Declaring variables
        this.socket = null;
        this.local_stream = null;
        this.remote_stream = null;
        this.peer_connection = null;

        this.is_gridview_active = false;
        this.is_whiteboard_active = false;

        this.remoteVideo = null;
        this.localVideo = null;
        this.whiteBoardUrl = null;
        this.fetchedWhiteBoardUrl = null;
        this.whiteBoardFullScreen = false;
        this.isChatActive = false;
        this.isChatWindowOpen = false;
        
        // CallBacks
        this.onConnectUpdate = null; // On Connect/Disconnect update 
        this.onRoomsUpdate = null; // Rooms update listener. This is a temporary one to just to show the rooms
        this.onSelfVideoUpdate = null; // On Self Video Loading Update
        this.onSelfRemoteVideoUpdate = null; // Update self video componenet that remote video started or stopped
        this.onRemoteVideoUpdate = null; // On Remote Video Loading Update
        this.onRemoteMuteAudioUpdate = null; // On Teacher Mute Student
        this.onRemoteBlockVideoUpdate = null; // On Teacher Block Student Video
        this.onWhiteBoardUpdate = null; // On Teacher start/stop Whiteboard
        this.onSessionTerminatedUpdate = null; // Teacher Terminate the session
        this.onSelfVideoUIReload = null;
        this.onRemoteVideoUIReload = null;
        this.onVideoControlsUIReload = null;
        this.onHomeUIReload = null;
	    this.onIncomingChatUpdate = null;
        this.onChatReadUpdate = null;

        this.onHomeStyleUpdate = null;
        this.onVideoStyleUpdate = null;

	    this.messages = [];
    
    }

    registerHomeStyleUpdate(listener) {
        this.onHomeStyleUpdate = listener;
    }

    registerVideoStyleUpdate(listener) {
        this.onVideoStyleUpdate = listener;
    }

    registerConnectUpdateListener(listener) {
        this.onConnectUpdate = listener;
    }

    registerRoomsUpdateListener(listener) {
        this.onRoomsUpdate = listener;
    }

    registerSelfVideoUpdateListener(listener) {
        this.onSelfVideoUpdate = listener;
    }

    registerSelfRemoteVideoUpdateListener(listener) {
        this.onSelfRemoteVideoUpdate = listener;
    }

    registerRemoteVideoUpdateListener(listener) {
        this.onRemoteVideoUpdate = listener;
    }

    registerRemoteMuteAudioUpdateListener(listener) {
        this.onRemoteMuteAudioUpdate = listener;
    }

    registeronRemoteBlockVideoUpdateListener(listener) {
        this.onRemoteBlockVideoUpdate = listener;
    }

    registerWhiteBoardUpdateListener(listener) {
        this.onWhiteBoardUpdate = listener;
    }

    registerSessionTerminatedUpdateListener(listener) {
        this.onSessionTerminatedUpdate = listener;
    }

    registerSelfVideoUIReloadListener(listener) {
        this.onSelfVideoUIReload = listener;
    }

    registerRemoteVideoUIReloadListener(listener) {
        this.onRemoteVideoUIReload = listener;
    }

    registerVideoControlsUIReloadListener(listener) {
        this.onVideoControlsUIReload = listener;
    }

    registerHomeUIReloadListener(listener) {
        this.onHomeUIReload = listener;
    }
 

    registerIncomingChatUpdateListener(listener) {
	    this.onIncomingChatUpdate = listener;
    }

    registerCharReadStatus(listener) {
        this.onChatReadUpdate = listener;
    }

    async connect() {

        let self = this;
        
        try {

            if(this.is_initilized) {
                return;
            }

            this.is_initilized = true;

            this.socket = io(SOCKET_IO_URL);
            this.socket.on('connect', () => self.onSocketConnected());
            this.socket.on('disconnect', () => self.onSocketDisconnected());
            this.socket.on('peer-connected', (data) => self.onPeerConnected(data));
            this.socket.on('peer-disconnected', (data) => self.onPeerDisconnected(data));
            this.socket.on('update_name', (data) => self.onUpdateRemoteName(data));
            this.socket.on('offer', (data) => self.onOffer(data));
            this.socket.on('answer', (data) => self.onAnswer(data));
            this.socket.on('candidate', (data) => self.onCandidate(data));
            this.socket.on('start-whiteboard', (data) => self.onStartWhiteBoard(data));
            this.socket.on('stop-whiteboard', (data) => self.onStopWhiteBoard(data));
            this.socket.on('mute-audio', (data) => self.onMuteAudio(data));
            this.socket.on('block-video', (data) => self.onBlockVideo(data));
            this.socket.on('chat', (data) => self.onChat(data));
            this.socket.on('read', (data) => self.onRead(data));
            
        } catch(e) {
            console.log('[Connector:connect] Exception ' + e);
        }

    }

    fetchRooms() {

        try {

        } catch(e) {
            console.log('[Connector:fetchRooms] Exception ' + e);
        }

    }

    isWhiteboardActive() {
        return this.is_whiteboard_active;
    }

    isGridActive() {
        return this.is_gridview_active;
    }

    isMobile() {
        if (isMobile.Android() || isMobile.iOS()) {
            return true;
        }
        return false;
    }

    async createLocalStream() {
     if(!global.navigator){
            return;
     }
        try {

            if (isMobile.Android() || isMobile.iOS()) {
                this.local_stream = await global.navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 640, height: 480 } });
            } else {
                this.local_stream = await global.navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 1280, height: 720 } });
            }

            console.dir(this.local_stream);

            if(this.onSelfVideoUpdate) {
                this.onSelfVideoUpdate(this.local_stream);
            }
            

        } catch(e) {
            console.log('[Connector:createLocalStream] Exception ' + e);
        }
    }

    async start() {

        try {

            //Establishing a connection to Socket.io server
            await this.createLocalStream();
    
            if(!this.user_name) {
                this.user_name = this.is_teacher ? 'Teacher' : 'Student';
            }

            this.socket.emit('join-room', {
                room: this.room,
                name: this.user_name,
                is_teacher: this.is_teacher
            });
            
        } catch(e) {
            console.log('[Connector:connect] Exception ' + e);
        }
    }


    sendMessage(message) {

	   try {
        const time = new Date();
		let obj = {
      			value : message,
      			style : 'send',
      			animation : false,
                timeStamp : time.getHours() + ":" + ('0'+time.getMinutes()).slice(-2),
    		}
        if(this.isChatWindowOpen) {
            obj.read = true;
        }

		this.messages.push(obj);


		  this.socket.emit('chat', {
                room: this.room,
                message: message,
            });

	   } catch(e) {
		 console.log('[Connector:sendMessage] Exception ' + e);
	   }
    }

    onChat(data) {
	   try {
        const time = new Date();
		console.log('got on chat message ' + data.message);
		let obj = {
      			value : data.message,
      			style : 'receive',
      			animation : false,
                timeStamp : time.getHours() + ":" + ('0'+time.getMinutes()).slice(-2),
    		}

		this.messages.push(obj);
		if(this.onIncomingChatUpdate) {
			this.onIncomingChatUpdate(data.message);
		}
	   } catch(e) {
		 console.log('[Connector:onChat] Exception ' + e);
	   }
    }

    onChatWindowOpen() {
        try{
            if(this.isChatActive){
                this.socket.emit('read', {
                    room: this.room,
                    read: true
                });
            } else {
                this.socket.emit('read', {
                    room: this.room,
                    read: false
                });
            }
        } catch(e) {
            console.log('[Connector:onChatWindowOpen] Exception ' + e);
        }
    }

    onRead(data){
        try{
            if(data.read === true){
                this.messages.forEach(element => {
                    if(element.style === "send"){
                        element.read = true;
                    }
                });
                
                this.isChatWindowOpen = true;
                if(this.onChatReadUpdate) {
                    this.onChatReadUpdate();
                }
            } else {
                this.isChatWindowOpen = false;
            }
        } catch(e) {
            console.log('[Connector:onRead] Exception ' + e);
        }
    }


    stop() {

        try {

	     let isExecuted = window.confirm("Are you sure you want to stop the session?");
	    if(!isExecuted) {
		return;
	    }

       	    if(this.onSessionTerminatedUpdate) {
                this.onSessionTerminatedUpdate(true);
            }

            
            if(this.peer_connection) {
                this.peer_connection.close();
            }
            
            this.remote_stream = null;

            this.local_stream.getTracks().forEach(track => track.stop());
     
        } catch(e) {
            console.log('[Connector:stop] Exception ' + e);
        } 

        try {
            this.socket.close();
        } catch(e) {
            console.log('[Connector:stop] Exception 1 ' + e);
        } finally {
            this.clear();
        }

    }

    onSocketConnected() {

        try {

            console.log('[Connector:onSocketConnected]');

            if(this.onConnectUpdate) {
                this.onConnectUpdate(true);
            }

        } catch(e) {
            console.log('[Connector:onSocketConnected] Exception ' + e);
        }
    }

    onSocketDisconnected() {

        try {

            console.log('[Connector:onSocketDisconnected]');

            if(this.onConnectUpdate) {
                this.onConnectUpdate(false);
            }

        } catch(e) {
            console.log('[Connector:onSocketDisconnected] Exception ' + e);
        }
    }

    async onUpdateRemoteName(data) {	
	this.remote_name = data.name;
	console.log('[onUpdateRemoteName] name ' + this.remote_name);
    }

    async onPeerConnected(data) {

        let self = this;

        try {

 	   console.dir(data);
	   if(data) {
	   	this.remote_name = data.name;
	   }

	   console.log('[onPeerConnected] name ' + this.remote_name);

	    this.socket.emit('update_name', {
                room: this.room,
		name: this.user_name
            });


            console.dir(this);
            
            console.log('[Connector:onPeerConnected] ' + JSON.stringify(data));

            const pc_constrants = {};
            this.peer_connection = new RTCPeerConnection(PEERCONNECTION_CONFIGURATION, pc_constrants);
            this.peer_connection.addEventListener('icecandidate', e => self.onIceCandidate(e));
            this.peer_connection.addEventListener('track', e => self.gotRemoteStream(e)); 
            this.peer_connection.addEventListener('iceconnectionstatechange', e => self.onIceStateChange(e));
            console.dir(this.local_stream);
            for (const track of this.local_stream.getTracks()) {
                console.log('adding -----------------------------');
                this.peer_connection.addTrack(track, this.local_stream);
            }

            const offer = await this.peer_connection.createOffer(OFFER_OPTIONS);
            await this.peer_connection.setLocalDescription(offer);

            console.log('[Connector:onPeerConnected] offer ' + JSON.stringify(offer));

            this.socket.emit('offer', {
                room: this.room,
                jsep: offer
            });


            console.log('[[Connector:onPeerConnected] this.is_teacher ' + this.is_teacher + ' , this.whiteBoardUrl ' + this.whiteBoardUrl);

            if(!this.is_teacher && this.whiteBoardUrl) {
                // We already have whiteboard session is running
                this.socket.emit('start-whiteboard', {
                    room: this.room,
                    name: this.user_name,
                    url: this.whiteBoardUrl,
                });
            }

        } catch(e) {
            console.log('[Connector:onPeerConnected] Exception ' + e);
        }
    }

    onPeerDisconnected() {

        try {

            console.log('[Connector:onPeerDisconnected]');

            if(this.peer_connection) {
                this.peer_connection.close();
            }
            
            this.remote_stream = null;

            if(this.is_teacher) {

                if(this.onRemoteVideoUpdate) {
                    this.onRemoteVideoUpdate(null);
                }

                if(this.onSelfRemoteVideoUpdate) {
                    this.onSelfRemoteVideoUpdate();
                }

            } else {
                this.local_stream.getTracks().forEach(track => track.stop());
                if(this.onSessionTerminatedUpdate) {
                    this.onSessionTerminatedUpdate(false);
                }
            } 

        } catch(e) {
            console.log('[Connector:onPeerDisconnected] Exception ' + e);
        } finally {
            this.peer_connection = null;
        }
    }

    async onOffer(data) {

        let self = this;

        try {

            console.log('[Connector:onOffer] ' + JSON.stringify(data));

            const pc_constrants = {};
            

            this.peer_connection = new RTCPeerConnection(PEERCONNECTION_CONFIGURATION, pc_constrants);
            this.peer_connection.addEventListener('icecandidate', e => self.onIceCandidate(e));
            this.peer_connection.addEventListener('track', e => self.gotRemoteStream(e)); 
            this.peer_connection.addEventListener('iceconnectionstatechange', e => self.onIceStateChange(e));
            for (const track of this.local_stream.getTracks()) {
                console.log('adding -----------------------------');
                this.peer_connection.addTrack(track, this.local_stream);
            }

            this.peer_connection.setRemoteDescription(new RTCSessionDescription(data.jsep));
            const answer = await this.peer_connection.createAnswer(OFFER_OPTIONS);
            await this.peer_connection.setLocalDescription(answer);

            console.log('[Connector:onPeerConnected] answer ' + JSON.stringify(answer));

            this.socket.emit('answer', {
                room: this.room,
                jsep: answer
            });

        } catch(e) {
            console.log('[Connector:onOffer] Exception ' + e);
        }
    }

    onAnswer(data) {

        try {
            console.log('[Connector:onAnswer] ' + JSON.stringify(data));
            this.peer_connection.setRemoteDescription(new RTCSessionDescription(data.jsep))
        } catch(e) {
            console.log('[Connector:onAnswer] Exception ' + e);
        }
    }

    onCandidate(data) {

        try {
            console.log('[Connector:onCandidate] ' + JSON.stringify(data));
            this.peer_connection.addIceCandidate(new RTCIceCandidate(data.jsep));

        } catch(e) {
            console.log('[Connector:onCandidate] Exception ' + e);
        }
    }

    onStartWhiteBoard(data) {

        try {

            this.whiteBoardUrl = data.url;
            console.log('[Connector:onStartWhiteBoard] ' + JSON.stringify(data));
            reportWindowSize();

        } catch(e) {
            console.log('[Connector:onStartWhiteBoard] Exception ' + e);
        }
    }

    onStopWhiteBoard(data) {

        try {

            console.log('[Connector:onStopWhiteBoard] ' + JSON.stringify(data));
            this.whiteBoardUrl = null;
            reportWindowSize();
        } catch(e) {
            console.log('[Connector:onStopWhiteBoard] Exception ' + e);
        }
    }

    onMuteAudio(data) {

        try {

            console.log('[Connector:onMuteAudio] ' + JSON.stringify(data));

            // We have to mute our Audio

        } catch(e) {
            console.log('[Connector:onMuteAudio] Exception ' + e);
        }
    }

    onBlockVideo(data) {

        try {

            console.log('[Connector:onBlockVideo] ' + JSON.stringify(data));

        } catch(e) {
            console.log('[Connector:onBlockVideo] Exception ' + e);
        }
    }

    onIceCandidate(event) {

        try {

            if(!event.candidate) {
                // Looks like end of the candidates
                return;
            }

            console.log('[Connector:onIceCandidate] candidate ' + JSON.stringify(event.candidate));

            this.socket.emit('candidate', {
                room: this.room,
                jsep: event.candidate
            });

        } catch(e) {
            console.log('[Connector:onIceCandidate] Exception ' + e);
        }

    }

    gotRemoteStream(event) {

        try {

            if (this.remote_stream === event.streams[0]) {
                // Already set the remote stream no need to worry
                return;
            }

            console.log('[Connector:gotRemoteStream]');
            console.dir(event.streams);

            this.remote_stream = event.streams[0];
            
            if(this.onRemoteVideoUpdate) {
                this.onRemoteVideoUpdate(this.remote_stream );
            }

            if(this.onSelfRemoteVideoUpdate) {
                this.onSelfRemoteVideoUpdate();
            }

        } catch(e) {
            console.log('[Connector:gotRemoteStream] Exception ' + e);
        }
    }

    onIceStateChange(event) {

        try {

        } catch(e) {
            console.log('[Connector:onIceStateChange] Exception ' + e);
        }

    }

    reloadUI() {

        try {

            if(this.onSelfVideoUIReload) {
                this.onSelfVideoUIReload();
            }

            if(this.onRemoteVideoUIReload) {
                this.onRemoteVideoUIReload();
            }

            if(this.onVideoControlsUIReload) {
                this.onVideoControlsUIReload();
            }

            if(this.onHomeUIReload) {
                this.onHomeUIReload();
            }

            reportWindowSize();

        } catch(e) {
            console.log('[Connector:reloadUI] Exception ' + e);
        }
        
    }

    toggleWhiteboard() {

        try {

            
            if(!this.is_whiteboard_active) {

                this.socket.emit('start-whiteboard', {
                    room: this.room,
                    name: this.user_name,
                    url: this.fetchedWhiteBoardUrl
                });

                if(this.fetchedWhiteBoardUrl) {
                    this.whiteBoardUrl = this.fetchedWhiteBoardUrl;
                    reportWindowSize();
                }
 
            } else {
                
                this.socket.emit('stop-whiteboard', {
                    room: this.room,
                    name: this.user_name,
                });

                this.fetchedWhiteBoardUrl = this.whiteBoardUrl;
                this.whiteBoardUrl = null;

            }

            this.is_whiteboard_active = !this.is_whiteboard_active;
            this.reloadUI();

        } catch(e) {
            console.log('[Connector:toggleWhiteboard] Exception ' + e);
        }
    }

    toggleChat() {
        if(this.isChatActive && !this.isMobile()) {
            let windowSize = ((window.innerWidth * 73)/100);
            return windowSize;
        }else if (this.isChatActive && this.isMobile()) {
            let windowSize = 0;
            return windowSize;
        } else if (!this.isChatActive) {
            let windowSize = window.innerWidth;
            return windowSize;
        }

        return window.innerWidth;
    }

}

let previousWindowWidth = null;
let previousWindowHeight = null;

export function reportWindowSize() {

    try {

        console.log('[reportWindowSize] window.innerWidth ' + window.innerWidth + " , window.innerHeight " + window.innerHeight);

        try {
       //     document.getElementById('root').style.width = window.innerWidth + 'px';
       //     document.getElementById('root').style.height = window.innerHeight + 'px';
        } catch(e) {
            console.log('[reportWindowSize] exceptiion ' + e);
        }

	
        let windowWidth = Connector.getInstance().toggleChat() - 3;
        let windowHeight = window.innerHeight;

	if(isMobile.Android()) {
		windowWidth = Connector.getInstance().toggleChat() - 3;
		windowHeight = window.outerHeight;
	}


	    /*
        if(Connector.getInstance().isMobile() && previousWindowWidth != null) {

            // Ok i am making sure setting the previous values

            if(windowWidth > windowHeight) {
                windowWidth = previousWindowHeight - 3;
                windowHeight = previousWindowWidth - 3;
            } else {
                windowWidth = previousWindowWidth - 3;
                windowHeight = previousWindowHeight - 3;
            }

        } else {
            if(windowWidth > windowHeight) {
                previousWindowHeight = windowWidth;
                previousWindowWidth = windowHeight;
            } else {
                previousWindowWidth = windowWidth;
                previousWindowHeight = windowHeight;
            }
        } */
        

        let is_gridview_active = Connector.getInstance().is_gridview_active;
        let is_whiteboard_active = false;
        
        if(Connector.getInstance().is_whiteboard_active || Connector.getInstance().whiteBoardUrl) {
            is_whiteboard_active = true;
            windowHeight = windowHeight/2;
            is_gridview_active = true;
        }

        // If not gridView make sure put it as general video view
        
        let gridViewWidth = 200;
        let gridViewHeight = 112;

        let minGridWidth = gridViewWidth;
        let minGridHeight = gridViewHeight;
        let totalVideosCanRender = Connector.getInstance().remote_stream ? 2 : 1;
        
        if(!Connector.getInstance().remote_stream) {
            console.log('no remote stream');
            is_gridview_active = true;
        }


        if(Connector.getInstance().isMobile() && totalVideosCanRender == 1) {
            gridViewWidth = 150;
            gridViewHeight = 200;

            if((Connector.getInstance().toggleChat()) > windowHeight) {
                gridViewWidth = 200;
                gridViewHeight = 150;
            }
        }

        if(!is_gridview_active) {
            totalVideosCanRender = 1;
        }

        //console.log("is_gridview_active " + is_gridview_active + " , totalVideosCanRender " + totalVideosCanRender + " , remote_stream " + Connector.getInstance().remote_stream);

        let columnCount = 0;
        let rowCount = 0;

        let fitVideoWidth = gridViewWidth;
        let fitVideoHeight = gridViewHeight;

        let percentage = 0.1; // this is for just gap

        for (let i = 0; i < 2048; i++) { // I am just looping 512 times just to get width and height of the each window i can put

            let tempWidth = 0.0;
            let tempHeight = 0.0;
            let breakLoopOnMaximum = false;

            columnCount = 0;
            rowCount = 0;

            for (let j = 0; j < totalVideosCanRender; j++) {
                if ((tempWidth + minGridWidth) > (Connector.getInstance().toggleChat())) {
                    break;
                }
                tempWidth += minGridWidth;
                columnCount++;
            }

            if (columnCount == 0) {
                break;
            }

            let myGridViewRowCount = totalVideosCanRender / columnCount;
            let requiredRowCount = Math.ceil(myGridViewRowCount);

            for (let k = 0; k < requiredRowCount; k++) {
                if ((tempHeight + minGridHeight) > windowHeight) {
                    breakLoopOnMaximum = true;
                    break;
                }
                tempHeight += minGridHeight;
                rowCount++;
            }

            if (rowCount == 0) {
                rowCount = 1;
                break;
            }

            if (breakLoopOnMaximum == true) {
                break;
            }

            if (minGridWidth * columnCount > (Connector.getInstance().toggleChat())) {
                if (minGridHeight * rowCount > windowHeight) {
                    break;
                }
            }

            fitVideoWidth = minGridWidth;
            fitVideoHeight = minGridHeight;

            percentage = percentage + 0.01;
            minGridWidth = gridViewWidth * percentage;
            minGridHeight = gridViewHeight * percentage;
        }

        console.log("fitVideoWidth " + fitVideoWidth + " , fitVideoHeight " + fitVideoHeight);

        let wrapPanel = {};
        let localVideo = {};
        let remoteVideo = {};

        wrapPanel.style = {};
        localVideo.style = {};
        remoteVideo.style = {};
        
        localVideo.style.top = '0px';
        localVideo.style.width = fitVideoWidth + 'px';
        localVideo.style.height = fitVideoHeight + '112px';
        localVideo.style.backgroundColor = '#000000';
        remoteVideo.style.backgroundColor = '#000000';

        
        if (Connector.getInstance().remote_stream) {
            if ((fitVideoWidth * totalVideosCanRender) <= (Connector.getInstance().toggleChat()) * 1.0) {
                remoteVideo.style.top = '0px';
                remoteVideo.style.left = (fitVideoWidth + 0.1) + 'px';

            } else {
                remoteVideo.style.top = (fitVideoHeight + 0.1) + 'px';
                remoteVideo.style.left = '0px';
            }
            remoteVideo.style.display = "";
        } else {
            remoteVideo.style.display = "none";
        }

        remoteVideo.style.width = fitVideoWidth + 'px';
        remoteVideo.style.height = fitVideoHeight + '112px';

        let left = 0;
        let top = 0;
        if ((fitVideoWidth * totalVideosCanRender) <= (Connector.getInstance().toggleChat()) * 1.0) {
            left = (((Connector.getInstance().toggleChat()) - (fitVideoWidth * totalVideosCanRender)) / 2);
            top = ((windowHeight - fitVideoHeight) / 2);

            wrapPanel.style.width = ((Connector.getInstance().toggleChat()) - (left * totalVideosCanRender)) + 'px';
            wrapPanel.style.height = (windowHeight - top) + 'px';
            wrapPanel.style.overflowY = 'hidden';
            wrapPanel.style.overflowX = 'hidden';

        } else {
            left = (((Connector.getInstance().toggleChat()) - fitVideoWidth) / 2);
            top = ((windowHeight - (fitVideoHeight * totalVideosCanRender)) / 2);

            wrapPanel.style.width = ((Connector.getInstance().toggleChat()) - (left)) + 'px';
            wrapPanel.style.height = (windowHeight - top * totalVideosCanRender) + 'px';
            wrapPanel.style.overflowY = 'hidden';
            wrapPanel.style.overflowX = 'hidden';
        }

        wrapPanel.style.top = top + 'px';
        wrapPanel.style.left = left + 'px';
        wrapPanel.style.overflowY = 'hidden';
        wrapPanel.style.overflowX = 'hidden';

       // console.log('[reportWindowSize] is_gridview_active ' + is_gridview_active);
       // console.log('[reportWindowSize] wrapPanel ' + JSON.stringify(wrapPanel));
       // console.log('[reportWindowSize] localVideo ' + JSON.stringify(localVideo));
       // console.log('[reportWindowSize] remoteVideo ' + JSON.stringify(remoteVideo));

        if(!is_gridview_active) {
            
            remoteVideo = JSON.parse(JSON.stringify(localVideo));
           // remoteVideo.style.display = "none";
           
            localVideo = {};
            localVideo.style = {};

            if(is_whiteboard_active) {
                localVideo.style.bottom = windowHeight + "0px";
            } else {
                localVideo.style.bottom = "10px";
            }

            localVideo.style.right = "10px";
            localVideo.style.height = "20vmin";
            localVideo.style.width = "30vmin";
            localVideo.style.position = "absolute";
            localVideo.style['z-index'] = "2";
	    localVideo.style.backgroundColor = '#000000';
            console.log('grid view not active');
 

	    if((isMobile.Android() || isMobile.iOS()) && (Connector.getInstance().toggleChat()) < windowHeight) {
		// This is portrite

		localVideo.style.right = "2px";
		localVideo.style.height = "20vmin";
		localVideo.style.width = "15vmin";

		if(is_whiteboard_active) {
                	localVideo.style.bottom = windowHeight + "0px";
            	} else {
               	 	localVideo.style.bottom = "2px";
            	}
	    } 

        }

        let whiteBoard = {};
        whiteBoard.style = {};

        if(Connector.getInstance().whiteBoardFullScreen) {

            if(is_whiteboard_active) {
                whiteBoard.style.width = (Connector.getInstance().toggleChat()) + 'px';
                whiteBoard.style.height = windowHeight * 2 + 'px';
                whiteBoard.style.top = '0px';
                whiteBoard.style.left = '0px';
                whiteBoard.style.backgroundColor = 'white';
            }
            
        } else {
            if(is_whiteboard_active) {
                whiteBoard.style.width = (Connector.getInstance().toggleChat()) + 'px';
                whiteBoard.style.height = windowHeight + 'px';
                whiteBoard.style.top = windowHeight + 'px';
                whiteBoard.style.left = '0px';
                whiteBoard.style.backgroundColor = 'white';
		    }
        }

	//if(isMobile.Android() || isMobile.iOS()) {
		if(!is_gridview_active) {
			remoteVideo.style = {};
			remoteVideo.style.width = (Connector.getInstance().toggleChat()) + 'px';
			remoteVideo.style.height = windowHeight + 'px';
			remoteVideo.style.backgroundColor = '#00000';

			wrapPanel.style = {};
                        wrapPanel.style.width = (Connector.getInstance().toggleChat()) + 'px';
                        wrapPanel.style.height = windowHeight + 'px';
                        wrapPanel.style.overflowY = 'hidden';
            wrapPanel.style.overflowX = 'hidden';
		}
		else if(totalVideosCanRender == 1) {
			localVideo.style = {};
			localVideo.style.width = (Connector.getInstance().toggleChat()) + 'px';
			localVideo.style.height = windowHeight + 'px';
			localVideo.style.backgroundColor = '#00000';

			wrapPanel.style = {};
                        wrapPanel.style.width = (Connector.getInstance().toggleChat()) + 'px';
                        wrapPanel.style.height = windowHeight + 'px';
                        wrapPanel.style.overflowY = 'hidden';
            wrapPanel.style.overflowX = 'hidden';
		}
	//}
        
     //   console.log('[reportWindowSize] wrapPanel ' + JSON.stringify(wrapPanel));
     //   console.log('[reportWindowSize] localVideo ' + JSON.stringify(localVideo));
     //   console.log('[reportWindowSize] remoteVideo ' + JSON.stringify(remoteVideo));
	    //
	

        if(Connector.getInstance().onHomeStyleUpdate) {
            Connector.getInstance().onHomeStyleUpdate(wrapPanel, whiteBoard);
        }

        if(Connector.getInstance().onVideoStyleUpdate) {
            Connector.getInstance().onVideoStyleUpdate(localVideo, remoteVideo);
        }

        if(Connector.getInstance().onVideoControlsUIReload) {
            Connector.getInstance().onVideoControlsUIReload();
        }

    } catch (e) {
        console.log('[reportWindowSize] Exception ' + e);
    }

}


export default Connector;
