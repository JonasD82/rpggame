introtext = 'text intro to adventure game! \'you wake up in teh dark\', etc / I finally figured out how to do this in javascript and html... / / / oh boy :)'

function button_off(id, on) {
    if (on == "off") {
        document.getElementById(id).disabled = true;}
    if (on == "on") {
        document.getElementById(id).disabled = false;}
  }

function print_slow() {
    // button_off("printbutton", "off")
    var $test = document.getElementById('gametext').innerHTML, $html = '', $i;

    for ($i = 0; $i < $test.length; $i++) {
        if ($test[$i] == "/") {
            $html += '<br>'
            continue}
        else 
           { $html += '<span style="animation: foo ' + $i + 's">' + ($test[$i]) + '</span>';}
    }
    document.getElementById('gamewindow').innerHTML = $html;
    // setTimeout(button_off, 2000, "continuebutton", "on") 
}

// function cont() {
//     document.getElementById('gamewindow').innerHTML = "";
//     button_off('continuebutton', 'off')
//     setTimeout(button_off, 2000, "printbutton", "on")
// }

function gamestart() {
    document.getElementById('gametext').innerHTML = introtext
    print_slow()

}