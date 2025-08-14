import MessageCard, { defaultMessages } from "../common/MessageCard";

const AlbumSection = () => {
  // MessageCard의 defaultMessages 사용
  const messages = defaultMessages;

  // 두 개씩 묶기
  const messagePairs = [];
  for (let i = 0; i < messages.length; i += 2) {
    messagePairs.push(messages.slice(i, i + 2));
  }

  return (
    <div className="w-full max-w-[297px] max-h-[40vh] flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden scroll-smooth overscroll-contain pr-[5px] pb-2 hide-scrollbar">
      {messagePairs.map((pair, index) => (
        <div key={index} className="w-full max-w-[297px] min-h-[180px] flex flex-row justify-between gap-[37px] flex-shrink-0">
          {pair.map((message, i) => (
            <div key={i} className="w-[130px] flex-shrink-0">
              <MessageCard
                name={message.name}
                imageUrl={message.imageUrl}
                message={message.message}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AlbumSection;
