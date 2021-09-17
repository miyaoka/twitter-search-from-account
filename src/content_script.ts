import { waitForSelectElement } from "./lib/selector";
import {
  getSearchTimeText,
  getTweetId,
  isUserPage,
  tweetId2Time,
} from "./lib/twitter";

const getInputText = (userId: string, tweetId?: string) => {
  const from = `from:${userId}`;
  if (!tweetId) return from;
  const tweetTime = tweetId2Time(tweetId);
  // add 1sec
  const searchTimeText = getSearchTimeText(tweetTime + 1000);
  return `${from} until:${searchTimeText}`;
};

const onTitleChange = async () => {
  const tweetId = getTweetId();
  if (!(tweetId || isUserPage())) return;
  const input = await waitForSelectElement<HTMLInputElement>(
    `[data-testid="SearchBox_Search_Input"]`
  );
  if (!input) return;

  const userId = location.pathname.replace(/^\/([^/]+).*/, "$1");
  const text =
    getInputText(userId, tweetId) + " -filter:replies include:nativeretweets ";

  input.addEventListener("focus", () => {
    requestAnimationFrame(() => {
      document.execCommand("insertText", false, text);
      input.select();
    });
  });
};

const init = async () => {
  const title = await waitForSelectElement<HTMLTitleElement>("title");
  if (!title) return;
  // ページ遷移を拾うためtitle要素の変更を監視する
  const observer = new MutationObserver(onTitleChange);
  observer.observe(title, {
    childList: true,
  });
};
init();
