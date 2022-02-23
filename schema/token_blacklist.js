module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "token_blacklist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // token
      token: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "token",
      }
    },
    {
      tableName: "token_blacklist",
      timestamps: false,
      /**
       * 如果为true，则表示名称和model相同，即表名
       * 如果为fasle，mysql创建的表名称会是复数，即表名+"s"
       * 如果指定的表名称本身就是复数，则形式不变
       */
      freezeTableName: true,
    }
  );
};
