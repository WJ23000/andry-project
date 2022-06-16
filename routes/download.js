const router = require("koa-router")();
const DownloadController = require("../controllers/download");

router.prefix("/service-download/api/v1");
// 单文件下载-通过
router.get("/download/file", DownloadController.downloadFile);
// 多文件下载-待验证
router.post("/download/files", DownloadController.downloadFiles);

module.exports = router;
