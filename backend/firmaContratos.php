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
    if(isset($vetor['proposta_id'])){
        $proposta_id=(int)$vetor['proposta_id'];
    }else{
        print('{"erro":"falta informar o identificador da proposta."}');
        exit();
    }
    if(isset($vetor['forma_pagamento'])){
        $forma_pagamento=$vetor['forma_pagamento'];
        if($forma_pagamento!='PIX'&&$forma_pagamento!='CARTÃO DE CRÉDITO'){
            print('{"erro":"as formas de pagamento aceitas são PIX ou CARTÃO DE CRÉDITO."}');
            exit();
        }
    }else{
        print('{"erro":"falta informar a forma de pagamento."}');
        exit();
    }
    $consulta="SELECT prestador_id, data_proposta, horario_proposto, endereco, numero, complemento, bairro, municipio, uf FROM propostas WHERE id=$proposta_id AND cliente_id=$cliente AND aceite=1";
    $entrada=$pdo->prepare($consulta);
    $entrada->execute();
    $resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
    if(count($resultado)>0){
        $prestador=(int)$resultado[0]['prestador_id'];
        $consulta="SELECT * FROM contratos WHERE cliente_id=$cliente AND prestador_id=$prestador AND proposta_id=$proposta_id";
        $entrada=$pdo->prepare($consulta);
        $entrada->execute();
        $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
        if(count($consta)==0){
            $inclusao="INSERT INTO contratos(forma_pagamento,cliente_id,prestador_id,proposta_id) VALUES('$forma_pagamento',$cliente,$prestador,$proposta_id)";
            $pdo->prepare($inclusao)->execute();
            print('{"mensagem":"contrato firmado com sucesso."}');
        }else{
            print('{"erro":"já consta um contrato com termos idênticos aos transmitidos no sistema, logo, não haverá repetição."}');
            exit();
        }
        $data=$resultado[0]['data_proposta'];
        $ano=substr($data,0,4);
        $mes=substr($data,5,2);
        $dia=substr($data,8,2);
        $data=$dia.'/'.$mes.'/'.$ano;
        $horario=$resultado[0]['horario_proposto'];
        $endereco=$resultado[0]["endereco"];
        $numero=$resultado[0]["numero"];
        $complemento=$resultado[0]["complemento"];
        $bairro=$resultado[0]['bairro'];
        $municipio=$resultado[0]['municipio'];
        $uf=$resultado[0]['uf'];
        $consulta="SELECT email FROM usuarios WHERE id=$prestador";
        $entrada=$pdo->prepare($consulta);
        $entrada->execute();
        $resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
        $email=$resultado[0]["email"];
        $mensagem="Prezado Profissional,<br><p>Temos a honra de informá-lo de que mais um contrato de prestação de serviços foi firmado. Dessa forma, solicitamos que você compareça à $endereco, $numero, $complemento, $bairro, $municipio, $uf, no dia $data, às $horario. a fim de adimplir sua obrigação contratual. Desejamos-lhe um bom trabalho.</p>Atenciosamente,<br>LimpaRapido";
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
            $mail->Subject = 'contrato de prestação de serviço de faxina - LimpaRapido';
            $mail->isHTML(true);
            $mail->Body = '$mensagem;
            $mail->AltBody = 'Prezado Profissional, Temos a honra de informá-lo de que mais um contrato de prestação de serviços foi firmado. Dessa forma, solicitamos que você compareça à $endereco, $numero, $complemento, $bairro, $municipio, $uf, no dia $data, às $horario. a fim de adimplir sua obrigação contratual. Desejamos-lhe um bom trabalho. Atenciosamente, LimpaRapido';
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
        print('{"erro":"não consta a proposta referida ou ela não lhe diz respeito ou ela não foi aceita."}');
    }
    
?>