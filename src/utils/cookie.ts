// //usage
// // in browser
// // const allCookies = cookie.get(document.cookie);

// // on server
// // let allCookies = cookie.get(req.headers.cookie);

// // cookie.parse(document.cookie, "my-store")

// // cookie.parse

// export function encodeToBase64(val: string) {
//   return btoa(val);
//   // if (isBrowser()) {
//   //   return window.btoa(val);
//   // } else {
//   //   return Buffer.from(val).toString("base64");
//   // }
// }

// export export function decodeFromBase64(val: string) {
//   return atob(val);
//   // if (isBrowser()) {
//   //   return window.atob(val);
//   // } else {
//   //   return Buffer.from(val, "base64").toString("utf-8");
//   // }
// }

// // ucs-2 string to base64 encoded ascii
// export export function utoa(str: string) {
//   return encodeToBase64(unescape(encodeURIComponent(str)));
// }
// // base64 encoded ascii to ucs-2 string
// export export function atou(str: string) {
//   // console.log({ str });
//   // console.log("atou", str);

//   return decodeURIComponent(escape(decodeFromBase64(str)));
// }

// // LZW string compression
// export function zip(s: string): string {
//   try {
//     const dict: any = {};
//     const data = (s + "").split("");
//     const out = [];
//     let currChar;
//     let phrase = data[0];
//     let code = 256;
//     for (let i = 1; i < data.length; i++) {
//       currChar = data[i];
//       if (dict[phrase + currChar] != null) {
//         phrase += currChar;
//       } else {
//         out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
//         dict[phrase + currChar] = code;
//         code++;
//         phrase = currChar;
//       }
//     }
//     out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
//     for (let j = 0; j < out.length; j++) {
//       out[j] = String.fromCharCode(out[j]);
//     }
//     return utoa(out.join(""));
//   } catch (e) {
//     console.log("zip failed", e);
//     return "";
//   }
// }

// // Decompress LZW compressed string
// export function unzip(str: string): string {
//   try {
//     const s = atou(str);

//     const dict: any = {};
//     const data = (s + "").split("");

//     let currChar = data[0];
//     let oldPhrase = currChar;
//     const out = [currChar];

//     let code = 256;
//     let phrase;
//     for (let i = 1; i < data.length; i++) {
//       const currCode = data[i].charCodeAt(0);
//       if (currCode < 256) {
//         phrase = data[i];
//       } else {
//         phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
//       }
//       out.push(phrase);
//       currChar = phrase.charAt(0);
//       dict[code] = oldPhrase + currChar;
//       code++;
//       oldPhrase = phrase;
//     }

//     return out.join("");
//   } catch (e: any) {
//     console.log("unzip Failed", e.message);
//     return "";
//   }
// }

// export export function get(cookie?: string | null, name?: string | null) {
//   if (!cookie) {
//     return null;
//   }

//   const cookies = cookie.split("; ") || [];
//   const jar: any = {};
//   for (let i = 0; i < cookies.length; i++) {
//     const parts = cookies[i].split("=");
//     let value = parts.slice(1).join("=");

//     try {
//       const found = decodeURIComponent(parts[0]);
//       if (!(found in jar)) {
//         if (value[0] === '"') {
//           value = value.slice(1, -1);
//         }
//         jar[found] = value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
//       }
//     } catch (e) {
//       // Do nothing...
//     }
//   }

//   return name ? jar[name] : jar;
// }

// export interface CookieAttributes {
//   expires?: number | Date | string;
//   path?: string;
//   domain?: string;
//   secure?: boolean;
//   samesite?: "strict" | "lax" | "none";
// }

// export export function prepareSet(
//   name: string,
//   value: string,
//   attributes: CookieAttributes = {}
// ): string | null {
//   if (!name || !value) {
//     return null;
//   }

//   name = encodeURIComponent(name)
//     .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
//     .replace(/[()]/g, escape);

