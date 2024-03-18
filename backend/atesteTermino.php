<?php
require('autenticacao.php');
$cliente=(int)$consta[0]['id'];
if(isset($vetor["contrato_id"])){
    $contrato_id=(int)$vetor["contrato_id"];
}else{
    print('{"erro":"falta o identificador do contrato a ser atestado."}');
    exit();
}
if(isset($vetor["comparecimento"])){
$comparecimento=$vetor["comparecimento"];
if($comparecimento!=0&&$comparecimento!=1){
    print('{"erro":"o comparecimento é representado por zero ou um."}');
    exit();
}
}else{
print('{"erro":"falta informar se o prestador(a) de serviço compareceu ou não ao trabalho."}');
exit();
}
if(isset($vetor["comentario"])){
    $comentario=$vetor["comentario"];
}else{
    $comentario=NULL;
}
if(isset($vetor["nota"])){
    $nota=$vetor["nota"];
}else{
    $nota=10;
}
$consulta="SELECT * FROM contratos WHERE id=$contrato_id AND cliente_id=$cliente AND comparecimento IS NULL";
$entrada=$pdo->prepare($consulta);
$entrada->execute();
$consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
if(count($consta)>0){
    $atualizacao="UPDATE contratos SET comparecimento=$comparecimento, comentario='$comentario', nota=$nota WHERE id=$contrato_id AND cliente_id=$cliente";
    $entrada=$pdo->prepare($atualizacao);
    $entrada->execute();
}else{
    print('{"erro":"não consta o contrato referido no sistema ou ele não lhe diz respeito."}');
    exit();
}
if($comparecimento==1){
    $prestador=$consta[0]["prestador_id"];
    $consulta="SELECT nota FROM contratos WHERE prestador_id=$prestador";
    $entrada=$pdo->prepare($consulta);
    $entrada->execute();
    $resultado=$entrada->fetchAll(PDO::FETCH_ASSOC);
    $media=0;
    for($i=0;$i<count($resultado);$i++){
        $media+=$resultado[$i]["nota"];
    }
    $media/=count($resultado);
    $atualizacao="UPDATE prestadores SET nota=$media WHERE usuario_id=$prestador";
    $entrada=$pdo->prepare($atualizacao);
    $entrada->execute();
}else{
    //providenciar a devolução dos valores pagos ao cliente.
}

?>