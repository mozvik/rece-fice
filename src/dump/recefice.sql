-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Okt 24. 18:47
-- Kiszolgáló verziója: 10.4.24-MariaDB
-- PHP verzió: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `recefice`
--
CREATE DATABASE IF NOT EXISTS `recefice` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `recefice`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'előételek'),
(2, 'levesek'),
(3, 'főételek'),
(4, 'köretek'),
(5, 'desszertek'),
(6, 'italok');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cost`
--

CREATE TABLE `cost` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `cost`
--

INSERT INTO `cost` (`id`, `name`) VALUES
(1, 'Olcsó'),
(2, 'Átlagos'),
(3, 'Drága');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `difficulty`
--

CREATE TABLE `difficulty` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `difficulty`
--

INSERT INTO `difficulty` (`id`, `name`) VALUES
(1, 'Egyszerű'),
(2, 'Átlagos'),
(3, 'Nehéz');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `direction`
--

CREATE TABLE `direction` (
  `id` int(11) NOT NULL,
  `direction` varchar(512) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `direction`
--

INSERT INTO `direction` (`id`, `direction`, `recipeId`) VALUES
(1, 'A rizst megmossuk, hozzáadjuk darált húst, az apróra vágott vöröshagymát és fokhagymát, a sót, borsot és a pirospaprikát, majd óvatos mozdulatokkal összegyúrjuk.', 1),
(2, 'A káposztát ízlés szerint kimossuk, majd a lefejtett levelekbe göngyöljük a tölteléket.', 1),
(3, 'A megmaradt káposztaleveleket feldaraboljuk, és a lábas aljára halmozzuk, a megmosott füstölt bordaszéllel együtt. Erre rakjuk a megtöltött káposztákat, majd felöntjük annyi vízzel, hogy ellepje. 2-3 nagyobb káposztalevéllel betakarjuk, és felfőzzük. Kb. 70-80 perc alatt fő meg (az idő a hústól is függ).', 1),
(4, 'Ha megfőtt a töltött káposzta, rántást készítünk hozzá. Ehhez kevés olajat hevítünk, a lisztet megpirítjuk benne, majd a tűzről levéve pirospaprikát teszünk bele, hogy szép színe legyen, és két evőkanál tejfölt is belekeverünk. A káposzta levéből annyit adunk hozzá, hogy kb. egyforma meleg legyen (hőkiegyenlítés), rászűrjük a káposztára, és összeforraljuk.', 1),
(5, 'Tejföllel és friss kenyérrel tálaljuk.', 1),
(6, 'A vöröshagymát pucoljuk meg, majd vágjuk fel apróra. A kaprot csipkedjük le a vastagabb szárrészről. A borsót fejtsük ki, vagy ha fagyasztottat használunk akkor szobahőmérsékleten engedjük fel.', 2),
(7, 'Ezután tegyük egy edénybe a hagymát, borsót, kaprot, szórjuk meg egy nagyobb csipet sóval, pár perc alatt főzzük puhára, majd szűrjük le.', 2),
(8, 'A leszűrt borsóhoz adjunk hozzá kb 2 evőkanál főzőlevet, majd botmixerrel pépesítsük.', 2),
(9, 'Tegyük egy szűrőbe és passzírozzuk át, hogy egy selymes borsópürét kapjunk, majd adjuk hozzá a vajat, ízlés szerint sózzuk, borsozzuk és keverjük simára.|Végül tegyük be a hűtőbe, hogy a borsópüré kellően lehűljön és az ízek jól összeérjenek.', 2),
(10, 'A fürjtojásokat tegyük egy szűrőbe, alaposan csepegtessük le, majd vágjuk félbe.', 2),
(11, 'Tálaláshoz piríthatunk vékonyra felszeletelt kiflikarikát, vagy éppen félbevágott zsemlét, melyet ízlés szerinti pogácsaszaggatóval ki is szúrhatunk, hogy kis falatkákat kapjunk. Én félbevágott teljes kiőrlésű zsemlét pirítottam meg a szendvicssütőben, majd szúrtam ki.|Tálaláskor a kis zsemlekarikákra kanalazzuk rá a zöldborsópürét, majd helyezzünk rá egy-egy félbevágott fürjtojást, és díszítsük kaporral.', 2),
(12, 'A felaprított vöröshagymát összekeverjük a cukorral, az ecettel és a vízzel. Jól összedolgozzuk, majd másfél órát pihentetjük.', 3),
(13, 'A tejfölt összekeverjük a majonézzel és a mustárral, ízlés szerint megsózzuk, megborsozzuk.', 3),
(14, 'A virslit a csomagoláson található utasítás szerint megfőzzük, hagyjuk kihűlni, majd felkarikázzuk. A virslisalátához ezután hozzáadjuk a hagymás és a tejfölös keveréket. Átkeverjük, és tálalás előtt néhány órát hűtjük.', 3),
(15, 'Egy nagyobb tálban simára keverjük az olvasztott vajat, a cukrot, a kakaóport és a langyos vizet. Hozzáadjuk a lisztet, a szódabikarbónát és a sót is. Végül a tejfölt tesszük bele, és szép simára kikeverjük.', 4),
(16, 'Egy lapos, sütőméretű tepsit kibélelünk sütőpapírral, és beleöntjük a tésztát. Egyenletesen elsimítjuk, majd betesszük sülni 170 fokra. Körülbelül 15-16 perc alatt sül készre, tűpróbával ellenőrizhetjük.', 4),
(17, 'Ha megsült, kivesszük a sütőből, és egy nagyobb deszka segítségével kiborítjuk a tepsiből. Lehúzzuk róla a sütőpapírt, majd hagyjuk teljesen kihűlni.', 4),
(18, 'A krémhez a gesztenyemasszát villával összetörjük. Ha natúr masszát használunk, ízesítsük ízlés szerint cukorral és rummal vagy rumaromával. A tejszínt jéghidegre hűtjük, majd felverjük. Először az egyharmadával fellazítjuk a gesztenyemasszát, majd óvatos mozdulatokkal a maradékot is hozzáforgatjuk. Ezután a krémet a kihűlt tortalapra simítjuk. Figyeljünk, hogy egyenletesen kenjük meg. Ha elkészültünk, hűtőben pihentessük a süteményt legalább két órán át.', 4),
(19, 'Ezután elővesszük a hűtőből, és a széleit egyenesre levágjuk. Végül a megkent tortalapot hosszában és széltében is kettévágjuk, majd óvatosan egymásra helyezzük a negyedeket.', 4),
(20, 'A csokoládéganache-hoz a tejszínt forrásig melegítjük, majd ráöntjük a feldarabolt csokoládéra, és addig kevergetjük, míg a csokoládé elolvad, és a keverék teljesen egynemű és krémes lesz. Hagyjuk visszahűlni, majd óvatosan a torta tetejére öntjük. Figyeljünk, hogy ne nagyon folyjon le az oldalára. Ha a ganache elkezd kötni, akkor egy kanál segítségével kissé mintázzuk meg.', 4),
(21, 'Tálalás előtt egy órára hűtsük be.', 4),
(22, 'Alaposan összekeverem a húst, a zsemlét, a tojást és a fasírt fűszersót (1 tasak fűszer elegendő 40-50 dkg húshoz).', 7),
(23, 'Apró, kb 3 cm-es golyócskákat formázok a masszából a tenyeremben, majd zsemlemorzsában megforgatom.', 7),
(24, 'Zsírban (elég ha félig ellepi) közepes lángon ropogósra sütöm.', 7),
(25, 'Ha te úgy szereted, hogy kicsit lágyabb a fasírt, nem annyira húsos, inkább menzás, akkor mehet bele nyugodtan 2 zsemle és 2 tojás is :)', 7),
(26, 'A csirkecombokat megmossuk, szárazra töröljük, bedörzsöljük sóval és borssal. A répát meghámozzuk, felkarikázzuk. 2 ek olajat felforrósítunk és megpirítjuk rajta a húst és a répát.', 8),
(27, 'A megmosott burgonyát héjában félpuhára főzzük. Meghámozzuk, cikkekre vágjuk és megpirítjuk 4 ek felforrósított olajon és megsózzuk.', 8),
(28, 'Az elősütött combokat, a répakarikákat és a burgonyacikkeket tűzálló tálba rendezzük. Rászórjuk a borsót, rácsipkedjük a megmosott rozmaring leveleit. Meglocsoljuk az alaplével, és 200 fokra előmelegített sütőben kb. 45 perc alatt aranyszínűre sütjük.', 8),
(29, 'Megpucoljuk a pontyot, kifilézzük, részeire szedjük, a keserű fogat eltávolítva belőle.', 9),
(30, 'A pontyfilét beirdaljuk, felcsíkozzuk és vékonyan megsózzuk.', 9),
(31, 'A hagymát megpucoljuk és felszeleteljük, a TV paprikát kicsumázzuk, a paradicsomot felnegyedeljük, a fokhagymát keresztben kettévágjuk.', 9),
(32, 'A halalapléhez félretett halat és az előkészített zöldségeket feltesszük főni 8L vízben és erős lángon 1 órát főzzük.', 9),
(33, 'Ügyelve arra, hogy amikor felforrt, a fűszerpaprikát a leves tetején lévő zsírra szórjuk, amely sűríteni fogja azt.', 9),
(34, 'Az egy óra elteltével a levest átpasszírozzuk, körülbelül 5L levesünk lett így.', 9),
(35, 'A levest visszatesszük a lángra és hozzáadjuk a leveskockákat és megsózzuk.', 9),
(36, 'A levest ekkor hagyhatjuk kihűlni és felhasználásig hűtőbe tehetjük.', 9),
(37, 'Befejezéskor egyszerűen a halat beletesszük, felforraljuk és lobogva 6 percig főzzük.', 9),
(38, 'Hegyes erőset és friss kenyeret kínáljunk hozzá.', 9),
(42, 'A tejet felforraljuk, majd lehúzzuk a tűzről. Belekeverjük a kávét, a narancs lereszelt héját, a barna cukrot, az őrölt fahéjat és a kardamomot.', 11),
(43, 'Összekeverjük, és állni hagyjuk 15 percig, majd leszűrjük. A keveréket 4 bögrébe töltjük, meghintjük egy kevés fahéjjal, és kandírozott narancshéjjal díszítjük. Forrón tálaljuk.', 11),
(44, 'Egy lábosban 2 kanál olajon aranybarnára pirítjuk a tarhonyát, majd kiszedjük és félretesszük. A maradék olajon megpirítjuk az apróra felkockázott szalonnát, majd hozzáadjuk a finomra vágott vöröshagymát, ha üvegesre pirult, rákanalazzuk a paradicsompürét, amit szintén lepirítunk, majd a zúzott fokhagymát is.', 12),
(45, 'Hozzáadjuk a pirospaprikát, majd felöntjük a vízzel. Sózzuk, borsozzuk, majd hozzáadjuk a megpirított tarhonyát, majd alacsony lángon 8 percig főzzük.', 12),
(46, 'A krumplit kb. 2×2 centis kockákra vágjuk, a kolbászt pedig vékony szeletekre, és a tarhonyás pörkölt alaphoz keverjük. Lefedjük, és kis lángon 25 percig főzzük. Savanyúsággal tálaljuk, anélkül nem az igazi!', 12),
(47, 'A mentás-áfonyás shake elkészítése előtt pár szem áfonyát és néhány mentalevelet félreteszünk a díszítéshez.', 13),
(48, 'Azután egy turmixgépben összezúzzuk a jeget és a mentát. Beletesszük a Norbi Update Vaníliás shake port és az áfonyát. Felöntjük a vízzel, és alaposan összeturmixoljuk.', 13),
(49, 'Poharakba töltjük, és tálalás előtt a félretett mentával és áfonyával díszítjük. ', 13),
(50, 'A teljes kiőrlésű lisztet és a sót összekeverjük, belemorzsoljuk a kockára vágott hideg vajat. ', 18),
(51, 'Ezután hozzáadjuk a tejfölt, a vizet, az édesítőszert, és belereszeljük egy fél citrom héját. Addig gyúrjuk a tésztát, amíg szépen összeáll, majd 10-15 percig hűtőben pihentetjük, hogy könnyebben lehessen dolgozni vele. ', 18),
(52, 'A málnát alaposan átmossuk, hozzáadunk kevés édesítőszert (ki is hagyható), a fahéjat és a keményítőt, és jól összekeverjük. ', 18),
(53, 'A tésztát egy lisztezett deszkán kör alakúra nyújtjuk, ha a széle repedezik, akkor kicsit összenyomkodjuk az ujjunkkal. A kinyújtott tészta közepére halmozzuk a málnás keveréket, de nem fedjük be teljesen a tésztát, 4-5 centit szabadon hagyunk a szélén. ', 18),
(54, ' Ráhajtogatjuk a tészta széleit a töltelékre, majd a peremét megkenjük felvert tojással. ', 18),
(55, '180 fokra előmelegített sütőben 20-25 perc alatt aranybarnára sütjük.', 18),
(56, 'A száraz alapanyagokat, tehát a liszteket, az útifű maghéjat, a burgonyapelyhet, a sütőport és a sót alaposan elkeverjük, majd összemorzsoljuk a kókuszzsírral. ', 19),
(57, 'A lisztek minőségétől, őrlési fokától függően 30-40 grammnyi vizet adunk hozzá, jól összedolgozzuk. Ne ijedjünk meg, ha száraznak tűnik a tészta, de ha biztosra akarunk menni, adhatunk hozzá még 1-2 evőkanálnyi vizet.', 19),
(58, 'A tésztát minimum 30 percre hűtőbe tesszük, közben elkészítjük a tölteléket.', 19),
(59, 'Az apróra vágott vöröshagymát kevés hevített kókuszzsíron üvegesre pirítjuk, rádobjuk a zúzott fokhagymát, összeforgatjuk. Jöhet rá a darált hús, fehéredésig sütjük, majd fűszerezzük.', 19),
(60, 'Megvárjuk, míg levet ereszt, majd kevés vízzel elkevert sűrített paradicsommal nyakon öntjük, édesítjük. Hozzáadjuk a reszelt cukkini, összeforraljuk, végül elzárjuk alatta a gázt. ', 19),
(61, 'A hűtőből kivett tésztát kiolajozott hőálló edénybe öntjük, nedves kézzel az edény aljára és falához nyomkodjuk. A tésztára öntjük a tölteléket, alaposan elterítjük, megszórjuk reszelt sajthelyettesítővel/sajttal.', 19),
(62, 'Előmelegített 180°C-os sütőben 40 percig sütjük. A sütőből kivéve hagyjuk kissé kihűlni, utána szépen szeletelhető lesz a pite.', 19),
(63, 'A gombaleveshez az olajat felforrósítjuk, az apróra vágott vöröshagymát elkezdjük párolni rajta, majd hozzáadjuk a megtisztított, felszeletelt gombát, a felkarikázott répát, fehérrépát és a kockára vágott zellert és együtt pároljuk. ', 20),
(64, 'Amikor a gomba összeesett, megszórjuk a pirospaprikával, sózzuk, borsozzuk és felöntjük vízzel.', 20),
(65, 'Lefedjük és addig főzzük (kb 25 perc), amíg a zöldségek puhulni kezdenek.', 20),
(66, 'Ameddig fő a leves, elkészítjük a nokedlit. A lisztet simára keverjük a vajjal, a tojással, a sóval és a vízzel. Keményebb állagúra készítjük a tésztát. ', 20),
(67, 'Amikor a zöldségek átpuhultak a nokedlit egy deszkáról késsel a levesbe szaggatjuk és kb 4 percig főzzük.', 20),
(68, 'A megmosott, kicsumázott paprikákat, valamint a megtisztított hagymát és édesköményt csíkokra metéljük. Az édeskömény zöldjét félretesszük a díszítéshez. A megtisztított fokhagymát finomra aprítjuk. A megmosott halszeleteket papírtörlővel leitatjuk, és megsózzuk, megborsozzuk.', 21),
(69, 'Mély serpenyőben vagy lábosban felhevítjük az olívaolajat. Közepes tűzön a halszeleteket az egyik felükön aranyszínűre pirítjuk, majd áttesszük egy tányérra.', 21),
(70, 'A visszamaradt zsiradékban az előkészített zöldségeket addig pároljuk, amíg a hagyma üveges lesz (kb. 5 perc). Felöntjük a borral és az ecettel, majd sűrűbbre forraljuk 3-5 perc alatt. Ezután beleszórjuk a cukrot, és kevergetve feloldjuk.', 21),
(71, 'A halszeleteket a pirított oldalukkal felfelé visszatesszük az edénybe. Hozzáadjuk a babérlevelet, és a levet teljesen elfőzzük. Ezután felöntjük 1/2 pohár vízzel, felforraljuk, majd fedő alatt, mérsékelt tűzön pároljuk 12-15 percig. Végül adagonként zöldségágyra tesszük, és megszórjuk a mazsolával, a fenyőmaggal, valamint az édeskömény zöldjével. Tetszés szerint petrezselyemmel díszítjük.', 21),
(72, 'Lábasban felmelegítjük az olajat. Figyeljünk rá, hogy ne hevítsük túl!', 29),
(73, 'Ráöntjük a rizst, és hagyjuk kicsit felforrósodni. A rizsszemek kicsit kifehéredhetnek, de ne piruljanak meg.', 29),
(74, 'Ekkor ráöntjük a vizet, fűszerezzük, és takarékon, fedő alatt, sűrűn kevergetve addig főzzük, amíg tejberizs állagú lesz.', 29),
(75, 'Levesszük a tűzről, és fedő alatt hagyjuk pihenni. Kb. 10 perc múlva egyszer ismét megkeverjük, visszatesszük a fedőt, és további 10 percet pihentetjük.', 29),
(76, 'Az elkészült rizst pörköltek, sült húsok, de akár pulykaragu mellé kínáljuk.', 29),
(77, 'A krumplit legyaluljuk, mintha picit vastagabb chipset készítenénk.', 30),
(78, 'A burgonya szeleteket leöntjük az olajjal, megszórjuk a fokhagymaporral, rozmaringgal, kakukkfűvel, sóval és borssal. Jól elkeverjük, hogy minden szeletre jusson.', 30),
(79, 'Két szelet bacont kiterítünk egy deszkára, egymásra ragjuk őket, majd a krumplikat is rájuk pakoljuk úgy, hogy minden szelet félig takarja a másikat. Végül feltekerjük. Akkor dolgoztunk jól, ha egy nyíló rózsához hasonló alakzatot kapunk.', 30),
(80, 'Összesen hat tekercset készítünk, amelyeket muffin formába rakunk, és 20 fokon, 50 percig sütjük őket. Tálaláskor reszelt parmezánnal szórjuk meg.', 30),
(81, 'A sütőt 170 C fokra előmelegítjük.', 31),
(82, 'A sajtot kicsomagoljuk és egy nagy tepsi közepére helyezzük.', 31),
(83, 'A fügéket félbe vágjuk és a dióval együtt a sajt körül elrendezzük.', 31),
(84, 'Félbe vágjuk a kakukkfű szálakat, és néhányat a sajtba nyomunk, majd a többit a fügékre szórjuk. Leöntünk mindent mézzel és balzsamecettel.', 31),
(85, 'Kb 15 percig sütjük – amikor a füge aranybarna, a sajt olvadni kezd, akkor kész van.', 31),
(86, 'Melegen tálaljuk – krutonnal, pirítóssal vagy crostinivel.', 31),
(87, 'A hagymát vágjuk apróra, a zöldségeket kockázzuk fel. ', 32),
(88, 'Melegítsük fel az olajat egy nagy lábasban. ', 32),
(89, 'Adjuk hozzá a sárgarépát, a hagymát, a zellerszárat és a fokhagymát. Időnknént megkeverve addig pirítsuk, amíg a hagyma üvegesre nem párolódik.', 32),
(90, 'Adjuk hozzá az édeskrumplit, a koktélparadicsomokat, a kakukkfüvet is morzsoljuk bele, jól keverjük el. Addig főzzük, amíg az édeskrumpli meg nem puhul. ', 32),
(91, 'Közben a bab háromnegyed részét tegyük a zöldségalaplé egynegyedével egy tálba, majd botmixerrel pürésítsük. ', 32),
(92, 'Keverjük hozzá a maradék zöldségalaplevet, és az egészet keverjük a zöldségekbe. Sózzuk, borsozzuk. A maradék babot is tegyük hozzá, szórjunk rá petrezselymet. ', 32),
(93, 'Tálalás előtt szórjunk rá reszelt parmezánt. ', 32),
(94, 'A tócsni elkészítéséhez a krumplit meghámozzuk, megmossuk, és egy kislyukú sajtreszelőn lereszeljük.', 33),
(95, 'Egy tálban összekeverjük a liszttel, a zúzott fokhagymával, a sóval és a borssal. Ha sok levet ereszt a krumpli, akkor tegyünk még hozzá lisztet.', 33),
(96, 'Egy serpenyőben egy kevés olajat hevítünk. A burgonyamasszából evőkanálnyi mennyiséget a forró olajban teszünk, és kissé ellapítjuk.', 33),
(97, 'Mindkét oldalát kb. 5-5 perc alatt szép aranybarnára sütjük. Tejföllel megkenve, sajttal megszórva is tálalhatjuk. ', 33),
(98, 'Az ananászt megpucoljuk, kockákra vágjuk, és a turmixba rakjuk a kókuszsziruppal, ananászlével, majd leturmixoljuk.', 34),
(99, 'Ezután mehet bele a többi hozzávaló is, és további 1 percig zúzzuk. 2 decis poharakba töltjük, friss ananásszal és koktélcseresznyével díszítjük.', 34),
(100, 'A krémhez a mascarponét kihabosítjuk, majd belekeverjük a porcukrot, az instant kávét, a kakaóport és a vaníliaaromát.', 35),
(101, 'A poharak szélére csokiöntetet locsolunk, majd a poharak aljába rakunk egy sor kávéba áztatott babapiskóta-darabot, erre jöhet a krém, majd így rétegezzük tovább.', 35),
(102, 'Mikor kész vagyunk, azonnal ehetjük, de jót tesz neki a hűtőben pár óra pihenés.', 35),
(103, 'A sonkatekercsek töltelékéhez lereszeljük a füstölt trappista sajtot. Tálba öntjük a mascarponét, hozzáforgatjuk a reszelt tormát, majd a reszelt sajtot is.', 36),
(104, 'Ízlés szerint sózzuk, borsozzuk, átkeverjük, majd beleforgatjuk a leöblített, apróra vágott snidlinget. A mascarponés töltelékkel megkenjük a sonkaszeleteket, majd felcsavarjuk mindet.', 36),
(105, 'Kínálhatunk mellé kaszinótojást, tojáskrémet, húsvéti kalácsot  és persze sok-sok friss zöldséget.', 36),
(106, 'Egy 500 ml-es borospohár ⅔-áig jeget rakunk.', 37),
(107, 'Ráöntjük az Aperolt, a Proseccót, a szódát, pár szelet narancsot is teszünk bele, és kész is a koktélunk.', 37),
(133, 'A főtt tojást lereszeljük vagy késes aprítóval felaprítjuk, hozzáadjuk a finomra vágott hagymát, a zúzott fokhagymát, a reszelt sajtot, a tojást, az aprított petrezselymet, majd ízlés szerint sózzuk és borsozzuk, és az egészet alaposan összedolgozzuk annyi zsemlemorzsával, hogy jól formázható masszát kapjunk, majd 1 órára a hűtőbe rakjuk.', 10),
(134, 'Nedves kézzel rudakat formálunk belőle, majd a felvert tojásba és zsemlemorzsába forgatjuk.', 10),
(135, 'A kroketteket forró, bő olajban süssük aranysárgára. ', 10),
(138, 'A darált húshoz hozzákeverjük a finomra aprított hagymákat. A többi hozzávalóval összedolgozzuk a húsmasszát és félretesszük, amíg a levest feltesszük.', 44),
(139, 'Felhevített zsiradékban az aprított zöldségeket a finomra aprított hagymákkal együtt néhány perc alatt megdinszteljük, sózzuk, borsozzuk. Meghintjük liszttel, őrölt paprikával, felengedjük kb. 2 liter vízzel.', 44),
(140, 'Megkeverjük, hogy a letapadt liszt feloldódjon és ne maradjon csomós. Lestyánnal, aprított zeller zöldjével, borssal, chilivel ízesítjük, beledobjuk a húsleveskockákat, a zöldpaprikát és a paradicsomot.', 44),
(141, 'Amint felforrt a leves, a húsmasszából vizes kézzel diónyi gombócokat formázunk, és beleengedjük a levesbe.', 44),
(142, 'Lassan főzzük kb. 20 percig, bőven meghintjük az aprított petrezselyemmel, és rövid pihentetés után tálalhatjuk.', 44),
(143, 'A sütőt előmelegítjük 180 fokra. Az egyik tálba beletesszük a lisztet, a sütőport, és a cukrot (vagy eritritet), egy csipet sót, majd jól összekeverjük.', 45),
(144, 'A másik tálba tesszük a nedves hozzávalókat, beleöntjük az olajat és a vizet, vagy gyümölcslevet.', 45),
(145, 'Összekeverjük a két keveréket (én robotgép 3-as fokozatával óvatosan kevertem). Nem szabad gyorsan keverni, hogy a sütőpor lazára fújja fel a tésztát.', 45),
(146, 'A muffinformákba beletesszük a papírokat (én ecsettel megolajoztam, majd kanállal beletettem a masszát a formákba).', 45),
(147, 'A tetejére tesszük a lisztben kicsit megforgatott gyümölcsöt és a csokit (nálam most felaprított sárgabarack, fekete áfonya, néhány kocka 75%-os kakaótartalmú csoki).', 45),
(148, 'Sütési idő kb 30 perc, de nem szabad a sütőt kinyitni legalább 20 percig, mert összeesnek a muffinok. ', 45),
(154, 'A finomra vágott fokhagymát az olajon megfuttatjuk.', 46),
(155, 'A gombák tönkjét kivágjuk, a gombafejeket megtisztítjuk (nem kell hámozni) és a fokhagymához hozzáadva, nagy lángon elkezdjük kevergetve pirítani.', 46),
(156, 'Mérsékeljük a lángot, mikor a gombák felvették az összes olajat. Megvárjuk, míg levet engednek, ekkor újra felerősítjük alatta a tüzet és szép aranybarnára pirítjuk.', 46),
(157, 'Sózzuk-borsozzuk. Citromlevet facsarunk rá. Meghintjük az apróra vágott petrezselyemmel. Összeforgatjuk.', 46),
(158, 'Azon melegében tálaljuk. Önmagában, friss bagettel a szaftot kitunkolva, vagy köretként.', 46),
(159, 'A húst felkockázzuk és minden zsiradékot eltávolítunk róla.', 47),
(160, 'A hagymát apróra vágjuk és evőkanálnyi zsíron megdinszteljük. Beletesszük a húskockákat és fehéredésig pirítjuk. Ráhintjük a fűszerpaprikát és felenegedjük annyi vízzel, hogy épp ellepje (kb. 2 dl). Hozzáadjuk a pirosaranyat, a sót, a paradicsomot, a paprikát és lefedve, kb. 2 óra alatt puhára főzzük a húst. Ha szükséges, a vizet időnként pótoljuk.', 47),
(161, 'A zöldségeket megtisztítjuk és felkarikázzuk, a zellert felkockázzuk.', 47),
(162, 'Egy fazékban, a maradék zsíron megdinszteljük a felaprított zöldségeket és 2 liter vízzel felengedjük. Egy teatojásba tesszük a borsot, a köménymagot és a babérlevelet. A teatojást a levesbe dobjuk. Vegetával és 1/2 tk sóval ízesítjük. Félpuhára főzzük.', 47),
(163, 'Az időközben megpuhult húst hozzáadjuk a leveshez, beletesszük a megpucolt, apróra kockázott burgonyát is. Addig főzzük, míg a burgonya megpuhul.', 47),
(164, 'Ezalatt elkészítjük a csipetkét: a tojásból, lisztből és sóból kemény tésztát gyúrunk és külön kis fazékban, forrásban lévő vízben kifőzzük az előzetesen elcsipkedett tésztát. Leszűrjük és a leveshez adjuk.', 47),
(165, 'Forrón tálaljuk.', 47),
(170, 'A grillezett zöldségek elkészítéséhez a lila hagymát és a gombát meghámozzuk, cikkekre vágjuk. A fokhagymát gerezdekre bontjuk.', 43),
(171, 'A többi zöldséget megmossuk. A cukkinit és a padlizsánt felkarikázzuk. A paprikákat kimagozzuk, a húsukat falatnyi darabokra vágjuk.', 43),
(172, 'Az előkészített alapanyagokat egy tálba tesszük, meglocsoljuk az olajjal, meghintjük az oregánóval. Pihentetjük kb. 1 órát.', 43),
(173, 'A zöldségeket sütőpapírral bélelt tepsibe tesszük, majd grillfokozaton kb. 30 percig sütjük. Közben néhányszor átforgatjuk az egészet. Sózzuk és borsozzuk, petrezselyemlevelekkel díszítve tálaljuk. ', 43);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `name` varchar(128) NOT NULL,
  `measurementId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `ingredient`
