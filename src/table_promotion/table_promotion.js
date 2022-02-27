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
       populateDataTable2()
    
      };


      populateDataTable2()
     

      //remove any initial data ,if it is there
      //localStorage.removeItem('data');

      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {

        // Once the extension is initialized, ask the user to choose a sheet
        populateDataTable()
    });  
    });

  function populateDataTable2() {
    var data= JSON.parse(localStorage.getItem("data"))
    if (data?.length > 0){
      $('#no_data_message').css('display', 'none');

      //columns
      let columnsName = Object.keys(data[0])
      //exception - remove rank column
      columnsName= columnsName.filter(item => item != "SUMA(rank (ranking_combination_sku_&_fam))")
      console.log("columnsName",columnsName);
      columnsName.push("Acción")
      columnsName.forEach(col =>  $('#table thead tr').append(`<th scope="col">${col}</th>`))
      const dataArray=data.map(item=> Object.values(item))

      dataArray.forEach((row,i) => {
        var tagRowStr=""
        row.forEach((item,index)=>{
         if(index){
          if(index != 8)   //exception - remove rank column
          tagRowStr+=`<td>${item}</td>`}
          else 
          tagRowStr+= `<th scope="row">${item}</th>`
        })
        const idRow="row"+i

        tagRowStr+=`<td  id="${idRow}"><img   src="../statics/trash-solid.svg" height="20px"  /></td>`

        $('#table tbody').append(`<tr  >${tagRowStr}</tr>`)

        $( `#${idRow}`).click({row:data[i], idTag:idRow},removeRow);
      })
  
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'inline');
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
  function populateDataTable() {
    // Do some UI setup here: change the visible section and reinitialize the table
    var data= JSON.parse(localStorage.getItem("data"))
    $('#data_table_wrapper').empty();
    if (data?.length > 0) {
      $('#no_data_message').css('display', 'none');
      $('#data_table_wrapper').append(`<table id='data_table' class='table table-striped table-bordered'></table>`);
      // Do some math to compute the height we want the data table to be
      var top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
      var height = $(document).height() - top - 130;
      // Initialize our data table with what we just gathered
      $('#data_table').DataTable({
        "data": data.map(item=> Object.values(item)),
        "columns":Object.keys(data[0]).map(item=>   ({     "title"     :     item     }),  ),
          autoWidth: false,
          deferRender: true,
          scroller: true,
          scrollY: height,
          scrollX: true,
          //headerCallback: headerCallback,
          // dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>" // Do some custom styling
      });
    } else {
        // If we didn't get any rows back, there must be no marks selected
        $('#no_data_message').css('display', 'inline');
    }
}









 








 
})();