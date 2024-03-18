<?php
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
$mail= new PHPMailer(true);
require('autenticacao.php');
$prestador=(int)$consta[0]['id'];
if(isset($vetor["proposta_id"])){
    $proposta_id=(int)$vetor["proposta_id"];
}else{
    print('{"mensagem":"falta informar o identificador da proposta."}');
    exit();
}
if(isset($vetor["aceite"])){
    $aceite=(int)$vetor["aceite"];
    if($aceite!=0&&$aceite!=1){
        print('{"erro":"o aceite é representado com o números zero ou um."}');
        exit();
    }
}else{
    print('{"mensagem":"falta informar se a proposta foi aceita ou recusada."}');
    exit();
}
$consulta="SELECT propostas.cliente_id, usuarios.nome, usuarios.email FROM propostas JOIN usuarios ON propostas.cliente_id=usuarios.id WHERE propostas.id=$proposta_id AND propostas.prestador_id=$prestador";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($consta)>0){
    $atualizacao="UPDATE propostas SET aceite=$aceite WHERE id=$proposta_id AND prestador_id=$prestador";
    $entrada=$pdo->prepare($atualizacao);
    $entrada->execute();
    print('{"mensagem":"o aceite ou recusa da proposta aludida foi registrado no sistema."}');
}else{
    print('{"erro":"não consta a proposta referida ou o usuário não é um prestador de serviço."}');
    exit();
}
if($aceite==1){
    $email=$consta[0]["email"];
    /*try{
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'davidqgbdasilva1980@gmail.com';
        $mail->Password = '************';
        $mail->Port = 587;
        $mail->setFrom('davidqgbdasilva1980@gmail.com');
        $mail->addAddress($email);
        $mail->Subject = 'proposta de faxina - LimpaRapido';
        $mail->isHTML(true);
        $mail->Body = 'Prezado(a) cliente,<br><p>Uma das suas propostas acaba de ser aceita pelo profissional da limpeza a quem ela se dirigia. Os detalhes constam no nosso sistema. Solicitamos gentilmente que você proceda à celebração do contrato tão logo quanto possível. Ressaltamos que os dados de contato do prestador de serviço somente serão liberados após a confirmação de pagamento. Agradecemos sua preferência e desejamos-lhe sucesso. Atenciosamente,</p>LimpaRapido';
        $mail->AltBody = 'Prezado(a) cliente, Uma das suas propostas acaba de ser aceita pelo profissional da limpeza a quem ela se dirigia. Os detalhes constam no nosso sistema. Solicitamos gentilmente que você proceda à celebração do contrato tão logo quanto possível. Ressaltamos que os dados de contato do prestador de serviço somente serão liberados após a confirmação de pagamento. Agradecemos sua preferência e desejamos-lhe sucesso. Atenciosamente, LimpaRapido';
        if($mail->send()){
            echo'Email enviado com sucesso.';
        }else{
            echo'Email não enviado.';
        }
    }
    catch(Exception $e){
        print("Erro ao enviar a mensagem{$mail->ErrorInfo}");
    }*/
}
?>