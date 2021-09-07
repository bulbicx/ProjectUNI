// Some import fields //
import React, { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
// import './App.css'
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core';
import houseIcon from '../../assets/images/house.png'
import chatIcon from '../../assets/images/chat.png'
import webcamIcon from '../../assets/images/webcam.png'
import Snackbar from '@material-ui/core/Snackbar';
import './style.css'
// import './loader.css';

const useStyles = makeStyles({
  main_container: {
    width: '100%',
    minHeight: '100vh'
  },
  sub_container: {
    display: 'flex',
    width: '100%',
    background: '#EBEDEF',
    border: '1px solid black',
    '@media (max-width: 1450px)': { 
      flexDirection: 'column'
    }
  },
  chat_container: {
    width: '30%',
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#EBEDEF',
    flexDirection: 'column',
    borderLeft: '1px solid black',
    '@media (max-width: 1450px)': { 
      width: '100%'
    }
  },
  chat_box_container: {
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    width: '100%',
    display: 'flex',
    height: '70vh',
    alignItems: 'center',
    backgroundColor: '#5D6D7E',
    flexDirection: 'column',
    overflow: 'auto',
    paddingBottom: '0.4em',
  },
  message_area: {
    zIndex: 1,
    height: '80%',
    width: '100%',
    display: 'block',
    flexDirection: 'column',
    padding: '0.4em'
  },
  form_container: {
    background: '#EBEDEF',
    width: '100%'
  },
  btn_send: {
    background: '#1F618D',
    border: '1px solid #154360',
    borderRadius: '0.5em',
    height: '90%',
    width: '18%',
    padding: '1em 0.5em',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
      background: '#5499C7',
      cursor: 'pointer'
    }
  },
  video_containers: {
    width: '70%',
    position: 'relative'
  },
  btn_section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
  },
  btn_call_section: {
    display: 'flex',
    marginTop: '0.5em'
  },
  btn_disconnect_section: {
    marginTop: '0.5em'
  },
  btn_close_call: {
    background: '#E74C3C',
    border: '1px solid #B03A2E',
    borderRadius: '0.5em',
    padding: '0.6em 1.3em',
    fontSize: '1.2rem',
    '&:hover': {
      background: '#F1948A',
      cursor: 'pointer'
    }
  },
  btn_call: {
    background: '#58D68D',
    border: '1px solid #229954',
    borderRadius: '0.5em',
    padding: '0.6em 1.3em',
    fontSize: '1.2rem',
    '&:hover': {
      background: '#ABEBC6',
      cursor: 'pointer'
    }
  },
  incoming_call_btn: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    color: 'white',
    padding: '1em'
  },
  title_section: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '5.3em',
    marginBottom: '0.6em',
  },
  chat_title: {
    padding: '0.5em 1em',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  my_video: {
    width: '16%', 
    position: 'absolute', 
    right: 20, 
    bottom: 80,
    '@media (max-width: 1450px)': { 
      position: 'static',
      width: '100%'
    },
  },
  partner_video: {
    width: '80%', 
    position: 'absolute',
    top: 20,
    left: 10,
    '@media (max-width: 1450px)': { 
      position: 'static',
      width: '100%'
    },
    '@media (min-width: 2120px)': { 
      top: 0,
      width: '75%',
    },
  },
  img_cam: {
    marginLeft: '40%', 
    marginTop: '20%',
    '@media (max-width: 1450px)': { 
      display: 'none'
    }
  }
})

// const Page = styled.div`
//   display: flex;
//   height: 50vh;
//   width: 100%;
//   align-items: center;
//   background-color: #46516e;
//   flex-direction: column;
// `;

const TextArea = styled.textarea`
  width: 80%;
  height: 90%;
  border-radius: 0.5em;
  padding: 1em;
  font-size: 1.2rem;
  background-color: white;
  border: 1px solid lightgray;
  outline: none;
  color: #808B96;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

// Some basic styling...
// const Container = styled.div`
//   height: 2000px;
//   width: 100%;
//   display: block;
//   flex-direction: column;
// `;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 8.5em;
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  flex-wrap: wrap;
  padding-bottom: 5px;
