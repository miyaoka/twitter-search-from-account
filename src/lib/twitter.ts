export const isUserPage = () => {
  return document.querySelector(`[data-testid="UserDescription"]`) != null;
};

const statusReg = new RegExp("/[^/]+/status/(?<id>\\d+)");

export const getStatusId = (pathname: string) => {
  return pathname.match(statusReg)?.groups?.id;
};

export const getUserId = (pathname: string) => {
  return pathname.match(/^\/(?<id>[^/]+).*/)?.groups?.id;
};

export const tweetId2Time = (id: string) => {
  const twitterEpoc = 1288834974657;
  const elapsed = Number(id) / 4194304; // id >> 22
  return elapsed + twitterEpoc;
};

export const getSearchTimeText = (time: number) => {
  // '2000-01-23T01:23:45.678Z' -> '2000-01-23_01:23:45_UTC'
  return new Date(time).toISOString().replace(/(.+?)T(.+?)\..+/, "$1_$2_UTC");
};

export type TweetInfo =
  | {
      type: "account";
      userId: string;
    }
  | {
      type: "status";
      userId: string;
      statusId: string;
      time: number;
    };
export const getTweetInfo = (): TweetInfo | null => {
  const { pathname } = location;
  const statusId = getStatusId(pathname);

  if (!(statusId || isUserPage())) return null;
  const userId = getUserId(pathname);

  if (!userId) return null;

  return statusId
    ? {
        type: "status",
        userId,
        statusId,
        time: tweetId2Time(statusId),
      }
    : {
        type: "account",
        userId,
      };
};

export const isSearchInputElement = (
  target: EventTarget
): target is HTMLInputElement => {
  return (
    target instanceof HTMLInputElement &&
    target.dataset.testid === "SearchBox_Search_Input"
  );
};
