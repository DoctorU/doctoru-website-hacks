$(document).ready(function(){});
$("*").on("mouseover", function() {
    console.log(this.attr("id") + " " + this.attr("class"));
});
