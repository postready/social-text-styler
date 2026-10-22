export type TextStyle =
  | 'bold'
  | 'serifBold'
  | 'italic'
  | 'serifItalic'
  | 'boldItalic'
  | 'monospace'
  | 'bubble'
  | 'script'
  | 'fraktur'
  | 'strikethrough'
  | 'underline';

export interface StyleOptions {
  preserveUrls?: boolean;
}

export declare const STYLES: Record<TextStyle, (char: string) => string>;
export declare const AVAILABLE_STYLES: TextStyle[];

export declare function styleText(
  text: string,
  styleName?: TextStyle,
  options?: StyleOptions
): string;
