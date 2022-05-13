/**
 * @author wj
 * @explain 对接口进行token拦截校验，部分公共接口不需要token校验
 * @date 2021-09-09
 */
const token = require("../utils/token");
const CommonModel = require("../modules/common");

async function checkToken(ctx, next) {
  const url = ctx.url.split("?")[0];
  if (
    url.includes("login") ||
    url.includes("register") ||
    url.includes("update/pwd") ||
    url.includes("swagger") ||
    url.includes("schedule")
  ) {
    await next();
  } else {
    const accessToken = ctx.request.headers["authorization"];
    if (accessToken) {
      // 判断当前token是否出现在黑名单中
      const tokenData = await CommonModel.queryToken(accessToken);
      if (tokenData == null) {
        // 对token进行解密并检查token是否过期
        const data = await token.verify(accessToken);
        if (data.id && data.username) {
          await next();
        } else {
          ctx.auth("token已过期，请重新登录！");
        }
      } else {
        ctx.auth("token已过期，请重新登录！");
      }
    } else {
      ctx.exception("请检查headers是否设置authorization");
    }
  }
}

module.exports = checkToken;