--

INSERT INTO `ingredient` (`id`, `quantity`, `name`, `measurementId`, `recipeId`) VALUES
(1, '10.00', 'rizs', 8, 1),
(2, '1.00', 'darált sertéscomb', 7, 1),
(3, '1.00', 'vöröshagyma', 1, 1),
(4, '3.00', 'fokhagyma', 20, 1),
(5, '1.00', 'só', 22, 1),
(6, '1.00', 'őrölt feketebors', 22, 1),
(7, '1.00', 'pirospaprika', 22, 1),
(8, '1.00', 'savanyú káposzta', 1, 1),
(9, '1.00', 'füstölt bordaszél', 1, 1),
(10, '1.00', 'olaj', 2, 1),
(11, '2.00', 'liszt', 13, 1),
(12, '2.00', 'tejföl', 13, 1),
(13, '30.00', 'zöldborsó (lehet fagyasztott is)', 8, 2),
(14, '1.00', 'kapor', 21, 2),
(15, '1.00', 'vöröshagyma', 1, 2),
(16, '1.00', 'só, bors', 22, 2),
(17, '2.00', 'vaj', 8, 2),
(18, '1.00', 'fokhagymás olajban pácolt fürjtojás', 16, 2),
(19, '1.00', 'vöröshagyma', 1, 3),
(20, '4.00', 'cukor vagy nádcukor', 13, 3),
(21, '1.00', 'ecet', 3, 3),
(22, '1.00', 'víz', 3, 3),
(23, '20.00', 'tejföl', 8, 3),
(24, '3.00', 'majonéz', 13, 3),
(25, '1.00', 'mustár', 13, 3),
(26, '1.00', 'só, bors', 22, 3),
(27, '20.00', 'virsli', 8, 3),
(28, '18.00', 'finomliszt', 8, 4),
(29, '6.00', 'rizsliszt', 8, 4),
(30, '1.00', 'szódabikarbóna', 12, 4),
(31, '1.00', 'só', 12, 4),
(32, '12.50', 'vaj', 8, 4),
(33, '20.00', 'kristálycukor', 8, 4),
(34, '3.50', 'natúr kakaópor', 8, 4),
(35, '2.50', 'langyos víz', 3, 4),
(36, '2.00', 'tojás', 1, 4),
(37, '10.00', 'zsíros tejföl', 8, 4),
(38, '50.00', 'édes gesztenyepüré', 8, 4),
(39, '1.50', 'zsíros tejszín', 3, 4),
(40, '10.00', '60 %-os csokoládé', 8, 4),
(41, '40.00', 'darálthús', 8, 7),
(42, '1.00', 'zsemle', 1, 7),
(43, '1.00', 'tojás', 1, 7),
(44, '1.00', 'fűszersó', 18, 7),
(45, '1.00', 'zsemlemotzsa', 18, 7),
(46, '1.00', 'zsír', 8, 7),
(47, '8.00', 'csirke felsőcomb', 1, 8),
(48, '2.00', 'sárgarépa', 1, 8),
(49, '2.00', 'olivaolaj', 13, 8),
(50, '50.00', 'burgonya', 8, 8),
(51, '15.00', 'zöldborsó', 8, 8),
(52, '1.00', 'só, bors', 17, 8),
(53, '2.00', 'ponty', 1, 9),
(54, '10.00', 'vöröshagyma', 1, 9),
(55, '2.00', 'fokhagyma', 1, 9),
(56, '4.00', 'paradicsom', 1, 9),
(57, '4.00', 'TV paprika', 1, 9),
(58, '1.00', 'hegyes erős', 1, 9),
(59, '5.00', 'csemege fűszerpaprika', 13, 9),
(60, '5.00', 'halászlé kocka', 1, 9),
(67, '2.00', 'tej', 15, 11),
(68, '1.50', 'kávé', 15, 11),
(69, '1.00', 'narancs', 1, 11),
(70, '1.00', 'őrölt fahéj', 12, 11),
(71, '4.00', 'barna cukor', 12, 11),
(72, '1.00', 'fahéj', 17, 11),
(73, '250.00', 'tarhonya', 9, 12),
(74, '70.00', 'füstölt szalonna', 9, 12),
(75, '3.00', 'étolaj', 13, 12),
(76, '1.00', 'vöröshagyma', 1, 12),
(77, '4.00', 'fokhagyma', 20, 12),
(78, '1.00', 'paradicsompüré', 12, 12),
(79, '2.00', 'pieospaprika', 12, 12),
(80, '400.00', 'burgonya', 9, 12),
(81, '150.00', 'kolbász', 9, 12),
(82, '1.00', 'vaníliapor', 18, 13),
(83, '1.00', 'friss menta', 1, 13),
(84, '20.00', 'áfonya', 8, 13),
(85, '1.20', 'víz', 2, 13),
(86, '200.00', 'Teljeskiőrlésű liszt', 9, 18),
(87, '100.00', 'Vaj', 9, 18),
(88, '1.00', 'Só', 22, 18),
(89, '1.00', 'Tejföl', 13, 18),
(90, '1.00', 'Citrom', 1, 18),
(91, '2.00', 'Eritrit', 13, 18),
(92, '300.00', 'Málna', 9, 18),
(93, '1.00', 'Fahéj', 12, 18),
(94, '1.00', 'Tápióka keményítő', 13, 18),
(95, '1.00', 'Tojás', 1, 18),
(96, '160.00', 'Kölesliszt', 9, 19),
(97, '60.00', 'barna rizsliszt', 9, 19),
(98, '25.00', 'zsírtalanított lenmagliszt', 9, 19),
(99, '25.00', 'burgonyapehely', 9, 19),
(100, '2.00', 'útifű maghéj', 12, 19),
(101, '0.50', 'sütőpor', 18, 19),
(102, '100.00', 'kókuszzsír', 9, 19),
(103, '30.00', 'víz', 9, 19),
(104, '400.00', 'zsírszegény darált sertéshús', 9, 19),
(105, '1.00', 'cukkini', 1, 19),
(106, '1.00', 'vöröshagyma', 1, 19),
(107, '2.00', 'zúzott fokhagyma', 20, 19),
(108, '1.00', 'pirospaprika', 12, 19),
(109, '70.00', 'sűrített paradicsom', 9, 19),
(110, '30.00', 'eritrit', 9, 19),
(111, '60.00', 'növényi sajthelyettesítő', 9, 19),
(112, '1.00', 'vöröshagyma', 1, 20),
(113, '50.00', 'csiperke gomba', 8, 20),
(114, '2.00', 'sárgarépa', 1, 20),
(115, '1.00', 'fehérrépa', 1, 20),
(116, '0.50', 'zeller', 1, 20),
(117, '3.00', 'liszt', 13, 20),
(118, '1.00', 'vaj', 13, 20),
(119, '1.00', 'tojás', 1, 20),
(120, '1.00', 'só, bors, pirospaprika', 22, 20),
(121, '3.00', 'kaliforniai paprika	', 1, 21),
(122, '1.00', 'lila hagyma', 1, 21),
(123, '1.00', 'édeskömény', 1, 21),
(124, '3.00', 'fokhagyma', 20, 21),
(125, '50.00', 'tengeri hal', 8, 21),
(126, '3.00', 'olívaolaj', 13, 21),
(127, '1.00', '	száraz fehérbor', 14, 21),
(128, '1.00', 'fehérborecet', 14, 21),
(129, '1.00', 'cukor', 13, 21),
(130, '1.00', 'babérlevél', 1, 21),
(131, '1.00', 'pirított fenyőmag', 1, 21),
(132, '1.00', 'rizs', 16, 29),
(133, '1.50', 'víz', 16, 29),
(134, '2.00', 'olaj', 13, 29),
(135, '1.00', 'babérlevél', 1, 29),
(136, '1.00', 'só, majoránna', 12, 29),
(137, '3.00', 'krumpli', 1, 30),
(138, '2.00', 'olívaolaj', 13, 30),
(139, '1.00', 'fokhagymapor', 12, 30),
(140, '1.00', 'kakukkfű', 12, 30),
(141, '1.00', 'rozmaring', 12, 30),
(142, '1.00', 'bors, só', 22, 30),
(143, '12.00', 'bacon szalonna', 1, 30),
(144, '1.00', 'parmezán', 1, 30),
(145, '6.00', 'füge', 1, 31),
(146, '1.00', 'camembert sajt', 1, 31),
(147, '3.00', 'méz', 13, 31),
(148, '3.00', 'balzsamecet', 13, 31),
(149, '6.00', 'dió', 1, 31),
(150, '1.00', 'kakukkfű', 21, 31),
(151, '2.00', 'sárgarépa1 ', 1, 32),
(152, '5.00', 'koktélparadicsom', 1, 32),
(153, '2.00', 'zellerszár', 1, 32),
(154, '30.00', 'fehérbab (cannellini)', 8, 32),
(155, '2.00', 'olívaolaj', 13, 32),
(156, '2.00', 'fokhagyma', 20, 32),
(157, '1.00', 'petrezselyem', 21, 32),
(158, '1.00', 'vöröshagyma', 1, 32),
(159, '1.50', 'zöldségalaplé', 2, 32),
(160, '5.00', 'parmezán (reszelt)', 8, 32),
(161, '1.00', 'ízlés szerint só,bors', 22, 32),
(162, '1.00', 'édeskrumpli1 ', 1, 32),
(163, '0.50', 'kakukkfű', 12, 32),
(164, '1.00', 'burgonya', 7, 33),
(165, '3.00', 'fokhagyma', 20, 33),
(166, '1.00', 'só, bors, olaj', 22, 33),
(167, '450.00', 'ananász', 9, 34),
(168, '2.00', 'kókusz szirup', 13, 34),
(169, '400.00', 'ananászlé', 5, 34),
(170, '3.00', 'zúzott jég', 15, 34),
(171, '200.00', 'tejszín', 5, 34),
(172, '500.00', 'mascarpone', 9, 35),
(173, '70.00', 'porcukor', 9, 35),
(174, '1.00', 'instant kávé', 13, 35),
(175, '8.00', 'kakópor', 9, 35),
(176, '1.00', 'vaníliaaroma', 11, 35),
(177, '25.00', 'csokiöntet', 5, 35),
(178, '15.00', 'babapiskóta', 1, 35),
(179, '200.00', 'kávé', 5, 35),
(180, '10.00', 'füstölt sajt', 8, 36),
(181, '3.00', 'reszelt torma', 13, 36),
(182, '25.00', 'mascarpone', 8, 36),
(183, '20.00', 'csirkemell sonka', 8, 36),
(184, '1.00', 'snidling', 21, 36),
(185, '1.00', 'só, bors', 22, 36),
(186, '1.00', 'jégkocka', 15, 37),
(187, '90.00', 'aperol', 5, 37),
(188, '120.00', 'prosecco', 5, 37),
(189, '60.00', 'szódavíz', 5, 37),
(190, '1.00', 'narancskarika', 1, 37),
(222, '8.00', 'tojás', 1, 10),
(223, '1.00', 'újhagyma', 1, 10),
(224, '10.00', 'reszelt sajt', 8, 10),
(225, '1.00', 'só, bors', 17, 10),
(226, '1.00', 'fokhagyma', 20, 10),
(227, '1.00', 'petrezselyem', 21, 10),
(230, '50.00', 'darált hús', 8, 44),
(231, '1.00', 'vöröshagyma', 1, 44),
(232, '4.00', 'fokhagyma', 20, 44),
(233, '5.00', 'zsemlemorzsa', 8, 44),
(234, '1.00', 'tojás', 1, 44),
(235, '1.00', 'étolaj', 3, 44),
(236, '50.00', 'leveszöldség', 8, 44),
(237, '2.00', 'liszt', 13, 44),
(238, '2.00', 'húsleveskocka', 1, 44),
(239, '1.00', 'zöldpaprika', 1, 44),
(240, '1.00', 'paradicsom', 1, 44),
(241, '1.00', 'só, bors, pirospaprika', 1, 44),
(242, '2.00', 'liszt', 15, 45),
(243, '1.00', 'sütőpor', 18, 45),
(244, '1.00', 'cukor', 15, 45),
(245, '1.00', 'vaníliás cukor', 18, 45),
(246, '0.25', 'étolaj', 15, 45),
(247, '1.00', 'só', 22, 45),
(248, '1.00', 'víz', 15, 45),
(249, '1.00', 'erdei gyümölcs és csokoládé', 15, 45),
(255, '250.00', 'csiperkegomba', 9, 46),
(256, '2.00', 'fokhagyma', 20, 46),
(257, '3.00', 'olívaolaj', 13, 46),
(258, '0.50', 'petrezselyem', 21, 46),
(259, '1.00', 'só, fekete bors', 22, 46),
(260, '60.00', 'marhalábszár', 8, 47),
(261, '2.00', 'sárgarépa', 1, 47),
(262, '2.00', 'fehérrépa', 1, 47),
(263, '1.00', 'zeller', 1, 47),
(264, '30.00', 'burgonya', 8, 47),
(265, '1.00', 'vöröshagyma', 1, 47),
(266, '2.00', 'fűszerpaprika', 12, 47),
(267, '15.00', 'bors', 1, 47),
(268, '1.50', 'só', 12, 47),
(269, '1.00', 'paprikakrém', 12, 47),
(270, '1.00', 'hegyes erős paprika', 1, 47),
(271, '1.00', 'paradicsom', 1, 47),
(272, '3.00', 'étolaj', 13, 47),
(273, '2.00', 'víz', 2, 47),
(283, '1.00', 'lilahagyma', 1, 43),
(284, '2.00', 'gomba', 1, 43),
(285, '2.00', 'cukkini', 1, 43),
(286, '1.00', 'padlizsán', 1, 43),
(287, '2.00', 'kaliforniai paprika', 1, 43),
(288, '1.00', 'só, bors, petrezselyem', 1, 43),
(289, '4.00', 'olívaolaj', 13, 43),
(290, '2.00', 'fokhagyma', 20, 43),
(291, '1.00', 'oregánó', 22, 43);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `label`
--

