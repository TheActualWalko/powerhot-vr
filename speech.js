const state = {
  IDLE: 'idle',
  LISTENING: 'listening'
};

class Speech {
  init(cb) {
    const grammar = '#JSGF V1.0; grammar share; public <share> = share | snap | post | cancel;'
    const speechRecognitionList = new webkitSpeechGrammarList();

    this.state = state.IDLE;
    this.recognition = new webkitSpeechRecognition();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;

    this.recognition.onend = () => {
      if(this.state === state.LISTENING){
        this.recognition.start();
      }
    }

    this.recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;

      console.log(`DID YOU SAY ${result}?`);

      switch(result) {
        case 'cancel':
        case 'snap':
          this.state = state.IDLE;
          this.recognition.stop();
          cb(result);
          break;
      }
    }
  }
  
  listen(cb) {
    if(!this.recognition) this.init(cb);
    this.recognition.start();
    this.state = state.LISTENING;
    console.log('LISTENING');
  }

  stop() {
    this.state = state.IDLE;
    this.recognition.stop();
  }
}