`;

const MyMessage = styled.div`
  max-width: 65%;
  background-color: #F4D03F;
  color: black;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-radius: 5px;
  overflow-wrap: break-word;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  max-width: 65%;
  background-color: #34495E;
  color: white;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-radius: 5px;
  overflow-wrap: break-word;
`;

// useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).

function Loader(props) {
  //const classes = useStyles()
  const [yourID, setYourID] = useState(); // react hooks to store your id
  const [users, setUsers] = useState({}); // initialize an array to store users id
  const [stream, setStream] = useState();  // store stream info
  const [receivingCall, setReceivingCall] = useState(false);  // store bool(true/false) of receiving call option
  const [caller, setCaller] = useState("");  
  const [callerSignal, setCallerSignal] = useState(); 
  const [callAccepted, setCallAccepted] = useState(false); 
  const [count, setCount] = useState(0); // for exception handling
  const [obj_count, setobj_count] = useState(0); //for exception handling 
  const userVideo = useRef();  // initialize to store user's video information
  const partnerVideo = useRef(); // initialize to store 2nd user's video information
  const [messages, setMessages] = useState([]); // object array of storing multiple messages
  const [message, setMessage] = useState(""); // store 1 single chat message
  const socket = useRef();  // initialize socket which will store socket informations 
  const peerRef = useRef(); 

  const user = useSelector(state => state.user)
  const username = user.user.username 
  const [ comingUserText, setComingUserText ] = useState('')
  const [valueText, setValueText] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })

  const { open, vertical, horizontal } = valueText

  const openMessage = () => {
    setValueText({ ...valueText, open: true });
  };

  const handleCloseMsg = () => {
    setValueText({ ...valueText, open: false });
  };

  // useEffect(() => {
  //   openMessage()
  // }, [comingUserText])

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000/"); // connect with the backend server side socket
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {  // Get permission to use your camera and mic
      setStream(stream); // if you granted permission, enable the streaming
      if (userVideo.current) { // if your video is on, then show it, else initialize it will null
        userVideo.current.srcObject = stream;
      }
    })


      // Join chatroom
    socket.current.emit('joinRoom', { username })

    socket.current.on('message', message => {
      setComingUserText(message.body)
      // setMessage(""); 
      // setMessages([])
      openMessage()
      setTimeout(() => {
        handleCloseMsg()
      }, 4000)
        // outputMessage(message)

        //Scroll down after every msg
        // chatMessages.scrollTop = chatMessages.scrollHeight
    })
    
    socket.current.on("yourID", (id) => { // request an id from server side socket 
      setYourID(id); // store it inside YourID using react hooks
    })
    
    socket.current.on("allUsers", (users) => { // request to see who are online or who are wanting to connect with you via video call
      setUsers(users); // store it inside the users array
      console.log(users)
    })



    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
    
    socket.current.on("message", (message) => {// handle message section calling server side socket
      // console.log("here");
      receivedMessage(message); // there is a function down below(155th line). If you found messages, call the backend function to marge it with the messages array
    })

    socket.current.on("user left", () => {  // if any user left from the call, set receiving call false and destroy the session //
      setReceivingCall(false);
      setCaller("");
      setCallAccepted(false);
      setUsers([]);
      peerRef.current.destroy();
    });
  }, []);
  

  function receivedMessage(message) { // push a message with the past messages and store it inside messages
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) { // initialize a message object with two objects(body and id) in it. Initialize those with live message and your current session id which is provided by socket //
    e.preventDefault(); // prevent to refresh after one letter is inserted inside the chat box
    const messageObject = { 
      body: message,
      id: yourID,
    };
    setMessage(""); 
    socket.current.emit("send message", messageObject); // request server to send the message
  }

  function handleChange(e) { // if any letter is inserted into the chat area,make a call to change and push the typed characters inside the messages
    setMessage(e.target.value);
  }

  function Exit() { // if declined button is called, back to the home page destroing the session
    window.open("/users/login", "_self");
    window.close();
  }


  function callPeer(id) { // Here P2P connection is established. 
      setobj_count(obj_count + 1); // If one connection is establised, please increment the count
      // console.log(obj_count);
      if(obj_count === 0 ){ // if 0 connection established, open a connection 
        const peer = new Peer({ // initialized a P2P connection
          initiator: true, // Make it true from my end
          trickle: false,
          config: {
            iceServers: [
                {
                    urls: "stun:numb.viagenie.ca",
                    username: "socket.io",
                    credential: "98376683"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "socket.io",
                    credential: "98376683"
                }
            ]
        },
          stream: stream,
        });
    
        peer.on("signal", data => { // call the severside code using your information
          socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })
    
        peer.on("stream", stream => { // if partner's video is online, open the stream
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });
    
        socket.current.on("callAccepted", signal => { // accept the call 
          setCallAccepted(true);
          peer.signal(signal);
        })
        peerRef.current = peer;
      }
      
      else {  // if 2 people are already in a connection, if anyone else want to connect, make an exception calling network error //
        alert("network busy");
      }
    }
    

  function acceptCall() { // this is same as connection establishing
    
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      setCount(count + 1);

      if (count === 0) {
        
        socket.current.emit("acceptCall", { signal: data, to: caller })
      } else {
        console.log('You Have Already Accepted the Call');
      }      
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay /> // integrate the video and mic with the stream(from user side)
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay /> // integrate the video and mic with the stream(from partner side)
    );
  }

  let incomingCall;
  if (receivingCall && count === 0) {
    incomingCall = (
        <div className="container" style={{background: '#34495E', height: '9em'}}>
        <div className="vertical-center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#34495E', padding: '1em', height: '100%'}}>
            <h1>You are having a call... </h1>
            <button onMouseDown={e => e.preventDefault()} className="btn_call"  onClick={acceptCall}>Accept Call</button>{/* Click the button to accept the call, calling acceptCall function */}
        </div>
      </div>
    )
  }
  return (
    <div className="main_container">
      <div className="title_section">
        <img style={{marginRight: '0.6em'}} src={houseIcon} alt="house icon" /><h1>House Viewing</h1>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseMsg}
        message={comingUserText}
        key={vertical + horizontal}
        style={{position: 'absolute', top: '10%'}}
      />
      <div className="sub_container">
          <div className="video_containers">
            <img src={webcamIcon} alt="webcam icon" className="img_cam" />
            { partnerVideo ?
            <div>
                <div className="my_video" >{UserVideo}</div>
                <div className="partner_video" >{PartnerVideo} </div>
                </div>
            :
              <div>
              {UserVideo}
              {PartnerVideo} 
              </div>
            }
          </div>
          
          <div className="chat_container">
              <div className="chat_title"> 
                <img src={chatIcon} alt="chat icon" />
                <h3 style={{marginLeft: '0.7em'}}>Let's get chatty!</h3> 
              </div> {/* Chat Section */}
              <div className="chat_box_container">
                <div className="message_area">
                  {messages.map((message, index) => {
                    if (message.id === yourID) { // if your id is equal with the mapped message.id, then color, align will be on your side
                      // console.log('Ok');
                      return (
                        <MyRow key={index}>
                          <MyMessage>
                            {message.body}
                          </MyMessage>
                        </MyRow>
                      )
                    }
                    return ( // if not, then it will be your parter's.. then color, align will be on the other side
                      <PartnerRow key={index}>
                        <PartnerMessage>
                          {message.body}
                        </PartnerMessage>
                      </PartnerRow>
                    )
                  })}
                </div>

              </div>
              <div className="form_container">
                <Form onSubmit={sendMessage}> {/* Submit chat to send message */}
                  <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
                  <button className="btn_send" onClick={sendMessage}>Send</button>
                </Form>
              </div>
          </div>
      </div>
      <div className="incoming_call_btn">
        {incomingCall} 
      </div>
      <div className="btn_section">
        
        {/* <div> */}
          {Object.keys(users).map(key => { // mapped with users unique id that socket has provided //
            if (key === yourID) { // if you are the same user then no extra key will be created because you are already online ///
              return null;
            }
            return (
              <div key={key} className="btn_call_section">
                <button onMouseDown={e => e.preventDefault()} className="btn_call" onClick={() => callPeer(key)}>Call {key}</button>
              </div>// Make a call, calling callPeer function which will establish a P2P connection between you and your client ///
            );
          })}
        {/* </div> */}
        <div className="btn_disconnect_section">
          <button onMouseDown={e => e.preventDefault()} className="btn_close_call" onClick={Exit}>Disconnect Browser</button> {/* Destroy Session  */}
        </div>

      </div>
    </div> 
  );
}

export default Loader;