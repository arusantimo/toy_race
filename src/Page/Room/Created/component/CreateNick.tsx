import { useRef } from 'react';
import socket from '@/service/socket';
import useStores from '@/hook/injectStore';

const CreateNick = () => {
  const InputRef = useRef<HTMLInputElement | null>(null);
  const join = () => {
    if (InputRef.current?.value === '') return;
    socket.room.join(InputRef.current?.value ?? '비둘기1');
  };
  const { roomStore } = useStores();

  return (
    <main>
      <form>
        <input
          className="border-sky-500 block border-2 border-solid"
          type="text"
          placeholder="닉네임을 입력해주세요."
          ref={InputRef}
        />
        <button onClick={join} type="submit" className="border border-gray-500">
          접속
        </button>
        <button
          className="border border-gray-500"
          type="button"
          onClick={roomStore.exit}
        >
          취소
        </button>
      </form>
    </main>
  );
};

export default CreateNick;
