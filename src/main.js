'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    //Global variable to store the promotion name
    var promotionName=""
    //Global variable to store the username
    var currentUser=""
    //Global variable to store the enviroment variable located in var-env.json
    var envVar =""
    const workSheetTableName = "Carrito.Lista"
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      //Get enviroment variable 
      getVarEnv()

      $("#btn-prom").click(function(){
        //get custom name for the campaing
        promotionName= $( "#name-input" ).val();
        if(promotionName.length >0){
          createPromotion(workSheetTableName)
        }
        else alert("Ingresar un nombre a la promoción")
      }); 

       //remove any initial data ,if it is there
      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {
        // Once the extension is initialized, ask the user to choose a sheet
        loadCurrentUser()
      });  
    });

  //Save on global variable currentUser the username.
  function loadCurrentUser(){
    /**
     * A worksheet name currentUserSheet is in hidden in the dashboard to gather the user information
     */
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
  function constructData2Object(datatable){
    /**
     * Receive getSummaryDataAsync(). data, and transform to an array of object. Where each key of the object is a columns
     */
    const columns= datatable._columns.map(col=> col._fieldName)
    const data=datatable._data.map(item=>{
      let temp={}
      Object.values(item).forEach((val,index) => temp[columns[index]]=val._value)
      return temp
    }
      )
      return data
  }
  function createPromotion(worksheetName){
    /**
     * Extract the data from the the cart table, transform it and sent.
     */
    const worksheet=getSelectedSheet(worksheetName)
    worksheet.getSummaryDataAsync().then(dataTable => {
      if(!dataTable.data) alert("Tabla vacia")
      else{
        const data=constructData2Object(dataTable).map((dataItem )=>{
          return {
            cod_cliente:dataItem["cod_cliente (ranking_combination_sku_&_fam)"],
            articulocodigo:dataItem["articulocodigo"],
            rank:dataItem["SUMA(rank (ranking_combination_sku_&_fam))"],
            weight:dataItem["SUMA(weight (ranking_combination_sku_&_fam))"],
            prom_name:promotionName,
            username:currentUser
          }
        });
        console.log("Post data",data);
       post(data)
      }
    
    })

     

  }
  function getSelectedSheet(worksheetName) {
    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
        return sheet.name === worksheetName;
    });
}

 function post(data){
   console.log("Post data",data);
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
    //Get enviromental information
    $.getJSON( "../var-env.json", function( data ) {
      envVar= data
    })

  }
})();