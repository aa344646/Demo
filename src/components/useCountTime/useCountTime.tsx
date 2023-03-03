import { useState, useRef, useEffect } from 'react';
import '../useCountTime/useCountTime.css'
interface TimeViewProps {
    h: string; // 小时
    m: string; // 分钟
    s: string; // 秒
}

type classSelect = {
    classNames: string;
};
const CountDown: React.FC<classSelect> = (props) => {
    const countDownTimer = useRef<NodeJS.Timeout>();
    const [timeView, setTimeView] = useState<TimeViewProps | null>(null); // 倒计时hms
    const [classNames, setClassNames] = useState<string>(props.classNames);
    // 倒计时函数
    const countDown = () => {
        const currentTime = new Date().getTime();
        const onDays = new Date(new Date().setHours(23, 59, 59, 999)).getTime(); // 当天24点时间戳
        const times = parseInt(`${(onDays - currentTime) / 1000}`); //剩余时间转化为秒
        const h = parseInt(`${(times / 60 / 60) % 24}`);
        const m = parseInt(`${(times / 60) % 60}`);
        const s = parseInt(`${times % 60}`);
        //设置时间格式
        setTimeView({
            h: h < 10 ? `0${h}` : `${h}`,
            m: m < 10 ? `0${m}` : `${m}`,
            s: s < 10 ? `0${s}` : `${s}`,
        });
        if (times <= 0) {
            clearTimeout(countDownTimer.current);
            setTimeView({ h: '00', m: '00', s: '00' });
        } else {
            countDownTimer.current = setTimeout(() => {
                countDown();
            }, 1000);
        }
    };

    useEffect(() => {
        countDown();
        setClassNames(props.classNames);
        return () => {
            clearTimeout(countDownTimer.current);
        };
    }, [props.classNames]);

    return (<>
        <div className={classNames}>
            Ends in  <p className='cp-tm-css'>{timeView?.h}</p>h<p className='cp-tm-css'>{timeView?.m}</p>m<p className='cp-tm-css'>{timeView?.s}</p>s
        </div>
    </>
    );
};
export default CountDown;