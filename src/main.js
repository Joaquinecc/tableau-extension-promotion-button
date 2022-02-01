'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Add your startup code here



        
        $("#btn-prom").click(function(){
           console.log("Entre")
           loadTable()
        }); 
      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {
        // Once the extension is initialized, ask the user to choose a sheet

    });  
    });

    let unregisterEventHandlerFunctionTable
 function loadTable(){
    if (unregisterEventHandlerFunctionTable) {
        unregisterEventHandlerFunctionTable();
    }
     const worksheetName= "Recomendacion promocion"
     const worksheet = getSelectedSheet(worksheetName);
     
     worksheet.getSummaryDataAsync().then(function(dataTable ){
      console.log("dataTable",dataTable );
      let columns=dataTable._columns.map(item=>item?._fieldName)

      let data=dataTable._data.map(dataItem=>{
        let tempData={}
        dataItem.forEach((item,index)=>tempData[columns[index]]=item._value)
        return tempData
      })
      console.log("data",data)
     });

/**     worksheet.getUnderlyingTableDataAsync().then(function(logicalTables  ){
        console.log("dataTable",logicalTables );
      }); */
     unregisterEventHandlerFunctionTable = worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function(selectionEvent) {
        // When the selection changes, reload the data
        loadTable(worksheetName);
    });

    function getSelectedSheet(worksheetName) {
        // Go through all the worksheets in the dashboard and find the one we want
        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }
       
 }
})();