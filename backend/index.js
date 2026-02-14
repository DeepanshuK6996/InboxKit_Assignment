import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { db } from "./db/db.js";
import { cells } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
app.use(cors());

//render check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Territory Conquest API is running!',
    timestamp: new Date().toISOString()
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Track connected users
let activePlayers = 0;

io.on("connection", async (socket) => {
  //console.log("User connected:", socket.id);
  
  activePlayers++;

  //console.log("Active players:", activePlayers);

  // Grid retrieval query
  const grid = await db.select().from(cells);
  socket.emit("grid", grid);
  
  // Send active player count to the new client
  socket.emit("activeCount", activePlayers);
  
  // Broadcast active player count to all OTHER clients
  socket.broadcast.emit("activeCount", activePlayers);

  // Capture logic - older 
  // socket.on("capture", async ({ cellId, user, color }) => {
  //   const result = await db
  //     .select()
  //     .from(cells)
  //     .where(eq(cells.id, cellId));

  //   const cell = result[0];

  //   if (!cell.owner) {
  //     await db
  //       .update(cells)
  //       .set({ owner: user, color })
  //       .where(eq(cells.id, cellId));

  //     io.emit("cellUpdated", {
  //       id: cellId,
  //       owner: user,
  //       color
  //     });
  //   }
  // });

  //Capture logic - atomic update
  socket.on("capture", async ({ cellId, user, color }) => {
    try {
      const result = await db
        .update(cells)
        .set({ owner: user, color })
        .where(
          and(
            eq(cells.id, cellId),
            isNull(cells.owner), // Only update if owner is NULL
          ),
        )
        .returning(); // Get the updated row

      if (result.length > 0) {
        io.emit("cellUpdated", {
          id: cellId,
          owner: user,
          color,
        });
      } else {
        // Cell was already claimed, notify user
        socket.emit("cellAlreadyClaimed", { cellId });
      }
    } catch (error) {
      //console.error("Capture error:", error);
      socket.emit("captureError", { cellId });
    }
  });

  socket.on("disconnect", () => {
    //console.log("User disconnected:", socket.id);
    
    activePlayers--;

    //console.log("Active players:", activePlayers);
    
    // Broadcast updated active player count
    io.emit("activeCount", activePlayers);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log("Server running on port ${port}");
});