'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      //Listen on local storage
      window.onstorage = () => {
        // When local storage changes, update table
        populateDataTable()
    
      };

      //remove any initial data ,if it is there
      localStorage.removeItem('data');

      // Tell Tableau we'd like to initialize our extension
      tableau.extensions.initializeAsync().then(function() {

        // Once the extension is initialized, ask the user to choose a sheet
        populateDataTable()
    });  
    });


  function populateDataTable() {
    // Do some UI setup here: change the visible section and reinitialize the table
    var data= JSON.parse(localStorage.getItem("data"))
    const columns=Object.keys(data[0]).map(item=>   ({     "title"     :     item     }),  )
    $('#data_table_wrapper').empty();

    if (data.length > 0) {
        $('#no_data_message').css('display', 'none');
        $('#data_table_wrapper').append(`<table id='data_table' class='table table-striped table-bordered'></table>`);

        // Do some math to compute the height we want the data table to be
        var top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
        var height = $(document).height() - top - 130;

        // Initialize our data table with what we just gathered
        $('#data_table').DataTable({
          "data": data.map(item=> Object.values(item)),
          "columns":columns,
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