<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_update_action implements ActionListener
{
    public function actionPerformed($event_message) 
    {
        $post=$event_message->getPost();
        
        $id=$post['id'];
        $name=$post['name'];
        $addr=$post['addr'];
        $birth=$post['birth'];

        if($name==="" || $addr==="" || $birth==="")
        {
            $return_value['status_code']=-1;
            $return_value['status_message']="請輸入完整資料";
            
            return json_encode($return_value);
        }
        else
        {
            $conn= PDO_mysql::getConnection();
            $sql="UPDATE `student_profile` SET name=?, addr=?, birth=? WHERE id=?";
            $stmt=$conn->prepare($sql);
            $result=$stmt->execute(array($name,$addr,$birth,$id));

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
}

?>