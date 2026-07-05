export interface K3Toast {
  show(opts: {
    title?: string;
    description?: string;
    icon?: string;
    variant?: string;
    displayLength?: number;
  }): void;
}

export interface K3FieldInstance {
  getValue?: () => string;
  setValue?: (value: string) => void;
  destroy?: () => void;
}

export interface K3API {
  Toast: K3Toast;
  ThemeManager: {
    init(opts?: { savePreference?: boolean }): void;
    setTheme(mode: "light" | "dark" | "system" | "auto"): void;
  };
  Field: {
    init(el: Element, opts?: Record<string, unknown>): unknown;
    getInstance(el: HTMLElement): K3FieldInstance | undefined;
  };
}

declare global {
  interface Window {
    K?: K3API;
    K3UI_OPTIONS?: Record<string, unknown>;
  }
}

export {};
