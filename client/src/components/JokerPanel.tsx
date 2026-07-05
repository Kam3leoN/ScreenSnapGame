interface JokerPanelProps {
  fiftyLeft: number;
  switchLeft: number;
  fiftyEnabled: boolean;
  switchEnabled: boolean;
  onFifty: () => void;
  onSwitch: () => void;
  disabled: boolean;
}

/**
 * Panneau des jokers 50/50 et Switch.
 */
export function JokerPanel({
  fiftyLeft,
  switchLeft,
  fiftyEnabled,
  switchEnabled,
  onFifty,
  onSwitch,
  disabled,
}: JokerPanelProps) {
  return (
    <div className="ssg-jokers">
      {fiftyEnabled && fiftyLeft > 0 && (
        <button
          type="button"
          className="btn btn--outlined btn--sm ripple ssg-jokers__btn"
          disabled={disabled}
          onClick={onFifty}
          aria-label="Joker 50 sur 50"
        >
          <img src="/img/screengame-switch.svg" alt="" className="ssg-jokers__icon" />
          50 : 50
        </button>
      )}
      {switchEnabled && switchLeft > 0 && (
        <button
          type="button"
          className="btn btn--outlined btn--sm ripple ssg-jokers__btn"
          disabled={disabled}
          onClick={onSwitch}
          aria-label="Joker Switch"
        >
          <img src="/img/screengame-switch.svg" alt="" className="ssg-jokers__icon" />
          Switch
        </button>
      )}
    </div>
  );
}
