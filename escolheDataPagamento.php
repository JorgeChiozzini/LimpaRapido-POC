<?php
require('autenticacao.php');
$prestador=(int)$consta[0]['id'];
if(isset($vetor["contrato_id"])){
    $contrato_id=(int)$vetor["contrato_id"];
}else{
    print('{"erro":"falta informar o identificador do contrato."}');
    exit();
}
if(isset($vetor["prazo"])){
    $prazo=(int)$vetor["prazo"];
    if($prazo<0||$prazo>30){
        print('{"erro":"o prazo deve estar entre 0 e 30 dias."}');
        exit();
    }
}else{
    print('{"erro":"falta informar o prazo em dias para o pagamento entre zero e 30."}');
    exit();
}
$consulta="SELECT desagio FROM comissao ORDER BY vigencia DESC LIMIT 1";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$comissao=$entrada->fetchAll(PDO::FETCH_ASSOC);
$taxa=(float)$comissao[0]["desagio"];
$consulta="SELECT contratos.id, propostas.valor, propostas.data_proposta FROM contratos JOIN propostas ON contratos.proposta_id=propostas.id WHERE contratos.prestador_id=$prestador AND contratos.id=$contrato_id";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($resultado)==0){
    print('{"erro":"não consta o contrato referido no sistema ou ele não lhe diz respeito."}');
    exit();
}
$valor=$resultado[0]['valor'];
$obrigacao=$valor*(1-((30-$prazo)*$taxa/30));
date_default_timezone_set('America/Sao_Paulo');
$data = new DateTime($resultado[0]['data_proposta']);
$expressao='P'.$prazo.'D';
$data->add(new DateInterval("$expressao"));
$result=(string)$data->format('Y-m-d');
$atualizacao="UPDATE contratos SET data_quitacao=$result, obrigacao=$obrigacao WHERE id=$contrato_id AND prestador_id=$prestador";
$entrada=$pdo->prepare($atualizacao);
$entrada->execute();
?>