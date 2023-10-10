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
-- Table structure for table `trade_keyword`
--

DROP TABLE IF EXISTS `trade_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade_keyword` (
  `trade_keyword_pk` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `trade_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`trade_keyword_pk`),
  KEY `FK9rdj0au2sym764sxuaylm9tje` (`keyword`),
  KEY `FK119aw7wtvqtr8vlsqdwy5cw0l` (`trade_pk`),
  CONSTRAINT `FK119aw7wtvqtr8vlsqdwy5cw0l` FOREIGN KEY (`trade_pk`) REFERENCES `trade` (`trade_pk`),
  CONSTRAINT `FK9rdj0au2sym764sxuaylm9tje` FOREIGN KEY (`keyword`) REFERENCES `keyword` (`keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_keyword`
--

LOCK TABLES `trade_keyword` WRITE;
/*!40000 ALTER TABLE `trade_keyword` DISABLE KEYS */;
INSERT INTO `trade_keyword` VALUES (556,'2023-10-05 22:33:35.850047','2023-10-05 22:33:35.850058','청약',555),(557,'2023-10-05 22:33:35.852187','2023-10-05 22:33:35.852194','재개발',555),(562,'2023-10-05 22:37:43.399609','2023-10-05 22:37:43.399619','수주',558),(564,'2023-10-05 22:38:21.248692','2023-10-05 22:38:21.248702','데이터',563),(565,'2023-10-05 22:38:21.250884','2023-10-05 22:38:21.250891','AI',563),(566,'2023-10-05 22:38:21.262040','2023-10-05 22:38:21.262047','빅데이터',563),(595,'2023-10-05 23:02:00.975793','2023-10-05 23:02:00.975803','로보틱스',580),(596,'2023-10-05 23:02:00.976964','2023-10-05 23:02:00.976971','거래소 상장',580),(597,'2023-10-05 23:02:00.978019','2023-10-05 23:02:00.978025','공모주',580),(598,'2023-10-05 23:02:00.979071','2023-10-05 23:02:00.979078','로봇',580),(605,'2023-10-05 23:02:57.232559','2023-10-05 23:02:57.232568','반도체',571),(606,'2023-10-05 23:02:57.233692','2023-10-05 23:02:57.233698','미국',571),(607,'2023-10-05 23:02:57.234788','2023-10-05 23:02:57.234796','전자',571),(612,'2023-10-05 23:06:41.720201','2023-10-05 23:06:41.720211','금리',567),(613,'2023-10-05 23:06:41.721338','2023-10-05 23:06:41.721345','투자',567),(617,'2023-10-05 23:10:33.997218','2023-10-05 23:10:33.997227','반도체',578),(618,'2023-10-05 23:10:33.998479','2023-10-05 23:10:33.998486','수출 회복',578),(619,'2023-10-05 23:10:33.999518','2023-10-05 23:10:33.999525','메모리',578);
/*!40000 ALTER TABLE `trade_keyword` ENABLE KEYS */;
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