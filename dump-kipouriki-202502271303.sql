-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: ns1145.papaki.gr    Database: kipouriki
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.28-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'OPEL',1),(2,'NISSAN',1),(3,'FERRARI',0);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dates`
--

DROP TABLE IF EXISTS `dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startDate1` date NOT NULL,
  `startDate2` date NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
INSERT INTO `dates` VALUES (1,'2025-02-03','2025-02-10',1),(3,'2025-02-17','2025-02-24',1);
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `draggable_categories`
--

DROP TABLE IF EXISTS `draggable_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `draggable_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `draggable_categories`
--

LOCK TABLES `draggable_categories` WRITE;
/*!40000 ALTER TABLE `draggable_categories` DISABLE KEYS */;
INSERT INTO `draggable_categories` VALUES (1,'Οδηγοί',1),(2,'Περιοχές',1);
/*!40000 ALTER TABLE `draggable_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `draggable_items`
--

DROP TABLE IF EXISTS `draggable_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `draggable_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `draggable_category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `draggable_items`
--

LOCK TABLES `draggable_items` WRITE;
/*!40000 ALTER TABLE `draggable_items` DISABLE KEYS */;
INSERT INTO `draggable_items` VALUES (1,1,'ALI',1),(2,1,'ΠΑΥΛΟΣ',1),(3,2,'ΘΗΣΕΙΟ',1),(4,2,'ΚΤΗΜΑ ΑΜΠΕΛΟΚΗΠΩΝ',1),(5,1,'VAIOS',1),(6,1,'STELIOS',1),(7,1,'BABIS',1),(8,1,'CHRISTOS',1),(9,2,'FILOTHEI',1),(10,2,'PSYCHIKO',1);
/*!40000 ALTER TABLE `draggable_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_drivers`
--

DROP TABLE IF EXISTS `schedule_drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleId` int(11) NOT NULL,
  `carId` int(11) NOT NULL DEFAULT 0,
  `numberOfDay` int(11) NOT NULL,
  `draggableItemIds` varchar(200) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_drivers`
--

LOCK TABLES `schedule_drivers` WRITE;
/*!40000 ALTER TABLE `schedule_drivers` DISABLE KEYS */;
INSERT INTO `schedule_drivers` VALUES (1,1,1,1,'1,2'),(2,1,2,2,'2'),(3,1,1,2,'1,2'),(4,1,2,1,'5'),(5,1,2,3,'1,2'),(6,1,99,4,'6'),(7,1,99,1,'6'),(8,1,2,7,'2'),(9,1,99,7,'6');
/*!40000 ALTER TABLE `schedule_drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_regions`
--

DROP TABLE IF EXISTS `schedule_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleId` int(11) NOT NULL,
  `carId` int(11) NOT NULL DEFAULT 0,
  `numberOfDay` int(11) NOT NULL,
  `draggableItemIds` varchar(200) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_regions`
--

LOCK TABLES `schedule_regions` WRITE;
/*!40000 ALTER TABLE `schedule_regions` DISABLE KEYS */;
INSERT INTO `schedule_regions` VALUES (1,1,1,1,'3,4'),(2,1,2,1,'3,4'),(3,1,1,2,'3,4');
/*!40000 ALTER TABLE `schedule_regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datesId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,3);
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$12$to2KP5J2iYGsTkleg65wWOzYoJXNmQJA14EOcEQOLntAaCFFQN5Ye',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'kipouriki'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-27 17:28:08
