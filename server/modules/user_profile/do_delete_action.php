<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_delete_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();

        $id=$post['id'];
        
        $conn= PDO_mysql::getConnection();
        $sql="DELETE FROM `student_profile` WHERE id=?";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute(array($id));
        
        if($result)
        {
            $return_value['status_code']=0;
            $return_value['status_message']='執行成功';
        }
        else
        {
            $return_value['status_code']=-1;
            $return_value['status_message']='Excute Error';
            $return_value['sql']=$sql;
        }
        
        return json_encode($return_value);
    }
}

?>