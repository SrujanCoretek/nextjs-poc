import React from "react";
import ContentLoader from "react-content-loader";

const BidLoader = () => {
  return (
    <>
      <ContentLoader
        viewBox="0 0 700 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        visibility={"true"}
        className="hidden sm:block"
      >
        <circle cx="32" cy="32" r="32" />
        <rect x="82" y="12" rx="3" ry="0" width="400" height="15" />
        <rect x="82" y="37" rx="3" ry="3" width="180" height="15" />
        <rect x="280" y="37" rx="3" ry="3" width="100" height="15" />
        <rect x="620" y="12" rx="3" ry="0" width="80" height="15" />
        <rect x="650" y="37" rx="3" ry="0" width="50" height="15" />
      </ContentLoader>
      <ContentLoader
        height={54}
        width={330}
        viewBox="0 0 330 54"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        visibility={"true"}
        className="block sm:hidden"
      >
        <circle cx="27" cy="27" r="18" />
        <rect x="53" y="14" rx="3" ry="3" width="200" height="13" />
        <rect x="53" y="30" rx="3" ry="3" width="90" height="10" />
        <rect x="285" y="10" rx="10" ry="20" width="45" height="25" />
      </ContentLoader>
    </>
  );
};

export default BidLoader;
{
  /* <rect x="0" y="53" rx="0" ry="0" width="320" height="1" /> */
}
