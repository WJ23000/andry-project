class PageController {
  static async index(ctx) {
    await ctx.render("index", { title: "china" });
  }
}

module.exports = PageController;
