import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicSetup1570143571796 implements MigrationInterface {
  name = 'CreateBasicSetup1570143571796';
  public async up(queryRunner: QueryRunner): Promise<any> {
    //Create roles
    await queryRunner.query(
      `insert into roles values 
      (1, 'admin'),
      (2, 'personal'),
      (3, 'user');`,
    );
    //Create users
    await queryRunner.query(
      `insert into users values 
      (1,'admin','admin','admin@gams.com','$2a$08$4dFb7Jq.o4bbpp.oohEFFOWUOhDKntZI2DEMC2yXIKe.BuhS.HKvu','active','2020-04-26 20:19:12.267999','2020-04-26 20:19:12.267999'),
      (2,'Lucas','Ringelsten','riki@gams.com','$2a$08$VU2CJVBE6rib8KHYcapwq.GGiZ46MUO3CSGZp3kAGYq3A4eR9PsMC','active','2020-04-26 20:23:19.958672','2020-04-26 20:23:19.958672'),
      (4,'Joel','Mercol','joelmercol@gmail.com','$2a$08$LL2y3W.QMgkrGCPevA31EOeu.WoasXd.9b7AzxYP4tqE7xJTKYIby','active','2020-07-09 00:06:22.621727','2020-07-09 00:06:22.621727');`,
    );

    //Create user_roles
    await queryRunner.query(
      `insert into user_roles values 
      (1,1,1),
      (2,1,2),
      (3,1,3),
      (5,4,1),
      (6,2,1);
    `,
    );

    //Create sectors
    await queryRunner.query(
      `insert into sector values 
      (1, 'Campus deportes', 'CD', NULL),
      (2, 'Edificio principal', 'E01', NULL),
      (3, 'Cuarto nivel', 'E02', NULL),
      (4, 'Biblioteca y Cooperadora', 'E03', NULL),
      (5, 'Laboratorio Quimica', 'E04', NULL),
      (6, 'Laboratorio Electromecanica', 'E05', NULL),
      (7, 'Laboratorio Fisica Lar Sistemas', 'E06', NULL),
      (8, 'Laboratorio Electronica', 'E07', NULL),
      (9, 'Taller Mantenimiento y Servicios Generales', 'E08', NULL),
      (10, 'Dasuten', 'E09', NULL),
      (11, 'Comedor universitario', 'E10', NULL),
      (12, 'Secyt', 'E11', NULL),
      (13, 'Quincho CEUT', 'E12', NULL),
      (14, 'Portico', 'E13', NULL),
      (17, 'Patio interno', 'P01', NULL),
      (15, 'Parque frente', 'P02', NULL),
      (16, 'Parque sur', 'P03', NULL),
      (18, 'Parque playon', 'P04', NULL),
      (19, 'Parque laboratorios exteriores', 'Plab', NULL),
      (20, 'Parque estacionamiento', 'P05', NULL);`,
    );

    //Create Services
    await queryRunner.query(
      `insert into service values 
      (1, 'Agua potable', 'Ag'),
      (2, 'Aire acondicionado', 'AA'),
      (3, 'Ascensor', 'Asc'),
      (4, 'Cerramiento', 'Ce'),
      (5, 'Cloacas', 'Cl'),
      (11, 'Edilicio', 'Ed'),
      (7, 'Energia Electrica', 'EE'),
      (8, 'Gas', 'G'),
      (9, 'Iluminacion', 'Ilum');`,
    );

    //Create Products
    await queryRunner.query(
      `insert into product values(1, 'Adaptador 2p a 3p'),
      (2, 'Adaptador 3p a 2p'),
      (3, 'Arrancador'),
      (4, 'Balasto 18 / 26 W'),
      (5, 'Balasto 30 W'),
      (6, 'Balasto 36 W'),
      (7, 'Balasto SAP 400 W'),
      (8, 'Base arrancadores'),
      (9, 'Base dicroica'),
      (10, 'Base fotocélula'),
      (11, 'Base fusible 160 A'),
      (12, 'Base módulo riel DIN'),
      (13, 'Bastidor oculto 5 x 10 cm'),
      (14, 'Bornera 4mm'),
      (15, 'Caja exterior p/bast 5 x 10 cm'),
      (16, 'Capacitor 1,2 μF'),
      (17, 'Capacitor 10 μF'),
      (18, 'Capacitor 12,5 μF'),
      (19, 'Capacitor 2 μF'),
      (20, 'Capacitor 2,5 μF'),
      (21, 'Capacitor 3,6 μF'),
      (22, 'Capacitor 33 μF'),
      (23, 'Capacitor 4 μF'),
      (24, 'Cinta aisladora 20m'),
      (25, 'Conector jabalina PAT'),
      (26, 'Dicroica LED'),
      (27, 'Disyuntor diferencial 2 x 25 A'),
      (28, 'Ficha hembra 2p 10 A'),
      (29, 'Ficha hembra bi-uso 10 A'),
      (30, 'Ficha macho 2p 10 A'),
      (31, 'Ficha macho 3p 10 A'),
      (32, 'Foco BC 20 W'),
      (33, 'Foco BC 32 W'),
      (34, 'Foco BC 65 W'),
      (35, 'Foco LED 10 W'),
      (36, 'Foco LED 15 W'),
      (37, 'Foco LED 35 W'),
      (38, 'Foco LED 9 W'),
      (39, 'Fotocélula'),
      (40, 'Fotocontrol electrónico'),
      (41, 'Fusible NH 36 A'),
      (42, 'Fusiblera 10 A'),
      (43, 'Lámpara HQI 400 W'),
      (44, 'Lámpara incandescente 150 W'),
      (45, 'Lampara spot LED 16 W'),
      (46, 'Módulo ciega'),
      (47, 'Módulo ciega + prensa cable'),
      (48, 'Módulo internet'),
      (49, 'Módulo tecla 1p 10 A'),
      (50, 'Módulo tecla 1p 16 A'),
      (51, 'Módulo Teléfono'),
      (52, 'Módulo toma 10 A'),
      (53, 'Módulo toma 20 A'),
      (54, 'Módulo Variador velocidad ventilador'),
      (55, 'Proyector LED 100 W'),
      (56, 'Proyector LED 50 W'),
      (57, 'Simil 2 tubos fluor. LED 36 W'),
      (58, 'Tablero exterior 12 bocas'),
      (59, 'Tablero exterior 5 bocas'),
      (60, 'Tapa blanca p/bast 5 x 10 cm'),
      (61, 'Tapa ciega 5 x 10 cm'),
      (62, 'Tapa redonda caja octogonal'),
      (63, 'Termomagnética 1  x 10 A'),
      (64, 'Termomagnética 1 x 16 A'),
      (65, 'Termomagnética 1 x 20'),
      (66, 'Termomágnetica 1 x 6 A'),
      (67, 'Termomagnética 2 x 10 A'),
      (68, 'Termomagnética 2 x 16 A'),
      (69, 'Termomagnética 2 x 20 A'),
      (70, 'Termomagnética 2 x 25 A'),
      (71, 'Termomagnética 3 x 200 A'),
      (72, 'Termomagnética 3 x 63 A'),
      (73, 'Triple'),
      (74, 'Tubo fluorescente 105 W'),
      (75, 'Tubo fluorescente 18 W'),
      (76, 'Tubo fluorescente 36 W'),
      (77, 'Tubo LED 18 W'),
      (78, 'Tubo LED 20 W'),
      (79, 'Variador velocidad ventilador'),
      (80, 'Velas 26 W'),
      (81, 'Velas 36 W'),
      (82, 'Zapatillas 5 bocas'),
      (83, 'Zócalo tubo 105 W'),
      (84, 'Zocalo tubo 36 W');`,
    );

    //Create Areas
    await queryRunner.query(
      `insert into area values (22,'Administración','110',2),
      (23,'Ala Este','02',12),
      (24,'Ala Oeste','03',12),
      (26,'Antebaño','05',9),
      (27,'Antebaño','04',10),
      (28,'Apoyo Academico','06',2),
      (29,'Asador','08',11),
      (30,'Atención Publico Tics','121',2),
      (31,'Aula','04',8),
      (32,'Aula 10','10',2),
      (33,'Aula 106','106',2),
      (34,'Aula 107','107',2),
      (35,'Aula 11','11',2),
      (36,'Aula 115','115',2),
      (37,'Aula 116','116',2),
      (38,'Aula 117','117',2),
      (39,'Aula 118','118',2),
      (40,'Aula 119','119',2),
      (41,'Aula 13','13',2),
      (42,'Aula 14','14',2),
      (43,'Aula 15','15',2),
      (44,'Aula 18','18',2),
      (45,'Aula 21','21',2),
      (46,'Aula 22','22',2),
      (47,'Aula 23','23',2),
      (48,'Aula 24','24',2),
      (49,'Aula 25','25',2),
      (50,'Aula 25','04',3),
      (51,'Aula 26','26',2),
      (52,'Aula 27','27',2),
      (53,'Aula 28','28',2),
      (54,'Aula 29','29',2),
      (55,'Aula A','AA',3),
      (56,'Aula B','AB',3),
      (57,'Aula C','AC',3),
      (58,'Aula Este','01',6),
      (59,'Aula ex-taller','38',2),
      (60,'Aula LAR','04',7),
      (61,'Aula Oeste','02',6),
      (62,'Aula Taller','03',8),
      (63,'Aula Videoconferencia','126',2),
      (64,'Aula Virtual','120',2),
      (65,'Baño','02',8),
      (66,'Baño','06',9),
      (67,'Baño','05',10),
      (68,'Baño Capapacidad Diferente','05',3),
      (69,'Baño Capapacidad Diferente','07',11),
      (70,'Baño Capapacidad Diferente','07',12),
      (71,'Baño Capapacidad Diferente PB','36',2),
      (72,'Baño Damas','05',12),
      (73,'Baño Damas','05',11),
      (74,'Baño Decanato - Deposito','103',2),
      (75,'Baño Docentes Mujeres','35',2),
      (76,'Baño Docentes Hombres','34',2),
      (77,'Baño Guardia','BG',14),
      (78,'Baño H PA','BHPA',2),
      (79,'Baño H PB','37',2),
      (80,'Baño Hombres','06',4),
      (81,'Baño Hombres','06',11),
      (82,'Baño Hombres','06',12),
      (83,'Baño Hombres','08',3),
      (84,'Baño Hombres','10',5),
      (85,'Baño Hombres','07',7),
      (86,'Baño M PA','BMPA',2),
      (87,'Baño M PB','35',2),
      (88,'Baño Mujeres','07',3),
      (89,'Baño Mujeres','07',4),
      (90,'Baño Mujeres','09',5),
      (91,'Baño Mujeres','08',7),
      (92,'Biblioteca','01',4),
      (93,'Bomba & Ascensor','32',2),
      (94,'Calle Salida','CS',15),
      (95,'Cocina','06',3),
      (96,'Cocina','06',10),
      (97,'Cocina','08',12),
      (98,'Cocina Cantina','02',11),
      (99,'Comedor','03',9),
      (100,'Consultorio Norte ','03',10),
      (101,'Consultorio Sur','02',10),
      (102,'cooperadora','03',4),
      (103,'Decanato','101',2),
      (104,'Departamento de Alumnos','05',2),
      (105,'Departamento de Electromecanica','04',6),
      (106,'Departamento de Sistemas y Basicas','104',2),
      (107,'Deposito de Trab. Finales','04',4),
      (108,'Deposito Alumnos','08',2),
      (109,'Deposito Aula 119','D119',2),
      (110,'Deposito Deportes','05',6),
      (111,'Deposito Electromecanica','06',6),
      (112,'Deposito de Serv. Grales ','09',2),
      (113,'Deposito de Tableros','07',6),
      (114,'Deposito de Tics','125',2),
      (115,'Direccion Academica','04',2),
      (116,'Dirección RR HH','108',2),
      (117,'Droguero','08',5),
      (118,'Escalera 1','Esc01',2),
      (119,'Escalera 2','Esc02',2),
      (120,'Escalera 3','Esc03',2),
      (121,'Exterior','Ext',14),
      (122,'Fadgut','114',2),
      (123,'Fotocopiadora','30',2),
      (124,'Generador','Gen',14),
      (125,'GISEner','201',2),
      (126,'Grupo Diseño','03',6),
      (127,'Hall','01',8),
      (128,'Hall','01',5),
      (129,'Hall','05',4),
      (130,'Hall','01',3),
      (131,'Hall - Pasillo','01',7),
      (132,'Hall - Atención','01',10),
      (133,'Hall Ingreso','09',12),
      (134,'Hall LAR','02',7),
      (135,'Ingreso Peatonal','IP',14),
      (136,'Ingreso Vehicular','IV',14),
      (137,'Lab. Fisica','05',7),
      (138,'Lab. Organica','07',5),
      (139,'Lab. Quimica Gral','02',5),
      (140,'Lab. Servicios','06',5),
      (141,'Lab. Sistemas','06',7),
      (142,'Lab. Cedi','112',2),
      (143,'Lab. Computación','113',2),
      (144,'Lab. Fagdut','111',2),
      (145,'Letras Hormigón','UTN',14),
      (146,'Mesa de Entrada y SEU','02',2),
      (147,'Microbiologia','17',2),
      (148,'Microbiologia','05',5),
      (149,'MUIC','202',2),
      (150,'Observatorio','203',2),
      (151,'Oficina de Atencion Posgrado ','02',3),
      (152,'Oficina Guardia','OfG',14),
      (153,'Oficina Jefe','02',9),
      (154,'Oficina Secyt','01',12),
      (155,'Oficina de Servicios Generales','33',2),
      (156,'Oficina Tecnica','04',9),
      (157,'Oficina Tics','123',2),
      (158,'Paneles Solares','204',2),
      (159,'Parque','Par',15),
      (160,'Parque','Par',1),
      (161,'Pasillo Baños','09',3),
      (162,'Pasillo Baños','07.1',11),
      (163,'Pasillo Deposito de Cantina','02.1',11),
      (164,'Pasillo Este Planta Alta','PE-PA',2),
      (165,'Pasillo Este Planta Baja','PE-PB',2),
      (166,'Pasillo Interno de Microbiologia','11',5),
      (167,'Pasillo Norte Planta Baja','PN-PB',2),
      (168,'Pasillo Oeste Planta Alta','PO-PA',2),
      (169,'Pasillo Sur Planta Alta','PS-PA',2),
      (170,'Pasillo Sur Planta Baja','PS-PB',2),
      (171,'Planta Piloto','03',2),
      (172,'Polimeros','16',2),
      (173,'Quincho','Quin',13),
      (174,'RRHH','109',2),
      (175,'SAC','07',2),
      (176,'SAE','31',2),
      (177,'Sala Cantina','01',11),
      (178,'Sala de Balanzas','04',5),
      (179,'Sala de Lectura','02',4),
      (180,'Sala de Reuniones','05',8),
      (181,'Sala de Servidores','124',2),
      (182,'Sala Guardia','SG',14),
      (183,'Sala Pedro Santillan','03',11),
      (184,'Sala Profesores','105',2),
      (185,'Sala ','04',12),
      (186,'Sala Reuniones LAR','03',7),
      (187,'Sala Reuniones Polimeros','12',2),
      (188,'Salon Comedor','04',11),
      (189,'Salon de Actos','01',2),
      (190,'Secretaria Decanato','100',2),
      (191,'Secretaria General','102',2),
      (192,'Secretaria Posgrados','03',3),
      (193,'Secretaria Tics','122',2),
      (194,'SEU','03',2),
      (195,'Taller','01',9),
      (196,'Uces','20',2),
      (197,'Vereda Peatonal','VP',15),
      (198,'Vereda Perimetral','06',8),
      (199,'Vereda Perimetral','07',10),
      (200,'Vereda Perimetral','VP',2),
      (201,'Vereda Perimetral','08',4),
      (202,'Vereda Perimetral','08',6),
      (203,'Vereda Perimetral','09',11),
      (204,'Vereda Perimetral','10',3),
      (205,'Vereda Perimetral','10',12),
      (206,'Vereda Perimetral','12',5),
      (207,'Vereda Perimetral','09',7),
      (208,'Vereda Perimetral','07',9);`,
    );

    //Create Areas-Services
    await queryRunner.query(
      `insert into area_service values(113,NULL,22,1),
      (114,NULL,22,2),
      (115,NULL,22,4),
      (116,NULL,22,5),
      (117,NULL,22,7),
      (118,NULL,22,8),
      (119,NULL,22,9),
      (120,NULL,22,11),
      (121,NULL,23,2),
      (122,NULL,23,4),
      (123,NULL,23,7),
      (124,NULL,23,8),
      (125,NULL,23,9),
      (126,NULL,23,11),
      (127,NULL,24,2),
      (128,NULL,24,4),
      (129,NULL,24,7),
      (130,NULL,24,8),
      (131,NULL,24,9),
      (132,NULL,24,11),
      (138,NULL,26,1),
      (139,NULL,26,4),
      (140,NULL,26,5),
      (141,NULL,26,7),
      (142,NULL,26,9),
      (143,NULL,26,11),
      (144,NULL,27,1),
      (145,NULL,27,4),
      (146,NULL,27,5),
      (147,NULL,27,7),
      (148,NULL,27,9),
      (149,NULL,27,11),
      (150,NULL,28,2),
      (151,NULL,28,4),
      (152,NULL,28,7),
      (153,NULL,28,8),
      (154,NULL,28,9),
      (155,NULL,28,11),
      (156,NULL,29,1),
      (157,NULL,29,5),
      (158,NULL,30,4),
      (159,NULL,30,7),
      (160,NULL,30,9),
      (161,NULL,30,11),
      (162,NULL,31,2),
      (163,NULL,31,4),
      (164,NULL,31,7),
      (165,NULL,31,8),
      (166,NULL,31,9),
      (167,NULL,32,4),
      (168,NULL,32,7),
      (169,NULL,32,9),
      (170,NULL,32,11),
      (171,NULL,33,4),
      (172,NULL,33,7),
      (173,NULL,33,8),
      (174,NULL,33,9),
      (175,NULL,33,11),
      (176,NULL,34,4),
      (177,NULL,34,7),
      (178,NULL,34,8),
      (179,NULL,34,9),
      (180,NULL,34,11),
      (181,NULL,35,4),
      (182,NULL,35,7),
      (183,NULL,35,8),
      (184,NULL,35,9),
      (185,NULL,35,11),
      (186,NULL,36,4),
      (187,NULL,36,7),
      (188,NULL,36,8),
      (189,NULL,36,9),
      (190,NULL,36,11),
      (191,NULL,37,4),
      (192,NULL,37,7),
      (193,NULL,37,8),
      (194,NULL,37,9),
      (195,NULL,37,11),
      (196,NULL,38,4),
      (197,NULL,38,7),
      (198,NULL,38,8),
      (199,NULL,38,9),
      (200,NULL,38,11),
      (201,NULL,39,4),
      (202,NULL,39,7),
      (203,NULL,39,8),
      (204,NULL,39,9),
      (205,NULL,39,11),
      (206,NULL,40,4),
      (207,NULL,40,7),
      (208,NULL,40,8),
      (209,NULL,40,9),
      (210,NULL,40,11),
      (211,NULL,41,4),
      (212,NULL,41,7),
      (213,NULL,41,8),
      (214,NULL,41,9),
      (215,NULL,41,11),
      (216,NULL,42,4),
      (217,NULL,42,7),
      (218,NULL,42,8),
      (219,NULL,42,9),
      (220,NULL,42,11),
      (221,NULL,43,1),
      (222,NULL,43,4),
      (223,NULL,43,5),
      (224,NULL,43,7),
      (225,NULL,43,8),
      (226,NULL,43,9),
      (227,NULL,43,11),
      (228,NULL,44,4),
      (229,NULL,44,7),
      (230,NULL,44,9),
      (231,NULL,44,11),
      (232,NULL,45,4),
      (233,NULL,45,7),
      (234,NULL,45,8),
      (235,NULL,45,9),
      (236,NULL,45,11),
      (237,NULL,46,4),
      (238,NULL,46,7),
      (239,NULL,46,8),
      (240,NULL,46,9),
      (241,NULL,46,11),
      (242,NULL,47,4),
      (243,NULL,47,7),
      (244,NULL,47,8),
      (245,NULL,47,9),
      (246,NULL,47,11),
      (247,NULL,48,4),
      (248,NULL,48,7),
      (249,NULL,48,8),
      (250,NULL,48,9),
      (251,NULL,48,11),
      (252,NULL,49,4),
      (253,NULL,49,7),
      (254,NULL,49,8),
      (255,NULL,49,9),
      (256,NULL,49,11),
      (257,NULL,50,4),
      (258,NULL,50,7),
      (259,NULL,50,9),
      (260,NULL,50,11),
      (261,NULL,51,4),
      (262,NULL,51,7),
      (263,NULL,51,8),
      (264,NULL,51,9),
      (265,NULL,51,11),
      (266,NULL,52,4),
      (267,NULL,52,7),
      (268,NULL,52,8),
      (269,NULL,52,9),
      (270,NULL,52,11),
      (271,NULL,53,4),
      (272,NULL,53,7),
      (273,NULL,53,8),
      (274,NULL,53,9),
      (275,NULL,53,11),
      (276,NULL,54,4),
      (277,NULL,54,7),
      (278,NULL,54,8),
      (279,NULL,54,9),
      (280,NULL,54,11),
      (281,NULL,55,2),
      (282,NULL,55,4),
      (283,NULL,55,7),
      (284,NULL,55,8),
      (285,NULL,55,9),
      (286,NULL,55,11),
      (287,NULL,56,2),
      (288,NULL,56,4),
      (289,NULL,56,7),
      (290,NULL,56,8),
      (291,NULL,56,9),
      (292,NULL,56,11),
      (293,NULL,57,2),
      (294,NULL,57,4),
      (295,NULL,57,7),
      (296,NULL,57,8),
      (297,NULL,57,9),
      (298,NULL,57,11),
      (299,NULL,58,2),
      (300,NULL,58,4),
      (301,NULL,58,7),
      (302,NULL,58,8),
      (303,NULL,58,9),
      (304,NULL,58,11),
      (305,NULL,59,4),
      (306,NULL,59,7),
      (307,NULL,59,9),
      (308,NULL,59,11),
      (309,NULL,60,2),
      (310,NULL,60,4),
      (311,NULL,60,7),
      (312,NULL,60,8),
      (313,NULL,60,9),
      (314,NULL,60,11),
      (315,NULL,61,2),
      (316,NULL,61,4),
      (317,NULL,61,7),
      (318,NULL,61,9),
      (319,NULL,61,11),
      (320,NULL,62,2),
      (321,NULL,62,4),
      (322,NULL,62,7),
      (323,NULL,62,8),
      (324,NULL,62,9),
      (325,NULL,62,11),
      (326,NULL,63,2),
      (327,NULL,63,4),
      (328,NULL,63,7),
      (329,NULL,63,8),
      (330,NULL,63,9),
      (331,NULL,63,11),
      (332,NULL,64,4),
      (333,NULL,64,7),
      (334,NULL,64,8),
      (335,NULL,64,9),
      (336,NULL,64,11),
      (337,NULL,65,1),
      (338,NULL,65,4),
      (339,NULL,65,5),
      (340,NULL,65,7),
      (341,NULL,65,9),
      (342,NULL,65,11),
      (343,NULL,66,4),
      (344,NULL,66,5),
      (345,NULL,66,7),
      (346,NULL,66,9),
      (347,NULL,66,11),
      (348,NULL,67,1),
      (349,NULL,67,4),
      (350,NULL,67,5),
      (351,NULL,67,7),
      (352,NULL,67,9),
      (353,NULL,67,11),
      (354,NULL,68,1),
      (355,NULL,68,4),
      (356,NULL,68,5),
      (357,NULL,68,7),
      (358,NULL,68,9),
      (359,NULL,68,11),
      (360,NULL,69,1),
      (361,NULL,69,4),
      (362,NULL,69,5),
      (363,NULL,69,7),
      (364,NULL,69,9),
      (365,NULL,69,11),
      (366,NULL,70,1),
      (367,NULL,70,4),
      (368,NULL,70,5),
      (369,NULL,70,7),
      (370,NULL,70,9),
      (371,NULL,70,11),
      (372,NULL,71,1),
      (373,NULL,71,4),
      (374,NULL,71,5),
      (375,NULL,71,7),
      (376,NULL,71,9),
      (377,NULL,71,11),
      (378,NULL,72,1),
      (379,NULL,72,4),
      (380,NULL,72,5),
      (381,NULL,72,7),
      (382,NULL,72,9),
      (383,NULL,72,11),
      (384,NULL,73,1),
      (385,NULL,73,4),
      (386,NULL,73,5),
      (387,NULL,73,7),
      (388,NULL,73,9),
      (389,NULL,73,11),
      (390,NULL,74,1),
      (391,NULL,74,4),
      (392,NULL,74,5),
      (393,NULL,74,7),
      (394,NULL,74,9),
      (395,NULL,74,11),
      (396,NULL,75,1),
      (397,NULL,75,4),
      (398,NULL,75,5),
      (399,NULL,75,7),
      (400,NULL,75,9),
      (401,NULL,75,11),
      (402,NULL,76,1),
      (403,NULL,76,4),
      (404,NULL,76,5),
      (405,NULL,76,7),
      (406,NULL,76,9),
      (407,NULL,76,11),
      (408,NULL,77,1),
      (409,NULL,77,4),
      (410,NULL,77,5),
      (411,NULL,77,7),
      (412,NULL,77,9),
      (413,NULL,77,11),
      (414,NULL,78,1),
      (415,NULL,78,4),
      (416,NULL,78,5),
      (417,NULL,78,7),
      (418,NULL,78,9),
      (419,NULL,78,11),
      (420,NULL,79,1),
      (421,NULL,79,4),
      (422,NULL,79,5),
      (423,NULL,79,7),
      (424,NULL,79,9),
      (425,NULL,79,11),
      (426,NULL,80,1),
      (427,NULL,80,4),
      (428,NULL,80,5),
      (429,NULL,80,7),
      (430,NULL,80,9),
      (431,NULL,80,11),
      (432,NULL,81,1),
      (433,NULL,81,4),
      (434,NULL,81,5),
      (435,NULL,81,7),
      (436,NULL,81,9),
      (437,NULL,81,11),
      (438,NULL,82,1),
      (439,NULL,82,4),
      (440,NULL,82,5),
      (441,NULL,82,7),
      (442,NULL,82,9),
      (443,NULL,82,11),
      (444,NULL,83,1),
      (445,NULL,83,4),
      (446,NULL,83,5),
      (447,NULL,83,7),
      (448,NULL,83,9),
      (449,NULL,83,11),
      (450,NULL,84,1),
      (451,NULL,84,4),
      (452,NULL,84,5),
      (453,NULL,84,7),
      (454,NULL,84,9),
      (455,NULL,84,11),
      (456,NULL,85,1),
      (457,NULL,85,4),
      (458,NULL,85,5),
      (459,NULL,85,7),
      (460,NULL,85,9),
      (461,NULL,85,11),
      (462,NULL,86,1),
      (463,NULL,86,4),
      (464,NULL,86,5),
      (465,NULL,86,7),
      (466,NULL,86,9),
      (467,NULL,86,11),
      (468,NULL,87,1),
      (469,NULL,87,4),
      (470,NULL,87,5),
      (471,NULL,87,7),
      (472,NULL,87,9),
      (473,NULL,87,11),
      (474,NULL,88,1),
      (475,NULL,88,4),
      (476,NULL,88,5),
      (477,NULL,88,7),
      (478,NULL,88,9),
      (479,NULL,88,11),
      (480,NULL,89,1),
      (481,NULL,89,4),
      (482,NULL,89,5),
      (483,NULL,89,7),
      (484,NULL,89,9),
      (485,NULL,89,11),
      (486,NULL,90,1),
      (487,NULL,90,4),
      (488,NULL,90,5),
      (489,NULL,90,7),
      (490,NULL,90,9),
      (491,NULL,90,11),
      (492,NULL,91,1),
      (493,NULL,91,4),
      (494,NULL,91,5),
      (495,NULL,91,7),
      (496,NULL,91,9),
      (497,NULL,91,11),
      (498,NULL,92,2),
      (499,NULL,92,4),
      (500,NULL,92,7),
      (501,NULL,92,8),
      (502,NULL,92,9),
      (503,NULL,92,11),
      (504,NULL,93,1),
      (505,NULL,93,3),
      (506,NULL,93,4),
      (507,NULL,93,7),
      (508,NULL,93,9),
      (509,NULL,93,11),
      (510,NULL,94,9),
      (511,NULL,94,11),
      (512,NULL,95,1),
      (513,NULL,95,5),
      (514,NULL,95,7),
      (515,NULL,95,9),
      (516,NULL,95,11),
      (517,NULL,96,1),
      (518,NULL,96,4),
      (519,NULL,96,5),
      (520,NULL,96,7),
      (521,NULL,96,9),
      (522,NULL,96,11),
      (523,NULL,97,1),
      (524,NULL,97,4),
      (525,NULL,97,5),
      (526,NULL,97,7),
      (527,NULL,97,9),
      (528,NULL,97,11),
      (529,NULL,98,1),
      (530,NULL,98,2),
      (531,NULL,98,4),
      (532,NULL,98,5),
      (533,NULL,98,7),
      (534,NULL,98,8),
      (535,NULL,98,9),
      (536,NULL,98,11),
      (537,NULL,99,2),
      (538,NULL,99,4),
      (539,NULL,99,7),
      (540,NULL,99,9),
      (541,NULL,100,1),
      (542,NULL,100,2),
      (543,NULL,100,4),
      (544,NULL,100,5),
      (545,NULL,100,7),
      (546,NULL,100,8),
      (547,NULL,100,9),
      (548,NULL,100,11),
      (549,NULL,101,1),
      (550,NULL,101,2),
      (551,NULL,101,4),
      (552,NULL,101,5),
      (553,NULL,101,7),
      (554,NULL,101,8),
      (555,NULL,101,9),
      (556,NULL,101,11),
      (557,NULL,102,2),
      (558,NULL,102,4),
      (559,NULL,102,7),
      (560,NULL,102,8),
      (561,NULL,102,9),
      (562,NULL,102,11),
      (563,NULL,103,2),
      (564,NULL,103,4),
      (565,NULL,103,7),
      (566,NULL,103,8),
      (567,NULL,103,9),
      (568,NULL,103,11),
      (569,NULL,104,2),
      (570,NULL,104,4),
      (571,NULL,104,7),
      (572,NULL,104,8),
      (573,NULL,104,9),
      (574,NULL,104,11),
      (575,NULL,105,7),
      (576,NULL,105,9),
      (577,NULL,105,11),
      (578,NULL,106,4),
      (579,NULL,106,7),
      (580,NULL,106,9),
      (581,NULL,106,11),
      (582,NULL,107,4),
      (583,NULL,107,7),
      (584,NULL,107,9),
      (585,NULL,107,11),
      (586,NULL,108,4),
      (587,NULL,108,7),
      (588,NULL,108,9),
      (589,NULL,108,11),
      (590,NULL,109,11),
      (591,NULL,110,4),
      (592,NULL,110,7),
      (593,NULL,110,9),
      (594,NULL,111,4),
      (595,NULL,112,4),
      (596,NULL,112,7),
      (597,NULL,112,9),
      (598,NULL,112,11),
      (599,NULL,113,4),
      (600,NULL,113,7),
      (601,NULL,113,9),
      (602,NULL,114,2),
      (603,NULL,114,7),
      (604,NULL,114,8),
      (605,NULL,114,9),
      (606,NULL,114,11),
      (607,NULL,115,2),
      (608,NULL,115,4),
      (609,NULL,115,7),
      (610,NULL,115,8),
      (611,NULL,115,9),
      (612,NULL,115,11),
      (613,NULL,116,2),
      (614,NULL,116,4),
      (615,NULL,116,7),
      (616,NULL,116,9),
      (617,NULL,116,11),
      (618,NULL,117,2),
      (619,NULL,117,4),
      (620,NULL,117,7),
      (621,NULL,117,9),
      (622,NULL,118,7),
      (623,NULL,118,9),
      (624,NULL,118,11),
      (625,NULL,119,7),
      (626,NULL,119,9),
      (627,NULL,119,11),
      (628,NULL,120,4),
      (629,NULL,120,7),
      (630,NULL,120,9),
      (631,NULL,120,11),
      (632,NULL,121,7),
      (633,NULL,122,2),
      (634,NULL,122,4),
      (635,NULL,122,7),
      (636,NULL,122,9),
      (637,NULL,122,11),
      (638,NULL,123,4),
      (639,NULL,123,7),
      (640,NULL,123,9),
      (641,NULL,123,11),
      (642,NULL,124,7),
      (643,NULL,124,9),
      (644,NULL,125,11),
      (645,NULL,126,2),
      (646,NULL,126,4),
      (647,NULL,126,7),
      (648,NULL,126,9),
      (649,NULL,126,11),
      (650,NULL,127,4),
      (651,NULL,127,7),
      (652,NULL,127,9),
      (653,NULL,127,11),
      (654,NULL,128,1),
      (655,NULL,128,4),
      (656,NULL,128,7),
      (657,NULL,128,9),
      (658,NULL,128,11),
      (659,NULL,129,4),
      (660,NULL,129,7),
      (661,NULL,129,9),
      (662,NULL,129,11),
      (663,NULL,130,2),
      (664,NULL,130,4),
      (665,NULL,130,7),
      (666,NULL,130,8),
      (667,NULL,130,9),
      (668,NULL,130,11),
      (669,NULL,131,4),
      (670,NULL,131,7),
      (671,NULL,131,9),
      (672,NULL,131,11),
      (673,NULL,132,2),
      (674,NULL,132,4),
      (675,NULL,132,7),
      (676,NULL,132,8),
      (677,NULL,132,9),
      (678,NULL,132,11),
      (679,NULL,133,4),
      (680,NULL,133,7),
      (681,NULL,133,9),
      (682,NULL,133,11),
      (683,NULL,134,4),
      (684,NULL,134,7),
      (685,NULL,134,9),
      (686,NULL,134,11),
      (687,NULL,135,4),
      (688,NULL,135,9),
      (689,NULL,135,11),
      (690,NULL,136,4),
      (691,NULL,136,9),
      (692,NULL,136,11),
      (693,NULL,137,4),
      (694,NULL,137,7),
      (695,NULL,137,9),
      (696,NULL,137,11),
      (697,NULL,138,1),
      (698,NULL,138,2),
      (699,NULL,138,4),
      (700,NULL,138,5),
      (701,NULL,138,7),
      (702,NULL,138,9),
      (703,NULL,138,11),
      (704,NULL,139,1),
      (705,NULL,139,2),
      (706,NULL,139,4),
      (707,NULL,139,5),
      (708,NULL,139,7),
      (709,NULL,139,8),
      (710,NULL,139,9),
      (711,NULL,139,11),
      (712,NULL,140,1),
      (713,NULL,140,2),
      (714,NULL,140,4),
      (715,NULL,140,5),
      (716,NULL,140,7),
      (717,NULL,140,9),
      (718,NULL,140,11),
      (719,NULL,141,2),
      (720,NULL,141,4),
      (721,NULL,141,7),
      (722,NULL,141,8),
      (723,NULL,141,9),
      (724,NULL,141,11),
      (725,NULL,142,4),
      (726,NULL,142,7),
      (727,NULL,142,8),
      (728,NULL,142,9),
      (729,NULL,142,11),
      (730,NULL,143,4),
      (731,NULL,143,7),
      (732,NULL,143,8),
      (733,NULL,143,9),
      (734,NULL,143,11),
      (735,NULL,144,4),
      (736,NULL,144,7),
      (737,NULL,144,8),
      (738,NULL,144,9),
      (739,NULL,144,11),
      (740,NULL,145,7),
      (741,NULL,145,9),
      (742,NULL,145,11),
      (743,NULL,146,2),
      (744,NULL,146,4),
      (745,NULL,146,7),
      (746,NULL,146,8),
      (747,NULL,146,9),
      (748,NULL,146,11),
      (749,NULL,147,4),
      (750,NULL,147,7),
      (751,NULL,147,9),
      (752,NULL,147,11),
      (753,NULL,148,2),
      (754,NULL,148,4),
      (755,NULL,148,7),
      (756,NULL,148,9),
      (757,NULL,148,11),
      (758,NULL,149,11),
      (759,NULL,150,11),
      (760,NULL,151,4),
      (761,NULL,151,7),
      (762,NULL,151,9),
      (763,NULL,151,11),
      (764,NULL,152,4),
      (765,NULL,152,7),
      (766,NULL,152,9),
      (767,NULL,152,11),
      (768,NULL,153,2),
      (769,NULL,153,4),
      (770,NULL,153,7),
      (771,NULL,153,9),
      (772,NULL,153,11),
      (773,NULL,154,4),
      (774,NULL,154,7),
      (775,NULL,154,9),
      (776,NULL,154,11),
      (777,NULL,155,4),
      (778,NULL,155,5),
      (779,NULL,155,7),
      (780,NULL,155,9),
      (781,NULL,155,11),
      (782,NULL,156,2),
      (783,NULL,156,4),
      (784,NULL,156,7),
      (785,NULL,156,9),
      (786,NULL,157,7),
      (787,NULL,157,9),
      (788,NULL,157,11),
      (789,NULL,158,11),
      (790,NULL,159,1),
      (791,NULL,159,8),
      (792,NULL,159,9),
      (793,NULL,160,7),
      (794,NULL,160,9),
      (795,NULL,161,7),
      (796,NULL,161,9),
      (797,NULL,161,11),
      (798,NULL,162,7),
      (799,NULL,162,9),
      (800,NULL,163,4),
      (801,NULL,163,7),
      (802,NULL,163,9),
      (803,NULL,163,11),
      (804,NULL,164,4),
      (805,NULL,164,7),
      (806,NULL,164,8),
      (807,NULL,164,9),
      (808,NULL,164,11),
      (809,NULL,165,4),
      (810,NULL,165,7),
      (811,NULL,165,8),
      (812,NULL,165,9),
      (813,NULL,165,11),
      (814,NULL,166,7),
      (815,NULL,166,9),
      (816,NULL,166,11),
      (817,NULL,167,4),
      (818,NULL,167,7),
      (819,NULL,167,8),
      (820,NULL,167,9),
      (821,NULL,167,11),
      (822,NULL,168,4),
      (823,NULL,168,7),
      (824,NULL,168,8),
      (825,NULL,168,9),
      (826,NULL,168,11),
      (827,NULL,169,4),
      (828,NULL,169,7),
      (829,NULL,169,8),
      (830,NULL,169,9),
      (831,NULL,169,11),
      (832,NULL,170,4),
      (833,NULL,170,7),
      (834,NULL,170,8),
      (835,NULL,170,9),
      (836,NULL,170,11),
      (837,NULL,171,1),
      (838,NULL,171,4),
      (839,NULL,171,5),
      (840,NULL,171,7),
      (841,NULL,171,8),
      (842,NULL,171,9),
      (843,NULL,171,11),
      (844,NULL,172,1),
      (845,NULL,172,4),
      (846,NULL,172,5),
      (847,NULL,172,7),
      (848,NULL,172,8),
      (849,NULL,172,9),
      (850,NULL,172,11),
      (851,NULL,173,11),
      (852,NULL,174,2),
      (853,NULL,174,4),
      (854,NULL,174,7),
      (855,NULL,174,8),
      (856,NULL,174,9),
      (857,NULL,174,11),
      (858,NULL,175,2),
      (859,NULL,175,4),
      (860,NULL,175,7),
      (861,NULL,175,8),
      (862,NULL,175,9),
      (863,NULL,175,11),
      (864,NULL,176,2),
      (865,NULL,176,4),
      (866,NULL,176,7),
      (867,NULL,176,8),
      (868,NULL,176,9),
      (869,NULL,176,11),
      (870,NULL,177,2),
      (871,NULL,177,4),
      (872,NULL,177,7),
      (873,NULL,177,9),
      (874,NULL,177,11),
      (875,NULL,178,4),
      (876,NULL,178,7),
      (877,NULL,178,9),
      (878,NULL,178,11),
      (879,NULL,179,2),
      (880,NULL,179,4),
      (881,NULL,179,7),
      (882,NULL,179,8),
      (883,NULL,179,9),
      (884,NULL,179,11),
      (885,NULL,180,2),
      (886,NULL,180,4),
      (887,NULL,180,7),
      (888,NULL,180,8),
      (889,NULL,180,9),
      (890,NULL,180,11),
      (891,NULL,181,2),
      (892,NULL,181,4),
      (893,NULL,181,7),
      (894,NULL,181,9),
      (895,NULL,181,11),
      (896,NULL,182,4),
      (897,NULL,182,7),
      (898,NULL,182,9),
      (899,NULL,182,11),
      (900,NULL,183,2),
      (901,NULL,183,4),
      (902,NULL,183,7),
      (903,NULL,183,8),
      (904,NULL,183,9),
      (905,NULL,183,11),
      (906,NULL,184,2),
      (907,NULL,184,4),
      (908,NULL,184,7),
      (909,NULL,184,8),
      (910,NULL,184,9),
      (911,NULL,184,11),
      (912,NULL,185,2),
      (913,NULL,185,4),
      (914,NULL,185,7),
      (915,NULL,185,8),
      (916,NULL,185,9),
      (917,NULL,185,11),
      (918,NULL,186,4),
      (919,NULL,186,7),
      (920,NULL,186,8),
      (921,NULL,186,9),
      (922,NULL,186,11),
      (923,NULL,187,4),
      (924,NULL,187,7),
      (925,NULL,187,8),
      (926,NULL,187,9),
      (927,NULL,187,11),
      (928,NULL,188,2),
      (929,NULL,188,4),
      (930,NULL,188,7),
      (931,NULL,188,8),
      (932,NULL,188,9),
      (933,NULL,188,11),
      (934,NULL,189,4),
      (935,NULL,189,7),
      (936,NULL,189,8),
      (937,NULL,189,9),
      (938,NULL,189,11),
      (939,NULL,190,2),
      (940,NULL,190,4),
      (941,NULL,190,7),
      (942,NULL,190,8),
      (943,NULL,190,9),
      (944,NULL,190,11),
      (945,NULL,191,2),
      (946,NULL,191,4),
      (947,NULL,191,7),
      (948,NULL,191,8),
      (949,NULL,191,9),
      (950,NULL,191,11),
      (951,NULL,192,2),
      (952,NULL,192,4),
      (953,NULL,192,7),
      (954,NULL,192,8),
      (955,NULL,192,9),
      (956,NULL,192,11),
      (957,NULL,193,2),
      (958,NULL,193,7),
      (959,NULL,193,8),
      (960,NULL,193,9),
      (961,NULL,193,11),
      (962,NULL,194,2),
      (963,NULL,194,4),
      (964,NULL,194,7),
      (965,NULL,194,8),
      (966,NULL,194,9),
      (967,NULL,194,11),
      (968,NULL,195,1),
      (969,NULL,195,4),
      (970,NULL,195,7),
      (971,NULL,195,9),
      (972,NULL,196,2),
      (973,NULL,196,4),
      (974,NULL,196,7),
      (975,NULL,196,8),
      (976,NULL,196,9),
      (977,NULL,196,11),
      (978,NULL,197,9),
      (979,NULL,198,8),
      (980,NULL,198,9),
      (981,NULL,199,8),
      (982,NULL,199,9),
      (983,NULL,199,11),
      (984,NULL,200,7),
      (985,NULL,200,8),
      (986,NULL,200,9),
      (987,NULL,201,8),
      (988,NULL,201,9),
      (989,NULL,201,11),
      (990,NULL,202,8),
      (991,NULL,202,9),
      (992,NULL,202,11),
      (993,NULL,203,9),
      (994,NULL,203,11),
      (995,NULL,204,8),
      (996,NULL,204,9),
      (997,NULL,204,11),
      (998,NULL,205,8),
      (999,NULL,205,9),
      (1000,NULL,205,11),
      (1001,NULL,206,9),
      (1002,NULL,206,11),
      (1003,NULL,207,8),
      (1004,NULL,207,9),
      (1005,NULL,208,9),
      (1006,NULL,208,11);`,
    );

    //Create elementos
    await queryRunner.query(
      `insert into element values 
      (1,'Tablero General','TabG','....',7),
      (2,'Tablero Seccional ','TabS','....',7),
      (3,'Motor Pantalla Gigante','MotP','....',7),
      (4,'bastidor para 3 módulos','Bast','....',7),
      (5,'Luz de emergencia','LE','....',9),
      (6,'Luminaria Interior','Lum','....',9),
      (7,'Luz Riel ','LR','....',9),
      (8,'Proyector LED Color','PLcol','....',9),
      (9,'Aire acondicionado','AA','....',2),
      (10,'Calefactor tiro balanceado','CalTB','....',8),
      (11,'Calefactor Catalítico','CalC','....',8),
      (12,'Puerta Plegable','Ppleg','....',4),
      (13,'Puerta','P','....',4),
      (14,'Ventana Exterior','V','....',4),
      (15,'General','Gral','....',11),
      (16,'Zapatilla 4 bocas','Zap','....',7),
      (17,'Variador Velocidad Ventilador','Var','....',7),
      (18,'Ventilador techo','VenTe','....',7),
      (19,'Tablero Ascensor','TabAs','....',7),
      (20,'Tablero Bomba','TabB','....',7),
      (21,'Bomba centrífuga entrada agua','BomC','....',7),
      (22,'Tablero Mando','TabMan','....',3),
      (23,'Bomba aceite','BomAc','....',3),
      (24,'Cilindro','Cil','....',3),
      (25,'Fin de carrera abajo','FinC','....',3),
      (26,'Pulsador puerta abajo','Puls','....',3),
      (27,'Depósito aceite','Dep','....',3),
      (28,'Entrada de agua caño 1,5 \\"','Ent','....',1),
      (29,'Llave esclusa bomba','Llav','....',1),
      (30,'Canilla pared  1/2\\"','CanP','....',1),
      (31,'Acople anti-vibración','Acop','....',1),
      (32,'Cañería general','CañG','....',1),
      (33,'Mochila inodoro','Moc','....',1),
      (34,'Bacha porcelana','Bac','....',5),
      (35,'Mingitorio','Ming','....',5),
      (36,'Inodoro con mochila','InM','....',5),
      (37,'Inodoro con válvula','InV','....',5),
      (38,'Tomacorrientes trifásico','TCT','....',7),
      (39,'Tablero seccional de corrección F de Pot.','TabFdP','....',7),
      (40,'Canilla bacha','CanB','....',1),
      (41,'Válvula cañería nitrógeno','VálvN','....',8),
      (42,'Regulador oxigeno','RegO','....',8),
      (43,'Bañador Led RGB','Bañ','....',9),
      (44,'Tablero de control luces','TabC','....',7),
      (45,'Canilla Pulsador Mingitorio','CanM','....',1);`,
    );

    //Create activos
    // await queryRunner.query(
    //   `insert into asset values
    //   (1,'E01-110-Ce-PuM1', 'Puerta de madera', '2','22','4','1'),
    //   (2,'E01-110-Ce-PuM2', 'Puerta de madera', '2','22','4','1'),
    //   (3,'E01-110-Ce-VenM1', 'Ventana exterior', '2','22','4','2'),
    //   (4,'E01-110-Ce-VenM2', 'Ventana exterior', '2','22','4','2'),
    //   (5,'E01-110-Ce-VenM3', 'Ventana exterior', '2','22','4','2');`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`delete from user_roles where id = 1;`);
    await queryRunner.query(`delete from user_roles where id = 2;`);
    await queryRunner.query(`delete from roles where id = 1;`);
    await queryRunner.query(`delete from roles where id = 2;`);
    await queryRunner.query(`delete from users where id = 1;`);
  }
}

