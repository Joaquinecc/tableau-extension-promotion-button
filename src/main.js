'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    var promotionName=""
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Add your startup code here
        $("#btn-prom").click(function(){
          promotionName= $( "#name-input" ).val();
          if(promotionName.length >0){
           loadTable()
          }
          else alert("Ingresar un nombre a la promoción")
        }); 
      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {
        // Once the extension is initialized, ask the user to choose a sheet
    });  
    });

 function loadTable(){

     const worksheetName= "Recomendacion promocion"
     const worksheet = getSelectedSheet(worksheetName);
     console.log("Entre",tableau.extensions.dashboardContent.dashboard)
     
     worksheet.getSummaryDataAsync().then(function(dataTable ){
      console.log("dataTable",dataTable );
      let data=dataTable._data.map(dataItem=>{
        return {
          cod_cliente:dataItem[0]._value,
          articulocodigo:dataItem[3]._value,
          rank:dataItem[10]._value,
          weight:dataItem[9]._value,
          prom_name:promotionName,
        }
      })
      console.log("data",data)
      post(data)
     });

/**     worksheet.getUnderlyingTableDataAsync().then(function(logicalTables  ){
        console.log("dataTable",logicalTables );
      }); */



       
 }
 function getSelectedSheet(worksheetName) {
  // Go through all the worksheets in the dashboard and find the one we want
  return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
      return sheet.name === worksheetName;
  });
}




 function post(data){
  $('#loading').removeClass('hidden')
  $('#btn-label').addClass('hidden');
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/promotion/",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (result) {
        alert("La solicitud se completo con éxito")
        console.log(result);
        $('#loading').addClass('hidden')
        $('#btn-label').removeClass('hidden');
      },
      error: function (result, status) {
        alert("Ha ocurrido un error \n",result)
        console.log(result);
        $('#loading').addClass('hidden')
        $('#btn-label').removeClass('hidden');
      }
  });
 }
})();