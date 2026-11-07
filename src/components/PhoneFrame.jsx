import { forwardRef } from 'react';
import { cn } from '../utils/cn';

/**
 * Realistic CSS smartphone. Lightweight alternative to the WebGL phone,
 * used everywhere except the hero. Width drives everything (aspect 9 / 19.5).
 */
const PhoneFrame = forwardRef(function PhoneFrame({ children, className, glare = true, label, ...rest }, ref) {
  return (
    <div
      ref={ref}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={cn('relative aspect-[9/19.2] select-none', className)}
      {...rest}
    >
      {/* metal band */}
      <div className="absolute inset-0 rounded-[17%/8%] bg-gradient-to-br from-[#4a3c63] via-[#1b1426] to-[#3a2d52] p-[1.6%] shadow-phone dark:from-[#5c4a80] dark:via-[#140e1f] dark:to-[#4b3a6c]">
        {/* black bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-[15.5%/7.3%] bg-black p-[3.2%]">
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[12.5%/5.9%] bg-[#0b0712]" dir="ltr">
            {children}
            {/* dynamic island */}
            <div className="pointer-events-none absolute start-1/2 top-[1.6%] z-20 h-[3.3%] w-[30%] -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2" />
            {glare && (
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,.16)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_70%,rgba(255,255,255,.06)_100%)]" />
            )}
          </div>
        </div>
      </div>
      {/* side buttons */}
      <span aria-hidden className="absolute -start-[1.3%] top-[18%] h-[5%] w-[1.6%] rounded-s-sm bg-[#2c223d]" />
      <span aria-hidden className="absolute -start-[1.3%] top-[26%] h-[8%] w-[1.6%] rounded-s-sm bg-[#2c223d]" />
      <span aria-hidden className="absolute -end-[1.3%] top-[24%] h-[11%] w-[1.6%] rounded-e-sm bg-[#2c223d]" />
    </div>
  );
});

export default PhoneFrame;
