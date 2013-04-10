(function($){
	var methods = {
		init: function(options)
		{
			var settings = $.extend({
				'query':'SELECT *'
			},options);
			var query = settings['query'];
			var sqlWhereRegex = /(\s+WHERE\s+\S*)$/g;
			var sqlWhereArr = sqlWhereRegex .exec(query);
			if(sqlWhereArr != null)
			{
				var whereClause = sqlWhereArr [1];
			}
			else
			{
				var whereClause='';
			}
			var leftoverStmt = query.replace(whereClause,'');
			var sqlSelectRegex = /^(SELECT\s+\S*)$/;
			var sqlSelectArr = sqlSelectRegex.exec(leftoverStmt);
			if(sqlSelectArr != null)
			{
				var selectStmt = sqlSelectArr[1];
			}
			else
			{
				$.error('Incorrect query format');
				return this;
			}
			var filteredArray=[];
			if(whereClause != '')
			{
				var whereParamRegex = /^\s*WHERE\s+(\S+)=(\S+)$/;
				var whereParamArr = whereParamRegex.exec(whereClause);
				if(whereParamArr == null)
				{
					$.error('Incorrect where clause');
					return this;
				}
				var paramKey = whereParamArr[1];
				var paramVal = whereParamArr[2];
				this.each(function(index,element){
					if(element[paramKey]==paramVal)
					{
						filteredArray.push(element);
					}
				});
				filteredArray=$(filteredArray);
			}
			else
			{
				filteredArray=this;
			}
			var selectParamRegex = /^SELECT\s+(\S+)$/;
			var selectParamArr = selectParamRegex.exec(selectStmt);
			if(selectParamArr == null)
			{
				$.error('Error in select statement');
				return filteredArray;
			}
			var selectList = selectParamArr[1].split(',');
			var tempArr=[];
			filteredArray.each(function(index,element){
				var tempObj = {};
				$(selectList).each(function(ind,ele){
					if(ele == "*")
					{
						tempObj=element;
					}
					else
					{
						tempObj[ele]=element[ele];
					}
				});
				tempArr.push(tempObj);
			});
			return $(tempArr);
		}
	};
	
	$.fn.jSql = function(method)
	{
		if(methods[method])
		{
			return methods[method].apply(this, Array.Prototype.slice.call(arguments, 1));
		}
		else if(typeof method == 'object' || !method)
		{
			return methods.init.apply(this, arguments);
		}
		else
		{
			$.error('Method '+method+' is not supported by the jSql library');
		}
	};
})(jQuery);