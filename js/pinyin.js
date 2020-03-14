var i = 0;
var j = 0;
var n = 0;
var questionBank = [];
var lesson;
var focused;

jQuery.extend(jQuery.expr[':'], 
{
	focusable: function (el, index, selector) {
		return $(el).is(':input, [tabindex]');
	}
});

$(document).on('keydown', 'input', function (e) 
{	
	switch (e.keyCode)
	{
	case 39:
		$(this).next('.ipt-py-chars').focus();
		focused = $(this).next('.ipt-py-chars');
		break;
	case 37:
		$(this).prev('.ipt-py-chars').focus();
		focused = $(this).prev('.ipt-py-chars');
		break;
	case 8:
		if ($(this).val() == "")
		{
			$(this).prev('.ipt-py-chars').focus();
			$(this).prev('.ipt-py-chars').val("");
			focused = $(this).prev('.ipt-py-chars');
		}
		break;			
	}
	console.log(focused[0].className)
});

$(document).on('keyup', 'input', function (e) 
{
	switch (e.keyCode)
	{
	case 8:
		if (this.value != "")
			$(this).val("");
		break;
	case 37:
	case 39:
		break;
	default:
		this.value = this.value.toLowerCase();
		if (this.value.length == this.maxLength)
		{
			$(this).next('.ipt-py-chars').focus();
			focused = $(this).next('.ipt-py-chars');
		}
		break;
	}
});	
	
$(document).ready(function() 
{
	$(".badge").hide();
	
	$("#gif").hide();
	lesson = window.location.search.substr(1)
	
	$.getJSON("./" + lesson + "/pinyin/pinyin.json", function(result)
	{
        var o = result;
		
		for (i = 0; i < o.audio.length; i++)
			questionBank.push({audio: o.audio[i], pyanswer: o.pyanswer[i], pysound: o.pysound[i]});

		shuffle(questionBank);

		console.log(questionBank[n]);
				
		$('.play').click(function() 
		{
			$(".audio")[0].play();
		});
		
		$('.check').click(function() 
		{			
			var inputList = "";
			var soundList = "";
			console.log($("#my-icon-select"))
			for (i = 0; i < questionBank[n].pyanswer.length; i++)
			{
				var s = $('.sound' + i).find(":selected").text();
				if (s == "")
					soundList += "#"
				else
					soundList += $('.sound' + i).find(":selected").text();
				
				inputList += $('.input' + i).val();
			}
			console.log(soundList, questionBank[n].pysound);
			console.log(inputList, questionBank[n].pyanswer);
			
			if (soundList == questionBank[n].pysound && inputList.toLowerCase() == questionBank[n].pyanswer)
			{
				// correct answer
				$(".check").hide();
				$(".next").show();
				$(".badge-warning").hide();	
				//$(".badge-success").show();	
				$("#gif").show();
			}
			else
			{
				$(".badge-warning").show();	
			}
		});
		
		$('.next').click(function() 
		{	
			n++;
			if (n >= o.pyanswer.length)
				n = 0;
			nextQuestion();			
		});
			
		$('.umlaut').click(function() 
		{	
			if (focused[0].className != undefined)
			{
				console.log(focused[0].className);
				var s = String(focused[0].className).split(" ")[1];
				var n = parseInt(s.substring(5, s.length));
				console.log('.input' + (n + 1))
				$("." + s).val("ü");
				$('.input' + (n + 1)).focus();
				focused = $('.input' + (n + 1));
			}
		});
			
		nextQuestion();
    });

});

function focusInput(t)
{
	focused = $("." + t);
	console.log(focused);
}

function nextQuestion()
{
	$(".badge").hide();
	$(".next").show();
	$(".check").show();
	$("#gif").hide();
		
	getGif();
	
	$("select").remove( ".opt-py-sounds" );
	$("input").remove( ".ipt-py-chars" );

	// add py sound options
	for (i = 0; i < questionBank[n].pyanswer.length; i++)
	{
		if (questionBank[n].pyanswer[i] == "_")
		{
			input = jQuery('<select class="opt-py-sounds blank sound' + i + '" disabled><option value = "_">_</option></select>');
		}
		else
		{
			input = jQuery('<select class="opt-py-sounds sound' + i + '"><option value = ""></option><option value = "-">-</option><option value = "/">/</option><option value = "v">v</option><option value = "\\">\\</option></select>');
		}
		jQuery('.frm-py-sounds').append(input);
	}		
	
	// add py chars
	for (i = 0; i < questionBank[n].pyanswer.length; i++)
	{
		if (questionBank[n].pyanswer[i] == "_")
		{
			input = jQuery('<input class="ipt-py-chars blank input' + i + '" disabled value="_">');
		}
		else
		{
			input = jQuery('<input onclick=focusInput("input' + i + '") autocapitalize="off" maxlength="1" class="ipt-py-chars input' + i + '">');
		}
		jQuery('.frm-py-chars').append(input);
	}
	
	// play audio
	$(".audio").attr('src', "./" + lesson + "/pinyin/" + questionBank[n].audio);	
	
	$('.input0').focus();
	focused = $('.input0');

}