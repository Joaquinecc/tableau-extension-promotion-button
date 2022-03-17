'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    var promotionName=""
    var currentUser=""
    var envVar =""
    const workSheetTableName = "Carrito.Lista"
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      //set envVar 
      getVarEnv()

      $("#btn-prom").click(function(){
        //get custom name for the campain
        promotionName= $( "#name-input" ).val();
        if(promotionName.length >0){
          createPromotion(workSheetTableName)
        }
        else alert("Ingresar un nombre a la promoción")
      }); 

       //remove any initial data ,if it is there
       localStorage.removeItem('id_ranks');
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
        //remove local storage data
        localStorage.removeItem('data');
        //Force LocalstorageChange event to be fire
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