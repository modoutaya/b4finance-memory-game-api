import { Knex } from "knex";

const TABLE_NAME = "score";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(TABLE_NAME, function (table) {
        table.increments('id').primary();
        table.string('player', 255).notNullable();
        table.integer('value').notNullable();
        table.integer('duration');
        table.boolean('isBestScore');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}

