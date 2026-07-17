export {};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }

  interface DocumentEventMap {
    message: MessageEvent;
  }
}