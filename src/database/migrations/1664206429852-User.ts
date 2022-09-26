import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1664206429852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
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
                    name: "cpf",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "cep",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "street",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "uf",
                    type: "varchar",
                    length: "36",
                    isNullable: false
                },
                {
                    name: "city",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "district",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "state",
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
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
