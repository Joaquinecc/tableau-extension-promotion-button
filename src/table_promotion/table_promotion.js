'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      //Listen on local storage
      window.onstorage = () => {
        // When local storage changes, update table
        console.log("Storage value change Table Controller");
        updateData("Carrito.Lista")
      };
      //remove any initial data ,if it is there
      localStorage.removeItem('id_ranks');
      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {
        updateData("Carrito.Lista")
        // Once the extension is initialized, ask the user to choose a sheet
    });  
    });
    function updateData(worksheetName){
      let filtersArray =localStorage.getItem("id_ranks")?JSON.parse(localStorage.getItem("id_ranks")):[]
      let typeFilter = filtersArray.length? tableau.FilterUpdateType.Add: tableau.FilterUpdateType.Replace
      const worksheet=getSelectedSheet(worksheetName)
     worksheet.applyFilterAsync("id_rank",filtersArray,typeFilter).then(filterName=>{
        console.log("filterAplyied",filterName);
      })  
    }
  function getSelectedSheet(worksheetName) {
    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
        return sheet.name === worksheetName;
    });
}






 
})();