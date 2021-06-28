import { MigrationInterface, QueryRunner } from 'typeorm';

export class DatabaseInitialStructure1561441545394 implements MigrationInterface {
  name = 'DatabaseInitialStructure1561441545394';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `user_roles` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NULL, `roleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `user_work_order` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NULL, `workOrderId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `event` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `startDate` varchar(255) NULL, `endDate` varchar(255) NULL, `allDay` tinyint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `user_event` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NULL, `eventId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `educational_element` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `totalQuantity` int NOT NULL, `borrowQuantity` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `element_request` (`id` int NOT NULL AUTO_INCREMENT, `status` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, `quantity` int NOT NULL, `elementId` int NULL, `userId` int NULL, `areaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `tool` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `totalQuantity` int NOT NULL, `borrowQuantity` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `tool_request` (`id` int NOT NULL AUTO_INCREMENT, `status` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, `quantity` int NOT NULL, `toolId` int NULL, `userId` int NULL, `areaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `state` varchar(255) NOT NULL DEFAULT 'active', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `work_order` (`id` int NOT NULL AUTO_INCREMENT, `orderDate` varchar(255) NOT NULL, `startDate` varchar(255) NULL, `realizationDate` varchar(255) NULL, `priority` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `taskDespcription` varchar(255) NULL, `comment` varchar(255) NOT NULL, `userId` int NULL, `assetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `element` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `description` varchar(255) NULL, `steps` varchar(255) NULL, `serviceId` int NULL, UNIQUE INDEX `IDX_08e0499daf3714e09cc58aae88` (`name`), UNIQUE INDEX `IDX_a116b872585dc87200c7efb4a6` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `area_service` (`id` int NOT NULL AUTO_INCREMENT, `map` varchar(255) NULL, `areaId` int NULL, `serviceId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `service` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, UNIQUE INDEX `IDX_7806a14d42c3244064b4a1706c` (`name`), UNIQUE INDEX `IDX_4cb3cf237c83885cc504634829` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `asset` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `sectorId` int NULL, `areaId` int NULL, `serviceId` int NULL, `elementId` int NULL, UNIQUE INDEX `IDX_1f435756948298c61ecc3c6dab` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `sector` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `map` varchar(255) NULL, UNIQUE INDEX `IDX_23e1125a0a0e6b06d3e825ba99` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `area` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `sectorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `stock_entry` (`id` int NOT NULL AUTO_INCREMENT, `stockId` int NULL, `entryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `entry` (`id` int NOT NULL AUTO_INCREMENT, `date` varchar(255) NOT NULL, `observations` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `purchase` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `provider` varchar(255) NOT NULL, `productId` int NULL, `entryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `stock` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `minimunQuantity` int NOT NULL, `state` varchar(255) NOT NULL, `productId` int NULL, UNIQUE INDEX `REL_e855a71c31948188c2bf78824a` (`productId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `stock_departure` (`id` int NOT NULL AUTO_INCREMENT, `stockId` int NULL, `departureId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `departure` (`id` int NOT NULL AUTO_INCREMENT, `date` varchar(255) NOT NULL, `observations` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `consumption` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `productId` int NULL, `departureId` int NULL, `workOrderId` int NULL, UNIQUE INDEX `REL_23d383f2776aa87b544e24d392` (`workOrderId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_roles` ADD CONSTRAINT `FK_472b25323af01488f1f66a06b67` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_roles` ADD CONSTRAINT `FK_86033897c009fcca8b6505d6be2` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_work_order` ADD CONSTRAINT `FK_2a21421519cc204b9d541c97866` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_work_order` ADD CONSTRAINT `FK_2557568d77c976fbc2488740cbe` FOREIGN KEY (`workOrderId`) REFERENCES `work_order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_event` ADD CONSTRAINT `FK_77452fe8443c349b0e628507cbb` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_event` ADD CONSTRAINT `FK_6a41d7c0f21abb37cd273824fa6` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element_request` ADD CONSTRAINT `FK_ad96b865d4ea632c718fd2eb194` FOREIGN KEY (`elementId`) REFERENCES `educational_element`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element_request` ADD CONSTRAINT `FK_f270ce54c07b4a4c87b5d8b8364` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element_request` ADD CONSTRAINT `FK_600aa92c0b433d38e08e83b7f1c` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `tool_request` ADD CONSTRAINT `FK_eb17bb26807cdcf5f6d388eb345` FOREIGN KEY (`toolId`) REFERENCES `tool`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `tool_request` ADD CONSTRAINT `FK_845d9daf45d8ca8509c312b2051` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `tool_request` ADD CONSTRAINT `FK_81dc7fa40112c9880b2655e2738` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `work_order` ADD CONSTRAINT `FK_0967520a5843ce4e307fb1302ec` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `work_order` ADD CONSTRAINT `FK_2046c91e37525f7609487efdde8` FOREIGN KEY (`assetId`) REFERENCES `asset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element` ADD CONSTRAINT `FK_42e4c2a1cfb51ff941af50e3d38` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `area_service` ADD CONSTRAINT `FK_79c4b759226c21522cfe66219e8` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `area_service` ADD CONSTRAINT `FK_6e329d1e5060017c14c34c0ac2c` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `asset` ADD CONSTRAINT `FK_0b2bf7ef3b0a9a9f92a882826e1` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `asset` ADD CONSTRAINT `FK_441e8d43918124ba45db8e20edf` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `asset` ADD CONSTRAINT `FK_3bada5f55dc6e8a3c71a8164866` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `asset` ADD CONSTRAINT `FK_94917e0f7c03c79d9944301f9f7` FOREIGN KEY (`elementId`) REFERENCES `element`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `area` ADD CONSTRAINT `FK_d8293ae6aed38984fc54755b4ea` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock_entry` ADD CONSTRAINT `FK_7a458f0733bfb354a1c05bde332` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock_entry` ADD CONSTRAINT `FK_a6b1ad8ae040c08c31b1cba63c7` FOREIGN KEY (`entryId`) REFERENCES `entry`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_9af3a556aa0f166dd771a1e6c46` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `purchase` ADD CONSTRAINT `FK_96a8af5fa503939e2c5235cbe74` FOREIGN KEY (`entryId`) REFERENCES `entry`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock` ADD CONSTRAINT `FK_e855a71c31948188c2bf78824a5` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock_departure` ADD CONSTRAINT `FK_2c09a865f93173875618d20f6bf` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock_departure` ADD CONSTRAINT `FK_ddc1a69e72925dd70079489bf2b` FOREIGN KEY (`departureId`) REFERENCES `departure`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `consumption` ADD CONSTRAINT `FK_461bbf4235654cac96842e8f5f7` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `consumption` ADD CONSTRAINT `FK_3cf430ce18c99afa34c6f607750` FOREIGN KEY (`departureId`) REFERENCES `departure`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `consumption` ADD CONSTRAINT `FK_23d383f2776aa87b544e24d392a` FOREIGN KEY (`workOrderId`) REFERENCES `work_order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `consumption` DROP FOREIGN KEY `FK_23d383f2776aa87b544e24d392a`', undefined);
    await queryRunner.query('ALTER TABLE `consumption` DROP FOREIGN KEY `FK_3cf430ce18c99afa34c6f607750`', undefined);
    await queryRunner.query('ALTER TABLE `consumption` DROP FOREIGN KEY `FK_461bbf4235654cac96842e8f5f7`', undefined);
    await queryRunner.query(
      'ALTER TABLE `stock_departure` DROP FOREIGN KEY `FK_ddc1a69e72925dd70079489bf2b`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `stock_departure` DROP FOREIGN KEY `FK_2c09a865f93173875618d20f6bf`',
      undefined,
    );
    await queryRunner.query('ALTER TABLE `stock` DROP FOREIGN KEY `FK_e855a71c31948188c2bf78824a5`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_96a8af5fa503939e2c5235cbe74`', undefined);
    await queryRunner.query('ALTER TABLE `purchase` DROP FOREIGN KEY `FK_9af3a556aa0f166dd771a1e6c46`', undefined);
    await queryRunner.query('ALTER TABLE `stock_entry` DROP FOREIGN KEY `FK_a6b1ad8ae040c08c31b1cba63c7`', undefined);
    await queryRunner.query('ALTER TABLE `stock_entry` DROP FOREIGN KEY `FK_7a458f0733bfb354a1c05bde332`', undefined);
    await queryRunner.query('ALTER TABLE `area` DROP FOREIGN KEY `FK_d8293ae6aed38984fc54755b4ea`', undefined);
    await queryRunner.query('ALTER TABLE `asset` DROP FOREIGN KEY `FK_94917e0f7c03c79d9944301f9f7`', undefined);
    await queryRunner.query('ALTER TABLE `asset` DROP FOREIGN KEY `FK_3bada5f55dc6e8a3c71a8164866`', undefined);
    await queryRunner.query('ALTER TABLE `asset` DROP FOREIGN KEY `FK_441e8d43918124ba45db8e20edf`', undefined);
    await queryRunner.query('ALTER TABLE `asset` DROP FOREIGN KEY `FK_0b2bf7ef3b0a9a9f92a882826e1`', undefined);
    await queryRunner.query('ALTER TABLE `area_service` DROP FOREIGN KEY `FK_6e329d1e5060017c14c34c0ac2c`', undefined);
    await queryRunner.query('ALTER TABLE `area_service` DROP FOREIGN KEY `FK_79c4b759226c21522cfe66219e8`', undefined);
    await queryRunner.query('ALTER TABLE `element` DROP FOREIGN KEY `FK_42e4c2a1cfb51ff941af50e3d38`', undefined);
    await queryRunner.query('ALTER TABLE `work_order` DROP FOREIGN KEY `FK_2046c91e37525f7609487efdde8`', undefined);
    await queryRunner.query('ALTER TABLE `work_order` DROP FOREIGN KEY `FK_0967520a5843ce4e307fb1302ec`', undefined);
    await queryRunner.query('ALTER TABLE `tool_request` DROP FOREIGN KEY `FK_81dc7fa40112c9880b2655e2738`', undefined);
    await queryRunner.query('ALTER TABLE `tool_request` DROP FOREIGN KEY `FK_845d9daf45d8ca8509c312b2051`', undefined);
    await queryRunner.query('ALTER TABLE `tool_request` DROP FOREIGN KEY `FK_eb17bb26807cdcf5f6d388eb345`', undefined);
    await queryRunner.query(
      'ALTER TABLE `element_request` DROP FOREIGN KEY `FK_600aa92c0b433d38e08e83b7f1c`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element_request` DROP FOREIGN KEY `FK_f270ce54c07b4a4c87b5d8b8364`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `element_request` DROP FOREIGN KEY `FK_ad96b865d4ea632c718fd2eb194`',
      undefined,
    );
    await queryRunner.query('ALTER TABLE `user_event` DROP FOREIGN KEY `FK_6a41d7c0f21abb37cd273824fa6`', undefined);
    await queryRunner.query('ALTER TABLE `user_event` DROP FOREIGN KEY `FK_77452fe8443c349b0e628507cbb`', undefined);
    await queryRunner.query(
      'ALTER TABLE `user_work_order` DROP FOREIGN KEY `FK_2557568d77c976fbc2488740cbe`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `user_work_order` DROP FOREIGN KEY `FK_2a21421519cc204b9d541c97866`',
      undefined,
    );
    await queryRunner.query('ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_86033897c009fcca8b6505d6be2`', undefined);
    await queryRunner.query('ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_472b25323af01488f1f66a06b67`', undefined);
    await queryRunner.query('DROP INDEX `REL_23d383f2776aa87b544e24d392` ON `consumption`', undefined);
    await queryRunner.query('DROP TABLE `consumption`', undefined);
    await queryRunner.query('DROP TABLE `departure`', undefined);
    await queryRunner.query('DROP TABLE `stock_departure`', undefined);
    await queryRunner.query('DROP INDEX `REL_e855a71c31948188c2bf78824a` ON `stock`', undefined);
    await queryRunner.query('DROP TABLE `stock`', undefined);
    await queryRunner.query('DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`', undefined);
    await queryRunner.query('DROP TABLE `product`', undefined);
    await queryRunner.query('DROP TABLE `purchase`', undefined);
    await queryRunner.query('DROP TABLE `entry`', undefined);
    await queryRunner.query('DROP TABLE `stock_entry`', undefined);
    await queryRunner.query('DROP TABLE `area`', undefined);
    await queryRunner.query('DROP INDEX `IDX_23e1125a0a0e6b06d3e825ba99` ON `sector`', undefined);
    await queryRunner.query('DROP TABLE `sector`', undefined);
    await queryRunner.query('DROP INDEX `IDX_1f435756948298c61ecc3c6dab` ON `asset`', undefined);
    await queryRunner.query('DROP TABLE `asset`', undefined);
    await queryRunner.query('DROP INDEX `IDX_4cb3cf237c83885cc504634829` ON `service`', undefined);
    await queryRunner.query('DROP INDEX `IDX_7806a14d42c3244064b4a1706c` ON `service`', undefined);
    await queryRunner.query('DROP TABLE `service`', undefined);
    await queryRunner.query('DROP TABLE `area_service`', undefined);
    await queryRunner.query('DROP INDEX `IDX_a116b872585dc87200c7efb4a6` ON `element`', undefined);
    await queryRunner.query('DROP INDEX `IDX_08e0499daf3714e09cc58aae88` ON `element`', undefined);
    await queryRunner.query('DROP TABLE `element`', undefined);
    await queryRunner.query('DROP TABLE `work_order`', undefined);
    await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`', undefined);
    await queryRunner.query('DROP TABLE `users`', undefined);
    await queryRunner.query('DROP TABLE `tool_request`', undefined);
    await queryRunner.query('DROP TABLE `tool`', undefined);
    await queryRunner.query('DROP TABLE `element_request`', undefined);
    await queryRunner.query('DROP TABLE `educational_element`', undefined);
    await queryRunner.query('DROP TABLE `user_event`', undefined);
    await queryRunner.query('DROP TABLE `event`', undefined);
    await queryRunner.query('DROP TABLE `user_work_order`', undefined);
    await queryRunner.query('DROP TABLE `user_roles`', undefined);
    await queryRunner.query('DROP TABLE `roles`', undefined);
  }
}
