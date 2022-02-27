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
        populateDataTable()
      //remove any initial data ,if it is there
      //localStorage.removeItem('data');

      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {

        // Once the extension is initialized, ask the user to choose a sheet
    });  
    });

  function populateDataTable() {
    var data= JSON.parse(localStorage.getItem("data"))
    if (data?.length > 0){
      $('#no_data_message').css('display', 'none');

      //columns
      let columnsName = ["Cod Cliente", "Nombre completo","Artículocodigo","Descripción","Familia","Marca","Grupo","Linea","Peso","Acción"]
      columnsName.forEach(col =>  $('#table thead tr').append(`<th scope="col">${col}</th>`))
      const dataArray=data.map(item=> Object.values(item))

      dataArray.forEach((row,i) => {
        var tagRowStr=""
        row.forEach((item,index)=>{
         if(index != 8){      //exception - remove rank column
           if(index == 9 ) item= item.toFixed(3)
          tagRowStr+=`<td>${item}</td>`}
        })
        const idRow="row"+i

        tagRowStr+=`<td  id="${idRow}"><img   src="../statics/trash-solid.svg" height="20px"  /></td>`

        $('#table tbody').append(`<tr  >${tagRowStr}</tr>`)

        $( `#${idRow}`).click({row:data[i], idTag:idRow},removeRow);
      })
  
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'flex');
  }
  }
  function removeRow (event) {
    /**
     * Remove row, and update data
     * 
     */
    var data= JSON.parse(localStorage.getItem("data"))
    const row= event.data.row
    console.log(row);
    data = data.filter(item => item.cod_cliente != row.cod_cliente ||  item.articulocodigo != row.articulocodigo)
    localStorage.setItem("data",JSON.stringify(data))
    $(`#${event.data.idTag}`).parent("tr").remove();

  }






 








 
})();