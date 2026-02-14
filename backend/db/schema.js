// import { integer } from "drizzle-orm/gel-core";
import { pgTable, serial, text, integer} from "drizzle-orm/pg-core";

export const cells = pgTable("cells", {
  id: serial("id").primaryKey(),
  x: integer("x"),
  y: integer("y"),
  owner: text("owner"),
  color: text("color"),
});
