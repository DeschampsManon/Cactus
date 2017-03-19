$(document).ready(function(){
	$('.datatable').DataTable({
		responsive: true,
		"language": {
            //processing:     "I18n.datatable_processin"g,
	        search:         "",
	        //lengthMenu:     I18n.datatable_lengthMenu,
	        //info:           I18n.datatable_info,
	        //infoEmpty:      I18n.datatable_infoEmpty,
	        //infoFiltered:   I18n.datatable_infoFiltered,
	        //infoPostFix:    "",
	        //loadingRecords: I18n.datatable_loadingRecords,
	        //zeroRecords:    I18n.datatable_zeroRecords,
	        //emptyTable:     I18n.datatable_emptyTable,
	        paginate: {
	          first:      I18n.datatable_paginate_first,
	          //last:       I18n.datatable_paginate_last
	        }
		}
	});
})