//   value = encodeURIComponent(value).replace(
//     /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
//     decodeURIComponent
//   );

//   attributes = { path: "/", ...attributes };

//   if (typeof attributes.expires === "number") {
//     // attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
//     attributes.expires = new Date(Date.now() + attributes.expires * 1000);
//   }

//   if (attributes.expires instanceof Date) {
//     attributes.expires = attributes.expires.toUTCString();
//   }

//   let stringifiedAttributes = "";

//   for (let [attributeName, attributeValue] of Object.entries(attributes)) {
//     if (!attributeValue) {
//       continue;
//     }
//     stringifiedAttributes += "; " + attributeName;
//     if (attributeValue === true) {
//       continue;
//     }
//     stringifiedAttributes += "=" + attributeValue.split(";")[0];
//   }

//   return value + stringifiedAttributes;
// }

// export export function prepareRemove(
//   name: string,
//   attributes: CookieAttributes = {}
// ): string | null {
//   return prepareSet(name, "", { ...attributes, expires: new Date(0) });
// }

// export export function serialize<I extends object = any>(
//   name: string,
//   value: I,
//   attributes: CookieAttributes = {}
// ): string | null {
//   const compressedValue = zip(JSON.stringify(value));
//   return prepareSet(name, compressedValue, attributes);
// }

// export export function parse<R extends object = any>(cookie: string, name: string): R {
//   const value = get(cookie, name);

//   const uncompressedValue = unzip(value);

//   return JSON.parse(uncompressedValue);
// }

// export export function parseStr<R extends object = any>(value: string): R {
//   const uncompressedValue = unzip(value);

//   return JSON.parse(uncompressedValue);
// }

// export export function getClientCookieOnClient(name: string) {
//   const cookies = document.cookie.split(";");

//   for (let i = 0; i < cookies.length; i++) {
//     const [cookieName, cookieValue] = cookies[i].split("=");

//     if (cookieName.trim() === name) {
//       return parseStr(cookieValue);
//     }
//   }
//   return null;
// }

// export export function getServerCookieOnClient(name: string) {
//   const cookies = document.cookie.split(";");

//   for (let i = 0; i < cookies.length; i++) {
//     const [cookieName, cookieValue] = cookies[i].split("=");

//     if (cookieName.trim() === name) {
//       return cookieValue;
//     }
//   }
//   return null;
// }

// export export function setClientCookie(name: string, value: string) {
//   // console.log(name, value);
//   const expires = Date.now() + 2 * 60 * 1000;
//   document.cookie = `${name}=${value}; expires=${expires}; path=/`;
//   //Date.now() + 60 * 60 * 1000
// }
// // export default {
// //   prepareRemove,
// //   serialize,
// //   parse,
// //   parseStr,
// //   zip,
// //   unzip,
// // };

//usage
// in browser
// const allCookies = cookie.get(document.cookie);

// on server
// let allCookies = cookie.get(req.headers.cookie);

// cookie.parse(document.cookie, "my-store")

// cookie.parse

const SET_COMPRESSION = false;

export function encodeToBase64(val: string) {
  return btoa(val);
  // if (isBrowser()) {
  //   return window.btoa(val);
  // } else {
  //   return Buffer.from(val).toString("base64");
  // }
}

export function decodeFromBase64(val: string) {
  return atob(val);
  // if (isBrowser()) {
  //   return window.atob(val);
  // } else {
  //   return Buffer.from(val, "base64").toString("utf-8");
  // }
}

