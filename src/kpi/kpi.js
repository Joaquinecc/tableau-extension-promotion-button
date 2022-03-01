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
        const data =JSON.parse(localStorage.getItem("data"))
        const type=$("#script_kpi")[0].getAttribute('kpi')
        if(type == "#recomendation")
            countRecomendation(data)
        else if ( type == "sell_oportunity" )
            sumOpSell(data)
        else if ( type == "#clients" )
            countClients(data)
        else if ( type == "#product" )
        countProduct(data)
    }
    function sumOpSell(data){
          /**
         * Sum total op
         */
        if(data?.length>0){
            $("#num").empty()
            $("#num").text(numberWithPoints(Math.round(data.reduce((partialSum, a) => partialSum + a["SUMA(precio_promedio)"], 0))))
            
        }
    }
    function countRecomendation(data){
        /**
         * Count total recomendation
         */
        if(data?.length>0){
            $("#num").empty()
            $("#num").text(numberWithPoints(data.length))
        }
    }
    function countClients(data){
        /**
         * Count distinct cod client
         */
        if(data?.length>0){
            $("#num").empty()
            $("#num").text(numberWithPoints((new Set(data.map(item=> item.cod_cliente))).size))
        }
    }
    function countProduct(data){
        /**
         * Count distinct product
         */
        if(data?.length>0){
            $("#num").empty()
            $("#num").text(numberWithPoints((new Set(data.map(item=> item.articulocodigo))).size))
        }
    }
    function numberWithPoints(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
 
})();