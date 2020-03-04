var n = 0;
var learn = false;
var nMistakes = 0;

$(document).ready(function() 
{		
	if (window.location.search.substr(1) == "learn")
		learn = true;
	
	$("#gif").hide();
	
	$('.check').click(function() 
	{	
		
		nextQuestion();		
	});
	
	$('.play').click(function() {
		$(".audio")[0].play();
	});
	
	nextQuestion();
});

function nextQuestion()
{
	$("#gif").hide();
	$(".check").hide();
	
	getGif();
	
	$(".badge").hide();
	$(".check").hide();
	
	$("#character-target-div").empty();
	
	nMistakes = 0;
	
	var writer = HanziWriter.create('character-target-div', words[n], 
	{
		width: 350,
		height: 350,
		showCharacter: false,
		showOutline: learn,
		showHintAfterMisses: 3,
		padding: 0
	});
	
	writer.quiz({
		onMistake: function(strokeData) 
		{
			nMistakes = strokeData.totalMistakes;
			$(".badge-info").text('Oh no! you made ' + strokeData.totalMistakes + ' mistakes so far.');
			$(".badge-info").show();
			/*console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
			console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
			console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");*/
		},
		onCorrectStroke: function(strokeData) 
		{
			$(".badge-info").text('Yes!!! There are ' + strokeData.strokesRemaining + ' strokes remaining.');
			$(".badge-info").show();
			/*console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
			console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
			console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
			console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');*/
		},
		onComplete: function(summaryData) 
		{
			$(".badge").hide();
			$("#gif").show();
			if (nMistakes >= 5)
			{
				$(".badge-danger").text('Try harder!');
				$(".badge-danger").show();
			} 
			else if (nMistakes >= 1)
			{
				$(".badge-warning").text('Almost there!');
				$(".badge-warning").show();
			}
			else if (nMistakes == 0)
			{
				$(".badge-success").text('Perfect!');
				$(".badge-success").show();
			}
				
			/*console.log('You did it! You finished drawing ' + summaryData.character);
			console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');*/
			n++;
			if (n >= words.length)
				n = 0;
			$(".check").show();
		}
	});
	
	console.log(words[n] + ".mp3")
	$(".audio").attr('src',  words[n] + ".mp3");
}