// ucs-2 string to base64 encoded ascii
export function utoa(str: string) {
  return encodeToBase64(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
export function atou(str: string) {
  return decodeURIComponent(escape(decodeFromBase64(str)));
}

// LZW string compression
export function zip(s: string): string {
  try {
    const dict: any = {};
    const data = (s + "").split("");
    const out = [];
    let currChar;
    let phrase = data[0];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (let j = 0; j < out.length; j++) {
      out[j] = String.fromCharCode(out[j]);
    }
    return utoa(out.join(""));
  } catch (e) {
    console.log("zip failed", e);
    return "";
  }
}

// Decompress LZW compressed string
export function unzip(str: string): string {
  try {
    const s = atou(str);
    const dict: any = {};
    const data = (s + "").split("");
    let currChar = data[0];
    let oldPhrase = currChar;
    const out = [currChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < data.length; i++) {
      const currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out.join("");
  } catch (e: any) {
    console.log("unzip Failed", e.message);
    return "";
  }
}

export function getFrom(cookie?: string | null, name?: string | null) {
  if (!cookie) {
    return null;
  }

  const cookies = cookie.split("; ") || [];
  const jar: any = {};
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    let value = parts.slice(1).join("=");

    try {
      const found = decodeURIComponent(parts[0]);
      if (!(found in jar)) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        jar[found] = value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      }
    } catch (e) {
      // Do nothing...
    }
  }

  return name ? jar[name] : jar;
}

export interface CookieAttributes {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  samesite?: "strict" | "lax" | "none";
}

export function prepareAttributes(
  attributes: CookieAttributes = {}
): string | null {
  attributes = { path: "/", ...attributes };

  if (typeof attributes.expires === "number") {
    // attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    attributes.expires = new Date(Date.now() + attributes.expires * 1000);
  }

  if (attributes.expires instanceof Date) {
    attributes.expires = attributes.expires.toUTCString();
    // console.log({ expires: attributes.expires });
  }

  let stringifiedAttributes = "";

  for (let [attributeName, attributeValue] of Object.entries(attributes)) {
    if (!attributeValue) {
      continue;
    }
    stringifiedAttributes += "; " + attributeName;
    if (attributeValue === true) {
      continue;
    }
    stringifiedAttributes += "=" + attributeValue.split(";")[0];
  }

  return stringifiedAttributes;
}

export function prepareValue(value: any): string | null {
  let vle = typeof value === "string" ? value : JSON.stringify(value);

  if (SET_COMPRESSION) {
    const compressedValue = zip(vle);
    vle = compressedValue;
  }

  value = encodeURIComponent(vle).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  );

  return value;
}

export function prepareValueWithAttributes(
  value: any,
  attributes: CookieAttributes = {}
): string | null {
  return prepareValue(value)! + prepareAttributes(attributes);
}

export function prepareValueWithNameNAttributes(
  name: string,
  value: any,
  attributes: CookieAttributes = {}
): string | null {
  // console.log(
  //   `${name}=${prepareValue(value)!}${prepareAttributes(attributes)}`
  // );
  return `${name}=${prepareValue(value)!}${prepareAttributes(attributes)}`;
}

export function prepareRemove(
  name: string,
  attributes: CookieAttributes = {}
): string | null {
  return prepareValueWithNameNAttributes(name, "", {
    ...attributes,
    expires: new Date(0),
  });
}

export function parse<R extends object = any>(value: string | any): R {
  try {
    let vle = value;

    if (SET_COMPRESSION) {
      vle = unzip(value);
    }
    // if (!vle) throw new Error("value undefined");
    // console.log({uncompressedValue})
    return JSON.parse(vle);
  } catch (e) {
    //console.log(e);
    return value;
  }
}

export function parseFrom<R extends object = any>(
  cookie: string,
  name: string
): R {
  let value = getFrom(cookie, name);
  if (!value) throw new Error("value undefined");
  return parse(value);
}

// export default {
//   prepareRemove,
//   prepareValueWithNameNAttributes,
//   prepareAttributes,
//   prepareValue,
//   prepareValueWithAttributes,
//   getFrom,
//   parseFrom,
//   parse,
//   zip,
//   unzip,
// };

// const value = serialize("cookieName", { "any obj"}, {
//     path: "/",

// })
// document.cookie = value
