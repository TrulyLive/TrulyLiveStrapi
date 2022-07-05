import { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { baseUrl } from '../backend'
import cookie from 'cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from '../components/comments'
import InputEmoji from 'react-input-emoji'
import { useRouter } from 'next/router';
import io from 'socket.io-client';
const ChatEndPoint = "https://1d62-103-115-25-145.ngrok.io";

export default function Home({ navData, footerData, videoData, profileData, token, eventData }) {

  let router = useRouter();
  const [text, setText] = useState('')
  const [windowSize, setWindowSize] = useState(null);
  const [sideMenu, setSideMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hideDrop, setHideDrop] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    Image: profileData && profileData.image.url,
    Email: profileData && profileData.email
  });
  //socket initial
  const socket = io(ChatEndPoint, { transports: ["websocket", "polling", "flashsocket"], forceNew: true });
  var selectedUserId = "";
  const [chat, setChat] = useState([]);

  //
  useEffect(() => {
    setWindowWidth([window.innerWidth])
    window.addEventListener("resize", changeWindowWidth);
  }, []);


  const changeWindowWidth = () => {
    setWindowWidth([window.innerWidth]);
  }

  const triggerSideBar = () => {
    if (windowWidth <= 992) {
      setSideMenu(false);
    } else {
      setSideMenu(true);
    }
  }

  useEffect(() => {
    triggerSideBar();
  }, [windowWidth]);
  const LoadData = () => {
    socket.emit("loadAllComment", { OwnUnique: currentUser.Email, RoomId: router.pathname })
  }

  useEffect(() => {
    socket.on("loadData" + currentUser.Email, (data) => {
      console.log(data);
      var chatData = [];
      data.forEach(element => {
        chatData.push(element);
      });
      setChat(chatData);
      scrollChatMiddle();
    });
    socket.on("rcvOwnMsg", (data) => {
      console.log(data);
      setChat((chat) => [...chat, data]);
      scrollChatMiddle();
    });
    return function cleanup() {
      socket.off('rcvOwnMsg');
      socket.off('loadData' + currentUser._id);
    }
  }, [])
  const scrollChatMiddle = () => {
    document.getElementById('usersComments').scrollTop = document.getElementById('usersComments').scrollHeight;
  }
  const sendText = (data, e, type) => {
    // document.getElementById('messageBox').value = '';
    if (type === 'text') {
      if (text.trim() !== '') {
        if (e.keyCode === 13 && !e.shiftKey) {
          if (data && data.trim() !== '') {
            socket.emit("sendMessage", { Email: currentUser.Email, OwnPic: currentUser.Image, Message: data, RoomId: router.pathname })
          }
          e.preventDefault();
        }
      } else {
        if (e.keyCode === 13)
          e.preventDefault();
      }
    }
    else {
      if (data && data.trim() !== '') {
        socket.emit("sendMessage", { Email: currentUser.Email, OwnPic: currentUser.Image, Message: data, RoomId: router.pathname })
      }
      setText('')
      e.preventDefault();
    }

    scrollChatMiddle();
  }
  // const hitEnter = (e) => {
  //   if (text.trim() !== '') {
  //     if (e.keyCode === 13 && !e.shiftKey) {
  //       document.getElementById('btnSend').click();
  //       e.preventDefault();
  //     }
  //   } else {
  //     if (e.keyCode === 13)
  //       e.preventDefault();
  //   }

  // }
  useEffect(() => {
    const addToDB = async () => {
      try {
        const res = await fetch(`${baseUrl}/visits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: { username: profileData?.username, email: profileData?.email } })
        })
        const data = await res.json()
      } catch (error) {
        console.log(error)
        // alert(error.response.data.message[0].messages[0].message)
      }
    }
    addToDB()
  }, [profileData?.username, profileData?.email, token])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
    scrollChatMiddle();

  }, [windowSize])
  const handleComment = (text) => {
    console.log('enter', text);
    scrollChatMiddle();
  }
  const handleCommentMenu = () => {
    document.getElementById('usersComments').style.height = document.getElementById('streamingVideo').scrollHeight - 150 + 'px';
    scrollChatMiddle();
    setSideMenu(!sideMenu);
    hideDrop === null ? setHideDrop(false) : setHideDrop(!hideDrop);
    LoadData();
  }
  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} className={'position-relative'} />
      <div className="row" id='streamRow'>
        <div className={`video-left-div  ${!sideMenu && 'close'} ${hideDrop && 'hide'}`}>
          <video
            src={videoData?.videoURL}
            // src={"http://techslides.com/demos/sample-videos/small.mp4"}
            controls
            id='streamingVideo'
            name='streamingVideo'
            className="min-w-full"
            autoPlay
            poster={videoData?.videoThumbnail?.data?.attributes?.url}
          />
          <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}><img src='/images/comment.png' alt='comments' /></button>
        </div>
        <div className={`comments-div ${sideMenu && 'close'}`}>
          <div className="comment-top">
            <div className="row">
              <div className="col-8">
                <span className='title'>Comments</span>
              </div>
              <div className="col-4 text-right">
                <a className='btn text-white pt-0' onClick={handleCommentMenu}><img src='/images/close.png' alt='comments' style={{ width: '15px' }} /></a>
              </div>
            </div>
            <hr />
          </div>
          <div className="comment-bottom">
            <div id='usersComments' className="users-comments">

              {
                chat && chat.length > 0 && chat.map((item, key) => (
                  <Comments chat={item} key={key} scrollChatMiddle={scrollChatMiddle} />
                ))
              }
            </div>
            <div className="comment-section">
              <div className="col-11">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  placeholder="Type a message"
                  onKeyDown={(e) => sendText(text, e, 'text')}
                />
              </div>
              <div className="col-1 text-left">
                <button className='btn p-0 text-primary mt-2' onClick={(e) => sendText(text, e, 'button')}><img src='/images/send.png' style={{ width: '35px', position: 'relative', top: '5px' }} alt='comments' /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer footerData={footerData} />

    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const videRes = await fetch(`${baseUrl}/homes?populate=*`)
  const videoData = await videRes.json()
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()
  const eventRes = await fetch(`${baseUrl}/events?populate=*`)
  const eventData = await eventRes.json()
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      videoData: videoData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      eventData: eventData.data[0].attributes,
      token,
      profileData: data
    }
  }
}
