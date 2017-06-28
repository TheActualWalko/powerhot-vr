const state = {
  IDLE: 'idle',
  LISTENING: 'listening'
};

function LevenshteinDistance(s, t) {
    const sLength = s.length;
    const tLength = t.length;
    const matrix = [];

    if(sLength === 0) return tLength;
    if(tLength === 0) return sLength;

    for(let i = 0; i <= sLength; matrix[i] = [i++]){
	}

    for(let j = 0; j <= tLength; matrix[0][j] = j++){
	}

	for(let i = 1; i <= sLength; i++){
		for(let j = 1; j <= tLength; j++){
			const cost = t[j - 1] === s[i - 1] ? 0 : 1;
			const currMin = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1);

			matrix[i][j] = Math.min(currMin, matrix[i - 1][j - 1] + cost);
        }
    }

	return matrix[sLength][tLength];
}

const commands = ['snap', 'cancel', 'post'];

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
      const words = result.split(' ');
      console.log(`DID YOU SAY ${result}?`);

      const match = words.map(word => {
        if(commands.indexOf(word) > -1){
          return word;
        }

        return commands
          .map(command => LevenshteinDistance(command, word) < 2 ? command : null)
          .filter(a => a).pop();
      }).filter(a => a).pop();

      switch(match) {
        case 'cancel':
        case 'snap':
          this.state = state.IDLE;
          this.recognition.stop();
          cb(match);
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
