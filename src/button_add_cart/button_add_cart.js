'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

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
     worksheet.getSummaryDataAsync().then(function(dataTable ){
      let id_ranks=dataTable._data.map(dataItem=>dataItem[8].formattedValue)
      console.log("id_ranks",id_ranks);
      saveLocalStorage("id_ranks",id_ranks)
     });


 }
 function getSelectedSheet(worksheetName) {
  // Go through all the worksheets in the dashboard and find the one we want
  return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
      return sheet.name === worksheetName;
  });
}

 function saveLocalStorage(key,value){
  localStorage.setItem(key, JSON.stringify(value));
 }



 








 
})();