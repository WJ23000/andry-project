const router = require("koa-router")();

const UploadController = require("../controllers/upload");

router.prefix("/service-upload/api/v1");

// 单文件上传-通过
router.post("/upload/file", UploadController.uploadFile);

// 多文件上传-通过
router.post("/upload/files", UploadController.uploadFiles);


module.exports = router;
