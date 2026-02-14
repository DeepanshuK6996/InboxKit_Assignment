import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { db } from "./db/db.js";
import { cells } from "./db/schema.js";
import { asc, eq } from "drizzle-orm";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  // Send full grid
  // const grid = await db.select().from(cells).orderBy(asc(cells.id));
  const grid = await db.select().from(cells);
  socket.emit("grid", grid);

  // Capture logic
  socket.on("capture", async ({ cellId, user, color }) => {
    const result = await db
      .select()
      .from(cells)
      .where(eq(cells.id, cellId));

    const cell = result[0];

    if (!cell.owner) {
      await db
        .update(cells)
        .set({ owner: user, color })
        .where(eq(cells.id, cellId));

      io.emit("cellUpdated", {
        id: cellId,
        owner: user,
        color
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
