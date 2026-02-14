import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHover() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Find a Cell",
    description:
      "Explore the map and look for any unclaimed cell. Empty cells are available for you to capture.",
  },
  {
    title: "Click to Claim",
    description:
      "Click on an unclaimed cell to make it your territory. Your claim is applied instantly.",
  },
  {
    title: "Own Your Territory",
    description:
      "Once a cell is claimed, it belongs to you and cannot be taken by others. Keep claiming cells to expand your area.",
  }
];
