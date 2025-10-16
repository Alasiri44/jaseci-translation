// speech.d.ts

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  readonly length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
  readonly length: number;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error:
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported";
  readonly message: string;
}
