import useStores from '@/hook/injectStore';

const Exit = () => {
  const { roomStore } = useStores();
  return (
    <button type="submit" onClick={roomStore.exit}>
      나가기
    </button>
  );
};

export default Exit;
