(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #VoltarOpcoes */
    
    
        /* button  #VoltarOpcoes */
    $(document).on("click", "#VoltarOpcoes", function(evt)
    {
        /* your code goes here */ 
    });
    
        /* button  Button */
    $(document).on("click", ".uib_w_27", function(evt)
    {
         activate_page("#teste"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
