import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from "bcrypt";
@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    uf: string;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    state: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashSync(this.password, 8)
    }
}