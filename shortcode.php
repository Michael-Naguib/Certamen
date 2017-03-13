<?php
    #Settings
    $filePathShortcodeIndex = "www/markup/index.html";
    
    #Main Script Logic
    $myfile = fopen($filePathShortcodeIndex, "r") or die("[Shortcode] Unable to open ".$filePathShortcodeIndex);
    echo fread($myfile,filesize($filePathShortcodeIndex));
    fclose($myfile);
    echo "<div style='display:hidden'>READ ME READ ME READ ME READ ME READ ME READ ME ~~ some links may not work depending on the directory from which this script is run, they may need to be adjusted see index.js,html,css, etc....</div>";
?>