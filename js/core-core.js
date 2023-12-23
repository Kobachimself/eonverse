function URLBuild(path, full = false) {
    return (full ? fullSiteURL : siteURL) + path;
}

$('.navbar-toggler').click(function () {
    $('.coldfire-navbar-menu').addClass("active");
    $('.overlay').addClass("active");
});
$('#nav-header-close').click(function () {
    $('.coldfire-navbar-menu').removeClass("active");
    $('.overlay').removeClass("active");
});

if ((particles == "yes") && ($("#header-pjs").length)) {
    $(window).on("load", function () {
        tsParticles.loadJSON("header-pjs", pjsPath);
    });
}

if (loadingTime) {
    $('#page_load_tooltip').attr('title', loadingTime).tooltip();
}

$.fn.tooltip.Constructor.Default.whiteList["span"].push("style");
$.fn.tooltip.Constructor.Default.whiteList["a"].push("style");

$(".pop").popover({
        trigger: "manual",
        html: "true",
        placement: "top"
    })
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover('hide');
            }
        }, 300);
    });

$('.more-dropdown').hover(
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(25).fadeIn("fast");
    },
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(25).fadeOut("fast");
    }
);
$('.more-dropdown-menu').hover(
    function () {
        $(this).stop(true, true);
    },
    function () {
        $(this).stop(true, true).delay(25).fadeOut("fast");
    }
);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
$(function () {
    $('[rel="tooltip"]').tooltip()
});

$('[data-toggle="popover"]').popover({
    trigger: "manual",
    html: true,
    animation: false
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 300);
});

$(document).ready(function () {
    if($('#logo-link').length) {
        $("#logo-link").attr("href", siteURL);
    }
});

$(document).ready(function () {
    var cachedUsers = {};
    var timeoutId;
    $('*[data-poload]').mouseenter(function () {
        var elem = this;
        if (!timeoutId) {
            timeoutId = window.setTimeout(function () {
                timeoutId = null;
                if (!($(elem).data('poload') in cachedUsers)) {
                    $(elem).popover({
                        trigger: "manual",
                        animation: false,
                        content: loading
                    }).popover("show");
                    $.get($(elem).data('poload'), function (d) {
                        (debugging && debugging == '1' ? console.log(d) : '');
                        var data = JSON.parse(d);
                        cachedUsers[$(elem).data('poload')] = data;
                        $(elem).popover("dispose").popover({
                            trigger: "manual",
                            animation: false,
                            content: data.html
                        }).popover("show");
                        $('.popover').mouseleave(function () {
                            if (!$(".popover:hover").length) {
                                $(this).popover("hide");
                            }
                        });
                    });
                } else {
                    var data = cachedUsers[$(elem).data('poload')];
                    $(elem).popover({
                        trigger: "manual",
                        animation: false,
                        content: data.html
                    }).popover("show");
                    $('.popover').mouseleave(function () {
                        if (!$(".popover:hover").length) {
                            $(this).popover("hide");
                        }
                    });
                }
            }, 1000);
        }
    }).mouseleave(function () {
        var elem = this;
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        } else {
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(elem).popover("hide");
                }
            }, 200);
        }
    });

    var timezone = document.getElementById('timezone');
    if (timezone) {
        const timezoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezoneValue) {
          timezone.value = timezoneValue;
        }
    }
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();

    Swal.fire({
        title: "IP " + copied,
        text: swal_server_copy,
        icon: "success",
        confirmButtonText: close
    });
}

var announcements = document.querySelectorAll('[id^="announcement"]');
announcements.forEach((announcement) => {
    var closeButton = announcement.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.cookie = announcement.id + '=true; path=/';
        });
    }
});



$(document).ready(function(){
    $('#newPost #file').change(function(){
        var files = $(this)[0].files;
        $("#socializeMediaNum").text(files.length)
    });
});