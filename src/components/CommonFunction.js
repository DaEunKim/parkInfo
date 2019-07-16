import queryString from "query-string";
// import { MOBILE_URL } from "CONSTANTS/url";
import moment from "moment";

const Entities = require("html-entities").XmlEntities;

const entities = new Entities();

function isExecuttableOniOS() {
  if (window.webkit) {
    const Webkit = window.webkit;
    if (Webkit.messageHandlers) {
      const MessageHandlers = Webkit.messageHandlers;
      if (MessageHandlers.moveNative) {
        const MoveNative = MessageHandlers.moveNative;
        if (MoveNative.postMessage) {
          return true;
        }
      }
    }
  }
  return false;
}

function isExecuttableOnAndroid() {
  if (window.android) {
    const Android = window.android;
    if (Android.moveNative) {
      return true;
    }
  }
  return false;
}

export const callNative = ({ pageName, parameter }) => {
  let callBack = false;

  const url = `${pageName}?${queryString.stringify(parameter)}`;
  window.testfunc = callNative;

  if (isExecuttableOniOS()) {
    window.webkit.messageHandlers.moveNative.postMessage(url);
    callBack = true;
  }

  if (isExecuttableOnAndroid()) {
    window.android.moveNative(url);
    callBack = true;
  }

  // if (!callBack) {
  //   console.log('fail call Native');
  // }
  return callBack;
};

export const refreshUrl = ({ history, basePageName, query }) => {
  let callBack = false;

  if (history && basePageName) {
    const fullUrl = `${basePageName}?${queryString.stringify(query)}`;
    history.push(fullUrl);
    callBack = true;
  }

  // if (!callBack) {
  //   console.log('fail refresh url');
  // }

  return callBack;
};

export const getDiffTimeFromNow = updateDate => {
  const madeDate = moment(updateDate, "YYYY-MM-DDTHH:mm:ssZ");
  const curDate = moment(moment(), "YYYY-MM-DDTHH:mm:ssZ");

  const byMinute = parseInt(
    curDate.diff(madeDate) / (1000 * 60), // 밀리초단위에서 분단위로 변환
    10
  );

  const byHour = parseInt(byMinute / 60, 10);
  const byDay = parseInt(byHour / 24, 10);
  const byMonth = parseInt(byDay / 31, 10);
  const byYear = parseInt(byMonth / 12, 10);

  return { byMinute, byHour, byDay, byMonth, byYear };
};

export const calcMadeDate = updateDate => {
  const madeDate = moment(updateDate, "YYYY-MM-DDTHH:mm:ssZ");
  // return madeDate.format('YYYY년 MM월 DD일 HH:mm');

  const { byMinute, byHour, byDay, byMonth, byYear } = getDiffTimeFromNow(
    updateDate
  );

  if (byMinute < 1) {
    return `방금`;
  }
  if (byMinute < 60) {
    return `${byMinute}분전`;
  }
  if (byHour < 24) {
    return `${byHour}시간전`;
  }
  if (byHour < 48) {
    return `어제`;
  }

  if (byYear < 1) {
    return madeDate.format("MM월 DD일 HH:mm");
  }

  return madeDate.format("YYYY년 MM월 DD일 HH:mm");

  // if (byDay < 31) {
  //   return `${byDay}일전`;
  // }
  // if (byMonth < 12) {
  //   return `${byMonth}달전`;
  // }

  // return `${byYear}년전`;
};

export const divisionArr = (arr, n) => {
  const len = arr.length;
  const copyArr = arr.slice();
  const cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
  const tmpArr = [];

  for (let i = 0; i < cnt; i += 1) {
    tmpArr.push(copyArr.splice(0, n));
  }

  return tmpArr;
};

export const limitedString = (str, limitlength = 15) => {
  if (!str) return "";
  if (str.length > limitlength) {
    return `${str.slice(0, limitlength)}...`;
  }

  return str;
};

export const decodeString = str => {
  if (!str) return "";
  return entities.decode(str);
};

export const limitedDecodeString = (str, limitlength = 15) => {
  if (!str) return "";

  return decodeString(limitedString(str, limitlength));
};

export const ThousandK = num => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }

  return (num / si[i].value).toFixed(1).replace(rx, "$1") + si[i].symbol;
};

export const Comma = defaultNum => {
  let len = 0;
  let point = 0;
  let str = 0;

  let num = defaultNum;

  num += "";
  point = num.length % 3;
  len = num.length;

  str = num.substring(0, point);
  while (point < len) {
    if (str !== "") str += ",";
    str += num.substring(point, point + 3);
    point += 3;
  }

  return str;
};

export function payNumberWithCommas(payNum) {
  return payNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function loggingMessage(compName, logging) {
  // 일단 콘솔에 찍어본다.
  console.log(compName);
  console.log(logging);
}

export function refreshPage() {
  window.location.reload();
}
