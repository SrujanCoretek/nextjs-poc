import { Dialog } from "@headlessui/react";
import React from "react";
import ModalWrapper from "../../../components/Modal";
import { openWindow, qp } from "../../../utils/helper";
import { Cross, Mail } from "../../../components/icons";

export default function MailModal(props: {
  isOpen: boolean;
  setIsOpen: (flag: boolean) => void;
  imageURL: string;
  assetName: string;
  pageUrl: string;
}) {
  const { isOpen, setIsOpen, assetName, pageUrl } = props;
  const buttons = [
    {
      name: "Gmail",
      svg: "/svg/gmail.svg",
      url: `https://mail.google.com/mail/u/0/?${qp({
        fs: 1,
        tf: "cm",
        su: "CEEK NFT",
        body: `Thought you might enjoy reading this : ${pageUrl}`,
      })}`,
    },
    {
      name: "Outlook",
      svg: "/svg/outlook.svg",
      url: `https://outlook.office365.com/mail/deeplink/compose?${qp({
        subject: "CEEK NFT",
        body: `${assetName}:-${pageUrl}`,
      })}`,
    },
    {
      name: "Yahoo",
      svg: "/svg/yahoo.svg",
      url: `https://compose.mail.yahoo.com/?${qp({
        body: `${assetName}:-${pageUrl}`,
        subject: "CEEK NFT",
      })}`,
    },
    {
      name: "Default",
      icon: <Mail />,
      url: `mailto:?${qp({
        subject: "CEEK NFT",
        body: `${assetName}:-${pageUrl}`,
      })}`,
    },
  ];
  return (
    <ModalWrapper open={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Panel
        className="w-full z-40 relative bg-accentpurple max-w-4xl  transform overflow-hidden rounded-2xl p-10 text-left align-middle transition-all   shadow-[0_10px_20px_rgba(105,_12,_255,_0.7)]  "
        style={{
          backgroundImage: `url("/images/ceek-vr-tv.png")`,
          backgroundSize: "cover",
        }}
      >
        <Dialog.Title
          as="h3"
          className="text-3xl z-10 font-semibold leading-6 text-[#00000E]    "
        >
          <div className="relative    ">
            <img
              alt="white-logo"
              className="mx-auto h-44  w-44 "
              src="/svg/white-logo.svg"
            />
            <div
              className="cursor-pointer  top-0 right-0 absolute text-white "
              onClick={(e: any) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <Cross className="w-10 h-10" />
            </div>
          </div>
          <div className="h-0.5  my-5 bg-gradient-to-r from-[#7b07b5] via-white"></div>
        </Dialog.Title>

        <div className="text-center  my-8">
          <p className=" text-5xl text-white ">Choose Your email service</p>
        </div>
        {buttons.map((item, index) => (
          <div
            key={index}
            className="w-full  my-6 border-2 border-white bg-transparent rounded-lg text-white text-xl font-semibold hover:bg-white hover:text-accentpurple "
            onClick={() => {
              openWindow(item.url);
            }}
          >
            <button className="flex  items-center  gap-3 mx-auto py-3">
              {item.name}
              {item.svg ? (
                <img alt={item.svg} className="w-8 h-8" src={item.svg} />
              ) : (
                <span className="my-auto">
                  <Mail />
                </span>
              )}
            </button>
          </div>
        ))}
      </Dialog.Panel>
    </ModalWrapper>
  );
}
