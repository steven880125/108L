<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_insert_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();
        
        $id=$post['id'];
        $name=$post['name'];
        $addr=$post['addr'];
        $birth=$post['birth'];
        
        if($id==="" || $name==="" || $addr==="" || $birth==="")
        {
            $return_value['status_code']=-2;
            $return_value['status_message']="請輸入完整資料";
            
            return json_encode($return_value);
        }

        $conn= PDO_mysql::getConnection();
        $sql="INSERT INTO `student_profile` (id,name,addr,birth) VALUES (?,?,?,?)";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute(array($id,$name,$addr,$birth));
        
        if($result)
        {
            $return_value['status_code']=0;
            $return_value['status_message']='執行成功';
        }
        else
        {
            $return_value['status_code']=-1;
            $return_value['status_message']='資料重複';
            $return_value['sql']=$sql;  
        }
        
        return json_encode($return_value);

    }
}
?>