'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      //Listen on local storage
      window.onstorage = () => {
        // When local storage changes, update table
        console.log("Storage value change");
       // populateDataTable()
       populateDataTable()
    
      };
      //localStorage.removeItem("data")
      //remove any initial data ,if it is there
      //localStorage.removeItem('data');
      populateDataTable()

      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {

        // Once the extension is initialized, ask the user to choose a sheet
    });  
    });

  function populateDataTable() {
    var data= JSON.parse(localStorage.getItem("data"))
    if (data?.length > 0){
      $('#no_data_message').css('display', 'none');
      $('#table_wrapper').empty()
      $('#table_wrapper').append(` <table id="table"class="table"> <thead><tr></tr> </thead><tbody> </tbody>  </table>`)
      //columns
      let columnsName = ["Cod Cliente", "Nombre completo","Artículocodigo","Descripción","Familia","Marca","Grupo","Linea","Peso","Acción"]
      columnsName.forEach(col =>  $('#table thead tr').append(`<th scope="col">${col}</th>`))
      data.forEach((row,i) => {
        var tagRowStr=""
        tagRowStr+=`<td>${row.cod_cliente}</td>`
        tagRowStr+=`<td>${row["Nombre"]}</td>`
        tagRowStr+=`<td>${row.articulocodigo}</td>`
        tagRowStr+=`<td>${row["descripcion"]}</td>`
        tagRowStr+=`<td>${row["familia (v_articulos)"]}</td>`
        tagRowStr+=`<td>${row["marca"]}</td>`
        tagRowStr+=`<td>${row["grupo"]}</td>`
        tagRowStr+=`<td>${row["linea"]}</td>`
        tagRowStr+=`<td>${row["SUMA(weight (ranking_combination_sku_&_fam))"].toFixed(3)}</td>`
        const idRow="row"+i
        tagRowStr+=`<td  id="${idRow}"><img   src="../statics/trash-solid.svg" height="20px"  /></td>`
        $('#table tbody').append(`<tr  >${tagRowStr}</tr>`)
        $( `#${idRow}`).click({row:data[i], idTag:idRow},deleteRow);
      })
      $('#table').DataTable(  {
          "language": {
            "search": "Buscar",
            "zeroRecords": "No se encontro nada",
            "infoEmpty": "No se ha añadido nada al carrito",
        },
          autoWidth: false,
          deferRender: true,
          scroller: true,
          scrollX: true,
          scrollY: "70vh",
          "bInfo" : false,
          dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>" // Do some custom styling
          
        });
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'flex');
  }
  }
  function deleteRow (event) {
    /**
     * Remove row, and update data
     * 
     */
    var data= JSON.parse(localStorage.getItem("data"))
    const row= event.data.row
    data = data.filter(item => item.cod_cliente != row.cod_cliente ||  item.articulocodigo != row.articulocodigo)
    localStorage.setItem("data",JSON.stringify(data))

    $(`#${event.data.idTag}`).parent("tr").remove();

  }






 








 
})();