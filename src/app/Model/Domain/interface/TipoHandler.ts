// tipo-handler.ts
export interface TipoHandler {
  execute(params?: any): void;
  getTitle(): string;
}
