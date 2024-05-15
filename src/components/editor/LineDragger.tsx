import "../../styles/line-dragger.css";

export default function LineDragger({ isVertical }: { isVertical: boolean }) {
  return (
    <div
      className={
        isVertical ? "line-dragger vertical" : "line-dragger horizontal"
      }
    >
      <span className="overlay-border animation"></span>
    </div>
  );
}
