import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicSetup1570143571796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //Create roles
    await queryRunner.query(`insert into roles values (1, 'admin');`);
    await queryRunner.query(`insert into roles values (2, 'personal');`);
    await queryRunner.query(`insert into roles values (3, 'user');`);
    //Create users
    await queryRunner.query(
      `insert into users (id, name, surname, email, password, state) values (1, 'admin', 'admin', 'admin@gams.com', '$2a$08$4dFb7Jq.o4bbpp.oohEFFOWUOhDKntZI2DEMC2yXIKe.BuhS.HKvu', 'active');`,
    );
    //Create user_roles
    await queryRunner.query(`insert into user_roles values (1, 1, 1);`);
    await queryRunner.query(`insert into user_roles values (2, 1, 2);`);
    await queryRunner.query(`insert into user_roles values (3, 1, 3);`);
    //Create sectors
    await queryRunner.query(`insert into sector values (1, 'Campus deportes', 'CD', NULL);`);
    await queryRunner.query(`insert into sector values (2, 'Edificio principal', 'E01', NULL);`);
    await queryRunner.query(`insert into sector values (3, 'Cuarto nivel', 'E02', NULL);`);
    await queryRunner.query(`insert into sector values (4, 'Biblioteca y Cooperadora', 'E03', NULL);`);
    await queryRunner.query(`insert into sector values (5, 'Laboratorio Quimica', 'E04', NULL);`);
    await queryRunner.query(`insert into sector values (6, 'Laboratorio Electromecanica', 'E05', NULL);`);
    await queryRunner.query(`insert into sector values (7, 'Laboratorio Fisica Lar Sistemas', 'E06', NULL);`);
    await queryRunner.query(`insert into sector values (8, 'Laboratorio Electronica', 'E07', NULL);`);
    await queryRunner.query(
      `insert into sector values (9, 'Taller Mantenimiento y Servicios Generales', 'E08', NULL);`,
    );
    await queryRunner.query(`insert into sector values (10, 'Dasuten', 'E09', NULL);`);
    await queryRunner.query(`insert into sector values (11, 'Comedor universitario', 'E10', NULL);`);
    await queryRunner.query(`insert into sector values (12, 'Secyt', 'E11', NULL);`);
    await queryRunner.query(`insert into sector values (13, 'Quincho CEUT', 'E12', NULL);`);
    await queryRunner.query(`insert into sector values (14, 'Portico', 'E13', NULL);`);
    await queryRunner.query(`insert into sector values (17, 'Patio interno', 'P01', NULL);`);
    await queryRunner.query(`insert into sector values (15, 'Parque frente', 'P02', NULL);`);
    await queryRunner.query(`insert into sector values (16, 'Parque sur', 'P03', NULL);`);
    await queryRunner.query(`insert into sector values (18, 'Parque playon', 'P04', NULL);`);
    await queryRunner.query(`insert into sector values (19, 'Parque laboratorios exteriores', 'Plab', NULL);`);
    await queryRunner.query(`insert into sector values (20, 'Parque estacionamiento', 'P05', NULL);`);

    //Create Services
    await queryRunner.query(`insert into service values (1, 'Agua potable', 'Ag');`);
    await queryRunner.query(`insert into service values (2, 'Aire acondicionado', 'AA');`);
    await queryRunner.query(`insert into service values (3, 'Ascensor', 'Asc');`);
    await queryRunner.query(`insert into service values (4, 'Cerramiento', 'Ce');`);
    await queryRunner.query(`insert into service values (5, 'Cloacas', 'Cl');`);
    await queryRunner.query(`insert into service values (6, 'Edilicio', 'Ed');`);
    await queryRunner.query(`insert into service values (7, 'Energia Electrica', 'EE');`);
    await queryRunner.query(`insert into service values (8, 'Gas', 'G');`);
    await queryRunner.query(`insert into service values (9, 'Iluminacion', 'Ilum');`);

    //Create Products
    await queryRunner.query(`insert into product values
      (1, 'Adaptador 2p a 3p'),
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
      (84, 'Zocalo tubo 36 W');`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`delete from user_roles where id = 1;`);
    await queryRunner.query(`delete from user_roles where id = 2;`);
    await queryRunner.query(`delete from roles where id = 1;`);
    await queryRunner.query(`delete from roles where id = 2;`);
    await queryRunner.query(`delete from users where id = 1;`);
  }
}
