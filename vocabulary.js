function loadVocabulary()
{
	inputFile = document.getElementsByTagName("input")[0];
	file = inputFile.files[0];
	reader = new FileReader();
	reader.readAsText(file);
	reader.onloadend = function()
	{
		document.body.removeChild(inputFile);
		vocabulary = JSON.parse(reader.result);
		play(vocabulary);
	};
}

function play(vocabulary)
{
	wordsNumber = Object.keys(vocabulary).length;
	randomIndex = getRandomNumber(wordsNumber);

	h1 = document.getElementsByTagName("h1")[0];
	h1.vocabulary = vocabulary;
	h1.innerText = wordsNumber;

	h2 = document.getElementsByTagName("h2")[0];
	h2.wordIndex = randomIndex;
	h2.wordDefinition = vocabulary[randomIndex].definition;
	h2.innerText = vocabulary[randomIndex].word;

	h3 = document.getElementsByTagName("h3")[0];
	h3.innerText = vocabulary[randomIndex].example;

	ul = document.createElement("ul");
	document.body.appendChild(ul);

	definitions = [];
	definitions.push(h2.wordDefinition);
	for(i = 0; i < 9; i++)
	{
		randomIndex = getRandomNumber(wordsNumber);
		definitions.push(vocabulary[randomIndex].definition);
	}
	while(definitions.length > 0)
	{
		randomIndex = getRandomNumber(definitions.length);
		li = document.createElement("li");
		button = document.createElement("button");
		button.innerText = definitions[randomIndex];
		button.onclick = check;
		li.appendChild(button);
		ul.appendChild(li);
		definitions.splice(randomIndex, 1);
	}
}

function check(event)
{
	button = event.srcElement;
	h1 = document.getElementsByTagName("h1")[0];
	h2 = document.getElementsByTagName("h2")[0];
	if(button.innerText == h2.wordDefinition)
	{
		button.style.background = "green" 
		ul = document.getElementsByTagName("ul")[0];
		document.body.removeChild(ul);
		h1.vocabulary.splice(h2.wordIndex, 1);
		Object.keys(h1.vocabulary).length == 0 ? window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : play(h1.vocabulary);
	}
	else
	{
		button.style.background = "red";
	}
}

function getRandomNumber(max)
{
	return Math.floor(Math.random() * max);
}
