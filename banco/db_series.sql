-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.24-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para bd_series
CREATE DATABASE IF NOT EXISTS `bd_series` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_series`;


-- Copiando estrutura para tabela bd_series.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL DEFAULT '0',
  `Login` varchar(40) NOT NULL DEFAULT '0',
  `Senha` varchar(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Login` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela bd_series.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`Id`, `Nome`, `Login`, `Senha`) VALUES
	(1, 'Silvio', 'silvio', '123456');

INSERT INTO `usuario` (`Id`, `Nome`, `Login`, `Senha`) VALUES
	(2, 'Henrique', 'henrique', '123456');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


CREATE TABLE IF NOT EXISTS `serie` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL DEFAULT '0',
  `Descricao` varchar(5000) NOT NULL DEFAULT '0',
  `ImgPoster` varchar(200) NOT NULL DEFAULT '0',
  `Ano` varchar(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `serieJaVista` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `IdSerie` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX serieJaVista_IdUsuario_usuario_Id (IdUsuario),
  	FOREIGN KEY (IdUsuario) 
    	REFERENCES usuario(Id)
        ON DELETE CASCADE,
  INDEX serieJaVista_IdSerie_serie_id (IdSerie),
  	FOREIGN KEY (IdSerie) 
        REFERENCES serie(Id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `serieDesejoVer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `IdSerie` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX serieJaVista_IdUsuario_usuario_Id (IdUsuario),
  	FOREIGN KEY (IdUsuario) 
        REFERENCES usuario(Id)
        ON DELETE CASCADE,
  INDEX serieJaVista_IdSerie_serie_id (IdSerie),
  	FOREIGN KEY (IdSerie) 
        REFERENCES serie(Id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Inserindo séries na mão */
INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('Under The Dome', '  
Under the Dome se passa numa cidade que inexplicavelmente se vê presa sob uma redoma enorme e transparente. Não é difícil prever que logo o caos toma conta de todas as ruas.

Enquanto lutam pela sobrevivência nesse cenário pós-apocalíptico, os moradores da cidade procuram por respostas sobre o que é esta barreira, de onde ela veio e se, um dia, ela irá embora.', 'underthedome-poster.jpg', '2013');


INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('Game of Thrones', 'Game of Thrones é um seriado da HBO criado como a adaptação dos livros escritos por George R. R. Martin, reunidos na série As Crônicas de Gelo e Fogo (A Song of Ice and Fire), composta por sete volumes, cinco dos quais já publicados.

Desde que estreou em 2011 na televisão, tornou-se a maior série da HBO, conquistando fãs em todo o mundo, fascinados por suas histórias de intrigas, luta pelo poder, pelo amor, pela honra e pela fortuna, anseios que permeiam a vida os habitantes dos ficcionais Sete Reinos de Westeros, em um tempo inspirado na Idade Média e permeado de elementos sobrenaturais.', 'gameofthrones-poster.jpg', '2011');


INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('The Big Bang Theory', 'Leonard (Johnny Galecki) e Sheldon (Jim Parsons) são dois brilhantes físicos que dividem o mesmo apartamento. Suas vidas se complicam quando uma belíssima jovem, porém pouco inteligente, Penny (Kaley Cuoco, "8 Simple Rules", "Charmed"), se muda para o apartamento do lado. A chegada de Penny perturbo um pouco a Sheldon já que ele prefere passar as noites jogando Klingori Boggle com seus amigos e colegas de trabalho e também cientistas, Wolowitz e Koothrappali, sem ligar para Penny. Contudo, Leonard vê em Penny a possibilidade de aprender a interagir com as mulheres e sente que ela é um novo mundo cheio de possibilidades, e quem sabe, do amor. Sheldon acha que isso é um sonho que nunca se realizará, porém, talvez nesta comédia estas mentes brilhantes possam aprender algumas coisas com uma jovem que trabalha em um restaurante.', 'thebigbangtheory-poster.jpg', '2007');

INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('Dexter', 'HOMENOVIDADESEPISÓDIOS  
Baseada na obra de Jeff Lindsay, "Darkly Dreaming Dexter", a série tem como protagonista um especialista forense em amostras de sangue, que trabalha para o Departamento de Polícia de Miami.

Ele também é um assassino serial que mata as pessoas que a polícia não consegue prender. A dupla identidade tem de ser escondida de todos, incluindo sua irmã e companheiros de trabalho.

Na infância, órfão aos quatro anos, Dexter é adotado por um policial que logo detecta sua tendência homicida. Com isso, consegue canalizar todo o fascínio de Dexter por vivissecção para algo que ele acredita ser "do bem": caçar os infratores da lei que estão acima da justiça e que acham brechas para praticar crimes.

De dia, Dexter surpreende a todos conseguindo rastrear cada passo de assassinos em série, seguindo suas pistas com meticulosidade assustadora. Isso porque sua mente assassina o guia através dos passos dos criminosos.

Após o dia de trabalho com o Departamento de Polícia de Miami, à noite, Dexter usa todo o conhecimento e instinto de serial killer para achar e matar os criminosos que ele caçou durante o dia. Isso faz com que ele viva um contraste diário entre o bem e o mal. Mas ele canaliza toda a sua vontade de matar para acabar com os outros assassinos em série.', 'dexter-poster.jpg', '2007');

INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('House of Cards', 'Remake de uma série da BBC dos anos 90, House of Cards tem como protagonista Frank Underwood (Kevin Spacey), um político que lidera a bancada majoritária da Câmara dos Representantes dos Estados Unidos.

Underwood fica decepcionado quando descobre que não ocupará o cargo de Secretário de Estado da nova gestão, posto que foi prometido anteriormente a ele, pelo agora recém-eleito presidente. Em vez de aceitar a derrota, Frank decide usar seu conhecimento sobre os bastidores da política para orquestrar sua vingança.', 'houseofcards-poster.jpg', '2013');

INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('The Walking Dead', 'The Walking Dead é baseada na série de quadrinhos homônima criada por Robert Kirkman. No seriado, descobriremos como é a vida na Terra após um apocalipse zumbi, em que a enorme maioria da população da terra foi infectada por um vírus misterioso que os transforma em mortos-vivos. Os poucos humanos que sobreviveram à epidemia agora devem se unir para encontrar um novo lar, longe dos zumbis. O grupo é liderado por Rick Grimes (Andrew Lincoln), um policial que acordou sozinho em um hospital cercado por mortos-vivos e agora procura sua esposa, Lori (Sarah Wayne Callies), e seu filho. Ele se junta a Shane (Jon Bernthal), seu ex-parceiro na polícia; Andrea (Lauren Holden), uma das duas irmãs que escapou da praga; Glenn (Steven Yeun), um varredor de ruas experiente; entre outros humanos igualmente assustados que lutam para escapar do vírus.', 'thewalkingdead-poster.jpg', '2010');

INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('The Office', 'Esta versão americana de "The Office" é uma comédia que gira em torno do cotidiano de um escritório. Esta sátira descreve a vida dos funcionários da fábrica de papel Dunder Miffin, situada em Scranton, na Pensilvânia. Entre os personagens está Michael Scout (Steve Carell), o gerente regional da empresa. Solteiro e fanfarrão, ele acredita ser o homem mais bonito do escritório, além de uma fonte de sabedoria e o melhor amigo de seus funcionários. Pam Beesly (Jenna Fischer) é a simpática recepcionista que o tolera. Alguns dos melhores momentos são as conversas que ela tem com o representante de vendas Jim Halpert (John Krasinski); com Dwight Schrute (Rainn Wilson), o arrogante assistente de Michael; e com o auxiliar Ryan Howard, que passa a Michael a visão oficial dos fatos.', 'theoffice-poster.jpg', '2006');

INSERT INTO `serie` (`Nome`, `Descricao`, `ImgPoster`, `Ano`) VALUES
	('Breaking Bad', 'O novo drama "Breaking Bad" narra a história de Walter White (Bryan Cranston), um humilde professor de química que vê sua vida se transformar quando descobre ser portador de um câncer terminal. Com um passado brilhante como pesquisador, Walter amarga agora uma terrível situação financeira trabalhando como professor em uma escola de ensino médio. Com seu modesto salário sustenta a esposa Skyler (Anna Gunn) e seu filho Walter Jr. (RJ Mitte), que sofre de paralisia cerebral. Walter fica desesperado ao perceber que sua família irá passar necessidades após sua morte e decide que fará qualquer coisa para que eles não sofram com a falta de dinheiro. Impulsionado pelo medo e por desejo de oferecer dignidade à Skyler e Jr. ele começa a usar suas habilidades em química a favor do crime, montando um laboratório de drogas para financiar seus anseios. Com uma trama intensa e emocionante a série mostra que nesse enredo não existem vilões nem mocinhos.', 'breakingbad-poster.jpg', '2008');