INSERT INTO `label` (`id`, `name`) VALUES
(3, 'Cukormentes '),
(4, 'Diétás'),
(5, 'Gluténmentes'),
(6, 'Laktózmentes'),
(7, 'Tejmentes'),
(8, 'Tojásmentes'),
(9, 'Vegetáriánus'),
(10, 'Vegán'),
(11, 'Házias'),
(12, 'Egészséges'),
(13, 'Hétköznapi'),
(14, 'Húsvéti'),
(15, 'Karácsonyi'),
(16, 'Szilveszteri'),
(17, 'Születésnapi'),
(18, 'Valentin'),
(19, 'Szárnyasétel'),
(20, 'Sertés'),
(21, 'Marha'),
(22, 'Halétel'),
(23, 'Borjú'),
(24, 'Vadétel'),
(25, 'Téli'),
(26, 'Tavaszi'),
(27, 'Nyári'),
(28, 'Őszi'),
(29, 'Saláta');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `measurement`
--

CREATE TABLE `measurement` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `shortName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `measurement`
--

INSERT INTO `measurement` (`id`, `name`, `shortName`) VALUES
(1, 'darab', 'db'),
(2, 'liter', 'l'),
(3, 'deciliter', 'dl'),
(4, 'centiliter', 'cl'),
(5, 'milliliter', 'ml'),
(6, 'csepp', 'csepp'),
(7, 'kilogramm', 'kg'),
(8, 'dekagramm', 'dkg'),
(9, 'gramm', 'gr'),
(10, 'mokkáskanál', 'mk'),
(11, 'kávéskanál', 'kk'),
(12, 'teáskanál', 'tk'),
(13, 'evőkanál', 'ek'),
(14, 'pohár', 'pohár'),
(15, 'csésze', 'csésze'),
(16, 'bögre', 'bögre'),
(17, 'ujjnyi', 'u'),
(18, 'csomag', 'csom'),
(19, 'tábla', 'tábla'),
(20, 'gerezd', 'gerezd'),
(21, 'csokor', 'csk'),
(22, 'csipet', 'csipet');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nationality`
--

