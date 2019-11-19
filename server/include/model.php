<?php
require_once (__ROOT__.'/include/PDO_mysql.php');

class model
{
    protected $conn = null;
    public function __construct()
    {
        $this->conn = PDO_mysql::getConnection();
    }
}
?>