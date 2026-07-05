import type { RoundAnswer } from "../types/game";

interface ChoiceGridProps {
  answers: RoundAnswer[];
  hiddenIndexes: number[];
  disabled: boolean;
  onSelect: (index: number) => void;
}

/**
 * Grille des réponses proposées.
 */
export function ChoiceGrid({ answers, hiddenIndexes, disabled, onSelect }: ChoiceGridProps) {
  return (
    <div className="ssg-choices" role="group" aria-label="Réponses possibles">
      {answers.map((answer) => {
        const hidden = hiddenIndexes.includes(answer.index);
        if (hidden) return null;
        return (
          <button
            key={answer.index}
            type="button"
            className="btn btn--filled btn--sm ripple ssg-choices__btn"
            disabled={disabled}
            onClick={() => onSelect(answer.index)}
          >
            {answer.title}
          </button>
        );
      })}
    </div>
  );
}