// export class CreateBasicSetup1570143571796 implements MigrationInterface {
//   name = 'CreateBasicSetup1570143571796';
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     //Create roles
//     await queryRunner.query(`insert into roles values (1, 'admin');`);
//     await queryRunner.query(`insert into roles values (2, 'personal');`);
//     await queryRunner.query(`insert into roles values (3, 'user');`);
//     //Create users
//     await queryRunner.query(
//       `insert into users values
//       (1,'admin','admin','admin@gams.com','$2a$08$4dFb7Jq.o4bbpp.oohEFFOWUOhDKntZI2DEMC2yXIKe.BuhS.HKvu','active','2020-04-26 20:19:12.267999','2020-04-26 20:19:12.267999'),
//       (2,'Lucas','Ringelsten','riki@gams.com','$2a$08$VU2CJVBE6rib8KHYcapwq.GGiZ46MUO3CSGZp3kAGYq3A4eR9PsMC','active','2020-04-26 20:23:19.958672','2020-04-26 20:23:19.958672'),
//       (4,'Joel','Mercol','joelmercol@gmail.com','$2a$08$LL2y3W.QMgkrGCPevA31EOeu.WoasXd.9b7AzxYP4tqE7xJTKYIby','active','2020-07-09 00:06:22.621727','2020-07-09 00:06:22.621727');`,
//     );
//
//     //Create user_roles
//     await queryRunner.query(`insert into user_roles values (1,1,1);`);
//     await queryRunner.query(`insert into user_roles values (2,1,2);`);
//     await queryRunner.query(`insert into user_roles values (3,1,3);`);
//     await queryRunner.query(`insert into user_roles values (5,4,1);`);
//     await queryRunner.query(`insert into user_roles values (6,2,1);`);
//
//     //Create sectors
//     await queryRunner.query(`insert into sector values (1, 'Campus deportes', 'CD', NULL);`);
//     await queryRunner.query(`insert into sector values (2, 'Edificio principal', 'E01', NULL);`);
//     await queryRunner.query(`insert into sector values (3, 'Cuarto nivel', 'E02', NULL);`);
//     await queryRunner.query(`insert into sector values (4, 'Biblioteca y Cooperadora', 'E03', NULL);`);
//     await queryRunner.query(`insert into sector values (5, 'Laboratorio Quimica', 'E04', NULL);`);
//     await queryRunner.query(`insert into sector values (6, 'Laboratorio Electromecanica', 'E05', NULL);`);
//     await queryRunner.query(`insert into sector values (7, 'Laboratorio Fisica Lar Sistemas', 'E06', NULL);`);
//     await queryRunner.query(`insert into sector values (8, 'Laboratorio Electronica', 'E07', NULL);`);
//     await queryRunner.query(
//       `insert into sector values (9, 'Taller Mantenimiento y Servicios Generales', 'E08', NULL);`,
//     );
//     await queryRunner.query(`insert into sector values (10, 'Dasuten', 'E09', NULL);`);
//     await queryRunner.query(`insert into sector values (11, 'Comedor universitario', 'E10', NULL);`);
//     await queryRunner.query(`insert into sector values (12, 'Secyt', 'E11', NULL);`);
//     await queryRunner.query(`insert into sector values (13, 'Quincho CEUT', 'E12', NULL);`);
//     await queryRunner.query(`insert into sector values (14, 'Portico', 'E13', NULL);`);
//     await queryRunner.query(`insert into sector values (17, 'Patio interno', 'P01', NULL);`);
//     await queryRunner.query(`insert into sector values (15, 'Parque frente', 'P02', NULL);`);
//     await queryRunner.query(`insert into sector values (16, 'Parque sur', 'P03', NULL);`);
//     await queryRunner.query(`insert into sector values (18, 'Parque playon', 'P04', NULL);`);
//     await queryRunner.query(`insert into sector values (19, 'Parque laboratorios exteriores', 'Plab', NULL);`);
//     await queryRunner.query(`insert into sector values (20, 'Parque estacionamiento', 'P05', NULL);`);
//
//     //Create Services
//     await queryRunner.query(`insert into service values (1, 'Agua potable', 'Ag');`);
//     await queryRunner.query(`insert into service values (2, 'Aire acondicionado', 'AA');`);
//     await queryRunner.query(`insert into service values (3, 'Ascensor', 'Asc');`);
//     await queryRunner.query(`insert into service values (4, 'Cerramiento', 'Ce');`);
//     await queryRunner.query(`insert into service values (5, 'Cloacas', 'Cl');`);
//     await queryRunner.query(`insert into service values (11, 'Edilicio', 'Ed');`);
//     await queryRunner.query(`insert into service values (7, 'Energia Electrica', 'EE');`);
//     await queryRunner.query(`insert into service values (8, 'Gas', 'G');`);
//     await queryRunner.query(`insert into service values (9, 'Iluminacion', 'Ilum');`);
//
//     //Create Products
//     await queryRunner.query(`insert into product values(1, 'Adaptador 2p a 3p');`);
//     await queryRunner.query(`insert into product values(2, 'Adaptador 3p a 2p');`);
//     await queryRunner.query(`insert into product values(3, 'Arrancador');`);
//     await queryRunner.query(`insert into product values(4, 'Balasto 18 / 26 W');`);
//     await queryRunner.query(`insert into product values(5, 'Balasto 30 W');`);
//     await queryRunner.query(`insert into product values(6, 'Balasto 36 W');`);
//     await queryRunner.query(`insert into product values(7, 'Balasto SAP 400 W');`);
//     await queryRunner.query(`insert into product values(8, 'Base arrancadores');`);
//     await queryRunner.query(`insert into product values(9, 'Base dicroica');`);
//     await queryRunner.query(`insert into product values(10, 'Base fotocélula');`);
//     await queryRunner.query(`insert into product values(11, 'Base fusible 160 A');`);
//     await queryRunner.query(`insert into product values(12, 'Base módulo riel DIN');`);
//     await queryRunner.query(`insert into product values(13, 'Bastidor oculto 5 x 10 cm');`);
//     await queryRunner.query(`insert into product values(14, 'Bornera 4mm');`);
//     await queryRunner.query(`insert into product values(15, 'Caja exterior p/bast 5 x 10 cm');`);
//     await queryRunner.query(`insert into product values(16, 'Capacitor 1,2 μF');`);
//     await queryRunner.query(`insert into product values(17, 'Capacitor 10 μF');`);
//     await queryRunner.query(`insert into product values(18, 'Capacitor 12,5 μF');`);
//     await queryRunner.query(`insert into product values(19, 'Capacitor 2 μF');`);
//     await queryRunner.query(`insert into product values(20, 'Capacitor 2,5 μF');`);
//     await queryRunner.query(`insert into product values(21, 'Capacitor 3,6 μF');`);
//     await queryRunner.query(`insert into product values(22, 'Capacitor 33 μF');`);
//     await queryRunner.query(`insert into product values(23, 'Capacitor 4 μF');`);
//     await queryRunner.query(`insert into product values(24, 'Cinta aisladora 20m');`);
//     await queryRunner.query(`insert into product values(25, 'Conector jabalina PAT');`);
//     await queryRunner.query(`insert into product values(26, 'Dicroica LED');`);
//     await queryRunner.query(`insert into product values(27, 'Disyuntor diferencial 2 x 25 A');`);
//     await queryRunner.query(`insert into product values(28, 'Ficha hembra 2p 10 A');`);
//     await queryRunner.query(`insert into product values(29, 'Ficha hembra bi-uso 10 A');`);
//     await queryRunner.query(`insert into product values(30, 'Ficha macho 2p 10 A');`);
//     await queryRunner.query(`insert into product values(31, 'Ficha macho 3p 10 A');`);
//     await queryRunner.query(`insert into product values(32, 'Foco BC 20 W');`);
//     await queryRunner.query(`insert into product values(33, 'Foco BC 32 W');`);
//     await queryRunner.query(`insert into product values(34, 'Foco BC 65 W');`);
//     await queryRunner.query(`insert into product values(35, 'Foco LED 10 W');`);
//     await queryRunner.query(`insert into product values(36, 'Foco LED 15 W');`);
//     await queryRunner.query(`insert into product values(37, 'Foco LED 35 W');`);
//     await queryRunner.query(`insert into product values(38, 'Foco LED 9 W');`);
//     await queryRunner.query(`insert into product values(39, 'Fotocélula');`);
//     await queryRunner.query(`insert into product values(40, 'Fotocontrol electrónico');`);
//     await queryRunner.query(`insert into product values(41, 'Fusible NH 36 A');`);
//     await queryRunner.query(`insert into product values(42, 'Fusiblera 10 A');`);
//     await queryRunner.query(`insert into product values(43, 'Lámpara HQI 400 W');`);
//     await queryRunner.query(`insert into product values(44, 'Lámpara incandescente 150 W');`);
//     await queryRunner.query(`insert into product values(45, 'Lampara spot LED 16 W');`);
//     await queryRunner.query(`insert into product values(46, 'Módulo ciega');`);
//     await queryRunner.query(`insert into product values(47, 'Módulo ciega + prensa cable');`);
//     await queryRunner.query(`insert into product values(48, 'Módulo internet');`);
//     await queryRunner.query(`insert into product values(49, 'Módulo tecla 1p 10 A');`);
//     await queryRunner.query(`insert into product values(50, 'Módulo tecla 1p 16 A');`);
//     await queryRunner.query(`insert into product values(51, 'Módulo Teléfono');`);
//     await queryRunner.query(`insert into product values(52, 'Módulo toma 10 A');`);
//     await queryRunner.query(`insert into product values(53, 'Módulo toma 20 A');`);
//     await queryRunner.query(`insert into product values(54, 'Módulo Variador velocidad ventilador');`);
//     await queryRunner.query(`insert into product values(55, 'Proyector LED 100 W');`);
//     await queryRunner.query(`insert into product values(56, 'Proyector LED 50 W');`);
//     await queryRunner.query(`insert into product values(57, 'Simil 2 tubos fluor. LED 36 W');`);
//     await queryRunner.query(`insert into product values(58, 'Tablero exterior 12 bocas');`);
//     await queryRunner.query(`insert into product values(59, 'Tablero exterior 5 bocas');`);
//     await queryRunner.query(`insert into product values(60, 'Tapa blanca p/bast 5 x 10 cm');`);
//     await queryRunner.query(`insert into product values(61, 'Tapa ciega 5 x 10 cm');`);
//     await queryRunner.query(`insert into product values(62, 'Tapa redonda caja octogonal');`);
//     await queryRunner.query(`insert into product values(63, 'Termomagnética 1  x 10 A');`);
//     await queryRunner.query(`insert into product values(64, 'Termomagnética 1 x 16 A');`);
//     await queryRunner.query(`insert into product values(65, 'Termomagnética 1 x 20');`);
//     await queryRunner.query(`insert into product values(66, 'Termomágnetica 1 x 6 A');`);
//     await queryRunner.query(`insert into product values(67, 'Termomagnética 2 x 10 A');`);
//     await queryRunner.query(`insert into product values(68, 'Termomagnética 2 x 16 A');`);
//     await queryRunner.query(`insert into product values(69, 'Termomagnética 2 x 20 A');`);
//     await queryRunner.query(`insert into product values(70, 'Termomagnética 2 x 25 A');`);
//     await queryRunner.query(`insert into product values(71, 'Termomagnética 3 x 200 A');`);
//     await queryRunner.query(`insert into product values(72, 'Termomagnética 3 x 63 A');`);
//     await queryRunner.query(`insert into product values(73, 'Triple');`);
//     await queryRunner.query(`insert into product values(74, 'Tubo fluorescente 105 W');`);
//     await queryRunner.query(`insert into product values(75, 'Tubo fluorescente 18 W');`);
//     await queryRunner.query(`insert into product values(76, 'Tubo fluorescente 36 W');`);
//     await queryRunner.query(`insert into product values(77, 'Tubo LED 18 W');`);
//     await queryRunner.query(`insert into product values(78, 'Tubo LED 20 W');`);
//     await queryRunner.query(`insert into product values(79, 'Variador velocidad ventilador');`);
//     await queryRunner.query(`insert into product values(80, 'Velas 26 W');`);
//     await queryRunner.query(`insert into product values(81, 'Velas 36 W');`);
//     await queryRunner.query(`insert into product values(82, 'Zapatillas 5 bocas');`);
//     await queryRunner.query(`insert into product values(83, 'Zócalo tubo 105 W');`);
//     await queryRunner.query(`insert into product values(84, 'Zocalo tubo 36 W');`);
//
//     //Create Areas
//     await queryRunner.query(`insert into area values (22,'Administración','110',2);`);
//     await queryRunner.query(`insert into area values (23,'Ala Este','02',12);`);
//     await queryRunner.query(`insert into area values (24,'Ala Oeste','03',12);`);
//     await queryRunner.query(`insert into area values (26,'Antebaño','05',9);`);
//     await queryRunner.query(`insert into area values (27,'Antebaño','04',10);`);
//     await queryRunner.query(`insert into area values (28,'Apoyo Academico','06',2);`);
//     await queryRunner.query(`insert into area values (29,'Asador','08',11);`);
//     await queryRunner.query(`insert into area values (30,'Atención Publico Tics','121',2);`);
//     await queryRunner.query(`insert into area values (31,'Aula','04',8);`);
//     await queryRunner.query(`insert into area values (32,'Aula 10','10',2);`);
//     await queryRunner.query(`insert into area values (33,'Aula 106','106',2);`);
//     await queryRunner.query(`insert into area values (34,'Aula 107','107',2);`);
//     await queryRunner.query(`insert into area values (35,'Aula 11','11',2);`);
//     await queryRunner.query(`insert into area values (36,'Aula 115','115',2);`);
//     await queryRunner.query(`insert into area values (37,'Aula 116','116',2);`);
//     await queryRunner.query(`insert into area values (38,'Aula 117','117',2);`);
//     await queryRunner.query(`insert into area values (39,'Aula 118','118',2);`);
//     await queryRunner.query(`insert into area values (40,'Aula 119','119',2);`);
//     await queryRunner.query(`insert into area values (41,'Aula 13','13',2);`);
//     await queryRunner.query(`insert into area values (42,'Aula 14','14',2);`);
//     await queryRunner.query(`insert into area values (43,'Aula 15','15',2);`);
//     await queryRunner.query(`insert into area values (44,'Aula 18','18',2);`);
//     await queryRunner.query(`insert into area values (45,'Aula 21','21',2);`);
//     await queryRunner.query(`insert into area values (46,'Aula 22','22',2);`);
//     await queryRunner.query(`insert into area values (47,'Aula 23','23',2);`);
//     await queryRunner.query(`insert into area values (48,'Aula 24','24',2);`);
//     await queryRunner.query(`insert into area values (49,'Aula 25','25',2);`);
//     await queryRunner.query(`insert into area values (50,'Aula 25','04',3);`);
//     await queryRunner.query(`insert into area values (51,'Aula 26','26',2);`);
//     await queryRunner.query(`insert into area values (52,'Aula 27','27',2);`);
//     await queryRunner.query(`insert into area values (53,'Aula 28','28',2);`);
//     await queryRunner.query(`insert into area values (54,'Aula 29','29',2);`);
//     await queryRunner.query(`insert into area values (55,'Aula A','AA',3);`);
//     await queryRunner.query(`insert into area values (56,'Aula B','AB',3);`);
//     await queryRunner.query(`insert into area values (57,'Aula C','AC',3);`);
//     await queryRunner.query(`insert into area values (58,'Aula Este','01',6);`);
//     await queryRunner.query(`insert into area values (59,'Aula ex-taller','38',2);`);
//     await queryRunner.query(`insert into area values (60,'Aula LAR','04',7);`);
//     await queryRunner.query(`insert into area values (61,'Aula Oeste','02',6);`);
//     await queryRunner.query(`insert into area values (62,'Aula Taller','03',8);`);
//     await queryRunner.query(`insert into area values (63,'Aula Videoconferencia','126',2);`);
//     await queryRunner.query(`insert into area values (64,'Aula Virtual','120',2);`);
//     await queryRunner.query(`insert into area values (65,'Baño','02',8);`);
//     await queryRunner.query(`insert into area values (66,'Baño','06',9);`);
//     await queryRunner.query(`insert into area values (67,'Baño','05',10);`);
//     await queryRunner.query(`insert into area values (68,'Baño Capapacidad Diferente','05',3);`);
//     await queryRunner.query(`insert into area values (69,'Baño Capapacidad Diferente','07',11);`);
//     await queryRunner.query(`insert into area values (70,'Baño Capapacidad Diferente','07',12);`);
//     await queryRunner.query(`insert into area values (71,'Baño Capapacidad Diferente PB','36',2);`);
//     await queryRunner.query(`insert into area values (72,'Baño Damas','05',12);`);
//     await queryRunner.query(`insert into area values (73,'Baño Damas','05',11);`);
//     await queryRunner.query(`insert into area values (74,'Baño Decanato - Deposito','103',2);`);
//     await queryRunner.query(`insert into area values (75,'Baño Docentes Mujeres','35',2);`);
//     await queryRunner.query(`insert into area values (76,'Baño Docentes Hombres','34',2);`);
//     await queryRunner.query(`insert into area values (77,'Baño Guardia','BG',14);`);
//     await queryRunner.query(`insert into area values (78,'Baño H PA','BHPA',2);`);
//     await queryRunner.query(`insert into area values (79,'Baño H PB','37',2);`);
//     await queryRunner.query(`insert into area values (80,'Baño Hombres','06',4);`);
//     await queryRunner.query(`insert into area values (81,'Baño Hombres','06',11);`);
//     await queryRunner.query(`insert into area values (82,'Baño Hombres','06',12);`);
//     await queryRunner.query(`insert into area values (83,'Baño Hombres','08',3);`);
//     await queryRunner.query(`insert into area values (84,'Baño Hombres','10',5);`);
//     await queryRunner.query(`insert into area values (85,'Baño Hombres','07',7);`);
//     await queryRunner.query(`insert into area values (86,'Baño M PA','BMPA',2);`);
//     await queryRunner.query(`insert into area values (87,'Baño M PB','35',2);`);
//     await queryRunner.query(`insert into area values (88,'Baño Mujeres','07',3);`);
//     await queryRunner.query(`insert into area values (89,'Baño Mujeres','07',4);`);
//     await queryRunner.query(`insert into area values (90,'Baño Mujeres','09',5);`);
//     await queryRunner.query(`insert into area values (91,'Baño Mujeres','08',7);`);
//     await queryRunner.query(`insert into area values (92,'Biblioteca','01',4);`);
//     await queryRunner.query(`insert into area values (93,'Bomba & Ascensor','32',2);`);
//     await queryRunner.query(`insert into area values (94,'Calle Salida','CS',15);`);
//     await queryRunner.query(`insert into area values (95,'Cocina','06',3);`);
//     await queryRunner.query(`insert into area values (96,'Cocina','06',10);`);
//     await queryRunner.query(`insert into area values (97,'Cocina','08',12);`);
//     await queryRunner.query(`insert into area values (98,'Cocina Cantina','02',11);`);
//     await queryRunner.query(`insert into area values (99,'Comedor','03',9);`);
//     await queryRunner.query(`insert into area values (100,'Consultorio Norte ','03',10);`);
//     await queryRunner.query(`insert into area values (101,'Consultorio Sur','02',10);`);
//     await queryRunner.query(`insert into area values (102,'cooperadora','03',4);`);
//     await queryRunner.query(`insert into area values (103,'Decanato','101',2);`);
//     await queryRunner.query(`insert into area values (104,'Departamento de Alumnos','05',2);`);
//     await queryRunner.query(`insert into area values (105,'Departamento de Electromecanica','04',6);`);
//     await queryRunner.query(`insert into area values (106,'Departamento de Sistemas y Basicas','104',2);`);
//     await queryRunner.query(`insert into area values (107,'Deposito de Trab. Finales','04',4);`);
//     await queryRunner.query(`insert into area values (108,'Deposito Alumnos','08',2);`);
//     await queryRunner.query(`insert into area values (109,'Deposito Aula 119','D119',2);`);
//     await queryRunner.query(`insert into area values (110,'Deposito Deportes','05',6);`);
//     await queryRunner.query(`insert into area values (111,'Deposito Electromecanica','06',6);`);
//     await queryRunner.query(`insert into area values (112,'Deposito de Serv. Grales ','09',2);`);
//     await queryRunner.query(`insert into area values (113,'Deposito de Tableros','07',6);`);
//     await queryRunner.query(`insert into area values (114,'Deposito de Tics','125',2);`);
//     await queryRunner.query(`insert into area values (115,'Direccion Academica','04',2);`);
//     await queryRunner.query(`insert into area values (116,'Dirección RR HH','108',2);`);
//     await queryRunner.query(`insert into area values (117,'Droguero','08',5);`);
//     await queryRunner.query(`insert into area values (118,'Escalera 1','Esc01',2);`);
//     await queryRunner.query(`insert into area values (119,'Escalera 2','Esc02',2);`);
//     await queryRunner.query(`insert into area values (120,'Escalera 3','Esc03',2);`);
//     await queryRunner.query(`insert into area values (121,'Exterior','Ext',14);`);
//     await queryRunner.query(`insert into area values (122,'Fadgut','114',2);`);
//     await queryRunner.query(`insert into area values (123,'Fotocopiadora','30',2);`);
//     await queryRunner.query(`insert into area values (124,'Generador','Gen',14);`);
//     await queryRunner.query(`insert into area values (125,'GISEner','201',2);`);
//     await queryRunner.query(`insert into area values (126,'Grupo Diseño','03',6);`);
//     await queryRunner.query(`insert into area values (127,'Hall','01',8);`);
//     await queryRunner.query(`insert into area values (128,'Hall','01',5);`);
//     await queryRunner.query(`insert into area values (129,'Hall','05',4);`);
//     await queryRunner.query(`insert into area values (130,'Hall','01',3);`);
//     await queryRunner.query(`insert into area values (131,'Hall - Pasillo','01',7);`);
//     await queryRunner.query(`insert into area values (132,'Hall - Atención','01',10);`);
//     await queryRunner.query(`insert into area values (133,'Hall Ingreso','09',12);`);
//     await queryRunner.query(`insert into area values (134,'Hall LAR','02',7);`);
//     await queryRunner.query(`insert into area values (135,'Ingreso Peatonal','IP',14);`);
//     await queryRunner.query(`insert into area values (136,'Ingreso Vehicular','IV',14);`);
//     await queryRunner.query(`insert into area values (137,'Lab. Fisica','05',7);`);
//     await queryRunner.query(`insert into area values (138,'Lab. Organica','07',5);`);
//     await queryRunner.query(`insert into area values (139,'Lab. Quimica Gral','02',5);`);
//     await queryRunner.query(`insert into area values (140,'Lab. Servicios','06',5);`);
//     await queryRunner.query(`insert into area values (141,'Lab. Sistemas','06',7);`);
//     await queryRunner.query(`insert into area values (142,'Lab. Cedi','112',2);`);
//     await queryRunner.query(`insert into area values (143,'Lab. Computación','113',2);`);
//     await queryRunner.query(`insert into area values (144,'Lab. Fagdut','111',2);`);
//     await queryRunner.query(`insert into area values (145,'Letras Hormigón','UTN',14);`);
//     await queryRunner.query(`insert into area values (146,'Mesa de Entrada y SEU','02',2);`);
//     await queryRunner.query(`insert into area values (147,'Microbiologia','17',2);`);
//     await queryRunner.query(`insert into area values (148,'Microbiologia','05',5);`);
//     await queryRunner.query(`insert into area values (149,'MUIC','202',2);`);
//     await queryRunner.query(`insert into area values (150,'Observatorio','203',2);`);
//     await queryRunner.query(`insert into area values (151,'Oficina de Atencion Posgrado ','02',3);`);
//     await queryRunner.query(`insert into area values (152,'Oficina Guardia','OfG',14);`);
//     await queryRunner.query(`insert into area values (153,'Oficina Jefe','02',9);`);
//     await queryRunner.query(`insert into area values (154,'Oficina Secyt','01',12);`);
//     await queryRunner.query(`insert into area values (155,'Oficina de Servicios Generales','33',2);`);
//     await queryRunner.query(`insert into area values (156,'Oficina Tecnica','04',9);`);
//     await queryRunner.query(`insert into area values (157,'Oficina Tics','123',2);`);
//     await queryRunner.query(`insert into area values (158,'Paneles Solares','204',2);`);
//     await queryRunner.query(`insert into area values (159,'Parque','Par',15);`);
//     await queryRunner.query(`insert into area values (160,'Parque','Par',1);`);
//     await queryRunner.query(`insert into area values (161,'Pasillo Baños','09',3);`);
//     await queryRunner.query(`insert into area values (162,'Pasillo Baños','07.1',11);`);
//     await queryRunner.query(`insert into area values (163,'Pasillo Deposito de Cantina','02.1',11);`);
//     await queryRunner.query(`insert into area values (164,'Pasillo Este Planta Alta','PE-PA',2);`);
//     await queryRunner.query(`insert into area values (165,'Pasillo Este Planta Baja','PE-PB',2);`);
//     await queryRunner.query(`insert into area values (166,'Pasillo Interno de Microbiologia','11',5);`);
//     await queryRunner.query(`insert into area values (167,'Pasillo Norte Planta Baja','PN-PB',2);`);
//     await queryRunner.query(`insert into area values (168,'Pasillo Oeste Planta Alta','PO-PA',2);`);
//     await queryRunner.query(`insert into area values (169,'Pasillo Sur Planta Alta','PS-PA',2);`);
//     await queryRunner.query(`insert into area values (170,'Pasillo Sur Planta Baja','PS-PB',2);`);
//     await queryRunner.query(`insert into area values (171,'Planta Piloto','03',2);`);
//     await queryRunner.query(`insert into area values (172,'Polimeros','16',2);`);
//     await queryRunner.query(`insert into area values (173,'Quincho','Quin',13);`);
//     await queryRunner.query(`insert into area values (174,'RRHH','109',2);`);
//     await queryRunner.query(`insert into area values (175,'SAC','07',2);`);
//     await queryRunner.query(`insert into area values (176,'SAE','31',2);`);
//     await queryRunner.query(`insert into area values (177,'Sala Cantina','01',11);`);
//     await queryRunner.query(`insert into area values (178,'Sala de Balanzas','04',5);`);
//     await queryRunner.query(`insert into area values (179,'Sala de Lectura','02',4);`);
//     await queryRunner.query(`insert into area values (180,'Sala de Reuniones','05',8);`);
//     await queryRunner.query(`insert into area values (181,'Sala de Servidores','124',2);`);
//     await queryRunner.query(`insert into area values (182,'Sala Guardia','SG',14);`);
//     await queryRunner.query(`insert into area values (183,'Sala Pedro Santillan','03',11);`);
//     await queryRunner.query(`insert into area values (184,'Sala Profesores','105',2);`);
//     await queryRunner.query(`insert into area values (185,'Sala ','04',12);`);
//     await queryRunner.query(`insert into area values (186,'Sala Reuniones LAR','03',7);`);
//     await queryRunner.query(`insert into area values (187,'Sala Reuniones Polimeros','12',2);`);
//     await queryRunner.query(`insert into area values (188,'Salon Comedor','04',11);`);
//     await queryRunner.query(`insert into area values (189,'Salon de Actos','01',2);`);
//     await queryRunner.query(`insert into area values (190,'Secretaria Decanato','100',2);`);
//     await queryRunner.query(`insert into area values (191,'Secretaria General','102',2);`);
//     await queryRunner.query(`insert into area values (192,'Secretaria Posgrados','03',3);`);
//     await queryRunner.query(`insert into area values (193,'Secretaria Tics','122',2);`);
//     await queryRunner.query(`insert into area values (194,'SEU','03',2);`);
//     await queryRunner.query(`insert into area values (195,'Taller','01',9);`);
//     await queryRunner.query(`insert into area values (196,'Uces','20',2);`);
//     await queryRunner.query(`insert into area values (197,'Vereda Peatonal','VP',15);`);
//     await queryRunner.query(`insert into area values (198,'Vereda Perimetral','06',8);`);
//     await queryRunner.query(`insert into area values (199,'Vereda Perimetral','07',10);`);
//     await queryRunner.query(`insert into area values (200,'Vereda Perimetral','VP',2);`);
//     await queryRunner.query(`insert into area values (201,'Vereda Perimetral','08',4);`);
//     await queryRunner.query(`insert into area values (202,'Vereda Perimetral','08',6);`);
//     await queryRunner.query(`insert into area values (203,'Vereda Perimetral','09',11);`);
//     await queryRunner.query(`insert into area values (204,'Vereda Perimetral','10',3);`);
//     await queryRunner.query(`insert into area values (205,'Vereda Perimetral','10',12);`);
//     await queryRunner.query(`insert into area values (206,'Vereda Perimetral','12',5);`);
//     await queryRunner.query(`insert into area values (207,'Vereda Perimetral','09',7);`);
//     await queryRunner.query(`insert into area values (208,'Vereda Perimetral','07',9);`);
//
//     //Create Areas-Services
//     await queryRunner.query(`insert into area_service values(113,NULL,22,1);`);
//     await queryRunner.query(`insert into area_service values(114,NULL,22,2);`);
//     await queryRunner.query(`insert into area_service values(115,NULL,22,4);`);
//     await queryRunner.query(`insert into area_service values(116,NULL,22,5);`);
//     await queryRunner.query(`insert into area_service values(117,NULL,22,7);`);
//     await queryRunner.query(`insert into area_service values(118,NULL,22,8);`);
//     await queryRunner.query(`insert into area_service values(119,NULL,22,9);`);
//     await queryRunner.query(`insert into area_service values(120,NULL,22,11);`);
//     await queryRunner.query(`insert into area_service values(121,NULL,23,2);`);
//     await queryRunner.query(`insert into area_service values(122,NULL,23,4);`);
//     await queryRunner.query(`insert into area_service values(123,NULL,23,7);`);
//     await queryRunner.query(`insert into area_service values(124,NULL,23,8);`);
//     await queryRunner.query(`insert into area_service values(125,NULL,23,9);`);
//     await queryRunner.query(`insert into area_service values(126,NULL,23,11);`);
//     await queryRunner.query(`insert into area_service values(127,NULL,24,2);`);
//     await queryRunner.query(`insert into area_service values(128,NULL,24,4);`);
//     await queryRunner.query(`insert into area_service values(129,NULL,24,7);`);
//     await queryRunner.query(`insert into area_service values(130,NULL,24,8);`);
//     await queryRunner.query(`insert into area_service values(131,NULL,24,9);`);
//     await queryRunner.query(`insert into area_service values(132,NULL,24,11);`);
//     await queryRunner.query(`insert into area_service values(138,NULL,26,1);`);
//     await queryRunner.query(`insert into area_service values(139,NULL,26,4);`);
//     await queryRunner.query(`insert into area_service values(140,NULL,26,5);`);
//     await queryRunner.query(`insert into area_service values(141,NULL,26,7);`);
//     await queryRunner.query(`insert into area_service values(142,NULL,26,9);`);
//     await queryRunner.query(`insert into area_service values(143,NULL,26,11);`);
//     await queryRunner.query(`insert into area_service values(144,NULL,27,1);`);
//     await queryRunner.query(`insert into area_service values(145,NULL,27,4);`);
//     await queryRunner.query(`insert into area_service values(146,NULL,27,5);`);
//     await queryRunner.query(`insert into area_service values(147,NULL,27,7);`);
//     await queryRunner.query(`insert into area_service values(148,NULL,27,9);`);
//     await queryRunner.query(`insert into area_service values(149,NULL,27,11);`);
//     await queryRunner.query(`insert into area_service values(150,NULL,28,2);`);
//     await queryRunner.query(`insert into area_service values(151,NULL,28,4);`);
//     await queryRunner.query(`insert into area_service values(152,NULL,28,7);`);
//     await queryRunner.query(`insert into area_service values(153,NULL,28,8);`);
//     await queryRunner.query(`insert into area_service values(154,NULL,28,9);`);
//     await queryRunner.query(`insert into area_service values(155,NULL,28,11);`);
//     await queryRunner.query(`insert into area_service values(156,NULL,29,1);`);
//     await queryRunner.query(`insert into area_service values(157,NULL,29,5);`);
//     await queryRunner.query(`insert into area_service values(158,NULL,30,4);`);
//     await queryRunner.query(`insert into area_service values(159,NULL,30,7);`);
//     await queryRunner.query(`insert into area_service values(160,NULL,30,9);`);
//     await queryRunner.query(`insert into area_service values(161,NULL,30,11);`);
//     await queryRunner.query(`insert into area_service values(162,NULL,31,2);`);
//     await queryRunner.query(`insert into area_service values(163,NULL,31,4);`);
//     await queryRunner.query(`insert into area_service values(164,NULL,31,7);`);
//     await queryRunner.query(`insert into area_service values(165,NULL,31,8);`);
//     await queryRunner.query(`insert into area_service values(166,NULL,31,9);`);
//     await queryRunner.query(`insert into area_service values(167,NULL,32,4);`);
//     await queryRunner.query(`insert into area_service values(168,NULL,32,7);`);
//     await queryRunner.query(`insert into area_service values(169,NULL,32,9);`);
//     await queryRunner.query(`insert into area_service values(170,NULL,32,11);`);
//     await queryRunner.query(`insert into area_service values(171,NULL,33,4);`);
//     await queryRunner.query(`insert into area_service values(172,NULL,33,7);`);
//     await queryRunner.query(`insert into area_service values(173,NULL,33,8);`);
//     await queryRunner.query(`insert into area_service values(174,NULL,33,9);`);
//     await queryRunner.query(`insert into area_service values(175,NULL,33,11);`);
//     await queryRunner.query(`insert into area_service values(176,NULL,34,4);`);
//     await queryRunner.query(`insert into area_service values(177,NULL,34,7);`);
//     await queryRunner.query(`insert into area_service values(178,NULL,34,8);`);
//     await queryRunner.query(`insert into area_service values(179,NULL,34,9);`);
//     await queryRunner.query(`insert into area_service values(180,NULL,34,11);`);
//     await queryRunner.query(`insert into area_service values(181,NULL,35,4);`);
//     await queryRunner.query(`insert into area_service values(182,NULL,35,7);`);
//     await queryRunner.query(`insert into area_service values(183,NULL,35,8);`);
//     await queryRunner.query(`insert into area_service values(184,NULL,35,9);`);
//     await queryRunner.query(`insert into area_service values(185,NULL,35,11);`);
//     await queryRunner.query(`insert into area_service values(186,NULL,36,4);`);
//     await queryRunner.query(`insert into area_service values(187,NULL,36,7);`);
//     await queryRunner.query(`insert into area_service values(188,NULL,36,8);`);
//     await queryRunner.query(`insert into area_service values(189,NULL,36,9);`);
//     await queryRunner.query(`insert into area_service values(190,NULL,36,11);`);
//     await queryRunner.query(`insert into area_service values(191,NULL,37,4);`);
//     await queryRunner.query(`insert into area_service values(192,NULL,37,7);`);
//     await queryRunner.query(`insert into area_service values(193,NULL,37,8);`);
//     await queryRunner.query(`insert into area_service values(194,NULL,37,9);`);
//     await queryRunner.query(`insert into area_service values(195,NULL,37,11);`);
//     await queryRunner.query(`insert into area_service values(196,NULL,38,4);`);
//     await queryRunner.query(`insert into area_service values(197,NULL,38,7);`);
//     await queryRunner.query(`insert into area_service values(198,NULL,38,8);`);
//     await queryRunner.query(`insert into area_service values(199,NULL,38,9);`);
//     await queryRunner.query(`insert into area_service values(200,NULL,38,11);`);
//     await queryRunner.query(`insert into area_service values(201,NULL,39,4);`);
//     await queryRunner.query(`insert into area_service values(202,NULL,39,7);`);
//     await queryRunner.query(`insert into area_service values(203,NULL,39,8);`);
//     await queryRunner.query(`insert into area_service values(204,NULL,39,9);`);
//     await queryRunner.query(`insert into area_service values(205,NULL,39,11);`);
//     await queryRunner.query(`insert into area_service values(206,NULL,40,4);`);
//     await queryRunner.query(`insert into area_service values(207,NULL,40,7);`);
//     await queryRunner.query(`insert into area_service values(208,NULL,40,8);`);
//     await queryRunner.query(`insert into area_service values(209,NULL,40,9);`);
//     await queryRunner.query(`insert into area_service values(210,NULL,40,11);`);
//     await queryRunner.query(`insert into area_service values(211,NULL,41,4);`);
//     await queryRunner.query(`insert into area_service values(212,NULL,41,7);`);
//     await queryRunner.query(`insert into area_service values(213,NULL,41,8);`);
//     await queryRunner.query(`insert into area_service values(214,NULL,41,9);`);
//     await queryRunner.query(`insert into area_service values(215,NULL,41,11);`);
//     await queryRunner.query(`insert into area_service values(216,NULL,42,4);`);
//     await queryRunner.query(`insert into area_service values(217,NULL,42,7);`);
//     await queryRunner.query(`insert into area_service values(218,NULL,42,8);`);
//     await queryRunner.query(`insert into area_service values(219,NULL,42,9);`);
//     await queryRunner.query(`insert into area_service values(220,NULL,42,11);`);
//     await queryRunner.query(`insert into area_service values(221,NULL,43,1);`);
//     await queryRunner.query(`insert into area_service values(222,NULL,43,4);`);
//     await queryRunner.query(`insert into area_service values(223,NULL,43,5);`);
//     await queryRunner.query(`insert into area_service values(224,NULL,43,7);`);
//     await queryRunner.query(`insert into area_service values(225,NULL,43,8);`);
//     await queryRunner.query(`insert into area_service values(226,NULL,43,9);`);
//     await queryRunner.query(`insert into area_service values(227,NULL,43,11);`);
//     await queryRunner.query(`insert into area_service values(228,NULL,44,4);`);
//     await queryRunner.query(`insert into area_service values(229,NULL,44,7);`);
//     await queryRunner.query(`insert into area_service values(230,NULL,44,9);`);
//     await queryRunner.query(`insert into area_service values(231,NULL,44,11);`);
//     await queryRunner.query(`insert into area_service values(232,NULL,45,4);`);
//     await queryRunner.query(`insert into area_service values(233,NULL,45,7);`);
//     await queryRunner.query(`insert into area_service values(234,NULL,45,8);`);
//     await queryRunner.query(`insert into area_service values(235,NULL,45,9);`);
//     await queryRunner.query(`insert into area_service values(236,NULL,45,11);`);
//     await queryRunner.query(`insert into area_service values(237,NULL,46,4);`);
//     await queryRunner.query(`insert into area_service values(238,NULL,46,7);`);
//     await queryRunner.query(`insert into area_service values(239,NULL,46,8);`);
//     await queryRunner.query(`insert into area_service values(240,NULL,46,9);`);
//     await queryRunner.query(`insert into area_service values(241,NULL,46,11);`);
//     await queryRunner.query(`insert into area_service values(242,NULL,47,4);`);
//     await queryRunner.query(`insert into area_service values(243,NULL,47,7);`);
//     await queryRunner.query(`insert into area_service values(244,NULL,47,8);`);
//     await queryRunner.query(`insert into area_service values(245,NULL,47,9);`);
//     await queryRunner.query(`insert into area_service values(246,NULL,47,11);`);
//     await queryRunner.query(`insert into area_service values(247,NULL,48,4);`);
//     await queryRunner.query(`insert into area_service values(248,NULL,48,7);`);
//     await queryRunner.query(`insert into area_service values(249,NULL,48,8);`);
//     await queryRunner.query(`insert into area_service values(250,NULL,48,9);`);
//     await queryRunner.query(`insert into area_service values(251,NULL,48,11);`);
//     await queryRunner.query(`insert into area_service values(252,NULL,49,4);`);
//     await queryRunner.query(`insert into area_service values(253,NULL,49,7);`);
//     await queryRunner.query(`insert into area_service values(254,NULL,49,8);`);
//     await queryRunner.query(`insert into area_service values(255,NULL,49,9);`);
//     await queryRunner.query(`insert into area_service values(256,NULL,49,11);`);
//     await queryRunner.query(`insert into area_service values(257,NULL,50,4);`);
//     await queryRunner.query(`insert into area_service values(258,NULL,50,7);`);
//     await queryRunner.query(`insert into area_service values(259,NULL,50,9);`);
//     await queryRunner.query(`insert into area_service values(260,NULL,50,11);`);
//     await queryRunner.query(`insert into area_service values(261,NULL,51,4);`);
//     await queryRunner.query(`insert into area_service values(262,NULL,51,7);`);
//     await queryRunner.query(`insert into area_service values(263,NULL,51,8);`);
//     await queryRunner.query(`insert into area_service values(264,NULL,51,9);`);
//     await queryRunner.query(`insert into area_service values(265,NULL,51,11);`);
//     await queryRunner.query(`insert into area_service values(266,NULL,52,4);`);
//     await queryRunner.query(`insert into area_service values(267,NULL,52,7);`);
//     await queryRunner.query(`insert into area_service values(268,NULL,52,8);`);
//     await queryRunner.query(`insert into area_service values(269,NULL,52,9);`);
//     await queryRunner.query(`insert into area_service values(270,NULL,52,11);`);
//     await queryRunner.query(`insert into area_service values(271,NULL,53,4);`);
//     await queryRunner.query(`insert into area_service values(272,NULL,53,7);`);
//     await queryRunner.query(`insert into area_service values(273,NULL,53,8);`);
//     await queryRunner.query(`insert into area_service values(274,NULL,53,9);`);
//     await queryRunner.query(`insert into area_service values(275,NULL,53,11);`);
//     await queryRunner.query(`insert into area_service values(276,NULL,54,4);`);
//     await queryRunner.query(`insert into area_service values(277,NULL,54,7);`);
//     await queryRunner.query(`insert into area_service values(278,NULL,54,8);`);
//     await queryRunner.query(`insert into area_service values(279,NULL,54,9);`);
//     await queryRunner.query(`insert into area_service values(280,NULL,54,11);`);
//     await queryRunner.query(`insert into area_service values(281,NULL,55,2);`);
//     await queryRunner.query(`insert into area_service values(282,NULL,55,4);`);
//     await queryRunner.query(`insert into area_service values(283,NULL,55,7);`);
//     await queryRunner.query(`insert into area_service values(284,NULL,55,8);`);
//     await queryRunner.query(`insert into area_service values(285,NULL,55,9);`);
//     await queryRunner.query(`insert into area_service values(286,NULL,55,11);`);
//     await queryRunner.query(`insert into area_service values(287,NULL,56,2);`);
//     await queryRunner.query(`insert into area_service values(288,NULL,56,4);`);
//     await queryRunner.query(`insert into area_service values(289,NULL,56,7);`);
//     await queryRunner.query(`insert into area_service values(290,NULL,56,8);`);
//     await queryRunner.query(`insert into area_service values(291,NULL,56,9);`);
//     await queryRunner.query(`insert into area_service values(292,NULL,56,11);`);
//     await queryRunner.query(`insert into area_service values(293,NULL,57,2);`);
//     await queryRunner.query(`insert into area_service values(294,NULL,57,4);`);
//     await queryRunner.query(`insert into area_service values(295,NULL,57,7);`);
//     await queryRunner.query(`insert into area_service values(296,NULL,57,8);`);
//     await queryRunner.query(`insert into area_service values(297,NULL,57,9);`);
//     await queryRunner.query(`insert into area_service values(298,NULL,57,11);`);
//     await queryRunner.query(`insert into area_service values(299,NULL,58,2);`);
//     await queryRunner.query(`insert into area_service values(300,NULL,58,4);`);
//     await queryRunner.query(`insert into area_service values(301,NULL,58,7);`);
//     await queryRunner.query(`insert into area_service values(302,NULL,58,8);`);
//     await queryRunner.query(`insert into area_service values(303,NULL,58,9);`);
//     await queryRunner.query(`insert into area_service values(304,NULL,58,11);`);
//     await queryRunner.query(`insert into area_service values(305,NULL,59,4);`);
//     await queryRunner.query(`insert into area_service values(306,NULL,59,7);`);
//     await queryRunner.query(`insert into area_service values(307,NULL,59,9);`);
//     await queryRunner.query(`insert into area_service values(308,NULL,59,11);`);
//     await queryRunner.query(`insert into area_service values(309,NULL,60,2);`);
//     await queryRunner.query(`insert into area_service values(310,NULL,60,4);`);
//     await queryRunner.query(`insert into area_service values(311,NULL,60,7);`);
//     await queryRunner.query(`insert into area_service values(312,NULL,60,8);`);
//     await queryRunner.query(`insert into area_service values(313,NULL,60,9);`);
//     await queryRunner.query(`insert into area_service values(314,NULL,60,11);`);
//     await queryRunner.query(`insert into area_service values(315,NULL,61,2);`);
//     await queryRunner.query(`insert into area_service values(316,NULL,61,4);`);
//     await queryRunner.query(`insert into area_service values(317,NULL,61,7);`);
//     await queryRunner.query(`insert into area_service values(318,NULL,61,9);`);
//     await queryRunner.query(`insert into area_service values(319,NULL,61,11);`);
//     await queryRunner.query(`insert into area_service values(320,NULL,62,2);`);
//     await queryRunner.query(`insert into area_service values(321,NULL,62,4);`);
//     await queryRunner.query(`insert into area_service values(322,NULL,62,7);`);
//     await queryRunner.query(`insert into area_service values(323,NULL,62,8);`);
//     await queryRunner.query(`insert into area_service values(324,NULL,62,9);`);
//     await queryRunner.query(`insert into area_service values(325,NULL,62,11);`);
//     await queryRunner.query(`insert into area_service values(326,NULL,63,2);`);
//     await queryRunner.query(`insert into area_service values(327,NULL,63,4);`);
//     await queryRunner.query(`insert into area_service values(328,NULL,63,7);`);
//     await queryRunner.query(`insert into area_service values(329,NULL,63,8);`);
//     await queryRunner.query(`insert into area_service values(330,NULL,63,9);`);
//     await queryRunner.query(`insert into area_service values(331,NULL,63,11);`);
//     await queryRunner.query(`insert into area_service values(332,NULL,64,4);`);
//     await queryRunner.query(`insert into area_service values(333,NULL,64,7);`);
//     await queryRunner.query(`insert into area_service values(334,NULL,64,8);`);
//     await queryRunner.query(`insert into area_service values(335,NULL,64,9);`);
//     await queryRunner.query(`insert into area_service values(336,NULL,64,11);`);
//     await queryRunner.query(`insert into area_service values(337,NULL,65,1);`);
//     await queryRunner.query(`insert into area_service values(338,NULL,65,4);`);
//     await queryRunner.query(`insert into area_service values(339,NULL,65,5);`);
//     await queryRunner.query(`insert into area_service values(340,NULL,65,7);`);
//     await queryRunner.query(`insert into area_service values(341,NULL,65,9);`);
//     await queryRunner.query(`insert into area_service values(342,NULL,65,11);`);
//     await queryRunner.query(`insert into area_service values(343,NULL,66,4);`);
//     await queryRunner.query(`insert into area_service values(344,NULL,66,5);`);
//     await queryRunner.query(`insert into area_service values(345,NULL,66,7);`);
//     await queryRunner.query(`insert into area_service values(346,NULL,66,9);`);
//     await queryRunner.query(`insert into area_service values(347,NULL,66,11);`);
//     await queryRunner.query(`insert into area_service values(348,NULL,67,1);`);
//     await queryRunner.query(`insert into area_service values(349,NULL,67,4);`);
//     await queryRunner.query(`insert into area_service values(350,NULL,67,5);`);
//     await queryRunner.query(`insert into area_service values(351,NULL,67,7);`);
//     await queryRunner.query(`insert into area_service values(352,NULL,67,9);`);
//     await queryRunner.query(`insert into area_service values(353,NULL,67,11);`);
//     await queryRunner.query(`insert into area_service values(354,NULL,68,1);`);
//     await queryRunner.query(`insert into area_service values(355,NULL,68,4);`);
//     await queryRunner.query(`insert into area_service values(356,NULL,68,5);`);
//     await queryRunner.query(`insert into area_service values(357,NULL,68,7);`);
//     await queryRunner.query(`insert into area_service values(358,NULL,68,9);`);
//     await queryRunner.query(`insert into area_service values(359,NULL,68,11);`);
//     await queryRunner.query(`insert into area_service values(360,NULL,69,1);`);
//     await queryRunner.query(`insert into area_service values(361,NULL,69,4);`);
//     await queryRunner.query(`insert into area_service values(362,NULL,69,5);`);
//     await queryRunner.query(`insert into area_service values(363,NULL,69,7);`);
//     await queryRunner.query(`insert into area_service values(364,NULL,69,9);`);
//     await queryRunner.query(`insert into area_service values(365,NULL,69,11);`);
//     await queryRunner.query(`insert into area_service values(366,NULL,70,1);`);
//     await queryRunner.query(`insert into area_service values(367,NULL,70,4);`);
//     await queryRunner.query(`insert into area_service values(368,NULL,70,5);`);
//     await queryRunner.query(`insert into area_service values(369,NULL,70,7);`);
//     await queryRunner.query(`insert into area_service values(370,NULL,70,9);`);
//     await queryRunner.query(`insert into area_service values(371,NULL,70,11);`);
//     await queryRunner.query(`insert into area_service values(372,NULL,71,1);`);
//     await queryRunner.query(`insert into area_service values(373,NULL,71,4);`);
//     await queryRunner.query(`insert into area_service values(374,NULL,71,5);`);
//     await queryRunner.query(`insert into area_service values(375,NULL,71,7);`);
//     await queryRunner.query(`insert into area_service values(376,NULL,71,9);`);
//     await queryRunner.query(`insert into area_service values(377,NULL,71,11);`);
//     await queryRunner.query(`insert into area_service values(378,NULL,72,1);`);
//     await queryRunner.query(`insert into area_service values(379,NULL,72,4);`);
//     await queryRunner.query(`insert into area_service values(380,NULL,72,5);`);
//     await queryRunner.query(`insert into area_service values(381,NULL,72,7);`);
//     await queryRunner.query(`insert into area_service values(382,NULL,72,9);`);
//     await queryRunner.query(`insert into area_service values(383,NULL,72,11);`);
//     await queryRunner.query(`insert into area_service values(384,NULL,73,1);`);
//     await queryRunner.query(`insert into area_service values(385,NULL,73,4);`);
//     await queryRunner.query(`insert into area_service values(386,NULL,73,5);`);
//     await queryRunner.query(`insert into area_service values(387,NULL,73,7);`);
//     await queryRunner.query(`insert into area_service values(388,NULL,73,9);`);
//     await queryRunner.query(`insert into area_service values(389,NULL,73,11);`);
//     await queryRunner.query(`insert into area_service values(390,NULL,74,1);`);
//     await queryRunner.query(`insert into area_service values(391,NULL,74,4);`);
//     await queryRunner.query(`insert into area_service values(392,NULL,74,5);`);
//     await queryRunner.query(`insert into area_service values(393,NULL,74,7);`);
//     await queryRunner.query(`insert into area_service values(394,NULL,74,9);`);
//     await queryRunner.query(`insert into area_service values(395,NULL,74,11);`);
//     await queryRunner.query(`insert into area_service values(396,NULL,75,1);`);
//     await queryRunner.query(`insert into area_service values(397,NULL,75,4);`);
//     await queryRunner.query(`insert into area_service values(398,NULL,75,5);`);
//     await queryRunner.query(`insert into area_service values(399,NULL,75,7);`);
//     await queryRunner.query(`insert into area_service values(400,NULL,75,9);`);
//     await queryRunner.query(`insert into area_service values(401,NULL,75,11);`);
//     await queryRunner.query(`insert into area_service values(402,NULL,76,1);`);
//     await queryRunner.query(`insert into area_service values(403,NULL,76,4);`);
//     await queryRunner.query(`insert into area_service values(404,NULL,76,5);`);
//     await queryRunner.query(`insert into area_service values(405,NULL,76,7);`);
//     await queryRunner.query(`insert into area_service values(406,NULL,76,9);`);
//     await queryRunner.query(`insert into area_service values(407,NULL,76,11);`);
//     await queryRunner.query(`insert into area_service values(408,NULL,77,1);`);
//     await queryRunner.query(`insert into area_service values(409,NULL,77,4);`);
//     await queryRunner.query(`insert into area_service values(410,NULL,77,5);`);
//     await queryRunner.query(`insert into area_service values(411,NULL,77,7);`);
//     await queryRunner.query(`insert into area_service values(412,NULL,77,9);`);
//     await queryRunner.query(`insert into area_service values(413,NULL,77,11);`);
//     await queryRunner.query(`insert into area_service values(414,NULL,78,1);`);
//     await queryRunner.query(`insert into area_service values(415,NULL,78,4);`);
//     await queryRunner.query(`insert into area_service values(416,NULL,78,5);`);
//     await queryRunner.query(`insert into area_service values(417,NULL,78,7);`);
//     await queryRunner.query(`insert into area_service values(418,NULL,78,9);`);
//     await queryRunner.query(`insert into area_service values(419,NULL,78,11);`);
//     await queryRunner.query(`insert into area_service values(420,NULL,79,1);`);
//     await queryRunner.query(`insert into area_service values(421,NULL,79,4);`);
//     await queryRunner.query(`insert into area_service values(422,NULL,79,5);`);
//     await queryRunner.query(`insert into area_service values(423,NULL,79,7);`);
//     await queryRunner.query(`insert into area_service values(424,NULL,79,9);`);
//     await queryRunner.query(`insert into area_service values(425,NULL,79,11);`);
//     await queryRunner.query(`insert into area_service values(426,NULL,80,1);`);
//     await queryRunner.query(`insert into area_service values(427,NULL,80,4);`);
//     await queryRunner.query(`insert into area_service values(428,NULL,80,5);`);
//     await queryRunner.query(`insert into area_service values(429,NULL,80,7);`);
//     await queryRunner.query(`insert into area_service values(430,NULL,80,9);`);
//     await queryRunner.query(`insert into area_service values(431,NULL,80,11);`);
//     await queryRunner.query(`insert into area_service values(432,NULL,81,1);`);
//     await queryRunner.query(`insert into area_service values(433,NULL,81,4);`);
//     await queryRunner.query(`insert into area_service values(434,NULL,81,5);`);
//     await queryRunner.query(`insert into area_service values(435,NULL,81,7);`);
//     await queryRunner.query(`insert into area_service values(436,NULL,81,9);`);
//     await queryRunner.query(`insert into area_service values(437,NULL,81,11);`);
//     await queryRunner.query(`insert into area_service values(438,NULL,82,1);`);
//     await queryRunner.query(`insert into area_service values(439,NULL,82,4);`);
//     await queryRunner.query(`insert into area_service values(440,NULL,82,5);`);
//     await queryRunner.query(`insert into area_service values(441,NULL,82,7);`);
//     await queryRunner.query(`insert into area_service values(442,NULL,82,9);`);
//     await queryRunner.query(`insert into area_service values(443,NULL,82,11);`);
//     await queryRunner.query(`insert into area_service values(444,NULL,83,1);`);
//     await queryRunner.query(`insert into area_service values(445,NULL,83,4);`);
//     await queryRunner.query(`insert into area_service values(446,NULL,83,5);`);
//     await queryRunner.query(`insert into area_service values(447,NULL,83,7);`);
//     await queryRunner.query(`insert into area_service values(448,NULL,83,9);`);
//     await queryRunner.query(`insert into area_service values(449,NULL,83,11);`);
//     await queryRunner.query(`insert into area_service values(450,NULL,84,1);`);
//     await queryRunner.query(`insert into area_service values(451,NULL,84,4);`);
//     await queryRunner.query(`insert into area_service values(452,NULL,84,5);`);
//     await queryRunner.query(`insert into area_service values(453,NULL,84,7);`);
//     await queryRunner.query(`insert into area_service values(454,NULL,84,9);`);
//     await queryRunner.query(`insert into area_service values(455,NULL,84,11);`);
//     await queryRunner.query(`insert into area_service values(456,NULL,85,1);`);
//     await queryRunner.query(`insert into area_service values(457,NULL,85,4);`);
//     await queryRunner.query(`insert into area_service values(458,NULL,85,5);`);
//     await queryRunner.query(`insert into area_service values(459,NULL,85,7);`);
//     await queryRunner.query(`insert into area_service values(460,NULL,85,9);`);
//     await queryRunner.query(`insert into area_service values(461,NULL,85,11);`);
//     await queryRunner.query(`insert into area_service values(462,NULL,86,1);`);
//     await queryRunner.query(`insert into area_service values(463,NULL,86,4);`);
//     await queryRunner.query(`insert into area_service values(464,NULL,86,5);`);
//     await queryRunner.query(`insert into area_service values(465,NULL,86,7);`);
//     await queryRunner.query(`insert into area_service values(466,NULL,86,9);`);
//     await queryRunner.query(`insert into area_service values(467,NULL,86,11);`);
//     await queryRunner.query(`insert into area_service values(468,NULL,87,1);`);
//     await queryRunner.query(`insert into area_service values(469,NULL,87,4);`);
//     await queryRunner.query(`insert into area_service values(470,NULL,87,5);`);
//     await queryRunner.query(`insert into area_service values(471,NULL,87,7);`);
//     await queryRunner.query(`insert into area_service values(472,NULL,87,9);`);
//     await queryRunner.query(`insert into area_service values(473,NULL,87,11);`);
//     await queryRunner.query(`insert into area_service values(474,NULL,88,1);`);
//     await queryRunner.query(`insert into area_service values(475,NULL,88,4);`);
//     await queryRunner.query(`insert into area_service values(476,NULL,88,5);`);
//     await queryRunner.query(`insert into area_service values(477,NULL,88,7);`);
//     await queryRunner.query(`insert into area_service values(478,NULL,88,9);`);
//     await queryRunner.query(`insert into area_service values(479,NULL,88,11);`);
//     await queryRunner.query(`insert into area_service values(480,NULL,89,1);`);
//     await queryRunner.query(`insert into area_service values(481,NULL,89,4);`);
//     await queryRunner.query(`insert into area_service values(482,NULL,89,5);`);
//     await queryRunner.query(`insert into area_service values(483,NULL,89,7);`);
//     await queryRunner.query(`insert into area_service values(484,NULL,89,9);`);
//     await queryRunner.query(`insert into area_service values(485,NULL,89,11);`);
//     await queryRunner.query(`insert into area_service values(486,NULL,90,1);`);
//     await queryRunner.query(`insert into area_service values(487,NULL,90,4);`);
//     await queryRunner.query(`insert into area_service values(488,NULL,90,5);`);
//     await queryRunner.query(`insert into area_service values(489,NULL,90,7);`);
//     await queryRunner.query(`insert into area_service values(490,NULL,90,9);`);
//     await queryRunner.query(`insert into area_service values(491,NULL,90,11);`);
//     await queryRunner.query(`insert into area_service values(492,NULL,91,1);`);
//     await queryRunner.query(`insert into area_service values(493,NULL,91,4);`);
//     await queryRunner.query(`insert into area_service values(494,NULL,91,5);`);
//     await queryRunner.query(`insert into area_service values(495,NULL,91,7);`);
//     await queryRunner.query(`insert into area_service values(496,NULL,91,9);`);
//     await queryRunner.query(`insert into area_service values(497,NULL,91,11);`);
//     await queryRunner.query(`insert into area_service values(498,NULL,92,2);`);
//     await queryRunner.query(`insert into area_service values(499,NULL,92,4);`);
//     await queryRunner.query(`insert into area_service values(500,NULL,92,7);`);
//     await queryRunner.query(`insert into area_service values(501,NULL,92,8);`);
//     await queryRunner.query(`insert into area_service values(502,NULL,92,9);`);
//     await queryRunner.query(`insert into area_service values(503,NULL,92,11);`);
//     await queryRunner.query(`insert into area_service values(504,NULL,93,1);`);
//     await queryRunner.query(`insert into area_service values(505,NULL,93,3);`);
//     await queryRunner.query(`insert into area_service values(506,NULL,93,4);`);
//     await queryRunner.query(`insert into area_service values(507,NULL,93,7);`);
//     await queryRunner.query(`insert into area_service values(508,NULL,93,9);`);
//     await queryRunner.query(`insert into area_service values(509,NULL,93,11);`);
//     await queryRunner.query(`insert into area_service values(510,NULL,94,9);`);
//     await queryRunner.query(`insert into area_service values(511,NULL,94,11);`);
//     await queryRunner.query(`insert into area_service values(512,NULL,95,1);`);
//     await queryRunner.query(`insert into area_service values(513,NULL,95,5);`);
//     await queryRunner.query(`insert into area_service values(514,NULL,95,7);`);
//     await queryRunner.query(`insert into area_service values(515,NULL,95,9);`);
//     await queryRunner.query(`insert into area_service values(516,NULL,95,11);`);
//     await queryRunner.query(`insert into area_service values(517,NULL,96,1);`);
//     await queryRunner.query(`insert into area_service values(518,NULL,96,4);`);
//     await queryRunner.query(`insert into area_service values(519,NULL,96,5);`);
//     await queryRunner.query(`insert into area_service values(520,NULL,96,7);`);
//     await queryRunner.query(`insert into area_service values(521,NULL,96,9);`);
//     await queryRunner.query(`insert into area_service values(522,NULL,96,11);`);
//     await queryRunner.query(`insert into area_service values(523,NULL,97,1);`);
//     await queryRunner.query(`insert into area_service values(524,NULL,97,4);`);
//     await queryRunner.query(`insert into area_service values(525,NULL,97,5);`);
//     await queryRunner.query(`insert into area_service values(526,NULL,97,7);`);
//     await queryRunner.query(`insert into area_service values(527,NULL,97,9);`);
//     await queryRunner.query(`insert into area_service values(528,NULL,97,11);`);
//     await queryRunner.query(`insert into area_service values(529,NULL,98,1);`);
//     await queryRunner.query(`insert into area_service values(530,NULL,98,2);`);
//     await queryRunner.query(`insert into area_service values(531,NULL,98,4);`);
//     await queryRunner.query(`insert into area_service values(532,NULL,98,5);`);
//     await queryRunner.query(`insert into area_service values(533,NULL,98,7);`);
//     await queryRunner.query(`insert into area_service values(534,NULL,98,8);`);
//     await queryRunner.query(`insert into area_service values(535,NULL,98,9);`);
//     await queryRunner.query(`insert into area_service values(536,NULL,98,11);`);
//     await queryRunner.query(`insert into area_service values(537,NULL,99,2);`);
//     await queryRunner.query(`insert into area_service values(538,NULL,99,4);`);
//     await queryRunner.query(`insert into area_service values(539,NULL,99,7);`);
//     await queryRunner.query(`insert into area_service values(540,NULL,99,9);`);
//     await queryRunner.query(`insert into area_service values(541,NULL,100,1);`);
//     await queryRunner.query(`insert into area_service values(542,NULL,100,2);`);
//     await queryRunner.query(`insert into area_service values(543,NULL,100,4);`);
//     await queryRunner.query(`insert into area_service values(544,NULL,100,5);`);
//     await queryRunner.query(`insert into area_service values(545,NULL,100,7);`);
//     await queryRunner.query(`insert into area_service values(546,NULL,100,8);`);
//     await queryRunner.query(`insert into area_service values(547,NULL,100,9);`);
//     await queryRunner.query(`insert into area_service values(548,NULL,100,11);`);
//     await queryRunner.query(`insert into area_service values(549,NULL,101,1);`);
//     await queryRunner.query(`insert into area_service values(550,NULL,101,2);`);
//     await queryRunner.query(`insert into area_service values(551,NULL,101,4);`);
//     await queryRunner.query(`insert into area_service values(552,NULL,101,5);`);
//     await queryRunner.query(`insert into area_service values(553,NULL,101,7);`);
//     await queryRunner.query(`insert into area_service values(554,NULL,101,8);`);
//     await queryRunner.query(`insert into area_service values(555,NULL,101,9);`);
//     await queryRunner.query(`insert into area_service values(556,NULL,101,11);`);
//     await queryRunner.query(`insert into area_service values(557,NULL,102,2);`);
//     await queryRunner.query(`insert into area_service values(558,NULL,102,4);`);
//     await queryRunner.query(`insert into area_service values(559,NULL,102,7);`);
//     await queryRunner.query(`insert into area_service values(560,NULL,102,8);`);
//     await queryRunner.query(`insert into area_service values(561,NULL,102,9);`);
//     await queryRunner.query(`insert into area_service values(562,NULL,102,11);`);
//     await queryRunner.query(`insert into area_service values(563,NULL,103,2);`);
//     await queryRunner.query(`insert into area_service values(564,NULL,103,4);`);
//     await queryRunner.query(`insert into area_service values(565,NULL,103,7);`);
//     await queryRunner.query(`insert into area_service values(566,NULL,103,8);`);
//     await queryRunner.query(`insert into area_service values(567,NULL,103,9);`);
//     await queryRunner.query(`insert into area_service values(568,NULL,103,11);`);
//     await queryRunner.query(`insert into area_service values(569,NULL,104,2);`);
//     await queryRunner.query(`insert into area_service values(570,NULL,104,4);`);
//     await queryRunner.query(`insert into area_service values(571,NULL,104,7);`);
//     await queryRunner.query(`insert into area_service values(572,NULL,104,8);`);
//     await queryRunner.query(`insert into area_service values(573,NULL,104,9);`);
//     await queryRunner.query(`insert into area_service values(574,NULL,104,11);`);
//     await queryRunner.query(`insert into area_service values(575,NULL,105,7);`);
//     await queryRunner.query(`insert into area_service values(576,NULL,105,9);`);
//     await queryRunner.query(`insert into area_service values(577,NULL,105,11);`);
//     await queryRunner.query(`insert into area_service values(578,NULL,106,4);`);
//     await queryRunner.query(`insert into area_service values(579,NULL,106,7);`);
//     await queryRunner.query(`insert into area_service values(580,NULL,106,9);`);
//     await queryRunner.query(`insert into area_service values(581,NULL,106,11);`);
//     await queryRunner.query(`insert into area_service values(582,NULL,107,4);`);
//     await queryRunner.query(`insert into area_service values(583,NULL,107,7);`);
//     await queryRunner.query(`insert into area_service values(584,NULL,107,9);`);
//     await queryRunner.query(`insert into area_service values(585,NULL,107,11);`);
//     await queryRunner.query(`insert into area_service values(586,NULL,108,4);`);
//     await queryRunner.query(`insert into area_service values(587,NULL,108,7);`);
//     await queryRunner.query(`insert into area_service values(588,NULL,108,9);`);
//     await queryRunner.query(`insert into area_service values(589,NULL,108,11);`);
//     await queryRunner.query(`insert into area_service values(590,NULL,109,11);`);
//     await queryRunner.query(`insert into area_service values(591,NULL,110,4);`);
//     await queryRunner.query(`insert into area_service values(592,NULL,110,7);`);
//     await queryRunner.query(`insert into area_service values(593,NULL,110,9);`);
//     await queryRunner.query(`insert into area_service values(594,NULL,111,4);`);
//     await queryRunner.query(`insert into area_service values(595,NULL,112,4);`);
//     await queryRunner.query(`insert into area_service values(596,NULL,112,7);`);
//     await queryRunner.query(`insert into area_service values(597,NULL,112,9);`);
//     await queryRunner.query(`insert into area_service values(598,NULL,112,11);`);
//     await queryRunner.query(`insert into area_service values(599,NULL,113,4);`);
//     await queryRunner.query(`insert into area_service values(600,NULL,113,7);`);
//     await queryRunner.query(`insert into area_service values(601,NULL,113,9);`);
//     await queryRunner.query(`insert into area_service values(602,NULL,114,2);`);
//     await queryRunner.query(`insert into area_service values(603,NULL,114,7);`);
//     await queryRunner.query(`insert into area_service values(604,NULL,114,8);`);
//     await queryRunner.query(`insert into area_service values(605,NULL,114,9);`);
//     await queryRunner.query(`insert into area_service values(606,NULL,114,11);`);
//     await queryRunner.query(`insert into area_service values(607,NULL,115,2);`);
//     await queryRunner.query(`insert into area_service values(608,NULL,115,4);`);
//     await queryRunner.query(`insert into area_service values(609,NULL,115,7);`);
//     await queryRunner.query(`insert into area_service values(610,NULL,115,8);`);
//     await queryRunner.query(`insert into area_service values(611,NULL,115,9);`);
//     await queryRunner.query(`insert into area_service values(612,NULL,115,11);`);
//     await queryRunner.query(`insert into area_service values(613,NULL,116,2);`);
//     await queryRunner.query(`insert into area_service values(614,NULL,116,4);`);
//     await queryRunner.query(`insert into area_service values(615,NULL,116,7);`);
//     await queryRunner.query(`insert into area_service values(616,NULL,116,9);`);
//     await queryRunner.query(`insert into area_service values(617,NULL,116,11);`);
//     await queryRunner.query(`insert into area_service values(618,NULL,117,2);`);
//     await queryRunner.query(`insert into area_service values(619,NULL,117,4);`);
//     await queryRunner.query(`insert into area_service values(620,NULL,117,7);`);
//     await queryRunner.query(`insert into area_service values(621,NULL,117,9);`);
//     await queryRunner.query(`insert into area_service values(622,NULL,118,7);`);
//     await queryRunner.query(`insert into area_service values(623,NULL,118,9);`);
//     await queryRunner.query(`insert into area_service values(624,NULL,118,11);`);
//     await queryRunner.query(`insert into area_service values(625,NULL,119,7);`);
//     await queryRunner.query(`insert into area_service values(626,NULL,119,9);`);
//     await queryRunner.query(`insert into area_service values(627,NULL,119,11);`);
//     await queryRunner.query(`insert into area_service values(628,NULL,120,4);`);
//     await queryRunner.query(`insert into area_service values(629,NULL,120,7);`);
//     await queryRunner.query(`insert into area_service values(630,NULL,120,9);`);
//     await queryRunner.query(`insert into area_service values(631,NULL,120,11);`);
//     await queryRunner.query(`insert into area_service values(632,NULL,121,7);`);
//     await queryRunner.query(`insert into area_service values(633,NULL,122,2);`);
//     await queryRunner.query(`insert into area_service values(634,NULL,122,4);`);
//     await queryRunner.query(`insert into area_service values(635,NULL,122,7);`);
//     await queryRunner.query(`insert into area_service values(636,NULL,122,9);`);
//     await queryRunner.query(`insert into area_service values(637,NULL,122,11);`);
//     await queryRunner.query(`insert into area_service values(638,NULL,123,4);`);
//     await queryRunner.query(`insert into area_service values(639,NULL,123,7);`);
//     await queryRunner.query(`insert into area_service values(640,NULL,123,9);`);
//     await queryRunner.query(`insert into area_service values(641,NULL,123,11);`);
//     await queryRunner.query(`insert into area_service values(642,NULL,124,7);`);
//     await queryRunner.query(`insert into area_service values(643,NULL,124,9);`);
//     await queryRunner.query(`insert into area_service values(644,NULL,125,11);`);
//     await queryRunner.query(`insert into area_service values(645,NULL,126,2);`);
//     await queryRunner.query(`insert into area_service values(646,NULL,126,4);`);
//     await queryRunner.query(`insert into area_service values(647,NULL,126,7);`);
//     await queryRunner.query(`insert into area_service values(648,NULL,126,9);`);
//     await queryRunner.query(`insert into area_service values(649,NULL,126,11);`);
//     await queryRunner.query(`insert into area_service values(650,NULL,127,4);`);
//     await queryRunner.query(`insert into area_service values(651,NULL,127,7);`);
//     await queryRunner.query(`insert into area_service values(652,NULL,127,9);`);
//     await queryRunner.query(`insert into area_service values(653,NULL,127,11);`);
//     await queryRunner.query(`insert into area_service values(654,NULL,128,1);`);
//     await queryRunner.query(`insert into area_service values(655,NULL,128,4);`);
//     await queryRunner.query(`insert into area_service values(656,NULL,128,7);`);
//     await queryRunner.query(`insert into area_service values(657,NULL,128,9);`);
//     await queryRunner.query(`insert into area_service values(658,NULL,128,11);`);
//     await queryRunner.query(`insert into area_service values(659,NULL,129,4);`);
//     await queryRunner.query(`insert into area_service values(660,NULL,129,7);`);
//     await queryRunner.query(`insert into area_service values(661,NULL,129,9);`);
//     await queryRunner.query(`insert into area_service values(662,NULL,129,11);`);
//     await queryRunner.query(`insert into area_service values(663,NULL,130,2);`);
//     await queryRunner.query(`insert into area_service values(664,NULL,130,4);`);
//     await queryRunner.query(`insert into area_service values(665,NULL,130,7);`);
//     await queryRunner.query(`insert into area_service values(666,NULL,130,8);`);
//     await queryRunner.query(`insert into area_service values(667,NULL,130,9);`);
//     await queryRunner.query(`insert into area_service values(668,NULL,130,11);`);
//     await queryRunner.query(`insert into area_service values(669,NULL,131,4);`);
//     await queryRunner.query(`insert into area_service values(670,NULL,131,7);`);
//     await queryRunner.query(`insert into area_service values(671,NULL,131,9);`);
//     await queryRunner.query(`insert into area_service values(672,NULL,131,11);`);
//     await queryRunner.query(`insert into area_service values(673,NULL,132,2);`);
//     await queryRunner.query(`insert into area_service values(674,NULL,132,4);`);
//     await queryRunner.query(`insert into area_service values(675,NULL,132,7);`);
//     await queryRunner.query(`insert into area_service values(676,NULL,132,8);`);
//     await queryRunner.query(`insert into area_service values(677,NULL,132,9);`);
//     await queryRunner.query(`insert into area_service values(678,NULL,132,11);`);
//     await queryRunner.query(`insert into area_service values(679,NULL,133,4);`);
//     await queryRunner.query(`insert into area_service values(680,NULL,133,7);`);
//     await queryRunner.query(`insert into area_service values(681,NULL,133,9);`);
//     await queryRunner.query(`insert into area_service values(682,NULL,133,11);`);
//     await queryRunner.query(`insert into area_service values(683,NULL,134,4);`);
//     await queryRunner.query(`insert into area_service values(684,NULL,134,7);`);
//     await queryRunner.query(`insert into area_service values(685,NULL,134,9);`);
//     await queryRunner.query(`insert into area_service values(686,NULL,134,11);`);
//     await queryRunner.query(`insert into area_service values(687,NULL,135,4);`);
//     await queryRunner.query(`insert into area_service values(688,NULL,135,9);`);
//     await queryRunner.query(`insert into area_service values(689,NULL,135,11);`);
//     await queryRunner.query(`insert into area_service values(690,NULL,136,4);`);
//     await queryRunner.query(`insert into area_service values(691,NULL,136,9);`);
//     await queryRunner.query(`insert into area_service values(692,NULL,136,11);`);
//     await queryRunner.query(`insert into area_service values(693,NULL,137,4);`);
//     await queryRunner.query(`insert into area_service values(694,NULL,137,7);`);
//     await queryRunner.query(`insert into area_service values(695,NULL,137,9);`);
//     await queryRunner.query(`insert into area_service values(696,NULL,137,11);`);
//     await queryRunner.query(`insert into area_service values(697,NULL,138,1);`);
//     await queryRunner.query(`insert into area_service values(698,NULL,138,2);`);
//     await queryRunner.query(`insert into area_service values(699,NULL,138,4);`);
//     await queryRunner.query(`insert into area_service values(700,NULL,138,5);`);
//     await queryRunner.query(`insert into area_service values(701,NULL,138,7);`);
//     await queryRunner.query(`insert into area_service values(702,NULL,138,9);`);
//     await queryRunner.query(`insert into area_service values(703,NULL,138,11);`);
//     await queryRunner.query(`insert into area_service values(704,NULL,139,1);`);
//     await queryRunner.query(`insert into area_service values(705,NULL,139,2);`);
//     await queryRunner.query(`insert into area_service values(706,NULL,139,4);`);
//     await queryRunner.query(`insert into area_service values(707,NULL,139,5);`);
//     await queryRunner.query(`insert into area_service values(708,NULL,139,7);`);
//     await queryRunner.query(`insert into area_service values(709,NULL,139,8);`);
//     await queryRunner.query(`insert into area_service values(710,NULL,139,9);`);
//     await queryRunner.query(`insert into area_service values(711,NULL,139,11);`);
//     await queryRunner.query(`insert into area_service values(712,NULL,140,1);`);
//     await queryRunner.query(`insert into area_service values(713,NULL,140,2);`);
//     await queryRunner.query(`insert into area_service values(714,NULL,140,4);`);
//     await queryRunner.query(`insert into area_service values(715,NULL,140,5);`);
//     await queryRunner.query(`insert into area_service values(716,NULL,140,7);`);
//     await queryRunner.query(`insert into area_service values(717,NULL,140,9);`);
//     await queryRunner.query(`insert into area_service values(718,NULL,140,11);`);
//     await queryRunner.query(`insert into area_service values(719,NULL,141,2);`);
//     await queryRunner.query(`insert into area_service values(720,NULL,141,4);`);
//     await queryRunner.query(`insert into area_service values(721,NULL,141,7);`);
//     await queryRunner.query(`insert into area_service values(722,NULL,141,8);`);
//     await queryRunner.query(`insert into area_service values(723,NULL,141,9);`);
//     await queryRunner.query(`insert into area_service values(724,NULL,141,11);`);
//     await queryRunner.query(`insert into area_service values(725,NULL,142,4);`);
//     await queryRunner.query(`insert into area_service values(726,NULL,142,7);`);
//     await queryRunner.query(`insert into area_service values(727,NULL,142,8);`);
//     await queryRunner.query(`insert into area_service values(728,NULL,142,9);`);
//     await queryRunner.query(`insert into area_service values(729,NULL,142,11);`);
//     await queryRunner.query(`insert into area_service values(730,NULL,143,4);`);
//     await queryRunner.query(`insert into area_service values(731,NULL,143,7);`);
//     await queryRunner.query(`insert into area_service values(732,NULL,143,8);`);
//     await queryRunner.query(`insert into area_service values(733,NULL,143,9);`);
//     await queryRunner.query(`insert into area_service values(734,NULL,143,11);`);
//     await queryRunner.query(`insert into area_service values(735,NULL,144,4);`);
//     await queryRunner.query(`insert into area_service values(736,NULL,144,7);`);
//     await queryRunner.query(`insert into area_service values(737,NULL,144,8);`);
//     await queryRunner.query(`insert into area_service values(738,NULL,144,9);`);
//     await queryRunner.query(`insert into area_service values(739,NULL,144,11);`);
//     await queryRunner.query(`insert into area_service values(740,NULL,145,7);`);
//     await queryRunner.query(`insert into area_service values(741,NULL,145,9);`);
//     await queryRunner.query(`insert into area_service values(742,NULL,145,11);`);
//     await queryRunner.query(`insert into area_service values(743,NULL,146,2);`);
//     await queryRunner.query(`insert into area_service values(744,NULL,146,4);`);
//     await queryRunner.query(`insert into area_service values(745,NULL,146,7);`);
//     await queryRunner.query(`insert into area_service values(746,NULL,146,8);`);
//     await queryRunner.query(`insert into area_service values(747,NULL,146,9);`);
//     await queryRunner.query(`insert into area_service values(748,NULL,146,11);`);
//     await queryRunner.query(`insert into area_service values(749,NULL,147,4);`);
//     await queryRunner.query(`insert into area_service values(750,NULL,147,7);`);
//     await queryRunner.query(`insert into area_service values(751,NULL,147,9);`);
//     await queryRunner.query(`insert into area_service values(752,NULL,147,11);`);
//     await queryRunner.query(`insert into area_service values(753,NULL,148,2);`);
//     await queryRunner.query(`insert into area_service values(754,NULL,148,4);`);
//     await queryRunner.query(`insert into area_service values(755,NULL,148,7);`);
//     await queryRunner.query(`insert into area_service values(756,NULL,148,9);`);
//     await queryRunner.query(`insert into area_service values(757,NULL,148,11);`);
//     await queryRunner.query(`insert into area_service values(758,NULL,149,11);`);
//     await queryRunner.query(`insert into area_service values(759,NULL,150,11);`);
//     await queryRunner.query(`insert into area_service values(760,NULL,151,4);`);
//     await queryRunner.query(`insert into area_service values(761,NULL,151,7);`);
//     await queryRunner.query(`insert into area_service values(762,NULL,151,9);`);
//     await queryRunner.query(`insert into area_service values(763,NULL,151,11);`);
//     await queryRunner.query(`insert into area_service values(764,NULL,152,4);`);
//     await queryRunner.query(`insert into area_service values(765,NULL,152,7);`);
//     await queryRunner.query(`insert into area_service values(766,NULL,152,9);`);
//     await queryRunner.query(`insert into area_service values(767,NULL,152,11);`);
//     await queryRunner.query(`insert into area_service values(768,NULL,153,2);`);
//     await queryRunner.query(`insert into area_service values(769,NULL,153,4);`);
//     await queryRunner.query(`insert into area_service values(770,NULL,153,7);`);
//     await queryRunner.query(`insert into area_service values(771,NULL,153,9);`);
//     await queryRunner.query(`insert into area_service values(772,NULL,153,11);`);
//     await queryRunner.query(`insert into area_service values(773,NULL,154,4);`);
//     await queryRunner.query(`insert into area_service values(774,NULL,154,7);`);
//     await queryRunner.query(`insert into area_service values(775,NULL,154,9);`);
//     await queryRunner.query(`insert into area_service values(776,NULL,154,11);`);
//     await queryRunner.query(`insert into area_service values(777,NULL,155,4);`);
//     await queryRunner.query(`insert into area_service values(778,NULL,155,5);`);
//     await queryRunner.query(`insert into area_service values(779,NULL,155,7);`);
//     await queryRunner.query(`insert into area_service values(780,NULL,155,9);`);
//     await queryRunner.query(`insert into area_service values(781,NULL,155,11);`);
//     await queryRunner.query(`insert into area_service values(782,NULL,156,2);`);
//     await queryRunner.query(`insert into area_service values(783,NULL,156,4);`);
//     await queryRunner.query(`insert into area_service values(784,NULL,156,7);`);
//     await queryRunner.query(`insert into area_service values(785,NULL,156,9);`);
//     await queryRunner.query(`insert into area_service values(786,NULL,157,7);`);
//     await queryRunner.query(`insert into area_service values(787,NULL,157,9);`);
//     await queryRunner.query(`insert into area_service values(788,NULL,157,11);`);
//     await queryRunner.query(`insert into area_service values(789,NULL,158,11);`);
//     await queryRunner.query(`insert into area_service values(790,NULL,159,1);`);
//     await queryRunner.query(`insert into area_service values(791,NULL,159,8);`);
//     await queryRunner.query(`insert into area_service values(792,NULL,159,9);`);
//     await queryRunner.query(`insert into area_service values(793,NULL,160,7);`);
//     await queryRunner.query(`insert into area_service values(794,NULL,160,9);`);
//     await queryRunner.query(`insert into area_service values(795,NULL,161,7);`);
//     await queryRunner.query(`insert into area_service values(796,NULL,161,9);`);
//     await queryRunner.query(`insert into area_service values(797,NULL,161,11);`);
//     await queryRunner.query(`insert into area_service values(798,NULL,162,7);`);
//     await queryRunner.query(`insert into area_service values(799,NULL,162,9);`);
//     await queryRunner.query(`insert into area_service values(800,NULL,163,4);`);
//     await queryRunner.query(`insert into area_service values(801,NULL,163,7);`);
//     await queryRunner.query(`insert into area_service values(802,NULL,163,9);`);
//     await queryRunner.query(`insert into area_service values(803,NULL,163,11);`);
//     await queryRunner.query(`insert into area_service values(804,NULL,164,4);`);
//     await queryRunner.query(`insert into area_service values(805,NULL,164,7);`);
//     await queryRunner.query(`insert into area_service values(806,NULL,164,8);`);
//     await queryRunner.query(`insert into area_service values(807,NULL,164,9);`);
//     await queryRunner.query(`insert into area_service values(808,NULL,164,11);`);
//     await queryRunner.query(`insert into area_service values(809,NULL,165,4);`);
//     await queryRunner.query(`insert into area_service values(810,NULL,165,7);`);
//     await queryRunner.query(`insert into area_service values(811,NULL,165,8);`);
//     await queryRunner.query(`insert into area_service values(812,NULL,165,9);`);
//     await queryRunner.query(`insert into area_service values(813,NULL,165,11);`);
//     await queryRunner.query(`insert into area_service values(814,NULL,166,7);`);
//     await queryRunner.query(`insert into area_service values(815,NULL,166,9);`);
//     await queryRunner.query(`insert into area_service values(816,NULL,166,11);`);
//     await queryRunner.query(`insert into area_service values(817,NULL,167,4);`);
//     await queryRunner.query(`insert into area_service values(818,NULL,167,7);`);
//     await queryRunner.query(`insert into area_service values(819,NULL,167,8);`);
//     await queryRunner.query(`insert into area_service values(820,NULL,167,9);`);
//     await queryRunner.query(`insert into area_service values(821,NULL,167,11);`);
//     await queryRunner.query(`insert into area_service values(822,NULL,168,4);`);
//     await queryRunner.query(`insert into area_service values(823,NULL,168,7);`);
//     await queryRunner.query(`insert into area_service values(824,NULL,168,8);`);
//     await queryRunner.query(`insert into area_service values(825,NULL,168,9);`);
//     await queryRunner.query(`insert into area_service values(826,NULL,168,11);`);
//     await queryRunner.query(`insert into area_service values(827,NULL,169,4);`);
//     await queryRunner.query(`insert into area_service values(828,NULL,169,7);`);
//     await queryRunner.query(`insert into area_service values(829,NULL,169,8);`);
//     await queryRunner.query(`insert into area_service values(830,NULL,169,9);`);
//     await queryRunner.query(`insert into area_service values(831,NULL,169,11);`);
//     await queryRunner.query(`insert into area_service values(832,NULL,170,4);`);
//     await queryRunner.query(`insert into area_service values(833,NULL,170,7);`);
//     await queryRunner.query(`insert into area_service values(834,NULL,170,8);`);
//     await queryRunner.query(`insert into area_service values(835,NULL,170,9);`);
//     await queryRunner.query(`insert into area_service values(836,NULL,170,11);`);
//     await queryRunner.query(`insert into area_service values(837,NULL,171,1);`);
//     await queryRunner.query(`insert into area_service values(838,NULL,171,4);`);
//     await queryRunner.query(`insert into area_service values(839,NULL,171,5);`);
//     await queryRunner.query(`insert into area_service values(840,NULL,171,7);`);
//     await queryRunner.query(`insert into area_service values(841,NULL,171,8);`);
//     await queryRunner.query(`insert into area_service values(842,NULL,171,9);`);
//     await queryRunner.query(`insert into area_service values(843,NULL,171,11);`);
//     await queryRunner.query(`insert into area_service values(844,NULL,172,1);`);
//     await queryRunner.query(`insert into area_service values(845,NULL,172,4);`);
//     await queryRunner.query(`insert into area_service values(846,NULL,172,5);`);
//     await queryRunner.query(`insert into area_service values(847,NULL,172,7);`);
//     await queryRunner.query(`insert into area_service values(848,NULL,172,8);`);
//     await queryRunner.query(`insert into area_service values(849,NULL,172,9);`);
//     await queryRunner.query(`insert into area_service values(850,NULL,172,11);`);
//     await queryRunner.query(`insert into area_service values(851,NULL,173,11);`);
//     await queryRunner.query(`insert into area_service values(852,NULL,174,2);`);
//     await queryRunner.query(`insert into area_service values(853,NULL,174,4);`);
//     await queryRunner.query(`insert into area_service values(854,NULL,174,7);`);
//     await queryRunner.query(`insert into area_service values(855,NULL,174,8);`);
//     await queryRunner.query(`insert into area_service values(856,NULL,174,9);`);
//     await queryRunner.query(`insert into area_service values(857,NULL,174,11);`);
//     await queryRunner.query(`insert into area_service values(858,NULL,175,2);`);
//     await queryRunner.query(`insert into area_service values(859,NULL,175,4);`);
//     await queryRunner.query(`insert into area_service values(860,NULL,175,7);`);
//     await queryRunner.query(`insert into area_service values(861,NULL,175,8);`);
//     await queryRunner.query(`insert into area_service values(862,NULL,175,9);`);
//     await queryRunner.query(`insert into area_service values(863,NULL,175,11);`);
//     await queryRunner.query(`insert into area_service values(864,NULL,176,2);`);
//     await queryRunner.query(`insert into area_service values(865,NULL,176,4);`);
//     await queryRunner.query(`insert into area_service values(866,NULL,176,7);`);
//     await queryRunner.query(`insert into area_service values(867,NULL,176,8);`);
//     await queryRunner.query(`insert into area_service values(868,NULL,176,9);`);
//     await queryRunner.query(`insert into area_service values(869,NULL,176,11);`);
//     await queryRunner.query(`insert into area_service values(870,NULL,177,2);`);
//     await queryRunner.query(`insert into area_service values(871,NULL,177,4);`);
//     await queryRunner.query(`insert into area_service values(872,NULL,177,7);`);
//     await queryRunner.query(`insert into area_service values(873,NULL,177,9);`);
//     await queryRunner.query(`insert into area_service values(874,NULL,177,11);`);
//     await queryRunner.query(`insert into area_service values(875,NULL,178,4);`);
//     await queryRunner.query(`insert into area_service values(876,NULL,178,7);`);
//     await queryRunner.query(`insert into area_service values(877,NULL,178,9);`);
//     await queryRunner.query(`insert into area_service values(878,NULL,178,11);`);
//     await queryRunner.query(`insert into area_service values(879,NULL,179,2);`);
//     await queryRunner.query(`insert into area_service values(880,NULL,179,4);`);
//     await queryRunner.query(`insert into area_service values(881,NULL,179,7);`);
//     await queryRunner.query(`insert into area_service values(882,NULL,179,8);`);
//     await queryRunner.query(`insert into area_service values(883,NULL,179,9);`);
//     await queryRunner.query(`insert into area_service values(884,NULL,179,11);`);
//     await queryRunner.query(`insert into area_service values(885,NULL,180,2);`);
//     await queryRunner.query(`insert into area_service values(886,NULL,180,4);`);
//     await queryRunner.query(`insert into area_service values(887,NULL,180,7);`);
//     await queryRunner.query(`insert into area_service values(888,NULL,180,8);`);
//     await queryRunner.query(`insert into area_service values(889,NULL,180,9);`);
//     await queryRunner.query(`insert into area_service values(890,NULL,180,11);`);
//     await queryRunner.query(`insert into area_service values(891,NULL,181,2);`);
//     await queryRunner.query(`insert into area_service values(892,NULL,181,4);`);
//     await queryRunner.query(`insert into area_service values(893,NULL,181,7);`);
//     await queryRunner.query(`insert into area_service values(894,NULL,181,9);`);
//     await queryRunner.query(`insert into area_service values(895,NULL,181,11);`);
//     await queryRunner.query(`insert into area_service values(896,NULL,182,4);`);
//     await queryRunner.query(`insert into area_service values(897,NULL,182,7);`);
//     await queryRunner.query(`insert into area_service values(898,NULL,182,9);`);
//     await queryRunner.query(`insert into area_service values(899,NULL,182,11);`);
//     await queryRunner.query(`insert into area_service values(900,NULL,183,2);`);
//     await queryRunner.query(`insert into area_service values(901,NULL,183,4);`);
//     await queryRunner.query(`insert into area_service values(902,NULL,183,7);`);
//     await queryRunner.query(`insert into area_service values(903,NULL,183,8);`);
//     await queryRunner.query(`insert into area_service values(904,NULL,183,9);`);
//     await queryRunner.query(`insert into area_service values(905,NULL,183,11);`);
//     await queryRunner.query(`insert into area_service values(906,NULL,184,2);`);
//     await queryRunner.query(`insert into area_service values(907,NULL,184,4);`);
//     await queryRunner.query(`insert into area_service values(908,NULL,184,7);`);
//     await queryRunner.query(`insert into area_service values(909,NULL,184,8);`);
//     await queryRunner.query(`insert into area_service values(910,NULL,184,9);`);
//     await queryRunner.query(`insert into area_service values(911,NULL,184,11);`);
//     await queryRunner.query(`insert into area_service values(912,NULL,185,2);`);
//     await queryRunner.query(`insert into area_service values(913,NULL,185,4);`);
//     await queryRunner.query(`insert into area_service values(914,NULL,185,7);`);
//     await queryRunner.query(`insert into area_service values(915,NULL,185,8);`);
//     await queryRunner.query(`insert into area_service values(916,NULL,185,9);`);
//     await queryRunner.query(`insert into area_service values(917,NULL,185,11);`);
//     await queryRunner.query(`insert into area_service values(918,NULL,186,4);`);
//     await queryRunner.query(`insert into area_service values(919,NULL,186,7);`);
//     await queryRunner.query(`insert into area_service values(920,NULL,186,8);`);
//     await queryRunner.query(`insert into area_service values(921,NULL,186,9);`);
//     await queryRunner.query(`insert into area_service values(922,NULL,186,11);`);
//     await queryRunner.query(`insert into area_service values(923,NULL,187,4);`);
//     await queryRunner.query(`insert into area_service values(924,NULL,187,7);`);
//     await queryRunner.query(`insert into area_service values(925,NULL,187,8);`);
//     await queryRunner.query(`insert into area_service values(926,NULL,187,9);`);
//     await queryRunner.query(`insert into area_service values(927,NULL,187,11);`);
//     await queryRunner.query(`insert into area_service values(928,NULL,188,2);`);
//     await queryRunner.query(`insert into area_service values(929,NULL,188,4);`);
//     await queryRunner.query(`insert into area_service values(930,NULL,188,7);`);
//     await queryRunner.query(`insert into area_service values(931,NULL,188,8);`);
//     await queryRunner.query(`insert into area_service values(932,NULL,188,9);`);
//     await queryRunner.query(`insert into area_service values(933,NULL,188,11);`);
//     await queryRunner.query(`insert into area_service values(934,NULL,189,4);`);
//     await queryRunner.query(`insert into area_service values(935,NULL,189,7);`);
//     await queryRunner.query(`insert into area_service values(936,NULL,189,8);`);
//     await queryRunner.query(`insert into area_service values(937,NULL,189,9);`);
//     await queryRunner.query(`insert into area_service values(938,NULL,189,11);`);
//     await queryRunner.query(`insert into area_service values(939,NULL,190,2);`);
//     await queryRunner.query(`insert into area_service values(940,NULL,190,4);`);
//     await queryRunner.query(`insert into area_service values(941,NULL,190,7);`);
//     await queryRunner.query(`insert into area_service values(942,NULL,190,8);`);
//     await queryRunner.query(`insert into area_service values(943,NULL,190,9);`);
//     await queryRunner.query(`insert into area_service values(944,NULL,190,11);`);
//     await queryRunner.query(`insert into area_service values(945,NULL,191,2);`);
//     await queryRunner.query(`insert into area_service values(946,NULL,191,4);`);
//     await queryRunner.query(`insert into area_service values(947,NULL,191,7);`);
//     await queryRunner.query(`insert into area_service values(948,NULL,191,8);`);
//     await queryRunner.query(`insert into area_service values(949,NULL,191,9);`);
//     await queryRunner.query(`insert into area_service values(950,NULL,191,11);`);
//     await queryRunner.query(`insert into area_service values(951,NULL,192,2);`);
//     await queryRunner.query(`insert into area_service values(952,NULL,192,4);`);
//     await queryRunner.query(`insert into area_service values(953,NULL,192,7);`);
//     await queryRunner.query(`insert into area_service values(954,NULL,192,8);`);
//     await queryRunner.query(`insert into area_service values(955,NULL,192,9);`);
//     await queryRunner.query(`insert into area_service values(956,NULL,192,11);`);
//     await queryRunner.query(`insert into area_service values(957,NULL,193,2);`);
//     await queryRunner.query(`insert into area_service values(958,NULL,193,7);`);
//     await queryRunner.query(`insert into area_service values(959,NULL,193,8);`);
//     await queryRunner.query(`insert into area_service values(960,NULL,193,9);`);
//     await queryRunner.query(`insert into area_service values(961,NULL,193,11);`);
//     await queryRunner.query(`insert into area_service values(962,NULL,194,2);`);
//     await queryRunner.query(`insert into area_service values(963,NULL,194,4);`);
//     await queryRunner.query(`insert into area_service values(964,NULL,194,7);`);
//     await queryRunner.query(`insert into area_service values(965,NULL,194,8);`);
//     await queryRunner.query(`insert into area_service values(966,NULL,194,9);`);
//     await queryRunner.query(`insert into area_service values(967,NULL,194,11);`);
//     await queryRunner.query(`insert into area_service values(968,NULL,195,1);`);
//     await queryRunner.query(`insert into area_service values(969,NULL,195,4);`);
//     await queryRunner.query(`insert into area_service values(970,NULL,195,7);`);
//     await queryRunner.query(`insert into area_service values(971,NULL,195,9);`);
//     await queryRunner.query(`insert into area_service values(972,NULL,196,2);`);
//     await queryRunner.query(`insert into area_service values(973,NULL,196,4);`);
//     await queryRunner.query(`insert into area_service values(974,NULL,196,7);`);
//     await queryRunner.query(`insert into area_service values(975,NULL,196,8);`);
//     await queryRunner.query(`insert into area_service values(976,NULL,196,9);`);
//     await queryRunner.query(`insert into area_service values(977,NULL,196,11);`);
//     await queryRunner.query(`insert into area_service values(978,NULL,197,9);`);
//     await queryRunner.query(`insert into area_service values(979,NULL,198,8);`);
//     await queryRunner.query(`insert into area_service values(980,NULL,198,9);`);
//     await queryRunner.query(`insert into area_service values(981,NULL,199,8);`);
//     await queryRunner.query(`insert into area_service values(982,NULL,199,9);`);
//     await queryRunner.query(`insert into area_service values(983,NULL,199,11);`);
//     await queryRunner.query(`insert into area_service values(984,NULL,200,7);`);
//     await queryRunner.query(`insert into area_service values(985,NULL,200,8);`);
//     await queryRunner.query(`insert into area_service values(986,NULL,200,9);`);
//     await queryRunner.query(`insert into area_service values(987,NULL,201,8);`);
//     await queryRunner.query(`insert into area_service values(988,NULL,201,9);`);
//     await queryRunner.query(`insert into area_service values(989,NULL,201,11);`);
//     await queryRunner.query(`insert into area_service values(990,NULL,202,8);`);
//     await queryRunner.query(`insert into area_service values(991,NULL,202,9);`);
//     await queryRunner.query(`insert into area_service values(992,NULL,202,11);`);
//     await queryRunner.query(`insert into area_service values(993,NULL,203,9);`);
//     await queryRunner.query(`insert into area_service values(994,NULL,203,11);`);
//     await queryRunner.query(`insert into area_service values(995,NULL,204,8);`);
//     await queryRunner.query(`insert into area_service values(996,NULL,204,9);`);
//     await queryRunner.query(`insert into area_service values(997,NULL,204,11);`);
//     await queryRunner.query(`insert into area_service values(998,NULL,205,8);`);
//     await queryRunner.query(`insert into area_service values(999,NULL,205,9);`);
//     await queryRunner.query(`insert into area_service values(1000,NULL,205,11);`);
//     await queryRunner.query(`insert into area_service values(1001,NULL,206,9);`);
//     await queryRunner.query(`insert into area_service values(1002,NULL,206,11);`);
//     await queryRunner.query(`insert into area_service values(1003,NULL,207,8);`);
//     await queryRunner.query(`insert into area_service values(1004,NULL,207,9);`);
//     await queryRunner.query(`insert into area_service values(1005,NULL,208,9);`);
//     await queryRunner.query(`insert into area_service values(1006,NULL,208,11);`);
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<any> {
//     await queryRunner.query(`delete from user_roles where id = 1;`);
//     await queryRunner.query(`delete from user_roles where id = 2;`);
//     await queryRunner.query(`delete from roles where id = 1;`);
//     await queryRunner.query(`delete from roles where id = 2;`);
//     await queryRunner.query(`delete from users where id = 1;`);
//   }
// }
