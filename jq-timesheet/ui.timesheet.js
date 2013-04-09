/*$(function(){
	var rows = 7;
	var columns = 5;
	var array=$("<div id='timesheetDiv'></div>");
	for(i=1;i<=rows;i++)
	{
		var row=$("<ol class='timeSheetRow'></ol>");
		for(j=1;j<=columns;j++)
		{
			column=$("<li></li>");
			$(row).append(column);
		}
		$(array).append(row);
	}
	$("#test").html(array);
	$(".timeSheetRow").selectable();
});*/

(function ($) {
	$.fn.timeSheet = function(options) {
		var settings = $.extend({
			'numRows':7,
			'numCols':5
		},options);
		return this.each(function() {
			var $this=$(this);
			var rows = settings['numRows'];
			var columns = settings['numCols'];
			var array=$("<div id='timesheetDiv'></div>");
			for(i=1;i<=rows;i++)
			{
				var row=$("<ol class='timeSheetRow'></ol>");
				for(j=1;j<=columns;j++)
				{
					column=$("<li></li>");
					$(row).append(column);
				}
				$(array).append(row);
			}
			$this.html(array);
			$(".timeSheetRow").selectable();
		});
	};
})(jQuery);