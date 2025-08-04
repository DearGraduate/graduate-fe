import Character_graduate from "../../assets/images/Character_graduate.png";

const EmptyAlbumMessage = () => (
    <>
        <div className="w-full max-w-[250px] h-[280px] flex items-center justify-center short:hidden">
            <img src={Character_graduate} alt="Character_graduate" />
        </div>
        <div className="w-[256px] h-[36px] opacity-100 flex flex-col items-center justify-center gap-1 mt-5">
            <div className="font-ydestreet font-bold text-[14px] leading-[100%] tracking-[0] text-center text-[var(--color-text-white)]">
                앨범이 완성 되었어요!
            </div>
            <div className="font-ydestreet font-bold text-[14px] leading-[100%] tracking-[0] text-center text-[var(--color-text-white)]">
                친구들에게 공유해 축하글을 모아보세요!
            </div>
        </div>
    </>
);

export default EmptyAlbumMessage;