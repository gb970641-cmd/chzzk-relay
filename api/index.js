// api/index.js (on Vercel in icn1 region) 947PM
export default async function handler(req, res) {
  const { channelId, videoNo, videoId, inKey, inkey, channelVideos, vodGameId, gameId } = req.query;

  let target = "";
  let referer = "https://chzzk.naver.com/";
  const finalKey = inKey || inkey;

  if (gameId) {
    target = `https://api-gw.sports.naver.com/schedule/games/${gameId}`;
    referer = "https://m.sports.naver.com/";
  } else if (vodGameId) {
    target = `https://api-gw.sports.naver.com/video/game/${vodGameId}`;
    referer = "https://m.sports.naver.com/";
  } else if (channelVideos) {
    target = `https://api.chzzk.naver.com/service/v1/channels/${channelVideos}/videos?sortType=LATEST&pagingType=PAGE&page=0&size=50`;
    referer = "https://chzzk.naver.com/";
  } else if (videoId && finalKey) {
    target = `https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${videoId}?key=${finalKey}`;
    referer = "https://chzzk.naver.com/";
  } else if (videoNo) {
    target = `https://api.chzzk.naver.com/service/v3/videos/${videoNo}`;
    referer = "https://chzzk.naver.com/";
  } else if (channelId) {
    target = `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`;
    referer = "https://chzzk.naver.com/";
  } else {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Referer": referer,
        "Accept": "application/json, text/plain, */*"
      }
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
