import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    service: string;
    
    @Column()
    email: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    date: Date;

    @Column()
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

}
