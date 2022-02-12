function another()
{
	randomWord = getRandomWord();
	audioURL = getAudioURL(randomWord);

	inputText = document.getElementsByTagName("input")[0];
	inputText.style.background = "white";
	inputText.value = "";

	source = document.getElementsByTagName("source")[0];
	source.src = audioURL;

	audio = document.getElementsByTagName("audio")[0];
	audio.currentWord = randomWord;
	audio.load();
}

function getRandomWord()
{
	xmlHttpRequest = new XMLHttpRequest();
	switch(Math.floor(Math.random() * 4))
	{
		case 0:
			xmlHttpRequest.open("GET", "https://random-word-form.herokuapp.com/random/noun", false);
			break;
		case 1:
			xmlHttpRequest.open("GET", "https://random-word-form.herokuapp.com/random/adjective", false);
			break;
		case 2:
			xmlHttpRequest.open("GET", "https://random-word-form.herokuapp.com/random/animal", false);
			break;
		case 3:
			xmlHttpRequest.open("GET", "https://random-word-api.herokuapp.com/word?number=1&swear=1", false);
			break;
	}
	xmlHttpRequest.send(null);
	return JSON.parse(xmlHttpRequest.responseText)[0];
}

function getAudioURL(word)
{
	xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/" + word, false);
	xmlHttpRequest.send(null);
	return "https:" + JSON.parse(xmlHttpRequest.responseText)[0].phonetics[0].audio;
}

function checkAnswer(event)
{
	if(event.keyCode == 13) // enter
	{
		audio = document.getElementsByTagName("audio")[0];
		inputText = document.getElementsByTagName("input")[0];
		if(audio.currentWord == inputText.value)
		{
			inputText.style.background = "green";
		}
		else
		{
			inputText.style.background = "red";
			inputText.value = audio.currentWord;
		}
	}
}
