import React, { useState, useEffect, useRef } from 'react';

import './Chatbox.css';
import axios from 'axios';

type Cover = {
  type: 'image';
  title: string;
  data: { imageUrl: string; description: string };
};

type ChatBotResponse = {
  bubbles: Array<{
    type: any;
    data: {
      description?: any;
      cover?: Cover;
    };
    // 다른 필요한 속성들도 여기에 추가할 수 있습니다.
  }>;
};

const Chatbox = () => {
  const [message, setMessage] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement | null>(null); // Set initial value to null

  const sendBtn = () => {
    const rootElement = document.getElementById('chatbox'); // 채팅 div
    let element = document.createElement('div');
    element.innerHTML = message;
    element.setAttribute('class', 'usermsg');
    rootElement?.appendChild(element);
    rootElement?.appendChild(document.createElement('br'));
    axios
      .get('http://localhost:3000/chatBot?msg=' + message)
      .then((resp) => {
        ChatBotAnswer(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChatBotAnswer = (resp: ChatBotResponse) => {
    if (resp.bubbles[0].type) {
      const bubbles = resp.bubbles[0];
      if (bubbles.type === 'text') {
        ChatBotText(bubbles.data.description);
      } else if (bubbles.type === 'template') {
        //image
        if (resp.bubbles[0].data.cover) {
          ChatBotImage(resp.bubbles[0].data.cover.data.imageUrl);
        }
      }
    }
    scrollRef.current &&
      (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  };

  const ChatBotText = (str: string) => {
    const rootElement = document.getElementById('chatbox'); // 채팅 div
    let element = document.createElement('div');
    element.setAttribute('align', 'right');
    let elementInner = document.createElement('div');
    elementInner.innerHTML = str;
    elementInner.setAttribute('class', 'botmsg');
    element.appendChild(elementInner);
    rootElement?.appendChild(element);
    rootElement?.appendChild(document.createElement('br'));
  };

  const ChatBotImage = (url: string) => {
    const rootElement = document.getElementById('chatbox'); // 채팅 div
    let element = document.createElement('div');
    element.setAttribute('align', 'right');

    let elementInner = document.createElement('img');
    elementInner.setAttribute('src', url);
    elementInner.setAttribute('width', '200px');
    elementInner.setAttribute('height', '140px');
    element.appendChild(elementInner);
    rootElement?.appendChild(element);
    rootElement?.appendChild(document.createElement('br'));
  };
  useEffect(() => {
    // 현재 스크롤의 위치 와 길이
    scrollRef.current &&
      (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  }, []);
  return (
    <div className="wrapper">
      <div className="menu">
        <h3 className="welcome">Welcome Chatbot</h3>
      </div>
      <div className="chatbox" ref={scrollRef} id="chatbox">
        {/* <div className="usermsg">하이</div>
        <div style={{ textAlign: "right" }}>
          <div className="botmsg">방가방가 머해?</div>
        </div>
        <div className="usermsg">잘지냈어?</div>
        <div style={{ textAlign: "right" }}>
          <img src="https://img.icons8.com/color/40/000000/guest-female.png" alt="" className="img1" />
        </div>
        <div style={{ textAlign: "right" }}>
          <a href="http://naver.com" className="botmsg">
            네이버로 이동
          </a>
        </div> */}
      </div>

      <div className="myform">
        <input
          className="usermsgwrite"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="메시지 기입"
        />
        <input
          type="button"
          className="submitmsg"
          value="send"
          onClick={sendBtn}
        />
      </div>
    </div>
  );
};

export default Chatbox;
