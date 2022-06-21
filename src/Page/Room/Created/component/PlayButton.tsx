import socket from '@/service/socket';

const PlayButton = () => {
  return (
    <button
      className="border-2 border-solid border-red-500"
      type="submit"
      onClick={socket.room.play}
    >
      게임 시작
    </button>
  );
};

export default PlayButton;
