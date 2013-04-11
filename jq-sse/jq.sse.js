(function($){
	$.sse = function(options) {
		var settings = $.extend({
			'url':'',
			'event':function(data){}
		},options);
		var $url = settings['url'];
		if(typeof(EventSource) !== 'undefined')
		{
			var source=new EventSource($url);
			source.onmessage=function(event)
			{
				var jsonData = JSON.parse(event.data);
				settings['event'](jsonData);
			}
		}
		else
		{
			$.error('Server Side Events not supported');
		}
	};
})(jQuery);