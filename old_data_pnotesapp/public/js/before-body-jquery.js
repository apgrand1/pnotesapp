$(function() {
    $( "#sidebar" ).resizable();

    $('#preview-button').click(function() {
        // Make edit button as deactivated
        makePreviewTabActive();
    });

    $('#editing-button').click(function() {
        // Make edit button as deactivated
        makeEditTabActive();
    });

    $('#dark-switcher').click(function() {
        if($('body').hasClass('dark')) {
            console.log('Already in Dark mode, switching to light');
            $('#logo-header').html('<img src="pnotes-logo3.png"></img>');
            $('body').removeClass('dark');
            $('#dark-switcher').html('Switch to Dark Mode');

            // Change this to do directly from js after words Important!!
            // make a request to the serve to change the theme
            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("load", function (evt) {

                // console.log(evt);
                // console.log(evt.srcElement);
                // console.log(evt.srcElement.response);
                if (JSON.parse(evt.srcElement.response)['success'] == 1) {
                  console.log("Theme change success!");
                } else {
                  console.log("Theme Change Failed");
                }
              });

              // Defining parameters 
              xhttp.open("POST", "/theme/set/light", true);
              //Send the proper header information along with the request
              xhttp.setRequestHeader("Content-Type", "application/json"); // Necessary for POST
              xhttp.send(JSON.stringify({ userEmail: 'priyam' }));

        } else{
            $('#logo-header').html('<img src="pnotes-logo-dark.png"></img>');
            $('body').addClass('dark');
            $('#dark-switcher').html('Switch to Light Mode');

            var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("load", function (evt) {

                // console.log(evt);
                // console.log(evt.srcElement);
                // console.log(evt.srcElement.response);
                if (JSON.parse(evt.srcElement.response)['success'] == 1) {
                  console.log("Theme change success!");
                } else {
                  console.log("Theme Change Failed");
                }
              });
  
              // Defining parameters 
              xhttp.open("POST", "/theme/set/dark", true);
              //Send the proper header information along with the request
              xhttp.setRequestHeader("Content-Type", "application/json"); // Necessary for POST
              xhttp.send(JSON.stringify({ userEmail: 'priyam' }));
        }
    });

    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                // This means save the note now
                if(window.currentNote) {
                  console.log('Saving Note');
                  saveNote();
                }
                break;
            }
        }
    });
});
