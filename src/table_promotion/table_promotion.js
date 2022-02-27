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
      //columns
      let columnsName = Object.keys(data[0])
      columnsName.push("Acción")
      columnsName.forEach(col =>  $('#table thead tr').append(`<th scope="col">${col}</th>`))
      const dataArray=data.map(item=> Object.values(item))

      dataArray.forEach((row,i) => {
        var tagRowStr=""

        row.forEach((item,index)=>{

          if(index)
          tagRowStr+=`<td>${item}</td>`
          else 
          tagRowStr+= `<th scope="row">${item}</th>`
        })
        tagRowStr+=`<td  ><img   src="../statics/trash-solid.svg" height="20px"  /></td>`
        const idRow="row"+i

        $('#table tbody').append(`<tr id="${idRow}" >${tagRowStr}</tr>`)

        $( `#${idRow}`).click({rowId:i, idTag:idRow},(event)=> {
         alert( "Handler for .click() called. "+ event.data.idTag );
         $(`#${event.data.idTag}`).remove();

       });
      })
  
    }
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