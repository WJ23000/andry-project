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

 Date: 29/10/2021 14:35:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for token_hit_list
-- ----------------------------
DROP TABLE IF EXISTS `token_hit_list`;
CREATE TABLE `token_hit_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token_hit_list
-- ----------------------------
INSERT INTO `token_hit_list` VALUES (13, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzcyNDkwLCJleHAiOjE2MzE3Nzk2OTB9.VytOTBZPED-dtOHSV9QZEYE2NItJHf-7nFxflk4X1kk');
INSERT INTO `token_hit_list` VALUES (14, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzcyMjYyLCJleHAiOjE2MzE3Nzk0NjJ9.u13-oj3qf7XwZunvvam-B9IGtiuqHxk2A2ycnFNNkAg');
INSERT INTO `token_hit_list` VALUES (15, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0MjY5LCJleHAiOjE2MzE3ODE0Njl9.mNYpXRpZ97F6R-ivsnAM8Tge6TtytezWe7fgpQ8JFSA');
INSERT INTO `token_hit_list` VALUES (16, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzcyMzkyLCJleHAiOjE2MzE3Nzk1OTJ9.SMaDWxMP_xrZTAUgMsBs9rX95XihiEZs5W3CB1mwoIw');
INSERT INTO `token_hit_list` VALUES (17, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0MzE3LCJleHAiOjE2MzE3ODE1MTd9.GCPk0Dh9S8V0rNBdM9tsxI0DhMflqpgJ23s32cCqtUA');
INSERT INTO `token_hit_list` VALUES (18, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0MzE3LCJleHAiOjE2MzE3ODE1MTd9.GCPk0Dh9S8V0rNBdM9tsxI0DhMflqpgJ23s32cCqtUA');
INSERT INTO `token_hit_list` VALUES (19, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0Mzg2LCJleHAiOjE2MzE3ODE1ODZ9.BozT6HSCuRKyNRI2q5NWm5JqSjiaNn3ojOpaOD4A8hg');
INSERT INTO `token_hit_list` VALUES (20, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0NDAxLCJleHAiOjE2MzE3ODE2MDF9.LleNzxWNXljw3MlcIv6nCqrFhvkhvO-6GeI6BS0nLGY');
INSERT INTO `token_hit_list` VALUES (21, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjMxNzc0NTIxLCJleHAiOjE2MzE3ODE3MjF9.d9gLeHLojAdDb57ma5Be4cBVlqG_kyYahshh9xUemBE');
INSERT INTO `token_hit_list` VALUES (22, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjM1NDg4NTQyLCJleHAiOjE2MzU0OTU3NDJ9.BZlx8ySB9O6ZqXsqcwatT97zognA2qIFKkHkD93TuP0');
INSERT INTO `token_hit_list` VALUES (23, 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoi5YWt6buRIiwiaWF0IjoxNjM1NDg4Nzg0LCJleHAiOjE2MzU0OTU5ODR9.9-wnun4dVC_wo9zMkBxgIwCJ-yf04YpvXsr-9N6Lf1s');

SET FOREIGN_KEY_CHECKS = 1;
