import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    migrationsTableName: "custom_migration_table",
})
