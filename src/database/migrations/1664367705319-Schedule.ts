import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Schedule1664367705319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "schedules",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "service",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "255",
                    isNullable: false

                },
                {
                    name: "date",
                    type: "datetime",  
                    isNullable: false
                },
                {
                    name: "message",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"

                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }));

     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedules")
    }

}
