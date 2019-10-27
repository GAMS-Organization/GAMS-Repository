import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicSetup1570143571796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`insert into roles values (1, 'admin');`);
    await queryRunner.query(`insert into roles values (2, 'headhunter');`);
    await queryRunner.query(
      `insert into users (id, name, surname, email, username, password, state) values (1, 'admin', 'admin', 'rooftop@gmail.com', 'rooftopAdmin', '$2y$12$CYCk2ARJtF8JL9lYiHl2EuMeT7g90C/NwIed/Gf/L8mQqZMI2sjo6', 'active');`,
    );
    await queryRunner.query(`insert into user_roles values (1, 1, 1);`);
    await queryRunner.query(`insert into user_roles values (2, 1, 2);`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`delete from user_roles where id = 1;`);
    await queryRunner.query(`delete from user_roles where id = 2;`);
    await queryRunner.query(`delete from roles where id = 1;`);
    await queryRunner.query(`delete from roles where id = 2;`);
    await queryRunner.query(`delete from users where id = 1;`);
  }
}
