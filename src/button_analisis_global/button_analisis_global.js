'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    var promotionName=""
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        $("#btn-prom").click(function(){
          loadData("analisisGlobal.Articulos Recomendados")
          alert("Se añadio al carro")
        }); 
   
      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {
        // Once the extension is initialized, ask the user to choose a sheet
        });  
    });
      
 function loadData(worksheetName){
     const worksheet = getSelectedSheet(worksheetName);

     worksheet.getSummaryDataAsync().then(function(dataTable ){
     
      console.log("dataTable",dataTable);
      let data=dataTable._data.map(dataItem=>{
        let temp={}
        dataTable._columns.forEach((columnName,index)=>temp[columnName._fieldName]=dataItem[index]._value)
        return temp
      })
      console.log("data",data);

      save(data)
     });


 }
 function getSelectedSheet(worksheetName) {
  // Go through all the worksheets in the dashboard and find the one we want
  return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
      return sheet.name === worksheetName;
  });
}

 function save(data){
  localStorage.setItem('data', JSON.stringify(data));
 }



 








 
})();