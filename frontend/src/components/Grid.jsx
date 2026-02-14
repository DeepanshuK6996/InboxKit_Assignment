// function Grid({ grid, onCapture }) {
//   return (
//     <div className="relative w-[1000px] h-[700px] mx-auto">
//       {grid.map((cell) => (
//         <div
//           key={cell.id}
//           onClick={() => onCapture(cell.id)}
//           className="absolute w-3 h-3 rounded-full border cursor-pointer"
//           style={{
//             left: cell.x * 12,
//             top: cell.y * 12,
//             backgroundColor: cell.color || "#94a3b8",
//           }}
//           title={cell.owner || "Unclaimed"}
//         />
//       ))}
//     </div>
//   );
// }

// export default Grid;

function Grid({ grid, onCapture }) {
  return (
    <div className="relative w-[1000px] h-[700px] mx-auto">
      {grid.map((cell) => (
        <div
          key={cell.id}
          onClick={() => onCapture(cell.id)}
          className="absolute w-3 h-3 rounded-full border cursor-pointer transition-all duration-200 hover:scale-150 hover:z-10"
          style={{
            left: cell.x * 12,
            top: cell.y * 12,
            backgroundColor: cell.color || "#94a3b8",
            borderColor: cell.owner ? "rgba(255, 255, 255, 0.5)" : "rgba(148, 163, 184, 0.3)",
            boxShadow: cell.owner ? `0 0 8px ${cell.color}` : "none",
          }}
          title={cell.owner || "Unclaimed"}
        />
      ))}
    </div>
  );
}

export default Grid;
