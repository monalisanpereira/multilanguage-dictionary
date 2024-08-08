import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('entries')
export class Entry extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        nullable: true
    })
    english: string;

    @Column({
        nullable: true
    })
    japanese: string;

    @Column({
        nullable: true
    })
    portuguese: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}