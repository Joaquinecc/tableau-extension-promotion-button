'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
  const workSheetTableName = "Carrito.Lista"
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      $("#btn-clean").click(function(){
        //update flag local variable, this force table_promotion to be updated
        console.log("Clean");
        const worksheet=getSelectedSheet(workSheetTableName)
        //Clean sheet
        worksheet.applyFilterAsync("id_rank",[],tableau.FilterUpdateType.Replace).then(filterName=>{
          console.log("filterAplyied",filterName);
        })  
      }); 

      tableau.extensions.initializeAsync().then(function() {
        console.log("initializeAsync");
        // Once the extension is initialized, ask the user to choose a sheet
    });
    });
    function getSelectedSheet(worksheetName) {
      // Go through all the worksheets in the dashboard and find the one we want
      return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
          return sheet.name === worksheetName;
      });
    }
})();