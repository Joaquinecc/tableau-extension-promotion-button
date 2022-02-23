'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    var promotionName=""
    var currentUser=""
    var envVar =""
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      getVarEnv()
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
        loadCurrentUser()
    });  
    });
    function loadCurrentUser(){
      try{
        const worksheetName= "currentUserSheet"
        const worksheet = getSelectedSheet(worksheetName);
        
        worksheet.getSummaryDataAsync().then(function(userData ){
          currentUser= userData.data[0][0]._value 
          
        });
      }catch{
        return "not-found"
      }
 
 
  }

  function loadTable(){
      let data = localStorage.getItem("data")
      if(!data) alert("Tabla vacia")
      console.log("data",JSON.parse(data));
      data=JSON.parse(data)

      data=data.map((dataItem )=>{
        return {
          cod_cliente:dataItem.cod_cliente,
          articulocodigo:dataItem.articulocodigo,
          rank:dataItem["SUM([rank (ranking_combination_sku_&_fam)])"],
          weight:dataItem["SUM([weight (ranking_combination_sku_&_fam)]"],
          prom_name:promotionName,
          username:currentUser
        }
      });
      post(data)


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
      url: envVar.api_url,
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (result) {
        alert("La solicitud se completo con éxito")
        console.log(result);
        //remove local storage data
        localStorage.removeItem('data');
        //update flag local variable, this force table_promotion to be updated
        const update_flag= localStorage.getItem('update flag variable')
        localStorage.setItem('update flag variable', parseInt(update_flag)?0:1);
  
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



  function getVarEnv(){
    $.getJSON( "../var-env.json", function( data ) {
      envVar= data
    })

  }








 
})();