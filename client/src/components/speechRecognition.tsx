// types.d.ts
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

// speechRecognition.ts
export function recognizeSpeech(language: string): Promise<SpeechRecognitionResult> {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(new Error("Speech recognition not supported in this browser."));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language; // e.g., "en-US", "sw-KE"
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0];
      resolve({ transcript: result.transcript, confidence: result.confidence });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      reject(new Error(event.error));
    };

    recognition.start();
  });
}
