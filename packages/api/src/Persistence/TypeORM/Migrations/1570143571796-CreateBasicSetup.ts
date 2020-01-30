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
    await queryRunner.query(`insert into sector values (1, 'Campus deportes', 'CD');`);
    await queryRunner.query(`insert into sector values (2, 'Edificio principal', 'E01');`);
    await queryRunner.query(`insert into sector values (3, 'Cuarto nivel', 'E02');`);
    await queryRunner.query(`insert into sector values (4, 'Biblioteca - Cooperadora', 'E03');`);
    await queryRunner.query(`insert into sector values (5, 'Lab. Quimica', 'E04');`);
    await queryRunner.query(`insert into sector values (6, 'Lab. Electromecanica', 'E05');`);
    await queryRunner.query(`insert into sector values (7, 'Lab. Fis. Lar. Sistemas', 'E06');`);
    await queryRunner.query(`insert into sector values (8, 'Lab. Electronica', 'E07');`);
    await queryRunner.query(`insert into sector values (9, 'Taller Mant. y Servicios Grales.', 'E08');`);
    await queryRunner.query(`insert into sector values (10, 'Dasuten', 'E09');`);
    await queryRunner.query(`insert into sector values (11, 'Comedor universitario', 'E10');`);
    await queryRunner.query(`insert into sector values (12, 'Secyt', 'E11');`);
    await queryRunner.query(`insert into sector values (13, 'Quincho CEUT', 'E12');`);
    await queryRunner.query(`insert into sector values (14, 'Portico', 'E13');`);
    await queryRunner.query(`insert into sector values (17, 'Patio interno', 'P01');`);
    await queryRunner.query(`insert into sector values (15, 'Parque frente', 'P02');`);
    await queryRunner.query(`insert into sector values (16, 'Parque sur', 'P03');`);
    await queryRunner.query(`insert into sector values (18, 'Parque playon', 'P04');`);
    await queryRunner.query(`insert into sector values (19, 'Parque lab. exteriores', 'Plab');`);
    await queryRunner.query(`insert into sector values (20, 'Parque estacionamiento', 'P05');`);

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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`delete from user_roles where id = 1;`);
    await queryRunner.query(`delete from user_roles where id = 2;`);
    await queryRunner.query(`delete from roles where id = 1;`);
    await queryRunner.query(`delete from roles where id = 2;`);
    await queryRunner.query(`delete from users where id = 1;`);
  }
}
