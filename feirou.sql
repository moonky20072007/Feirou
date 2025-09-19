-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: feirou
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `consumidor`
--

DROP TABLE IF EXISTS `consumidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumidor` (
  `id_consumidor` int NOT NULL,
  `nome_usuario` varchar(30) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `telefone` bigint NOT NULL,
  `quantidade_seguindo` int NOT NULL,
  PRIMARY KEY (`id_consumidor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumidor`
--

LOCK TABLES `consumidor` WRITE;
/*!40000 ALTER TABLE `consumidor` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumidor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtida`
--

DROP TABLE IF EXISTS `curtida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curtida` (
  `id_produtor` int NOT NULL,
  `id_consumidor` int NOT NULL,
  PRIMARY KEY (`id_produtor`,`id_consumidor`),
  KEY `id_consumidor` (`id_consumidor`),
  CONSTRAINT `curtida_ibfk_1` FOREIGN KEY (`id_consumidor`) REFERENCES `consumidor` (`id_consumidor`),
  CONSTRAINT `curtida_ibfk_2` FOREIGN KEY (`id_produtor`) REFERENCES `produtor` (`id_produtor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtida`
--

LOCK TABLES `curtida` WRITE;
/*!40000 ALTER TABLE `curtida` DISABLE KEYS */;
/*!40000 ALTER TABLE `curtida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id_produto` int NOT NULL,
  `tipo_produto` varchar(45) NOT NULL,
  `nome_produto` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtor`
--

DROP TABLE IF EXISTS `produtor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtor` (
  `id_produtor` int NOT NULL,
  `nome_usuario` varchar(30) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `CPF_CNPJ` varchar(19) DEFAULT NULL,
  `telefone` bigint NOT NULL,
  `quantidade_seguidores` int DEFAULT NULL,
  `quantidade_seguindo` int DEFAULT NULL,
  `quantidade_posts` int DEFAULT NULL,
  `descricao_perfil` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_produtor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtor`
--

LOCK TABLES `produtor` WRITE;
/*!40000 ALTER TABLE `produtor` DISABLE KEYS */;
/*!40000 ALTER TABLE `produtor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacao` (
  `id_publicacao` int NOT NULL,
  `produtor_id_produtor` int NOT NULL,
  `produto_id_produto` int NOT NULL,
  `tipo_midia` varchar(50) NOT NULL,
  `url_midia` varchar(200) NOT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `data_publicacao` date NOT NULL,
  `tipo_produto` varchar(45) DEFAULT NULL,
  `data_producao` date DEFAULT NULL,
  `validade_produto` date DEFAULT NULL,
  `quantidade_produto` int DEFAULT NULL,
  `preco_produto` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_publicacao`),
  KEY `fk_publicacao_produtor1_idx` (`produtor_id_produtor`),
  KEY `fk_publicacao_produto1_idx` (`produto_id_produto`),
  CONSTRAINT `fk_publicacao_produto1` FOREIGN KEY (`produto_id_produto`) REFERENCES `produto` (`id_produto`),
  CONSTRAINT `fk_publicacao_produtor1` FOREIGN KEY (`produtor_id_produtor`) REFERENCES `produtor` (`id_produtor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacao`
--

LOCK TABLES `publicacao` WRITE;
/*!40000 ALTER TABLE `publicacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `segue`
--

DROP TABLE IF EXISTS `segue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segue` (
  `id_consumidor` int NOT NULL,
  `id_produtor` int NOT NULL,
  KEY `id_consumidor` (`id_consumidor`),
  KEY `id_produtor` (`id_produtor`),
  CONSTRAINT `segue_ibfk_1` FOREIGN KEY (`id_consumidor`) REFERENCES `consumidor` (`id_consumidor`),
  CONSTRAINT `segue_ibfk_2` FOREIGN KEY (`id_produtor`) REFERENCES `produtor` (`id_produtor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segue`
--

LOCK TABLES `segue` WRITE;
/*!40000 ALTER TABLE `segue` DISABLE KEYS */;
/*!40000 ALTER TABLE `segue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visualiza`
--

DROP TABLE IF EXISTS `visualiza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visualiza` (
  `id_consumidor` int NOT NULL,
  `id_publicacao` int NOT NULL,
  KEY `id_publicacao` (`id_publicacao`),
  KEY `id_consumidor` (`id_consumidor`),
  CONSTRAINT `visualiza_ibfk_1` FOREIGN KEY (`id_publicacao`) REFERENCES `publicacao` (`id_publicacao`),
  CONSTRAINT `visualiza_ibfk_2` FOREIGN KEY (`id_consumidor`) REFERENCES `consumidor` (`id_consumidor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visualiza`
--

LOCK TABLES `visualiza` WRITE;
/*!40000 ALTER TABLE `visualiza` DISABLE KEYS */;
/*!40000 ALTER TABLE `visualiza` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 14:11:50
