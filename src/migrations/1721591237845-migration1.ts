import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration11721591237845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* SQL => Hace un cambio */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /* SQL => Revierte el cambio */
  }
}
