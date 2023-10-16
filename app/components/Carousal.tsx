// import React, { FC } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// import * as THEME from "../styles/theme";
// import Next from "./icons/Next";
// import Previous from "./icons/Previous";

// import globalStore from "../store/global";
// import { useReducerPlus } from "../utils/hooks";

// const Carousal: FC<{
//   className?: string;
//   children: any;
//   superLargeDesktop?: number;
//   desktop?: number;
//   tablet?: number;
//   mobile?: number;
//   autoPlay?: boolean;
//   title?: string;
//   onRightClick?: (title: any, currentSlides: number) => void;
// }> = ({
//   className,
//   children,
//   superLargeDesktop = 5,
//   desktop = 3,
//   tablet = 2,
//   mobile = 1,
//   autoPlay = false,
//   title,
//   onRightClick,

//   ...rest
// }) => {
//   const isDark = globalStore((state) => state.common.isDark);
//   const [state, update] = useReducerPlus({
//     slidesToShow: 2,
//   });
//   const isMobile = false;
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: superLargeDesktop,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: desktop,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: tablet,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: mobile,
//     },
//   };

//   return (
//     <Carousel
//       customRightArrow={<NextButton isDark={isDark} />}
//       customLeftArrow={<PreviousButton isDark={isDark} />}
//       arrows={isMobile || autoPlay ? false : true}
//       responsive={responsive}
//       beforeChange={(newState, oldState) => {
//         update({ slidesToShow: oldState.slidesToShow });
//         if (newState > oldState.currentSlide) {
//           onRightClick &&
//             onRightClick(
//               title,
//               parseInt(
//                 (oldState.currentSlide + oldState.slidesToShow).toString()
//               )
//             );
//         }
//       }}
//       autoPlay={autoPlay}
//       className={className || ""}
//       slidesToSlide={state.slidesToShow}
//       {...rest}
//     >
//       {children}
//     </Carousel>
//   );
// };
// export const PreviousButton = ({ onClick, isDark }: any) => (
//   <button
//     onClick={(e) => {
//       e.preventDefault();

//       onClick(e);
//     }}
//     aria-label="previous-button"
//     className={`${THEME.ARROW_BASE} ${THEME.LEFT_ARROW} ${
//       isDark ? THEME.DARK_ARROW : THEME.LIGHT_ARROW
//     }`}
//   >
//     <Previous />
//   </button>
// );

// export const NextButton = ({ onClick, isDark }: any) => (
//   <button
//     onClick={(e) => {
//       e.preventDefault();

//       onClick(e);
//     }}
//     aria-label="next-button"
//     className={`${THEME.ARROW_BASE} ${THEME.RIGHT_ARROW} ${
//       isDark ? THEME.DARK_ARROW : THEME.LIGHT_ARROW
//     }`}
//   >
//     <Next />
//   </button>
// );
// export default Carousal;
