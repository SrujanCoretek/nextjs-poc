/* eslint-disable @next/next/no-img-element */
"use client";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { openWindow, qp } from "../../utils/helper";

import {
  Copy,
  Facebook,
  Mail,
  Pinterest,
  Twitter,
  Reddit,
  Whatsapp,
  Share,
} from "../icons";
import MailModal from "../../app/marketplace/listing/MailModal";

import { useReducerPlus } from "../../utils/hooks";

interface item {
  name?: string;
  icon?: any;
  bg?: string;
  hover?: string;
  url?: string;
}

export default function SharePopup(props: any) {
  // const [mailModal, setMailModal] = useState(false);
  const [state, update] = useReducerPlus({
    mailModal: false,
    hovered: "",
  });
  const imageURL = encodeURIComponent(props.data?.imageUrl);
  const assetName = encodeURIComponent(props.data?.name);
  const hashtag = encodeURIComponent("#ceek");
  const pageUrl = encodeURIComponent(props.pageUrl);

  // const router = useRouter();
  // const imageURL = encodeURIComponent(`localhost:3000/${router.asPath}`);

  const solutions: item[] = [
    {
      name: "Pinterest",
      icon: <Pinterest />,
      bg: "#279BFF",
      url: `https://www.pinterest.com/pin-builder/?${qp({
        description: assetName,
        media: imageURL,
        method: "button",
        url: imageURL,
      })}`,
    },
    {
      name: "Reddit",
      icon: <Reddit />,
      bg: "#2E37FE",
      url: `https://www.reddit.com/submit?${qp({
        url: pageUrl,
        title: assetName,
        image: imageURL,
      })}`,
    },

    {
      name: "Mail",
      icon: <Mail />,
      bg: "#2E37FE  ",
      url: "",
    },

    {
      name: "Twitter",
      icon: <Twitter />,
      bg: "#2E68FE",
      url: `https://twitter.com/intent/tweet?${qp({
        text: assetName,
        url: pageUrl,
        image: imageURL,
      })}`,
    },
    {
      name: "Whatsapp",
      icon: <Whatsapp />,
      bg: "#2E68FE",
      url: `https://api.whatsapp.com/send?${qp({
        text: assetName + "-" + pageUrl,
      })}`,
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      bg: "#2E68FE",
      url: `https://www.facebook.com/sharer.php?${qp({
        u: pageUrl,
        i: imageURL,
        t: assetName,
        hashtag: hashtag,
      })}`,
    },
    {},
    {
      name: "Copy",
      icon: <Copy />,
      bg: "#272ECE",
    },

    // {
    //   name: "Code",
    //   icon: <Code />,
    //   href: "##",
    //   bg: "#2e37fe",
    //   url: "",
    // },
  ];

  return (
    <div className="relative">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : ""}
               `}
            >
              {props.position === "top" ? (
                <div className="pt-2">
                  <Share />
                </div>
              ) : (
                <img
                  alt="circle-share"
                  src={
                    props.listing
                      ? "/svg/share-white.svg"
                      : "/svg/circle-share.svg"
                  }
                />
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo={`opacity-100 ${
                props.position === "top"
                  ? "-translate-x-1 -translate-y-1/2"
                  : "translate-y-0"
              }`}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute ${
                  props.position === "top"
                    ? "-top-44 right-0"
                    : "left-0 md:left-5 -translate-x-1/2"
                } z-10 mt-3 w-28 sm:w-20  transform px-4 sm:px-0  `}
              >
                <div
                  className={`grid grid-cols-2  items-center justify-center`}
                >
                  {solutions.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (item.name === "Copy") {
                            navigator.clipboard.writeText(
                              decodeURIComponent(pageUrl)
                            );
                            toast.success("Copied to Clipboard");
                          }
                          if (item.name === "Mail") {
                            update({ mailModal: true });
                          }
                          if (item.url) {
                            openWindow(item.url);
                          }
                        }}
                        className={`flex items-center justify-center col-span-1 h-10 w-10 my-auto mx-auto cursor-pointer 
                         `}
                      >
                        <span
                          style={{
                            backgroundColor:
                              state.hovered === item.name ? "white" : item.bg,
                          }}
                          className={`my-auto px-2 py-2 items-center text-white 
                          hover:text-accentblue`}
                          onMouseEnter={() => {
                            update({ hovered: item.name });
                          }}
                          onMouseLeave={() => {
                            update({ hovered: "" });
                          }}
                        >
                          {" "}
                          {item.icon}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <MailModal
        isOpen={state.mailModal}
        setIsOpen={(flag) => update({ mailModal: flag })}
        imageURL={imageURL}
        assetName={assetName}
        pageUrl={pageUrl}
      />
    </div>
  );
}
// bg-[#0D00FF]
// bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
// <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
