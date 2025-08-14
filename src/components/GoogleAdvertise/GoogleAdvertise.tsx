import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSenseProps {
    slot: string;
    client: string; // 실제 ca-pub-... 필수
    minWidth?: number;
}

const DisplayAds = ({ slot, client, minWidth = 320 }: AdSenseProps) => {
    const boxRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

    useEffect(() => {
        const box = boxRef.current;
        if (!box) return;

        const render = () => {
            if (pushed.current) return;
            box.innerHTML = '';
            const ins = document.createElement('ins');
            ins.className = 'adsbygoogle';
            ins.style.display = 'block';
            ins.setAttribute('data-ad-client', client);
            ins.setAttribute('data-ad-slot', slot);
            ins.setAttribute('data-ad-format', 'auto');
            ins.setAttribute('data-adtest', 'on');
            ins.setAttribute('data-full-width-responsive', 'true');
            box.appendChild(ins);
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        };

        const tryRender = () => {
            const w = box.getBoundingClientRect().width;
            if (w >= minWidth) render();
        };

        tryRender();
        const ro = new ResizeObserver(tryRender);
        ro.observe(box);
        return () => ro.disconnect();
    }, [slot, client, minWidth]);

    // 최소 높이 조금 주면 CLS 줄어듦
    return <div ref={boxRef} className="w-full" style={{ minHeight: 280 }} />;
};

export default DisplayAds;
