import {
  getSearchTimeText,
  getTweetInfo,
  isSearchInputElement,
  TweetInfo,
} from "./lib/twitter";

const getInputQuery = (info: TweetInfo) => {
  const from = { from: info.userId };
  if (info.type === "account") return from;
  // add 1sec
  const searchTimeText = getSearchTimeText(info.time + 1000);
  return { ...from, until: searchTimeText };
};

const onFocus = (evt: Event) => {
  const target = evt.target;
  if (!(target && isSearchInputElement(target))) return;

  const info = getTweetInfo();
  if (!info) return;

  const text =
    Object.entries(getInputQuery(info))
      .map(([key, val]) => `${key}:${val}`)
      .join(" ") + " "; //+ " -filter:replies include:nativeretweets ";

  requestAnimationFrame(() => {
    target.value = "";
    document.execCommand("insertText", false, text);
    target.select();
  });
};

const init = () => {
  document.addEventListener("focus", onFocus, true);
};
init();
