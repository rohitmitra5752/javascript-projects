(function ($) {
	$.fn.dataTable = function(options) {
		var settings = $.extend({
			banding: true,
			showNoRecords: true,
			allowFilter: true,
			allowSorting: true,
			allowEdit: true,
			allowDelete: true,
			editRow: function(row){
				$act = $(row).children("td");
				$act.each(function(){
					$(this).children(".ui-datatable-editFields").show();
					$(this).children(".ui-datatable-viewFields").hide();
					$(this).children(".ui-datatable-editbtn").hide();
					$(this).children(".ui-datatable-savebtn").show();
				});
			},
			saveRow: function(row){
				$act = $(row).children("td");
				$act.each(function(){
					$(this).children(".ui-datatable-viewFields").text($(this).children(".ui-datatable-editFields").val());
					$(this).children(".ui-datatable-editFields").hide();
					$(this).children(".ui-datatable-viewFields").show();
					$(this).children(".ui-datatable-editbtn").show();
					$(this).children(".ui-datatable-savebtn").hide();
				});
			},
			deleteRow: function(row){
				$(row).remove();
				remap($this, settings);
			}
		}, options);
		return this.each(function(){
			$this = $(this);
			$this.children("table").addClass("ui-datatable");
			
			if(settings['allowEdit'] || settings['allowDelete']){
				$actionHeader = $("<th>").addClass("ui-datatable-actionHead").text("Actions");
				$this.children("table.ui-datatable").children("thead").children("tr").append($actionHeader);
				$this.children("table.ui-datatable").children("tbody").children("tr").each(function(){
					$row = $(this);
					$actionCell = $("<td>").addClass("ui-datatable-actionCell");
					
					if(settings['allowEdit']){
						$row.children("td").each(function(){
							var tdText = $(this).text();
							var $editField = $("<input>").attr("type","text").addClass("ui-datatable-editFields").val(tdText).hide();
							var $viewField = $("<span>").addClass("ui-datatable-viewFields").text(tdText);
							$(this).html("");
							$(this).append($editField).append($viewField)
						});
						
						$editBtn = $("<img>").attr("src","images/edit.png").addClass("ui-datatable-actionbtn").addClass("ui-datatable-editbtn").hover(function(){
							$(this).attr("src","images/edit_hover.png");
						},function(){
							$(this).attr("src","images/edit.png");
						}).click(function(){
							settings['editRow']($(this).parent().parent());
						});
						
						$saveBtn = $("<img>").attr("src","images/save.png").addClass("ui-datatable-actionbtn").addClass("ui-datatable-savebtn").hover(function(){
							$(this).attr("src","images/save_hover.png");
						},function(){
							$(this).attr("src","images/save.png");
						}).click(function(){
							settings['saveRow']($(this).parent().parent());
						}).hide();
						
						$actionCell.append($editBtn);
						$actionCell.append($saveBtn);
					}
					
					if(settings['allowDelete']){
						$deleteBtn = $("<img>").attr("src","images/delete.png").addClass("ui-datatable-actionbtn").addClass("ui-datatable-deletebtn").hover(function(){
							$(this).attr("src","images/delete_hover.png");
						},function(){
							$(this).attr("src","images/delete.png");
						}).click(function(){
							settings['deleteRow']($(this).parent().parent());
						});
						$actionCell.append($deleteBtn);
					}
					
					$row.append($actionCell);
				});
			}
			
			if(settings['allowSorting']) {
				$this.children("table.ui-datatable").children("thead").children("tr").children("th:not(.ui-datatable-actionHead)").addClass("ui-datatable-nosort").click(function(){
					$(this).siblings(":not(.ui-datatable-actionHead)").removeClass("ui-datatable-asc ui-datatable-desc").addClass("ui-datatable-nosort").removeAttr("data-sort-order");
					$(this).removeAttr("data-sort-order");
					
					var sortDirection = "";
					var sortIndex = -1;
					
					sortIndex = $(this).parent().index($(this));
					
					if($(this).hasClass("ui-datatable-nosort")){
						$(this).removeClass("ui-datatable-nosort").addClass("ui-datatable-asc");
						sortDirection="asc";
					}
					else if($(this).hasClass("ui-datatable-asc")){
						$(this).removeClass("ui-datatable-asc").addClass("ui-datatable-desc");
						sortDirection="desc";
					}
					else if($(this).hasClass("ui-datatable-desc")){
						$(this).removeClass("ui-datatable-desc").addClass("ui-datatable-asc");
						sortDirection="asc";
					}
					
					$newRowSet = [];
					
					$this.children("table.ui-datatable").children("tbody").children("tr").each(function(){
						if($newRowSet.length == 0)
						{
							$newRowSet.push(this);
							return;
						}
						var insertIndex = 0;
						
						while(insertIndex < $newRowSet.length)
						{
							$currentRow = $newRowSet[insertIndex];
						}
					});
				});
			}
			
			if(settings['allowFilter']) {
				$searchDiv = $("<table>").addClass("ui-datatable-searchsection");
				$searchBox = $("<input>").attr("type","text").attr("placeholder","Search...").keyup(function(){
					var srchVal = $(this).val();
					var noRecords = true;
					$this.children("table.ui-datatable").children("tbody").children("tr").each(function(){
						var found = false;
						var currentRow = $(this);
						$(this).children("td").each(function(){
							if($(this).text().match(new RegExp(srchVal,"ig"))!=null)
							{
								found=true;
								return;
							}
						});
						if(found)
						{
							$(this).show();
							noRecords=false;
						}
						else
						{
							$(this).hide();
						}
					});
					
					remap($this, settings);
				});
				$searchBar = $("<td>").append($searchBox).addClass("ui-datatable-searchbar");
				$searchIcon = $("<td>").append($("<img>").attr("src","images/search.png")).addClass("ui-datatable-searchicon");
				$searchDiv.append($("<tr>").append($searchBar).append($searchIcon));
				$searchDiv.insertBefore($this.children("table.ui-datatable"));
			}
		
			if(settings['showNoRecords']){
				colSpan = $(this).children("table.ui-datatable").children("thead").children("tr").children("th").length;
				$noRecFoot = $("<tfoot>").append($("<tr>").append($("<td>").addClass("ui-datatable-norecords").text("No Records Found!").attr("colSpan",colSpan)).hide());
				$(this).children("table.ui-datatable").append($noRecFoot);
			}
			
			remap($this, settings);
		});
	}
	
	function remap($this,settings) {
		if(settings['banding']) {
			var x = 0;
			var noRecords = true;
			$this.children("table.ui-datatable").children("tbody").children("tr").each(function(index) {
				$(this).attr("data-id",index);
				if($(this).is(":visible")){
					noRecords = false;
					$(this).removeClass("odd even");
					if(x == 0) {
						$(this).addClass("odd");
					}
					else {
						$(this).addClass("even");
					}
					x = (x+1)%2;
				}
			});
		}
				
		if(noRecords && settings['showNoRecords']){
			$this.children("table.ui-datatable").children("tfoot").children("tr").show();
		}
		else if(settings['showNoRecords']){
			$this.children("table.ui-datatable").children("tfoot").children("tr").hide();
		}
	}
})(jQuery);