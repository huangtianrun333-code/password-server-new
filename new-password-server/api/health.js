export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      status: 'running',
      message: '密码服务器运行正常',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      api: 'health'
    });
  } else {
    res.status(405).json({ 
      success: false, 
      message: '只支持GET请求' 
    });
  }
}