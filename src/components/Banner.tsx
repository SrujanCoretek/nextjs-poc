import React from 'react';
import globalStore from '../store/global';

interface Props {
  heading: string;
  subHeading?: string;
}

const Banner: React.FC<Props> = ({ heading, subHeading }: Props) => {
  const isDark = globalStore((state) => state.common.isDark);

  return (
    <div
      className={`bg-gradient-to-r text-white ${
        isDark
          ? 'from-[#1b1fb7] to-[#5DA6F6]'
          : 'from-blue-600 via-purple-500 to-pink-500'
      }`}
    >
      <div className="mx-2 py-24 px-2 md:px-20 lg:px-24 md:py-28">
        <div className="block font-bold text-2xl md:text-4xl">{heading}</div>
        <div className="block mt-2 text-lg">{subHeading}</div>
      </div>
    </div>
  );
};

export default Banner;
