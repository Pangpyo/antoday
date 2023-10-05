-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: antoday
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_stock_like`
--

DROP TABLE IF EXISTS `user_stock_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stock_like` (
  `user_stock_like_pk` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `stock_code` varchar(255) DEFAULT NULL,
  `social_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_stock_like_pk`),
  KEY `FKhgr6taoqd40pe35vg7yq0wdr0` (`stock_code`),
  KEY `FKetjuwxrlk5itjb2kjvvjg8w8o` (`social_id`),
  CONSTRAINT `FKetjuwxrlk5itjb2kjvvjg8w8o` FOREIGN KEY (`social_id`) REFERENCES `user` (`social_id`),
  CONSTRAINT `FKhgr6taoqd40pe35vg7yq0wdr0` FOREIGN KEY (`stock_code`) REFERENCES `stock` (`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stock_like`
--

LOCK TABLES `user_stock_like` WRITE;
/*!40000 ALTER TABLE `user_stock_like` DISABLE KEYS */;
INSERT INTO `user_stock_like` VALUES (5,'2023-10-05 20:58:14.482215','2023-10-05 20:58:14.482215','000270',3015700161),(6,'2023-10-05 20:59:41.769300','2023-10-05 20:59:41.769300','002880',3015700161),(10,'2023-10-05 21:01:15.033982','2023-10-05 21:01:15.033982','058220',3015700161),(11,'2023-10-05 21:08:42.782392','2023-10-05 21:08:42.782392','000720',3015700161),(12,'2023-10-05 21:08:56.371796','2023-10-05 21:08:56.371796','000150',3015700161),(13,'2023-10-05 21:09:07.841046','2023-10-05 21:09:07.841046','005930',3015700161),(14,'2023-10-05 21:09:25.784458','2023-10-05 21:09:25.784458','009150',3015700161);
/*!40000 ALTER TABLE `user_stock_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 23:57:57
