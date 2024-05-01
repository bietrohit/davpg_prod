-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: davpg
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `alumni`
--

DROP TABLE IF EXISTS `alumni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Father` varchar(255) NOT NULL,
  `Mother` varchar(255) NOT NULL,
  `Dob` date NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `Photo` varchar(255) NOT NULL,
  `Degree` varchar(255) NOT NULL,
  `YearofPassing` varchar(255) NOT NULL,
  `Designation` varchar(255) NOT NULL,
  `WorkingAddress` varchar(255) NOT NULL,
  `Specialization` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni`
--

LOCK TABLES `alumni` WRITE;
/*!40000 ALTER TABLE `alumni` DISABLE KEYS */;
INSERT INTO `alumni` VALUES (6,'Rohit Kumar Tiwari','Rabish Tiwari','Subhawati Devi','1992-07-05','KHA/III/13, MMMUT Campus','Male','rktcs@mmmut.ac.in','9118470035','1691727190535.jpg','B.A.','2007','Assistant Professor','MMMUT-GKP','CSE'),(7,'Prof. B. K. Pandey','Test','ets','2023-08-01','MMMUT ','Male','bkp@mmmut.ac.in','9118470035','1691936190937.jpg','B.A.','2000','Professor','MMMUT','Physics'),(8,'test1','test1','test','1000-10-10','kjfhkad','Male','test@gmail.com','8888888889','1713888591300.png','B.A.','2002','SDE','Gorakhpur','Data analyst'),(9,'test1','test1','test','0020-01-10','kjfhkad','Male','test','8888888888888888888','1713890036343.png','B.A.','5000000','SDE','Gorakhpur',''),(10,'test888','test','test','0001-01-01','test','Male','test','test','1713988016450.JPG','B.A.','00000','test','test','test');
/*!40000 ALTER TABLE `alumni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award` (
  `id` int NOT NULL AUTO_INCREMENT,
  `award` varchar(45) DEFAULT NULL,
  `awarding_organization` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educational_qualification`
--

DROP TABLE IF EXISTS `educational_qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educational_qualification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `degree` varchar(45) DEFAULT NULL,
  `branch/specialization` varchar(100) DEFAULT NULL,
  `institute` varchar(150) DEFAULT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educational_qualification`
--

