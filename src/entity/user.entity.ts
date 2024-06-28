import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column({ nullable: false })
    firstName!: string

    @Column({ nullable: false})
    lastName!: string

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false})
    pwdHash!: string

    @CreateDateColumn()    
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}
