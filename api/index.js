// api/index.js (on Vercel in icn1 region)
export default async function handler(req, res) {
  const { channelId, videoNo } = req.query;

  let target = "";
  if (videoNo) {
    // Replay / VOD API
    target = `https://api.chzzk.naver.com/service/v3/videos/${videoNo}`;
  } else if (channelId) {
    // Live stream API
    target = `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`;
  } else {
    return res.status(400).json({ error: "Missing channelId or videoNo" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://chzzk.naver.com/"
      }
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
