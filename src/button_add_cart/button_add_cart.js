'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    const workSheetTableName = "Carrito.Lista"

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        $("#btn-prom").click(function(){
          //update flag local variable, this force table_promotion to be updated
          console.log("Click");
          loadData($("#script_button")[0].getAttribute('worksheetName'))
          alert("Se añadio al carro")
        }); 
        tableau.extensions.initializeAsync().then(function() {
            // Once the extension is initialized, ask the user to choose a sheet
        });
    });
      
 function loadData(worksheetName){
     const worksheet = getSelectedSheet(worksheetName);
     console.log("worksheetName",worksheetName);
     worksheet.getSummaryDataAsync().then(function(dataTable ){
        const id_rank_index_col=dataTable._columns.findIndex(col=> col._fieldName == "id_rank")
        let id_ranks=dataTable._data.map(dataItem=>dataItem[id_rank_index_col].formattedValue)
        console.log("id_ranks",id_ranks);
        updateTableData(workSheetTableName,id_ranks)
     });
 }
 function getSelectedSheet(worksheetName) {
  // Go through all the worksheets in the dashboard and find the one we want
  return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
      return sheet.name === worksheetName;
  });
}

 function updateTableData(worksheetName,filtersArray){
    //let typeFilter = filtersArray.length? tableau.FilterUpdateType.Add: tableau.FilterUpdateType.Replace
    const worksheet=getSelectedSheet(worksheetName)
     worksheet.applyFilterAsync("id_rank",filtersArray,tableau.FilterUpdateType.Add).then(filterName=>{
      console.log("filterAplyied",filterName);
    })  
  }

 








 
})();