import React, { useState, useEffect } from 'react'
import './couponBanner.css'
import CountDown from '../useCountTime/useCountTime'

const CouponBanner: React.FC = () => { {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [flag, setFlag] = useState<Boolean>(false);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    const breakpoint = 768;
    width < breakpoint ? setFlag(false) : setFlag(true);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [window.innerWidth]);


  return flag ? <div className='cp-big'><CountDown classNames='cp-big-tm' /></div> : <div className='cp-min'><CountDown classNames='cp-min-tm' /></div>
};
}
export default CouponBanner;