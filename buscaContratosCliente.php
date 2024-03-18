<?php
require('autenticacao.php');
$cliente=$consta[0]['id'];
$consulta="SELECT contratos.id, contratos.prestador_id, usuarios.nome FROM contratos JOIN usuarios ON usuarios.id=contratos.prestador_id WHERE contratos.cliente_id=$cliente AND contratos.comparecimento IS NULL";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($resultado)>0){
    echo json_encode($resultado,JSON_UNESCAPED_UNICODE);
}else{
    print('{"erro":"não há contratos que possam ser atestados por você."}');
}
?>