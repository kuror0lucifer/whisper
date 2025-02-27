import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    email: {
      type: "varchar",
      notNull: true,
    },
    hash: {
      type: "varchar",
      notNull: true,
    },
    name: {
      type: "varchar",
      notNull: false,
    },
    telegram_id: {
      type: "bigint",
      notNull: false,
    },
    avatar: {
      type: "varchar",
      notNull: false,
    },
  });

  pgm.createTable("favourites", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "bigint",
      notNull: true,
    },
    game_id: {
      type: "bigint",
      notNull: true,
    },
    got_reminder: {
      type: "boolean",
      notNull: false,
    },
    on_sale: {
      type: "boolean",
      notNull: false,
    },
  });

  pgm.addConstraint("favourites", "favourites_user_id_fkey", {
    foreignKeys: [
      {
        columns: "user_id",
        references: "users(id)",
        onDelete: "CASCADE",
      },
    ],
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropConstraint("favourites", "favourites_user_id_fkey");
  pgm.dropTable("favourites");
  pgm.dropTable("users");
}
