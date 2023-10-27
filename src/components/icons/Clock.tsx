import { textgradient } from "@/src/app/(styles)/styles/themes";
import React, { useEffect, useState } from "react";

interface Props {
  deadline: string;
  text: string;
}

const initialValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};
export default function Clock({ deadline, text }: Props) {
  const [time, setTime] = useState(initialValues);

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);
    // eslint-disable-next-line
  }, []);

  const getTimeUntil = (deadline: string) => {
    const time = Date.parse(deadline) - Date.parse(new Date().toString());

    if (time < 0) {
      setTime(initialValues);
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setTime({ days, hours, minutes, seconds });
    }
  };

  const leading0 = (num: number) => {
    return num < 10 ? "0" + num : num;
  };
  return (
    <>
      {time.seconds > 0 && (
        <div className="md:mx-0 w-full md:w- h-[36px] bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-full ">
          <div
            className={`bg-white cursor-pointer w-full h-full rounded-full px-1 py-1 flex gap-2 font-bold text-sm items-center justify-center  dark:bg-[#14215d]`}
          >
            <span className={`${textgradient}`}>{text}</span>
            <div className={`${textgradient}`}>{leading0(time.days)}d</div>
            <div className={`${textgradient}`}>{leading0(time.hours)}h</div>
            <div className={`${textgradient}`}>
              {leading0(time.minutes)}m{" "}
            </div>{" "}
            <div className={`${textgradient}`}>{leading0(time.seconds)}s </div>{" "}
          </div>
        </div>
      )}
    </>
  );
}
