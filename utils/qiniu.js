const qiniu = require("qiniu");
const { qiniuConfig } = require("../config/config");

function uploadToQiniu(filePath, key) {
  const accessKey = qiniuConfig.accessKey; // 七牛云accessKey
  const secretKey = qiniuConfig.secretKey; // 七牛云secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey); // 生成上传凭证
  // 设置上传空间
  const options = {
    scope: qiniuConfig.scope, 
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  // 生成上传token
  const uploadToken = putPolicy.uploadToken(mac);
  // 实例化config
  const config = new qiniu.conf.Config();
  // 空间对应的机房(这个很重要)
  config.zone = qiniu.zone.httpAutoZone;
  const localFile = filePath;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolved, reject) => {
    formUploader.putStream(
      uploadToken,
      key,
      localFile,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolved(respBody);
        } else {
          resolved(respBody);
        }
      }
    );
  });
}

module.exports = uploadToQiniu;