LOCK TABLES `educational_qualification` WRITE;
/*!40000 ALTER TABLE `educational_qualification` DISABLE KEYS */;
/*!40000 ALTER TABLE `educational_qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `Id` varchar(45) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Department` varchar(70) DEFAULT NULL,
  `Designation` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `resume` varchar(45) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `area_of_interest` longtext,
  `highest_qualification` varchar(45) DEFAULT NULL,
  `teaching_experience` varchar(45) DEFAULT NULL,
  `publications_books_patents` varchar(45) DEFAULT NULL,
  `seminar_conference_workshop_organized` varchar(45) DEFAULT NULL,
  `seminar_conference_workshop_attended` varchar(45) DEFAULT NULL,
  `fellowship_awards` varchar(45) DEFAULT NULL,
  `membership` varchar(45) DEFAULT NULL,
  `masters_supervised` varchar(45) DEFAULT NULL,
  `phd_supervised` varchar(45) DEFAULT NULL,
  `other_info` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  CONSTRAINT `Id` FOREIGN KEY (`Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('aa','anan','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('aaa','anana','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('aaaaa','a','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('aaaaaaa','a','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('aaaaaaa455','a','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('admin','admin','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Anant','Anant','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('anant8@gmail.com','test','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('ASP','ASP','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('ckjsccbskfs','snsn','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('e','d','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pragya','nnn','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pragya41578','nnn','arts','proffesor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_events_marquee`
--

DROP TABLE IF EXISTS `news_events_marquee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_events_marquee` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Type` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Link` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_events_marquee`
--

LOCK TABLES `news_events_marquee` WRITE;
/*!40000 ALTER TABLE `news_events_marquee` DISABLE KEYS */;
INSERT INTO `news_events_marquee` VALUES (28,'बी0एस-सी0 प्राणि विज्ञान प्रथम सेमेस्टर में प्रवेश हेतु जिन छात्र/छात्राओं ने प्रवेश फार्म भरा है वह अपना प्रवेश दिनांक 10.09.2022 तक अवश्य करा लें। अन्यथा उनका फार्म निरस्त कर दिया जायेगा। जिसकी समस्त जिम्मेदारी स्वयं छात्र/छात्रा की होगी।','News',''),(29,'एम०ए० (इतिहास व राजनीतिक शास्त्र ) व बी० कॉम० प्रथम सेमेस्टर में प्रवेश प्रारम्भ हैं। प्रवेश हेतु इच्छुक छात्र / छात्राएं प्रवेश फॉर्म कार्यालय से प्राप्त कर निर्धारित सीटों पर प्रवेश करा लें।','News',''),(30,'Yoga Day celebration on 21st June 2019','Events',''),(31,'प्रवेश फार्म भरने से लेकर परीक्षा फार्म भरने तक का सामान्य प्रक्रिया ','Marquee',''),(32,'डी0ए0वी0पी0जी0 कॉलेज, गोरखपुर में बी0ए0 /बी0एस-सी0 /बी0कॉम0 /एम0ए0 प्रथम सेमेस्टर में प्रवेश हेतु रिक्त स्थान के सापेक्ष प्रवेश दिनांक 14/08/2023 को किया जायेगा। इच्छुक सभी छात्र/छात्राऐं महाविद्यालय से आवेदन पत्र प्राप्त कर प्रवेश ले सकते हैं।','News','1691936006428.pdf'),(33,'पंजीकरण फार्म सितम्बर 15-18 के बीच में भरा जायेगा भरने की सुचना | विस्तृत सूचना के लिए क्लिक करे|  ','Events','1694686940198.pdf');
/*!40000 ALTER TABLE `news_events_marquee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profession_career`
--

DROP TABLE IF EXISTS `profession_career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profession_career` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from` varchar(45) DEFAULT NULL,
  `to` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `organization` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profession_career`
--

LOCK TABLES `profession_career` WRITE;
/*!40000 ALTER TABLE `profession_career` DISABLE KEYS */;
/*!40000 ALTER TABLE `profession_career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `publication` longtext,
  `department` varchar(150) DEFAULT NULL,
  `category` mediumtext,
  `year` int DEFAULT NULL,
  `month` int DEFAULT NULL,
  `indexing` varchar(45) DEFAULT NULL,
  `issnno` varchar(45) DEFAULT NULL,
  `impactfactor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('HS6bJWd1MeDvqIgS7bNIZbWNYfW3TPJJ',1714335474,'{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2024-04-28T20:17:53.842Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"isAuth\":true,\"username\":\"admin\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id` varchar(100) NOT NULL,
  `Pass` varchar(100) NOT NULL,
  `UserType` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aa','aa','Faculty'),('aaa','a','Faculty'),('aaaaa','aaaaa','Faculty'),('aaaaaaa','aa','Faculty'),('aaaaaaa455','45','Faculty'),('admin','admin@123','admin'),('Anant','Hey','Faculty'),('anant1','anant','Faculty'),('anant11','anant','Faculty'),('anant111','anant','Faculty'),('anant1111','anant','Faculty'),('anant1111111','anant','Faculty'),('anant111111111111111','11','Faculty'),('anant8@gmail.com','anant','Faculty'),('ASP','ASP','Faculty'),('ckjsccbskfs','cskjfbsfs','Faculty'),('e','d','Faculty'),('kfksd','kj','Faculty'),('pragya','pragya','Faculty'),('pragya41578','hh','Faculty'),('skfns','dkadna','Faculty'),('username','pswrd','Faculty'),('username1','pswrd1','Faculty');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 12:05:20
