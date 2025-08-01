// src/components/CustomLottie.tsx
import  Player  from 'lottie-react';
import animationData from '../../assets/Animation - 1751957531768.json'

type CustomLottieProps = {
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
};

export default function CustomLottie({
  loop = true,
  autoplay = true,
  style = { width: 200, height: 200 },
}: CustomLottieProps) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      animationData={animationData}
      style={style}
    />
  );
}
