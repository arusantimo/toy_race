import { FormEvent, useRef } from 'react';
import socket from '@/service/socket';
import { useObserver } from 'mobx-react';
import useStores from '@/hook/injectStore';
import { Link } from 'react-router-dom';

const CreateRoom = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { roomStore } = useStores();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      roomName: { value: string; focus: any };
      pw: { value: string };
    };
    const roomName = target.roomName.value;
    const pw = target.pw.value;
    if (roomName) {
      socket.room.createRoom({ roomName, pw });
      roomStore.setWarningMessage('');
    } else {
      roomStore.setWarningMessage('방 이름을 입력해 주세요.');
      target.roomName.focus();
    }
  };

  return useObserver(() => (
    <main>
      <h2>게임방 개설</h2>
      <Link to="/">목록으로</Link>
      <section>
        <form ref={formRef} onSubmit={onSubmit}>
          <label htmlFor="roomName">
            방이름 (필수)
            <input
              id="roomName"
              className="border-sky-500 block border-2 border-solid"
              name="roomName"
              type="text"
            />
            <p>{roomStore.warningMessage}</p>
          </label>
          <label htmlFor="pw">
            비밀번호
            <input
              id="pw"
              className="border-sky-500 block border-2 border-solid"
              name="pw"
              type="password"
            />
          </label>
          <input
            className="border-sky-500 block border-2 border-solid"
            name="make"
            type="submit"
            value="만들기"
          />
        </form>
      </section>
    </main>
  ));
};

export default CreateRoom;
