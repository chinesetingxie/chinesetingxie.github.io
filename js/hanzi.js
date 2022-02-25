var n = 0;
var i;
var learn = false;
var nMistakes = 0;
var lesson;
var words = [];
var wordString = "";
var totalWords;
var c;
var p3 = false;

$(document).ready(function() 
{		
	var get = window.location.search.substr(1);
	
	if (get.split("P3").length == 2)
	{
		p3 = true;
	}
	
	if (get.split("-").length == 2)	
	{
		lesson = get.split("-")[0];
		learn = true;
	}
	else
		lesson = get;
	
	$("#gif").hide();
	
	$.getJSON("./" + lesson + "/hanzi/hanzi.json", function(result)
	{
		
		if (!learn)
			$(".words").hide();
		
		for (i = 0; i < result.words.length; i++)
		{
			words.push(result.words[i]);
			wordString += result.words[i] + " ";
		}
		
		//shuffle(words);
		nextQuestion();
	});
	
	$('.check').click(function() 
	{		
		n++;
		if (n >= words.length)
			n = 0;
		nextQuestion();	
	});
	
	$('.prev').click(function() 
	{		
		n--;
		if (n < 0)
			n = words.length - 1;
		nextQuestion();		
	});
	
	$('.next').click(function() 
	{		
		n++;
		if (n >= words.length)
			n = 0;
		nextQuestion();		
	});
	
	$('.play').click(function() {
		//$(".audio")[0].play();
		$(".audio").attr('src', "./" + lesson + "/hanzi/" + words[n] + ".mp3");	
	});	
});

function boldChar()
{
	var newS = "";
	for (i = 0; i < words.length; i++)
	{
		if (i == n)
		{
			newS += "<strong class='highlight'>" + words[i] + "</strong>" + (p3 ? "<br>" : " ");
		}
		else
		{
			newS += words[i] + (p3 ? "<br>" : " ");
		}
	}
	return newS;
}

function nextQuestion()
{
	$("#gif").hide();
	$(".check").hide();
	
	$("#characters").empty();
	
	getGif();
	
	c = 0;
	
	var totalWords = words[n].length;
	
	for (i = 0; i < words[n].length; i++)
	{
		
		$('#characters').append('<div id="word' + i + '"></div>');
		
		var writer = HanziWriter.create('word' + i, words[n][i], 
		{
			width: 350,
			height: 350,
			showCharacter: false,
			showOutline: learn,
			showHintAfterMisses: 3,
			padding: 0
		});
		
		$('#word' + i).append('<p><span class="badge badge-info char-info' + words[n][i] + '"></span><span class="badge badge-warning char-warning' + words[n][i] + '"></span><span class="badge badge-success char-success' + words[n][i] + '"></span><span class="badge badge-danger char-danger' + words[n][i] + '"></span></p>')
		
		writer.quiz({
			onMistake: function(strokeData) 
			{
				nMistakes = strokeData.totalMistakes;
				$(".char-info" + strokeData.character).text('Oh no! you made ' + strokeData.totalMistakes + ' mistakes so far.');
				$(".char-info" + strokeData.character).show();

				/*console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
				console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
				console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");*/
			},
			onCorrectStroke: function(strokeData) 
			{
				if (strokeData.strokesRemaining > 0)
				{
					$(".char-info" + strokeData.character).text('Yes!!! There are ' + strokeData.strokesRemaining + ' strokes remaining.');
					$(".char-info" + strokeData.character).show();
				}
				/*console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
				console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
				console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
				console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');*/
			},
			onComplete: function(summaryData) 
			{
				$(".char-info" + summaryData.character).hide();
				if (nMistakes >= 5)
				{
					$(".char-danger" + summaryData.character).text('Try harder!');
					$(".char-danger" + summaryData.character).show();
					//$(".audio").attr('src', "../audio/wrong.mp3");
				} 
				else if (nMistakes >= 1)
				{
					$(".char-warning" + summaryData.character).text('Almost there!');
					$(".char-warning" + summaryData.character).show();
				}
				else if (nMistakes == 0)
				{
					$(".char-success" + summaryData.character).text('Perfect!');
					$(".char-success" + summaryData.character).show();
					//$(".audio").attr('src', "../audio/perfect.mp3");
				}
					
				/*console.log('You did it! You finished drawing ' + summaryData.character);
				console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');*/
				c++;
				
				if (c >= totalWords)
				{
			
					$(".check").show();
					//$(".badge").hide();
					$("#gif").show();
				}

			}
		});
		
	}
	
	$(".words").html(boldChar());
	
	$(".badge").hide();
	$(".check").hide();
	
	
	
	nMistakes = 0;
	
	$(".audio").attr('src', "./" + lesson + "/hanzi/" + words[n] + ".mp3");	
}