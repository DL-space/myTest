/*
MySQL Data Transfer
Source Host: localhost
Source Database: fullcalendar
Target Host: localhost
Target Database: fullcalendar
Date: 2014-2-20 11:54:14
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for calendar
-- ----------------------------
CREATE TABLE `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) DEFAULT NULL,
  `allday` tinyint(1) NOT NULL DEFAULT '0',
  `color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `calendar` VALUES ('11', '秋雨软件 Roman QQ:522530685', '2014-02-20', '', '1', '#f30');
