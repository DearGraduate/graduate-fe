import { useState } from 'react';

type CustomButtonProps = {
    bgColor?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string; // 외부에서 크기나 여백 조정 가능
};

const CustomButton = ({
    bgColor = 'bg-button-default',
    children,
    onClick,
    className = '',
}: CustomButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);
        onClick?.(); // 외부 onClick 호출

        // 색상 복원 (선택적)
        setTimeout(() => setIsPressed(false), 500);
    };

    return (
        <button
            onClick={handleClick}
            className={`
        ${isPressed ? 'bg-button-press' : bgColor}
        text-text-black text-[12px] rounded-full
        ${!isPressed ? 'hover:bg-button-hover' : ''}
        transition-colors duration-300
        flex items-center justify-center leading-none py-3 px-10
        ${className}
        `}
        style={{ fontFamily: 'Ydestreet', fontWeight: '300' }}
        >
            {children}
        </button>
    );
};

export default CustomButton;
