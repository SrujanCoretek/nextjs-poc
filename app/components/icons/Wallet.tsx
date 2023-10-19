interface Props {
  height?: string;
  width?: string;
  stroke?: string;
  customeClass?: string;
}

const Wallet: React.FC<Props> = ({
  height = '24',
  width = '25',
  customeClass = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={customeClass}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g id="Iconly/Light-Outline/Wallet">
        <g id="Wallet">
          <path
            id="Fill 1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.8884 16.3937H17.8404C15.9434 16.3937 14.3994 14.8507 14.3984 12.9547C14.3984 11.0567 15.9424 9.51272 17.8404 9.51172H21.8884C22.3024 9.51172 22.6384 9.84772 22.6384 10.2617C22.6384 10.6757 22.3024 11.0117 21.8884 11.0117H17.8404C16.7694 11.0127 15.8984 11.8837 15.8984 12.9537C15.8984 14.0227 16.7704 14.8937 17.8404 14.8937H21.8884C22.3024 14.8937 22.6384 15.2297 22.6384 15.6437C22.6384 16.0577 22.3024 16.3937 21.8884 16.3937Z"
            fill="#00000E"
          />
          <path
            id="Fill 3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.2964 13.6445H17.9844C17.5704 13.6445 17.2344 13.3085 17.2344 12.8945C17.2344 12.4805 17.5704 12.1445 17.9844 12.1445H18.2964C18.7104 12.1445 19.0464 12.4805 19.0464 12.8945C19.0464 13.3085 18.7104 13.6445 18.2964 13.6445Z"
            fill="#00000E"
          />
          <g id="Group 7">
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="2"
              y="3"
              width="21"
              height="20"
            >
              <path
                id="Clip 6"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 3.5H22.6386V22.6729H2V3.5Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                id="Fill 5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.9976 5C5.5176 5 3.4996 7.018 3.4996 9.498V16.675C3.4996 19.155 5.5176 21.173 7.9976 21.173H16.6416C19.1216 21.173 21.1386 19.155 21.1386 16.675V9.498C21.1386 7.018 19.1216 5 16.6416 5H7.9976ZM16.6416 22.673H7.9976C4.6906 22.673 1.9996 19.982 1.9996 16.675V9.498C1.9996 6.19 4.6906 3.5 7.9976 3.5H16.6416C19.9486 3.5 22.6386 6.19 22.6386 9.498V16.675C22.6386 19.982 19.9486 22.673 16.6416 22.673Z"
                fill="#00000E"
              />
            </g>
          </g>
          <path
            id="Fill 8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.6846 9.53809H7.2856C6.8716 9.53809 6.5356 9.20209 6.5356 8.78809C6.5356 8.37409 6.8716 8.03809 7.2856 8.03809H12.6846C13.0986 8.03809 13.4346 8.37409 13.4346 8.78809C13.4346 9.20209 13.0986 9.53809 12.6846 9.53809Z"
            fill="#00000E"
          />
        </g>
      </g>
    </svg>
  );
};
export default Wallet;
