export type ACTabsPropT = {
  defaultTab?: number | string | false;
  tabs: {
    id: number | string;
    label: string;
    content: any;
  }[];
  style?: {
    wrapper?: React.CSSProperties;
    header?: React.CSSProperties;
    headerLabel?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  headerButtonClassName?: string;
  tabParams?: string | false;
  onChange?: (id: number | string) => void;
};
