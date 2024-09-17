// this file is good

export const SOCKET_IO_URL = "Live.neithedu.com";
export const PEERCONNECTION_CONFIGURATION = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:turn.myeduroom.com:3478",
      username: "vera",
      credential: "iamThdocReAL",
    },
  ],
};

export const OFFER_OPTIONS = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};
