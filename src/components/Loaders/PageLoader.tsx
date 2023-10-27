// import React, { useEffect } from "react";
// import { ThreeDots } from "react-loader-spinner";
// import { handleScroll } from "../../utils/hooks";
// import globalStore from "../../store/global";

// export default function PageLoader() {
//   const [loader, loaderText] = globalStore((state) => [state.common.loader, state.common.loaderText]);

//   useEffect(() => {
//     handleScroll(loader);
//   }, [loader]);

//   return (
//     <div>
//       {loader && (
//         <div className="bg-black fixed w-full h-full opacity-70 z-50">
//           <div className="mx-auto  flex flex-col h-full">
//             <div className="m-auto  text-center">
//               <div className="flex justify-center">
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="9"
//                   color="#380F98"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{}}
//                   visible={loader}
//                 />
//               </div>

//               <div className="text-center">
//                 {loaderText ? (
//                   <span className="text-white text-base sm:text-xl  animate-pulse">
//                     {loaderText}
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
