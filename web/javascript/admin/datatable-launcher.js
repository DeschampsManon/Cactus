$(document).ready(function(){
	$('.datatable').DataTable({
		responsive: true,
		"language": {
	        search:   		"",
	        info:           "Affichage des éléments _START_ à _END_ sur _TOTAL_",
	        zeroRecords:    "Aucun résultat n'a été trouvé pour cette recherche",
	        emptyTable:     "Aucun résultat n'a été trouvé",
	        infoPostFix:    "",
	        paginate: {
	        	previous:   "précédent",
	         	next:    	"suivant"
	        }
		}
	});
})

