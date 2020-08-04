/*
 Navicat Premium Data Transfer

 Source Server         : myKing
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : betterball

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 03/08/2020 10:25:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_pinball_score
-- ----------------------------
DROP TABLE IF EXISTS `t_pinball_score`;
CREATE TABLE `t_pinball_score`  (
  `id` int(32) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `score` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '成绩',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `openid` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微信openid',
  `rank` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '排名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '弹珠游戏成绩表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for twechat_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `twechat_userinfo`;
CREATE TABLE `twechat_userinfo`  (
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户openid',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省份',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '市区',
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区',
  `headimgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '用户信息获取时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '用户信息更新时间',
  PRIMARY KEY (`openid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '微信相关用户信息' ROW_FORMAT = Dynamic;


SET FOREIGN_KEY_CHECKS = 1;
