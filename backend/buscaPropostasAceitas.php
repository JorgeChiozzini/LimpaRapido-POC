<?php
require('autenticacao.php');
$cliente=$consta[0]['id'];
$consulta="SELECT propostas.id, propostas.data_proposta, propostas.horario_proposto, propostas.valor, propostas.endereco, propostas.numero, propostas.complemento, propostas.bairro, propostas.municipio, propostas.uf, propostas.prestador_id, usuarios.nome FROM propostas JOIN usuarios ON usuarios.id=propostas.prestador_id WHERE propostas.cliente_id=$cliente AND propostas.aceite=TRUE ORDER BY propostas.data_proposta DESC";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($resultado)>0){
    echo json_encode($resultado,JSON_UNESCAPED_UNICODE);
}else{
    print('{"mensagem":"não há propostas aceitas que possam ser convertidas em contratos."}');
}
?>