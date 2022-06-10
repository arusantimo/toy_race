import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import ListPage from './page/List';
import SocketClient from '@/service/socket';
import RoomPage from '@/page/Room';

function App() {
  const connected = useRef(false);
  useEffect(() => {
    connected.current && (connected.current = SocketClient.init);
    // https://ko.mobx.js.org/analyzing-reactivity.html#trace%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%94%94%EB%B2%84%EA%B9%85
    // mobx는 재계산 평가 헬퍼 함수가 있어서 사용하시면 편합니다.
    //
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