CREATE TABLE `nationality` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `nationality`
--

INSERT INTO `nationality` (`id`, `name`) VALUES
(1, 'Afrikai'),
(2, 'Amerikai'),
(5, 'Angol'),
(6, 'Francia'),
(7, 'Görög'),
(8, 'Indiai'),
(9, 'Japán'),
(10, 'Kínai'),
(11, 'Magyar'),
(12, 'Mexikói'),
(13, 'Olasz'),
(14, 'Orosz'),
(15, 'Osztrák'),
(16, 'Spanyol'),
(17, 'Szerb'),
(18, 'Szlovák'),
(19, 'Török'),
(20, 'Egyéb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe`
--

CREATE TABLE `recipe` (
  `recipeId` int(11) NOT NULL,
  `recipeName` varchar(256) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `cookingTime` int(11) NOT NULL,
  `difficultyId` int(11) NOT NULL,
  `costId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `nationalityId` int(11) NOT NULL,
  `image1` varchar(256) NOT NULL,
  `image2` varchar(256) DEFAULT NULL,
  `image3` varchar(256) DEFAULT NULL,
  `calorie` int(11) DEFAULT NULL,
  `protein` float DEFAULT NULL,
  `carbonhydrate` float DEFAULT NULL,
  `fat` float DEFAULT NULL,
  `sugar` float DEFAULT NULL,
  `servings` int(11) NOT NULL,
  `moderated` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `recipe`
--

INSERT INTO `recipe` (`recipeId`, `recipeName`, `created`, `updated`, `userId`, `cookingTime`, `difficultyId`, `costId`, `categoryId`, `nationalityId`, `image1`, `image2`, `image3`, `calorie`, `protein`, `carbonhydrate`, `fat`, `sugar`, `servings`, `moderated`) VALUES
(1, 'Töltött káposzta', '2021-12-22 20:28:16', '2022-04-25 10:15:34', 3, 120, 3, 2, 3, 11, 'assets/uploads/2022-03-21-08-48-06pm_6238d676debc0tokap2.jpg', 'assets/uploads/2022-03-21-08-55-57pm_6238d84d6590atokap1.jpg', '', NULL, NULL, NULL, NULL, NULL, 4, 0),
(2, 'Kapros zöldborsópüré fürjtojással', '2021-12-22 20:58:04', '2022-03-22 07:36:04', 5, 50, 1, 2, 1, 1, 'assets/uploads/2022-03-21-09-26-24pm_6238df7064140kap.jpg', '', '', NULL, NULL, NULL, NULL, NULL, 4, 0),
(3, 'Virslisaláta', '2021-12-23 18:18:58', '2022-03-22 08:20:51', 2, 25, 1, 1, 1, 11, 'assets/uploads/2022-03-21-09-42-38pm_6238e33e1f385majo.jpg', '', '', NULL, NULL, NULL, NULL, NULL, 4, 0),
(4, 'Gesztenyetorta', '2021-12-28 20:13:28', '2022-03-21 09:58:58', 4, 60, 2, 2, 5, 11, 'assets/uploads/2022-03-21-09-56-47pm_6238e68f387fcgtorta.jpg', '', '', 192, NULL, 14, 22, NULL, 8, 0),
(7, 'Fasírtgolyó', '2022-03-21 07:19:22', '2022-03-22 02:32:48', 7, 30, 1, 2, 3, 11, 'assets/uploads/2022-03-15-06-14-59pm_6230c99398ef1Fasirtgolyok.jpg', '', '', NULL, 0, 0, 0, 1, 4, 0),
(8, 'Zöldséges sült csirke', '2022-03-15 08:00:42', NULL, 6, 75, 2, 2, 3, 11, 'assets/uploads/2022-03-15-08-00-42pm_6230e25a7fdc3zoldseges-sult-csirke.jpg', NULL, NULL, 0, 0, 0, 0, 0, 4, 0),
(9, 'Szegedi halászlé, szálkamentes ponttyal', '2022-03-15 08:10:48', NULL, 6, 120, 3, 3, 2, 11, 'assets/uploads/2022-03-15-08-10-48pm_6230e4b8cd03bhalaszle-szegedi.jpg', NULL, NULL, 0, 0, 0, 0, 0, 11, 0),
(10, 'Tojásos krokett', '2022-03-15 08:27:02', '2022-06-05 06:56:49', 3, 40, 1, 2, 4, 11, 'assets/uploads/2022-03-15-08-27-02pm_6230e8865c36aIMG_5766.jpg', '', '', 0, 0, 0, 0, 0, 4, 0),
(11, 'Narancsos latte', '2022-03-15 08:36:07', NULL, 5, 15, 1, 2, 6, 13, 'assets/uploads/2022-03-15-08-36-07pm_6230eaa781864latte.jpg', '', '', 0, 0, 0, 0, 0, 4, 0),
(12, 'Pásztortarhonya', '2022-03-15 08:57:55', NULL, 2, 60, 2, 2, 3, 11, 'assets/uploads/2022-03-15-08-57-55pm_6230efc364c01pasztortarhonya3.jpg', 'assets/uploads/2022-03-15-08-57-55pm_6230efc364ea1pasztortarhonya2.jpg', 'assets/uploads/2022-03-15-08-57-55pm_6230efc36521bpasztortarhonya1.jpg', 0, 0, 0, 0, 0, 4, 0),
(13, 'Mentás-áfonyás shake', '2022-03-17 10:01:38', NULL, 5, 5, 1, 2, 6, 2, 'assets/uploads/2022-03-17-10-01-37pm_6233a1b1f39c2afonya.jpg', '', '', 0, 0, 0, 0, 0, 4, 0),
(18, 'Málnás galette', '2022-04-16 08:31:09', NULL, 5, 70, 2, 3, 5, 6, 'assets/uploads/2022-04-16-08-31-09pm_625b0b6d66cf3MALNAS-GALETTE-min.jpg', '', '', 264, 4, 28, 15, 0, 6, 0),
(19, 'Húsos quiche', '2022-04-16 08:44:49', NULL, 4, 90, 1, 2, 3, 6, 'assets/uploads/2022-04-16-08-44-49pm_625b0ea147b1equiche-min.jpg', '', '', 360, 15, 27, 21, 0, 4, 0),
(20, 'Gombaleves óriásnokedlivel', '2022-04-25 05:30:54', NULL, 7, 45, 1, 2, 2, 11, 'assets/uploads/2022-04-25-05-30-54pm_6266beae037dagombaleves-nokedli.jpg', '', '', 0, 0, 0, 0, 0, 4, 0),
(21, 'Pikáns párolt hal', '2022-04-25 09:19:39', NULL, 7, 60, 3, 2, 3, 20, 'assets/uploads/2022-04-25-09-19-39pm_6266f44b6e80fpikans-parolt-hal.jpg', '', '', 0, 0, 0, 0, 0, 4, 0),
(29, 'Párolt rizs', '2022-05-01 03:19:26', NULL, 6, 30, 1, 1, 4, 11, 'assets/uploads/2022-05-01-03-19-26pm_626e88de2f935prizs1-min.jpg', 'assets/uploads/2022-05-01-03-19-26pm_626e88de2febdprizs2-min.jpg', '', 0, 0, 0, 0, 0, 4, 0),
(30, 'Krumplirózsa baconnel', '2022-05-01 03:34:45', NULL, 3, 60, 1, 2, 1, 20, 'assets/uploads/2022-05-01-03-34-45pm_626e8c758e399krozsa1-min.jpg', 'assets/uploads/2022-05-01-03-34-45pm_626e8c758edb7krozsa2-min.jpg', 'assets/uploads/2022-05-01-03-34-45pm_626e8c758f339krozsa3-min.jpg', 0, 0, 0, 0, 0, 2, 0),
(31, 'Sült camembert fügével', '2022-05-01 03:49:01', NULL, 4, 30, 2, 2, 1, 6, 'assets/uploads/2022-05-01-03-49-01pm_626e8fcdec7c0fuge1-min.jpg', 'assets/uploads/2022-05-01-03-49-01pm_626e8fcdecb22fuge2-min.jpg', '', 0, 0, 0, 0, 0, 2, 0),
(32, 'Téli minestrone', '2022-05-23 07:23:02', NULL, 2, 50, 2, 3, 2, 13, 'assets/uploads/2022-05-23-07-23-02pm_628bc2f6ddc6cminestrone1-min.jpg', 'assets/uploads/2022-05-23-07-23-02pm_628bc2f6de373minestrone2-min.jpg', 'assets/uploads/2022-05-23-07-23-02pm_628bc2f6de61aminestrone3-min.jpg', 0, 0, 0, 0, 0, 4, 0),
(33, 'Tócsni (lapcsánka)', '2022-05-23 08:01:02', NULL, 2, 30, 1, 1, 4, 11, 'assets/uploads/2022-05-23-08-01-02pm_628bcbde11708tocsni1-min.jpg', 'assets/uploads/2022-05-23-08-01-02pm_628bcbde11b7etocsni2-min.jpg', 'assets/uploads/2022-05-23-08-01-02pm_628bcbde12354tocsni3-min.jpg', 0, 0, 0, 0, 0, 4, 0),
(34, 'Piña Colada (alkoholmentes)', '2022-05-23 08:17:40', NULL, 2, 15, 1, 3, 6, 2, 'assets/uploads/2022-05-23-08-17-40pm_628bcfc4a7a85pina1-min.jpg', 'assets/uploads/2022-05-23-08-17-40pm_628bcfc4a7e50pina2-min.jpg', 'assets/uploads/2022-05-23-08-17-40pm_628bcfc4a82bfpina3-min.jpg', 0, 0, 0, 0, 0, 4, 0),
(35, 'Kávés pohárkrém', '2022-05-23 08:40:48', NULL, 5, 25, 1, 2, 5, 13, 'assets/uploads/2022-05-23-08-40-48pm_628bd5304ffd9kvpo1-min.jpg', 'assets/uploads/2022-05-23-08-40-48pm_628bd530503f0kvpo2-min.jpg', '', 0, 0, 0, 0, 0, 4, 0),
(36, 'Sajtos-tormakrémes sonkatekercs', '2022-05-24 09:57:45', NULL, 7, 15, 1, 2, 1, 11, 'assets/uploads/2022-05-24-09-57-45am_628c8ff9e538dstek2-min.jpg', 'assets/uploads/2022-05-24-09-57-45am_628c8ff9e5a63stek4-min.jpg', 'assets/uploads/2022-05-24-09-57-45am_628c8ff9e6093stek3-min.jpg', 0, 0, 0, 0, 0, 10, 0),
(37, 'Aperol spritz', '2022-05-24 11:09:29', NULL, 7, 5, 1, 3, 6, 13, 'assets/uploads/2022-05-24-11-09-29am_628ca0c9c8458aperol1-min.jpg', 'assets/uploads/2022-05-24-11-09-29am_628ca0c9c8a7caperol2-min.jpg', 'assets/uploads/2022-05-24-11-09-29am_628ca0c9cab93aperol3-min.jpg', 0, 0, 0, 0, 0, 1, 0),
(43, 'Grillezett zöldségek', '2022-06-05 06:49:22', '2022-10-16 08:15:50', 3, 30, 1, 2, 4, 20, 'assets/uploads/2022-06-05-06-49-22pm_629cde925650bgrillveg2-min.jpg', 'assets/uploads/2022-06-05-06-49-22pm_629cde9257ecfgrillveg1-min.jpg', 'assets/uploads/2022-06-05-06-49-22pm_629cde92582aagrillveg3-min.jpg', 0, 0, 0, 0, 0, 4, 0),
(44, 'Zöldséges húsgombóc leves', '2022-07-04 06:18:08', '2022-08-06 04:11:52', 4, 75, 1, 2, 2, 11, 'assets/uploads/2022-07-05-03-28-37pm_62c43c85c7cc0husgomb1-min.jpg', 'assets/uploads/2022-07-05-03-28-37pm_62c43c85c7fdehusgomb2-min.jpg', 'assets/uploads/2022-07-05-03-28-37pm_62c43c85c84aahusgomb3-min.jpg', 0, 0, 0, 0, 0, 4, 0),
(45, 'Erdei gyümölcsös muffin', '2022-08-06 04:21:29', NULL, 6, 45, 1, 2, 5, 2, 'assets/uploads/2022-08-06-04-21-29pm_62ee78e96f913muffin2-min.jpg', 'assets/uploads/2022-08-06-04-21-29pm_62ee78e9700eemuffin3-min.jpg', 'assets/uploads/2022-08-06-04-21-29pm_62ee78e9707eemuffin1-min.jpg', 0, 0, 0, 0, 0, 6, 0),
(46, 'Fokhagymás pirított gomba', '2022-08-14 08:58:17', '2022-08-14 08:59:46', 7, 25, 1, 2, 4, 16, 'assets/uploads/2022-08-14-08-58-17pm_62f945c973528fokgomba0-min.jpg', 'assets/uploads/2022-08-14-08-58-17pm_62f945c973ee6fokgomba1-min.jpg', '', 143, 0, 0, 0, 0, 1, 0),
(47, 'Gulyásleves', '2022-08-21 09:14:22', NULL, 3, 180, 3, 2, 2, 11, 'assets/uploads/2022-08-21-09-14-22am_6301db4e0b299gulyas2-min.jpg', 'assets/uploads/2022-08-21-09-14-22am_6301db4e0b74egulyas1-min.jpg', 'assets/uploads/2022-08-21-09-14-22am_6301db4e0bdefgulyas3-min.jpg', 413, 38, 34, 13, 0, 4, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe_labels`
--

CREATE TABLE `recipe_labels` (
  `recipeId` int(11) NOT NULL,
  `labelId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `recipe_labels`
--

INSERT INTO `recipe_labels` (`recipeId`, `labelId`) VALUES
(8, 11),
(8, 13),
(8, 19),
(9, 11),
(9, 22),
(11, 8),
(11, 13),
(12, 7),
(12, 8),
(12, 11),
(12, 13),
(12, 20),
(13, 7),
(13, 8),
(13, 9),
(13, 10),
(13, 12),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(3, 13),
(3, 29),
(7, 11),
(7, 13),
(7, 20),
(2, 11),
(18, 3),
(18, 4),
(18, 12),
(19, 3),
(19, 4),
(19, 5),
(19, 6),
(19, 7),
(19, 8),
(20, 9),
(20, 11),
(20, 13),
(21, 4),
(21, 11),
(21, 22),
(1, 11),
(1, 15),
(29, 3),
(29, 5),
(29, 6),
(29, 7),
(29, 8),
(29, 9),
(29, 10),
(29, 11),
(29, 13),
(30, 3),
(30, 8),
(30, 13),
(30, 20),
(31, 5),
(31, 9),
(31, 15),
(31, 16),
(31, 25),
(31, 28),
(32, 3),
(32, 8),
(32, 12),
(32, 25),
(33, 3),
(33, 6),
(33, 7),
(33, 8),
(33, 9),
(33, 10),
(33, 11),
(33, 13),
(34, 8),
(34, 16),
(34, 27),
(35, 8),
(35, 15),
(35, 17),
(35, 18),
(36, 11),
(36, 14),
(36, 19),
(36, 26),
(37, 5),
(37, 6),
(37, 7),
(37, 8),
(37, 13),
(37, 14),
(37, 15),
(37, 16),
(37, 17),
(37, 18),
(37, 25),
(37, 26),
(37, 27),
(37, 28),
(10, 9),
(10, 11),
(10, 13),
(44, 11),
(44, 13),
(44, 20),
(44, 21),
(44, 26),
(44, 28),
(45, 7),
(45, 8),
(45, 11),
(45, 17),
(45, 18),
(46, 3),
(46, 5),
(46, 6),
(46, 7),
(46, 8),
(46, 9),
(46, 10),
(46, 11),
(46, 25),
(46, 26),
(46, 27),
(46, 28),
(47, 3),
(47, 6),
(47, 7),
(47, 11),
(47, 21),
(47, 26),
(47, 27),
(47, 28),
(43, 3),
(43, 4),
(43, 5),
(43, 6),
(43, 7),
(43, 8),
(43, 9),
(43, 10),
(43, 12),
(43, 13),
(43, 26),
(43, 27);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `comment` varchar(2048) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `moderated` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `review`
--

INSERT INTO `review` (`id`, `recipeId`, `userId`, `created`, `comment`, `rating`, `moderated`) VALUES
(1, 19, 2, '2022-04-27 05:30:26', 'Isteni ez a recept, köszönet érte!', 5, 0),
(2, 19, 3, '2022-04-27 05:36:05', 'Már mindenütt kerestem quiche receptet! Végre megtalálatam!', 5, 0),
(3, 19, 1, '2022-04-27 07:41:11', 'Nem rossz...', 4, 0),
(4, 1, 5, '2022-04-28 09:51:01', 'Ez lesz a holnapi ebéd:))!', 5, 0),
(5, 1, 6, '2022-04-28 09:53:09', 'Ezt át kellene keresztelni Spar töltött káposztára. Csak mert nem klasszikus. Egy kolozsvári meg nem így készíti.', 3, 0),
(6, 1, 7, '2022-04-28 09:57:11', 'A recept jó, de a töltött káposztába gersli való, nem rizs.', 4, 0),
(7, 9, 2, '2022-04-28 10:03:16', 'Minek bele halászlé kocka? Ez szégyen!!', 3, 0),
(8, 9, 4, '2022-04-28 10:04:32', 'Hasonlóképpen készítem én is a halászlevet, de a pirospaprika felét a főzés elején beleteszem, a másik felét pedig a halszeletekkel együtt . A halászlé kockát szerintem messzire el kell kerülni.', 4, 0),
(9, 9, 5, '2022-04-28 10:09:08', 'Szerintem ez így egy tökéletes recept! Én is így szoktam csinálni, és nagyon finom! Nem kell vitatkozni a kockán.', 5, 0),
(10, 9, 7, '2022-04-28 10:09:40', 'Alap receptnek jó, de hiba van az arányokkal.', 3, 0),
(11, 12, 7, '2022-04-28 10:11:58', 'Finom lett, köszi a receptet!', 4, 0),
(12, 12, 3, '2022-04-28 10:12:53', 'Ma megcsináltam ebédre.Isteni finom volt!', 5, 0),
(13, 12, 5, '2022-04-28 10:13:55', 'Bográcsban főztem. Nagyon finom lett!:-)', 5, 0),
(14, 18, 3, '2022-05-22 05:21:38', 'Hű de guszta!', 4, 0),
(16, 31, 3, '2022-05-22 05:41:23', 'Számomra túl édes volt. ', 4, 0),
(17, 29, 3, '2022-05-22 05:43:59', 'Valóban könnyű és egyszerű. De nincs benne semmi különleges:(', 3, 0),
(18, 7, 3, '2022-05-22 05:49:13', 'Finom lett. Köszönöm a receptet. Üdv: Eszti', 4, 0),
(19, 13, 3, '2022-05-22 06:21:55', 'Nagyon finom lett a shake. Köszönjük a receptet.', 4, 0),
(20, 35, 6, '2022-08-06 04:26:45', 'Tényleg nagyon finom és gyorsan, könnyen elkészíthető. Kávékedvelőknek ki kell próbálni!!! :)', 5, 0),
(21, 34, 6, '2022-08-06 04:39:38', 'Finom, tejszínes ízvilág!', 5, 0),
(22, 44, 6, '2022-08-13 12:26:10', 'Finom, de azért annyira nem egyszerű.', 4, 0),
(23, 30, 7, '2022-08-14 08:22:44', 'Fantáziadús és nem utolsósorban eszméletlenül finom:) Köszi a receptet!', 5, 0),
(24, 46, 6, '2022-08-14 09:04:43', 'Hát nekem nem nagyon jött be ez a foghagymás ízesítés, de lehet, hogy sokáig pirítottam. Férjemnek nagyon tetszett.  Én főételnek készítettem, és köretnek mellé sütöttem zöldségeket tejszínben. Azért még kipróbálom még egyszer. ', 4, 0),
(25, 46, 5, '2022-08-14 09:24:07', 'Gombát amúgy is mindenhogyan, de így fokhagymával, petrezselyemmel, egyszerűen isteni volt! Köszi a receptet :)', 5, 0),
(26, 46, 4, '2022-08-14 09:28:56', 'A köretekkel mindig bajban vagyok, mióta számolni kell a férjemnek a szénhidrátot, lassan tudom csak szélesíteni a repertoárt, hogy finom is legyen, változatos is, dekoratív is... ez mindegyiknek megfelel, köszönöm a receptet!!!', 5, 0),
(27, 46, 3, '2022-08-14 09:30:14', 'Fantasztikusan finom, csupa gomba-íz! Köszönöm a receptet, gyakran meg fogom csinálni!', 5, 0),
(28, 35, 3, '2022-08-14 09:34:39', 'Ízlések és pofonok.', 4, 0),
(29, 47, 4, '2022-08-21 09:19:26', 'Ma is ez volt az ebéd, nem vagyok gulyás leves fan, de isteni lett! Köszönöm a receptet :)', 5, 0),
(30, 47, 6, '2022-08-21 09:22:54', 'Nagyon jó ez a recept, csak nekem az a fura, hogy külön főzöd a húst, külön a zöldségeket és a csipetkét, majd a végén összerottyantod. Én ilyet még nem is láttam. Adj nekik egy esélyt, és főzd össze az egészet! Biztos így is nagyon finom, de az ízek úgy érvényesülnek igazán!', 4, 0),
(31, 47, 5, '2022-08-21 09:24:20', 'Ez a recept így tökéletes, ahogy van. Aki nem így csinálja, készítse el ahogy szokta, de egyáltalán nem biztos, hogy finomabb lesz .Külön főzni a húst azért remek megoldás, mert nem mindegy hogy zöldséges lében főzzük a húst, vagy a szaftos pörköltet dúsítjuk zöldséges levessel.', 5, 0),
(32, 47, 7, '2022-08-21 09:26:28', '10 éve nem ettem ilyen finom gulyáslevest. Nagyon jó ez a recept. Millió köszönet!', 5, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `session`
--

CREATE TABLE `session` (
  `sid` varchar(512) NOT NULL,
  `stoken` varchar(512) NOT NULL,
  `stime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `session`
--

INSERT INTO `session` (`sid`, `stoken`, `stime`) VALUES
('vnpqqtiimq5p9khg7jm4lk1o05', '32872d477a6b865ae577ed456fc37baa', 1666434204);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subscriber`
--

CREATE TABLE `subscriber` (
  `id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `date` datetime NOT NULL,
  `unsubscribeHash` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `subscriber`
--

INSERT INTO `subscriber` (`id`, `email`, `name`, `date`, `unsubscribeHash`) VALUES
(1, '221we@hz.jz', NULL, '2022-04-18 16:30:43', 'eb3124a120a649387962c553e6fb3c058fa4fc17b35c93529e637dd7f813705c'),
(2, 'dodi@dodi.hu', NULL, '2022-05-01 10:42:41', 'ceadebd851a1b82bf44ba5211e18375b658c9b2f3de3ddc63203df35bd50fef9'),
(3, 'add@fttg.hu', NULL, '2022-05-02 16:16:57', 'af40062174509f389d258ca9afb23e74321c60da36bb494ddd3bff187d2371a8'),
(4, '2123w@gz.hu', NULL, '2022-05-02 16:18:42', 'e34f102a38689cbd5e6db21b5f40bdb779578d7c1c8bf05adea285b028f1ddf8'),
(5, '33343w@gz.hu', NULL, '2022-05-02 16:19:32', '4181a2ae7d96f1de794dea36f3419b236bbce9da9c110e2ce509421214480d07'),
(6, '2321@gzz.hu', NULL, '2022-05-02 16:21:40', '240a911ad18fcd2dc29611ca9c7c32ce46256e64766281228b255db207adb783'),
(7, '445@gz.ju', NULL, '2022-05-02 16:33:45', 'ae8c7973231421eabc0bf61ec4429cc92e27586e13a66793c69e04ca85d9672e'),
(9, '1@1.hu', NULL, '2022-05-21 16:42:01', 'eabc9a583502393712b84cfb8d5f125a9a0cb878435cb7683ec65fe4111215c1'),
(10, 'tesztntlfy@gmail.com', NULL, '2022-07-04 15:00:40', '174a3521dca31331df8a2ea9e2d104f3eae5aca08e937e725f7966bad1926eb4'),
(11, 'tesztntlfy2@gmail.com', NULL, '2022-07-04 15:09:32', '5813feaf8b85ef48f5055222491808b673cfa0d34f8867ec54573260f9f679ea');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `passwordHash` varchar(256) NOT NULL,
  `active` tinyint(4) NOT NULL,
  `created` datetime NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `loginAttempts` int(11) NOT NULL DEFAULT 0,
  `lockoutTime` int(11) NOT NULL DEFAULT 0,
  `description` varchar(1024) DEFAULT NULL,
  `avatar` varchar(256) DEFAULT '',
  `role` int(11) NOT NULL,
  `recoveryToken` varchar(128) DEFAULT NULL,
  `recoveryTimer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `passwordHash`, `active`, `created`, `lastLogin`, `updated`, `loginAttempts`, `lockoutTime`, `description`, `avatar`, `role`, `recoveryToken`, `recoveryTimer`) VALUES
(1, 'Admin', 'mozvik@yahoo.com', '$2y$10$yG3JjlLb3Q9goV7TJjINFelZbkINRSNlVThJcE.OZd3aEgRT7S1oy', 1, '2022-03-18 13:31:47', '2022-10-16 17:17:02', '2022-10-16 17:29:52', 0, 0, 'A mindenható. Az alfa és az omega.', 'assets/uploads/avatars/2022-05-20-07-26-40am_62872690872f6minime.jpg', 1, '4d58c72c185984fd9349725268c24c54', 1654344287),
(2, 'Teszt Elek', 'tesztelek@gmail.com', '$2y$10$YIIeyksql1wm9JnEWY3PSukktPeC98BeyjvXYej8cS5OVGmSxgi8e', 1, '2022-04-27 16:33:01', '2022-06-19 14:31:34', '2022-05-21 17:03:54', 0, 0, 'Szeretek sütni-főzni, több éve teszek-veszek a konyhámban kisebb, nagyobb sikereket elérve. Minden nap valami finomsággal kényeztetem a családomat, és a barátaimat. Szeretem a hagyományos, magyaros ételeket, de szívesen kipróbálok számomra új, és különleges ízvilágot is.', 'assets/uploads/avatars/2022-05-21-04-58-42pm_6288fe224c487generated_photos_5e6888dd6d3b380006f21a91.jpg', 0, NULL, NULL),
(3, 'Vincs Eszter', 'vincseszter@gmail.com', '$2y$10$eYotfw6NWiRJa7JgGkEHb.Ec1VbTrEXd8Rd7960ekrNNbxyPpnWlK', 1, '2022-04-27 16:34:54', '2022-10-22 11:55:03', '2022-05-21 18:48:31', 0, 0, 'Nagyon szeretek főzni, sütni és befőzni. Ismerem a konyha titkait, örömét és a csalódásait is. Sokat kísérletezem új receptekkel.', 'assets/uploads/avatars/2022-05-21-06-51-42pm_6289189e1ea1dgenerated_photos_5e6888af6d3b380006f2103f.jpg', 0, NULL, NULL),
(4, 'Virra Dóra', 'virradora@gmail.com', '$2y$10$fiRq8J..e7BRQYyNxVdwh.U96PuNffvLkxhd7vsRqF7rO3EVEcG6q', 1, '2022-04-28 21:26:19', '2022-08-21 09:18:58', '2022-05-22 19:16:36', 0, 0, 'Előítéletek nélkül kipróbálok mindent, bármelyik évszakban és napszakban. Például tél közepén szívesen főzök finomfőzeléket, hogy elfelejtsem, milyen hideg és szürke kint minden. Reggelire lehet, hogy levest fogok enni, vacsorára pedig \"reggelit\". Ha valami nem egészséges, akkor is megkóstolom.', 'assets/uploads/avatars/2022-05-22-07-19-37pm_628a70a9813bdphoto-by-face-generator_628a70903d7f51000e16c13e.jpg', 0, NULL, NULL),
(5, 'Csin Csilla', 'csincsilla@gmail.com', '$2y$10$Xa32k7VG2i/aUJrM2Y.CbehXtMcDqaW7lgEj5huS5ipxh6cwZceT2', 1, '2022-04-28 21:28:40', '2022-08-21 09:23:29', '2022-05-23 20:26:31', 0, 0, 'Üdvözöllek. 34 éves vagyok, és már gyerekkorom óta lenyűgözött a főzés. Mindig ott sündörögtem a konyhában, segítettem nyújtani a rétestésztát, locsoltam a süteményeket, dagasztottam, vertem a habokat, krémeket. Az évek során rengeteg tapasztalatra tettem szert, amit a Recefice Recepttár segítségével meg is oszthatok veletek.', 'assets/uploads/avatars/2022-05-23-08-28-25pm_628bd249708ddgenerated_photos_5e6888e46d3b380006f21c0f.jpg', 0, NULL, NULL),
(6, 'Eszet Lenke', 'eszetlenke@gmail.com', '$2y$10$QzbL3GEl4UJ4tjZJVrQqbeIin.kniIV9IexU5QdqMN9kL/Mj0sFK2', 1, '2022-04-28 21:29:04', '2022-08-21 09:19:50', NULL, 0, 0, '', 'assets/uploads/avatars/2022-05-22-10-30-27am_6289f4a3c01f0photo-by-face-generator_6289f48ee8e3ea000f062f5c.jpg', 0, NULL, NULL),
(7, 'Kala Pál', 'kalapal@gmail.com', '$2y$10$wpQduve58ykYCLTTwCk3pOvWwrG06SGjiNJWDIof0lEcni/w0HQne', 1, '2022-04-28 21:29:40', '2022-08-21 09:25:44', '2022-05-24 09:16:34', 0, 0, '\"Hogy mi a magyar ételek ízletességének titka? Végy egy konyhát, amelynek ükapja kaukázusi, dédapja olasz, nagyapja török, sógora osztrák, nagybátyja francia. Keress ehhez egy népet, amelynek jó ínye, fejlett ízlése, és emellett érzéke, kedve van a főzéshez.\" ', 'assets/uploads/avatars/2022-05-24-09-17-49am_628c869d00344generated_photos_5e6888e56d3b380006f21c5d.jpg', 0, NULL, NULL),
(33, 'atika', 'matika1974@gmail.com', '$2y$10$9Pq35VIO7votb0OIVzl6a.w8/3HTEHI5exGZlm5sIS77RjtzCTEm.', 1, '2022-10-16 16:09:41', '2022-10-16 16:26:52', NULL, 0, 0, NULL, '', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_favorites`
--

CREATE TABLE `user_favorites` (
  `userId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `user_favorites`
--

INSERT INTO `user_favorites` (`userId`, `recipeId`) VALUES
(2, 10),
(3, 18),
(3, 4),
(7, 13),
(2, 8),
(2, 21),
(7, 30),
(5, 47);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cost`
--
ALTER TABLE `cost`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `difficulty`
--
ALTER TABLE `difficulty`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipeId` (`recipeId`);

--
-- A tábla indexei `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `measurementId` (`measurementId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- A tábla indexei `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `nationality`
--
ALTER TABLE `nationality`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipeId`),
  ADD KEY `categoryid` (`categoryId`),
  ADD KEY `difficulityid` (`difficultyId`),
  ADD KEY `costid` (`costId`),
  ADD KEY `nationalityid` (`nationalityId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `recipe_labels`
--
ALTER TABLE `recipe_labels`
  ADD KEY `labelId` (`labelId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- A tábla indexei `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipeId` (`recipeId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sid`);

--
-- A tábla indexei `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD KEY `userId` (`userId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `cost`
--
ALTER TABLE `cost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `difficulty`
--
ALTER TABLE `difficulty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `direction`
--
ALTER TABLE `direction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT a táblához `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT a táblához `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `measurement`
--
ALTER TABLE `measurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `nationality`
--
ALTER TABLE `nationality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `recipe`
--
ALTER TABLE `recipe`
  MODIFY `recipeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT a táblához `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT a táblához `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `direction`
--
ALTER TABLE `direction`
  ADD CONSTRAINT `direction_ibfk_1` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`);

--
-- Megkötések a táblához `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`measurementId`) REFERENCES `measurement` (`id`),
  ADD CONSTRAINT `ingredient_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`);

--
-- Megkötések a táblához `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `recipe_ibfk_2` FOREIGN KEY (`difficultyId`) REFERENCES `difficulty` (`id`),
  ADD CONSTRAINT `recipe_ibfk_3` FOREIGN KEY (`costId`) REFERENCES `cost` (`id`),
  ADD CONSTRAINT `recipe_ibfk_4` FOREIGN KEY (`nationalityId`) REFERENCES `nationality` (`id`),
  ADD CONSTRAINT `recipe_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `recipe_labels`
--
ALTER TABLE `recipe_labels`
  ADD CONSTRAINT `recipe_labels_ibfk_1` FOREIGN KEY (`labelId`) REFERENCES `label` (`id`),
  ADD CONSTRAINT `recipe_labels_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`);

--
-- Megkötések a táblához `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `recipeId` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`),
  ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
