/*
 Navicat Premium Data Transfer

 Source Server         : andry-project-dev
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : andry

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 29/10/2021 14:35:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `birthday` datetime(0) NULL DEFAULT NULL,
  `home_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_date` datetime(0) NULL DEFAULT NULL,
  `update_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_name`(`username`) USING BTREE COMMENT 'name不能重复'
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Anna', '123456', 21, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, 'Mary', '123456', 22, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (3, 'Sunny', '123456', 23, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (4, 'John', '123456', 24, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (6, 'Six.Ye12', '12345678', 24, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (7, '大黑', '123456', 27, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (8, '二黑', '123456', 20, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (9, '三黑', '123456', 25, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (10, '四黑', '123456', 23, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (11, '五黑', '123456', 26, '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (22, '六黑', '123456', 3, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (24, 'yh24', '12345678', 25, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (25, 'yh25', '12345678', 26, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (30, 'new1', '123456', 25, '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (35, '新用户', '123456', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
