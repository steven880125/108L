<?php

require_once (__ROOT__.'/include/event_message.php');

interface Module
{
    public function doAction(event_message $em);
}
    
?>