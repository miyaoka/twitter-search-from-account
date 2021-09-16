const waitForSelectElement = <T extends Element>(
  selector: string
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector<T>(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      }
      if (Date.now() - start > 10000) {
        clearInterval(interval);
        reject("Element not appeared. (timeout)");
      }
    }, 20);
  });
};

const isUserPage = () => {
  return document.querySelector(`[data-testid="UserDescription"]`) != null;
};

const statusReg = new RegExp("/[^/]+/status/(?<id>\\d+)");

const getTweetId = () => {
  return location.pathname.match(statusReg)?.groups?.id;
};

const tweetId2Time = (id: string) => {
  const twitterEpoc = 1288834974657;
  const elapsed = Number(id) / 4194304; // id >> 22
  return elapsed + twitterEpoc;
};

const getSearchTimeText = (time: number) => {
  // '2021-09-17T18:49:03.304Z' -> '2021-09-17_18:49:03_UTC'
  return new Date(time).toISOString().replace(/(.+?)T(.+?)\..+/, "$1_$2_UTC");
};

const getInputText = (userId: string, tweetId?: string) => {
  let text = `from:${userId}`;

  if (tweetId) {
    const tweetTime = tweetId2Time(tweetId);
    // add 1sec
    const searchTimeText = getSearchTimeText(tweetTime + 1000);
    text += ` until:${searchTimeText}`;
  }
  return text;
};

const onTitleChange = async () => {
  const tweetId = getTweetId();
  if (!(tweetId || isUserPage())) return;
  const input = await waitForSelectElement<HTMLInputElement>(
    `[data-testid="SearchBox_Search_Input"]`
  );

  const userId = location.pathname.replace(/^\/([^/]+).*/, "$1");
  const text =
    getInputText(userId, tweetId) + " -filter:replies include:nativeretweets ";

  input.addEventListener("focus", () => {
    document.execCommand("insertText", true, text);
    input.select();
  });
};

const observeTitle = () => {
  const title = document.querySelector("title") as Node;
  const observer = new MutationObserver(onTitleChange);
  observer.observe(title, {
    childList: true,
  });
};

const init = async () => {
  await waitForSelectElement("title");
  observeTitle();
};
init();
