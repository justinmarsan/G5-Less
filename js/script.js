// G5 Framework
// http://G5Framework.com
// http://GregBabula.info/framework.php

$(document).ready(function() {
	
	//Smooth Scroll To Top
	$(".return-top").click(function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, {
			duration: 250,
			easing: "swing"
		});
		return false;
	});

    //Nav IE last-child fix
     $("header#top nav ul li:last-child a").css("margin-right","0");

    //Tipsy
  	$(function() {
	    $('.tooltip').tipsy();
	    
	    $('.tooltip-north').tipsy({gravity: 'n'});
	    $('.tooltip-south').tipsy({gravity: 's'});
	    $('.tooltip-east').tipsy({gravity: 'e'});
	    $('.tooltip-west').tipsy({gravity: 'w'});
	    
	    $('.tooltip-fade').tipsy({fade: true});
  	});

	//HTML5 Placeholder Fallback

	// Create input element to do tests
	var input = document.createElement('input');

	// Add placeholder support for non HTML5 browsers
	var support_placeholder = 'placeholder' in input;
	if(!support_placeholder){
		$(':input[placeholder]').each(function() {
			var $$ = $(this);
			if($$.val() === '') {
		   
				$$.addClass('placeholder');
				$$.val($$.attr('placeholder'));
			}
			$$.focus(function() {
				$$.addClass('focus');
				if($$.val() === $$.attr('placeholder')) {
					$$.val('');
					$$.removeClass('placeholder');
				}
			}).blur(function() {
				$$.removeClass('focus');
				if($$.val() === '') {
					$$.addClass('placeholder');
					$$.val($$.attr('placeholder'));
				}
			});
		});
	}

	// Add autofocus support for non HTML5 browsers
	var support_autofocus = 'autofocus' in input;
	if(!support_autofocus){
		$('input[autofocus]').eq(0).focus();
	}else{
		// Fix for opera
		$('input[autofocus]').eq(0).val('');	
		$('input[autofocus]').eq(0).removeClass('placeholder');
	}

	// Handler form validation
	$('input,textarea').keyup(function() {
		validate(this);
	});

	// Validate an element
	function validate(element){
		var $$ = $(element);
		var validator = element.getAttribute('type'); // Using pure javascript because jQuery always returns text in none HTML5 browsers
		var valid = true;
		var apply_class_to = $$;
		
		var required = element.getAttribute('required') == null ? false : true;
		switch(validator){
			case 'email': valid = is_email($$.val()); break;
			case 'url': valid = is_url($$.val()); break;
			case 'number': valid = is_number($$.val()); break;
		}
		
		// Extra required validation
		if(valid && required && $$.val().replace($$.attr('placeholder'), '') == ''){
			valid = false;
		}
		
		// Set input to valid of invalid
		if(valid || (!required && $$.val() == '')){
			apply_class_to.removeClass('invalid');
			apply_class_to.addClass('valid');
			return true;
		}else{
			apply_class_to.removeClass('valid');
			apply_class_to.addClass('invalid');
			return false;
		}
	}

	// Add required class to inputs
	$(':input[required]').addClass('required');

	// Block submit if there are invalid classes found
	$('form').submit(function() {
		$('input,textarea').each(function() {
			validate(this);
		});
		if(($(this).find(".invalid").length) == 0){
			// Delete all placeholder text
			$('input,textarea').each(function() {
				if($(this).val() == $(this).attr('placeholder')) $(this).val('');
			});
			return true;
		}else{
			return false;
		}
	});

	function is_email(value){
		return (/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
	}

	function is_url(value){
		return (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i).test(value);
	}

	function is_number(value){
		return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
	}

});