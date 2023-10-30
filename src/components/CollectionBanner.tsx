const CollectionBanner = () => {
  return (
    <div className="bg-gradient-to-r  from-[#0C50FF] via-[#619BFE] to-[#FF74F1]">
      <div className="w-full h-[92px] flex lg:gap-[90px]  md:gap-[11px]  py-6 lg:pl-[271px] pl-[220px] pr-2 lg:pr-0">
        <div className="relative ">
          <img
            src="svg/search.svg"
            className="absolute left-2 top-2"
            alt="search"
          />
          <input
            className="p-1  bg-[rgba(255,255,255,0.14)] rounded-lg focus:outline-none  pl-10 font-normal  text-lg placeholder-white lg:w-[406px] border-2 border-[#5C4EFF] md:w-[200px]"
            type="search"
            placeholder="Search"
          />
        </div>

        <select className="p-1   bg-[rgba(255,255,255,0.14)] rounded-lg focus:outline-none font-semibold text-[#FFFFFF] text-lg lg:w-[228px] h-[44px] border-2 border-[#5C4EFF] md:w-[128px]">
          <option value="category">Category</option>
        </select>

        <select className="p-1 w-full rounded-lg focus:outline-none bg-[rgba(255,255,255,0.14)] font-semibold text-[#FFFFFF] text-lg lg:w-[228px] h-[44px] border-2 border-[#5C4EFF] md:w-[128px]">
          <option value="Popular">Popular</option>
        </select>

        <div className="flex lg:gap-7 gap-4">
          <div className="w-6  h-[44px] pt-2 ">
            <img alt="share" src="/svg/share2.svg" />
          </div>

          <div className="w-[33px]  h-[44px] pt-2  ">
            <img alt="frame1" src="/svg/frame1.svg" />
          </div>

          <div className="w-[33px]  h-[44px] pt-2 ">
            <img alt="frame2" src="/svg/frame2.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
