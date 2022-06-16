/**
 * @author wj
 * @explain 统一返回格式和异常错误处理
 * @date 2021-09-09
 */
function handle() {
  return async (ctx, next) => {
    ctx.set("Content-Type", "application/json"); // 以json格式返回数据
    // 请求成功
    ctx.success = (msg, data) => {
      ctx.body = {
        code: 4000200,
        msg: msg || "success",
        data: data || "",
      };
    };
    // 请求失败(服务器异常)
    ctx.fail = (msg, data) => {
      ctx.body = {
        code: 4000500,
        msg: msg || "fail",
        data: data || "",
      };
    };
    // 参数异常
    ctx.exception = (msg, data) => {
      ctx.body = {
        code: 4000412,
        msg: msg || "params-exception",
        data: data || "",
      };
    };
    // 无访问权限
    ctx.auth = (msg) => {
      ctx.body = {
        code: 4000403,
        msg: msg || "no-auth",
      };
    };

    await next();
  };
}

module.exports = handle;
