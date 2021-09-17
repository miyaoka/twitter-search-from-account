export const isUserPage = () => {
  return document.querySelector(`[data-testid="UserDescription"]`) != null;
};

const statusReg = new RegExp("/[^/]+/status/(?<id>\\d+)");

export const getTweetId = () => {
  return location.pathname.match(statusReg)?.groups?.id;
};

export const getUserId = () => {
  return location.pathname.match(/^\/(?<id>[^/]+).*/)?.groups?.id;
};

export const tweetId2Time = (id: string) => {
  const twitterEpoc = 1288834974657;
  const elapsed = Number(id) / 4194304; // id >> 22
  return elapsed + twitterEpoc;
};

export const getSearchTimeText = (time: number) => {
  // '2021-09-17T18:49:03.304Z' -> '2021-09-17_18:49:03_UTC'
  return new Date(time).toISOString().replace(/(.+?)T(.+?)\..+/, "$1_$2_UTC");
};
