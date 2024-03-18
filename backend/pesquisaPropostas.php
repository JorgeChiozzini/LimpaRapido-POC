<?php
    require('autenticacao.php');
    $prestador=$consta[0]["id"];
    $consulta="SELECT id,data_proposta,horario_proposto,valor,bairro,municipio,uf FROM propostas WHERE prestador_id=$prestador AND aceite=NULL ORDER BY data_proposta DESC";
    $entrada=$pdo->prepare($consulta);
    $entrada->execute();
    $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
    if(count($consta)>0){
        echo json_encode($consta,JSON_UNESCAPED_UNICODE);
    }else{
        print('{"erro":"não constam propostas passíveis de aceite ou você não é prestador de serviço."}');
        exit();
    }
?>