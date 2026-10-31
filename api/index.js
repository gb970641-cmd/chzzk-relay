// api/index.js (on Vercel in icn1 region)
export default async function handler(req, res) {
  const { channelId, videoNo, videoId, inKey, channelVideos } = req.query;

  let target = "";
  if (channelVideos) {
    // Chzzk Channel VODs List (Never blocked by Naver WAF)
    target = `https://api.chzzk.naver.com/service/v1/channels/${channelVideos}/videos?sortType=LATEST&pagingType=PAGE&page=0&size=30`;
  } else if (videoId && inKey) {
    target = `https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${videoId}?key=${inKey}`;
  } else if (videoNo) {
    target = `https://api.chzzk.naver.com/service/v3/videos/${videoNo}`;
  } else if (channelId) {
    target = `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`;
  } else {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Referer": "https://chzzk.naver.com/",
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
