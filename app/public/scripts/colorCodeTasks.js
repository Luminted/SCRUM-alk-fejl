'use strict';

var rules = {
    misc: "panel-primary",
    ['solution delivery']: "panel-success",
    qa: "panel-info",
    production: "panel-warning",
}

const tasks = $('.panel.panel-primary');
$(tasks).toggle();

tasks.each((index) => {
    const category = $(tasks[index]).find('.panel-body > #category > i').html().toLowerCase().trim();
    $(tasks[index]).addClass(rules[category]).removeClass('panel-primary').addClass(rules[category]);
});

$(tasks).toggle();
