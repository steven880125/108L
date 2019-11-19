<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class get_user_by_id implements ActionListener
{
    public function actionPerformed($event_message) 
    {
        $post=$event_message->getPost();
        
        $id=$post['id'];
        
        $conn= PDO_mysql::getConnection();
        $sql="SELECT id,name,birth,addr FROM `student_profile` WHERE id=?";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute(array($id));
        
        if($result)
        {
            $ds=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_value['status_code']=0;
            $return_value['status_message']='Excute Success';
            $return_value['data_set']=$ds;       
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