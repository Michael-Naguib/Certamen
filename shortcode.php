<?php
    #Settings
    $filePathShortcodeIndex = "www/markup/index.html";
    
    #Main Script Logic
    $myfile = fopen($filePathShortcodeIndex, "r") or die("[Shortcode] Unable to open ".$filePathShortcodeIndex);
    echo fread($myfile,filesize($filePathShortcodeIndex));
    fclose($myfile);
?>