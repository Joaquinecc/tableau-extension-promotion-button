'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        window.onstorage = () => {
            // When local storage changes, update table
            console.log("Storage value change - KPI");
           // populateDataTable()
          updateValue()

        
          };


          updateValue()

       
    
    });

    function updateValue(){
        const type=$("#script_kpi")[0].getAttribute('kpi')
        if(type == "#recomendation")
        cantRecomendation()
    }
    
    function cantRecomendation(){
        const data =JSON.parse(localStorage.getItem("data"))
        if(data?.length>0){
            $("#num").empty()
            $("#num").text(data.length)
        }
    }

 
 
})();