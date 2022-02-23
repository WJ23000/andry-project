module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 用户名
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "username",
      },
      // 密码
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      // 年龄
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "age",
      },
      // 性别
      sex: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "sex",
      },
      // 手机号
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone",
      },
      // 出生日期
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "birthday",
      },
      // 家庭住址
      homeAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "home_address",
      },
      // 创建时间
      createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "create_date",
      },
      // 更新时间
      updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_date",
      },
    },
    {
      tableName: "user",
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
