$(document).ready(function(){});
$("*").on("mouseover", function() {
    var _this = $(this);
    console.log(_this.attr("id") + " " + _this.attr("class"));
});
