$('.header').removeClass('no-js');
$(document).ready(main);

// Globals
headerCollapsed = false;
preventScroll = false;

messages = [
  'Software Engineer',
  'Front End Developer',
  'Experience Designer',
];
currentMessage = 0;

function main() {
  registerListeners();
  cycleQuote();
}

function registerListeners() {
  $(window).on('keydown', onKeyScroll);
  $(window).on('mousewheel', onMouseScroll);
  $('.header .more').on('click', collapseHeader);
  $('.nav-item').on('click', clickNavItem);

  $('.job-experience .more').on('click', expandWorkExperience);
  $('.job-experience .less').on('click', collapseWorkExperience);
  $('.academic-wrapper .more').on('click', toggleAcademic);
  $('.extracurricular-wrapper .more').on('click', toggleExtracurricular);
  $('.skill').hover(expandSkill, collapseSkill);
  $('.project').hover(expandProject, collapseProject);
}

function cycleQuote() {
  $('.quote span').text(messages[currentMessage]);
  setInterval(function () {
    currentMessage += 1;

    if (currentMessage >= messages.length) {
      currentMessage = 0;
    }

    $('.quote span').fadeOut('slow', function () {
      $('.quote span').text(messages[currentMessage]);
      $('.quote span').fadeIn('slow');
    });


  }, 3000);


}

function collapseHeader() {
  if (headerCollapsed) {
    return;
  }

  headerCollapsed = true;
  preventScrolling(0.5);
  $('.header').addClass('collapsed');
}

function uncollapseHeader() {
  preventScrolling(0.5);
  $('.header').removeClass('collapsed');
  headerCollapsed = false;
}

function clickNavItem(event) {
  delay = 0;

  if (!headerCollapsed) {
    delay = 800;
    preventScrolling(1);
    $('.header').addClass('collapsed');
    headerCollapsed = true;
  }

  elementId = $(this).attr('href');

  if (elementId !== '#home') {
    setTimeout(function () {
      headerHeight = $('.header').height();
      console.log(headerHeight);
      $('html, body').animate({
        scrollTop: $(elementId).offset().top - headerHeight
      }, 200);
    }, delay);
  } else {
    uncollapseHeader();
  }

  return false;
}

function expandWorkExperience(event) {
  $(event.currentTarget).closest('.job-experience').addClass('expanded');
  $(event.currentTarget).closest('.job-experience').removeClass('collapsed');
}

function collapseWorkExperience(event) {
  $(event.currentTarget).closest('.job-experience').removeClass('expanded');
  $(event.currentTarget).closest('.job-experience').addClass('collapsed');
}

function toggleAcademic(event) {
  $academicWrapper = $('.academic-wrapper');

  if ($academicWrapper.hasClass('expanded')) {
    $academicWrapper.removeClass('expanded');
    $academicWrapper.addClass('collapsed');
  } else {
    $academicWrapper.removeClass('collapsed');
    $academicWrapper.addClass('expanded');
  }
}

function toggleExtracurricular(event) {
  $extracurricularWrapper = $('.extracurricular-wrapper');

  if ($extracurricularWrapper.hasClass('expanded')) {
    $extracurricularWrapper.removeClass('expanded');
    $extracurricularWrapper.addClass('collapsed');
  } else {
    $extracurricularWrapper.removeClass('collapsed');
    $extracurricularWrapper.addClass('expanded');
  }
}

function expandSkill(event) {
  $skill = $(event.currentTarget).closest('.skill');
  $skill.addClass('expanded');
  $skill.removeClass('collapsed');
}

function collapseSkill(event) {
  $skill = $(event.currentTarget).closest('.skill');
  $skill.removeClass('expanded');
  $skill.addClass('collapsed');
}

function expandProject(event) {
  $project = $(event.currentTarget).closest('.project');
  $project.addClass('expanded');
  $project.removeClass('collapsed');
}

function collapseProject(event) {
  $project = $(event.currentTarget).closest('.project');
  $project.removeClass('expanded');
  $project.addClass('collapsed');
}

// Helpers
function preventScrolling(seconds) {
  preventScroll = true;
  setTimeout(function () {
    preventScroll = false;
  }, seconds * 1000);
}

// Listener Methods
function onKeyScroll(event) {
  // Avoid scroll during some animations
  if (preventScroll) {
    event.preventDefault();
    return;
  }

  // Don't fire if not spacebar or arrow down
  if (event.keyCode != 32 && event.keyCode != 40) {
    return;
  } else if (!headerCollapsed) {
    event.preventDefault();
    collapseHeader(event);
  }

}

function onMouseScroll(event) {
  // Avoid scroll during some animations
  if (preventScroll) {
    event.preventDefault();
    return;
  }

  if (event.deltaY > 0 && headerCollapsed && window.scrollY === 0) {
    uncollapseHeader();
    event.preventDefault();
    return;
  } else if (event.deltaY < 0 && !headerCollapsed) {
    collapseHeader(event);
    event.preventDefault();
    return;
  }

}

