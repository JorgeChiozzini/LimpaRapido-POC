<?php
    require_once('src/PHPMailer.php');
    require_once('src/SMTP.php');
    require_once('src/Exception.php');
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    $mail= new PHPMailer(true);
    require('autenticacao.php');
    $cliente=$consta[0]['id'];
    $consulta="SELECT agio FROM comissao ORDER BY vigencia DESC LIMIT 1";
    $entrada=$pdo->prepare($consulta);
    $entrada->execute();
    $comissao=$entrada->fetchAll(PDO::FETCH_ASSOC);
    $taxa=(float)$comissao[0]["agio"];
    if(isset($vetor["data"])){
        $ano=substr($vetor["data"],6,4);
        $mes=substr($vetor["data"],3,2);
        $dia=substr($vetor["data"],0,2);
        $data=$ano.'-'.$mes.'-'.$dia;
    }else{
        print('{"erro":"falta informar a data para a prestação do serviço."}');
        exit();
    }
    if(isset($vetor["oferta"])){
        $valor=(1-$taxa)*(float)$vetor["oferta"];
    }else{
        print('{"erro":"falta informar o valor a ser apresentado como oferta."}');
        exit();
    }
    if(isset($vetor["prestador_id"])){
        $prestador=(int)$vetor["prestador_id"];
    }else{
        print('{"erro":"falta identificar(id) o(a) prestador(a) de serviço a quem se destina a proposta."}');
        exit();
    }
    if(isset($vetor["horario"])){
        $horario=$vetor["horario"];
    }else{
        print('{"erro":"falta informar o horário em que o prestador(a) de serviço deverá se apresentar."}');
        exit();
    }
    if(isset($vetor["endereco"])&&isset($vetor["numero"])&&isset($vetor["bairro"])&&isset($vetor["municipio"])&&isset($vetor["uf"])){
        $endereco=$vetor["endereco"];
        $numero=$vetor["numero"];
        $bairro=$vetor["bairro"];
        $municipio=$vetor["municipio"];
        $uf=$vetor["uf"];
        if(isset($vetor["complemento"])){
            $complemento=$vetor["complemento"];
        }else{
            $complemento=NULL;
        }
    }else{
        $endereco=$consta[0]["endereco"];
        $numero=$consta[0]["numero"];
        $complemento=$consta[0]["complemento"];
        $bairro=$consta[0]["bairro"];
        $municipio=$consta[0]["municipio"];
        $uf=$consta[0]["uf"];
    }
    $consulta="SELECT * FROM propostas WHERE data_proposta='$data' AND horario_proposto='$horario' AND valor=$valor AND cliente_id=$cliente AND prestador_id=$prestador";
    $entrada=$pdo->prepare($consulta);
    $entrada->execute();
    $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
    if(count($consta)==0){
        $consulta="SELECT * FROM prestadores WHERE usuario_id=$prestador";
        $entrada=$pdo->prepare($consulta);
        $entrada->execute();
        $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
        if(count($consta)>0){
            $inclusao="INSERT INTO propostas(data_proposta,horario_proposto,valor,cliente_id,prestador_id,endereco,numero,complemento,bairro,municipio,uf) VALUES('$data','$horario',$valor,$cliente,$prestador,'$endereco',$numero,'$complemento','$bairro','$municipio','$uf')";
            $entrada=$pdo->prepare($inclusao);
            $sucesso=$entrada->execute();
            print('{"mensagem":"proposta enviada com sucesso."}');
        }else{
            print('{"erro":"o(a) prestador(a) de serviço referido(a) não existe no cadastro."}');
            exit();
        }
        $consulta="SELECT email FROM usuarios WHERE id=$prestador";
        $entrada=$pdo->prepare($consulta);
        $entrada->execute();
        $email=$entrada->fetchAll(PDO::FETCH_ASSOC);
        $email=$email[0]['email'];
        /*try{
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'davidqgbdasilva1980@gmail.com';
            $mail->Password = '************';
            $mail->Port = 587;
            $mail->setFrom('davidqgbdasilva1980@gmail.com');
            $mail->addAddress($email[$i]);
            $mail->Subject = 'proposta de faxina - LimpaRapido';
            $mail->isHTML(true);
            $mail->Body = 'Prezado(a) profissional da limpeza,<br><p>Você acaba de receber uma <strong>proposta de prestação de serviço de faxina</strong>. Os detalhes constam no sistema. Solicitamos gentilmente que você analise a oferta e a aceite ou a recuse tão logo quanto possível. Agradecemos sua colaboração e desejamos-lhe um ótimo serviço caso você decida realizá-lo. Atenciosamente,</p>LimpaRapido';
            $mail->AltBody = 'Prezado(a) profissional da limpeza, Você acaba de receber uma proposta de prestação de serviço de faxina. Os detalhes constam no sistema. Solicitamos gentilmente que você analise a oferta e a aceite ou a recuse tão logo quanto possível. Agradecemos sua colaboração e desejamos-lhe um ótimo serviço caso você decida realizá-lo. Atenciosamente, LimpaRapido';
            if($mail->send()){
                echo'Email enviado com sucesso.';
            }else{
                echo'Email não enviado.';
            }
        }
        catch(Exception $e){
            print("Erro ao enviar a mensagem{$mail->ErrorInfo}");
        }*/
    }else{
        print('{"erro":"uma proposta idêntica à apresentada já consta na base de dados, logo, não haverá repetição."}');
    }
?>