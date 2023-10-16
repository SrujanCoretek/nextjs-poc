export const LINEAR_BACKGROUND =
  "bg-gradient-to-r from-[#30F0F6] via-[#4E0FFF] to-[#F0899E]";

// TYPOGRAPHY
export const HEADING = "text-4xl font-semibold";
export const PAGE_BACKGROUND = "dark:bg-[#14215d]";
export const PAGE_WRAPPER =
  "grid z-50 mx-auto w-full px-2 md:px-20 lg:px-24 py-6 md:py-0";

//HOMEPAGE
export const SECTION_WRAPPER =
  "dark:bg-gradient-to-br dark:from-[#03064c] dark:to-[#2721da]";

//INPUT
export const INPUT_WRAPPER =
  "w-full text-xl border-b-2 h-10 outline-none transition duration-200 overflow-none focus:outline-none mt-6 focus:border-black hover:border-black";
export const PRIMARY_INPUT_WRAPPER =
  "w-full text-xl h-6 placeholder-[#00000E] outline-none transition duration-200 overflow-none  focus:outline-none hover:border-black ";
export const INPUT_DISABLE =
  "bg-white cursor-not-allowed hover:border-transparent focus:border-transparent focus:placeholder-gray-300";
export const INPUT_ENABLE =
  "hover:border-gray-400 focus:border-black focus:placeholder-gray-300";
export const INPUT_LABEL = "h-6 text-xl font-semibold block";

//NFT CARD
export const NFT_CARD_BACKGROUND =
  "bg-gradient-to-r from-[#30F0F6] via-[#4E0FFF] to-[#F0899E] absolute -inset-1 animate-tilt rounded-3xl opacity-0 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 -z-10";
export const CARD_BACKGROUND =
  "bg-gradient-to-r from-[#30F0F6] via-[#4E0FFF] to-[#F0899E] absolute rounded-xl p-";

export const NFT_CARD =
  "shadow-xl rounded-3xl h-[540px] w-full lg:h-[610px] overflow-hidden cursor-pointer dark:bg-[#0F2775]";
export const NFT_CARD_LIGHT_BG = "bg-white";
export const NFT_CARD_DARK_BG = "bg-[#0F2775]";

export const NFT_USER_IMAGE =
  "bg-gradient-to-br from-[#2B0AA6] via-[#FF0FE7] to-[#BF0D42] rounded-full p-1.5 w-20 h-20 lg:w-24 lg:h-24 mx-auto -mt-12";

// BUTTONS
export const PRIMARY_BUTTON_WRAPPER =
  "mx-auto md:mx-0 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] rounded-full text-lg lg:text-2xl font-bold text-white py-4 cursor-pointer w-48 md:w-40 lg:w-72 text-center";

export const SECONDARY_BUTTON_WRAPPER =
  "mx-auto md:mx-0 w-24 lg:w-36 text-sm lg:text-lg bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-[3px] rounded-full ";
export const SECONDARY_BUTTON =
  "cursor-pointer w-full h-full rounded-full px-3 py-2 bg-white dark:bg-[#14215d] text-center";

export const SECONDARY_BUTTON_DARK =
  "cursor-pointer w-full h-full rounded-full px-3 py-2 text-white bg-[#14215d] text-center";

// -------
// FOOTER
// -------
export const FOOTER_WRAPPER =
  "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 p-6 md:p-20 gap-12 md:gap-20 bg-[#EFEFEF] dark:bg-[#1D1D1D]";
export const FOOTER_LOGO_WRAPPER =
  "grid justify-items-center col-span-2 md:col-span-1 lg:col-span-1 text-[#0D00FF] dark:text-white";

export const RadioActiveClassName =
  "bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-lg cursor-pointer";

export const BackgroundClass =
  "bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5";

//CREATE
export const textgradient =
  "bg-gradient-to-r from-[#30F0F6] via-[#4E0FFF] to-[#F0899E] text-transparent bg-clip-text";

//EXPLORE

export const borderbottom = "border-b-2 border-black border-opacity-30";

export const EXPLORE_NFT_CARD =
  "shadow-xl rounded-3xl h-[460px] lg:h-[500px]  overflow-hidden cursor-pointer bg-white dark:bg-[#0F2775] ";

export function pickCls(condition: boolean, cls1: string, cls2: string) {
  return condition ? cls1 : cls2;
}

// ARROW
export const ARROW_BASE =
  "custom-arrow w-16 h-16 hidden lg:flex items-center justify-center rounded-full  border-gray-500 border shadow-navigation absolute transition duration-250 focus:outline-none";
export const LIGHT_ARROW =
  "text-black bg-white hover:bg-gray-900 hover:text-white";
export const DARK_ARROW =
  "text-white bg-[#2923E3] hover:bg-white hover:text-[#2923E3]";
export const LEFT_ARROW = "left-10 ml-35px";
export const RIGHT_ARROW = "right-10 mr-35px";

export const DARK_CARD_BACKGROUND_SHADOW =
  "shadow-[0_0px_14px_rgb(0,187,196,0.56)]";
export const LIGHT_CARD_BACKGROUND_SHADOW =
  "shadow-[0_8px_30px_rgb(0,0,0,0.12)]";

export const bgGradient1 =
  "bg-gradient-to-r from-[#0C50FF] via-[#619BFE] to-[#FF74F1]";
export const textgradient1 = `${bgGradient1} text-transparent bg-clip-text`;

export const bgGradient2 = "bg-gradient-to-r from-[#E458AC] to-[#FF9416]";
export const textgradient2 = `${bgGradient2} text-transparent bg-clip-text`;
export const errmsg =
  "text-red-500 text-xs absolute -bottom-4 left-2  xl:text-sm xl:-bottom-5 ";
