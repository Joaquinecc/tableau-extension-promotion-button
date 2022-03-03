'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
      console.log("Casdasdlean");
      $("#btn-clean").click(function(){
        //update flag local variable, this force table_promotion to be updated
        console.log("Clean");
        localStorage.removeItem("id_ranks")
      }); 
    });
})();