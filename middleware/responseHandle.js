/**
 * @author wj
 * @explain 统一返回格式和异常错误处理
 * @date 2021-09-09
 */
function responseHandle() {
  return async (ctx, next) => {
    ctx.set("Content-Type", "application/json") // 以json格式返回数据
    // 请求成功
    ctx.success = (msg, data) => {
      ctx.body = {
        code: 4000200,
        msg: msg || "success",
        data: data || "",
      };
    };
    // 请求失败
    ctx.fail = (msg, data) => {
      ctx.body = {
        code: 4000500,
        msg: msg || "fail",
        data: data || "",
      };
    };
    // 参数异常
    ctx.exception = (msg) => {
      ctx.body = {
        code: 4000412,
        msg: msg || "fail",
      };
    };

    await next();
  };
}

module.exports = responseHandle;
