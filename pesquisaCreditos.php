<?php
require('autenticacao.php');
$prestador=$consta[0]['id'];
$consulta="SELECT contratos.id, propostas.valor, propostas.data_proposta FROM contratos JOIN propostas ON contratos.proposta_id=propostas.id WHERE contratos.prestador_id=$prestador AND contratos.comparecimento=TRUE AND contratos.data_quitacao IS NULL";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($resultado)>0){
    echo json_encode($consta,JSON_UNESCAPED_UNICODE);
}else{
    print('{"mensagem":"não há contratos cujos créditos estejam em aberto."}');
}
?>