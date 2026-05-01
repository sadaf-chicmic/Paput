import React from 'react';
import images from '../../assets/images';

export default function BackgroundPattern() {
  const rows = 4;
  const repeats = 6;

  return (
    <div className="absolute top-0 left-0 max-w-[100vw] overflow-visible pointer-events-none">
      <div className="scale-[1.3] rotate-[-6deg] flex flex-col gap-6 translate-y-[80px]">
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className={`text-[60px] font-black leading-[0.6] whitespace-nowrap flex items-center gap-10 ${
              i % 2 === 0 ? 'text-[#0a4635]' : 'text-transparent'
            }`}
            style={{
              WebkitTextStroke: i % 2 !== 0 ? '2px #0a4635' : 'none',
              transform: `translateX(${i % 2 === 0 ? '-5%' : '5%'})`,
            }}
          >
            {[...Array(repeats)].map((_, j) => (
              <React.Fragment key={j}>
                <span>A POC</span>
                <img src={images.paputDuck} alt="" className="h-[0.65em]" />
                <span>LIFE</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}