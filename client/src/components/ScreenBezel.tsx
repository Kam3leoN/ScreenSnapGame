interface ScreenBezelProps {
  image: string;
  title?: string;
}

/**
 * Écran CRT avec scanlines pour la capture de jeu.
 */
export function ScreenBezel({ image, title }: ScreenBezelProps) {
  const src = image ? `/snaps/${image}` : "/img/placeholder-screen.svg";

  return (
    <div className="ssg-bezel card">
      <div className="ssg-bezel__frame">
        <div className="ssg-bezel__scanlines">
          <img
            className="ssg-bezel__image"
            src={src}
            alt={title ? `Capture : ${title}` : "Capture de jeu"}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/img/placeholder-screen.svg";
            }}
          />
        </div>
      </div>
    </div>
  );
}
