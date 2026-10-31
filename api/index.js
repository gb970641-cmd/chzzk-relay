// api/index.js (on Vercel in icn1 region)
export default async function handler(req, res) {
  const { channelId, videoNo, videoId, inKey, gameId, vodGameId } = req.query;

  let target = "";
  if (gameId) {
    target = `https://api-gw.sports.naver.com/schedule/games/${gameId}`;
  } else if (vodGameId) {
    target = `https://api-gw.sports.naver.com/video/game/${vodGameId}`;
  } else if (videoId && inKey) {
    target = `https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${videoId}?key=${inKey}`;
  } else if (videoNo) {
    target = `https://api.chzzk.naver.com/service/v3/videos/${videoNo}`;
  } else if (channelId) {
    target = `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`;
  } else {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://sports.naver.com/"
      }
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
