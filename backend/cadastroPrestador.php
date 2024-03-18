<?php
require('autenticacao.php');
$prestador_id=(int)$consta[0]["id"];
$pix=$consta[0]["pix"];
if($pix==NULL){
    print('{"erro":"faltou informar uma chave PIX no cadastro de usuário."}');
    exit();
}
if(isset($vetor["preco"])){
    $preco=(float)$vetor["preco"];
}else{
    print('{"erro":"é obrigatório informar o preço da diária."}');
    exit();
}
if(isset($vetor["descricao"])){
    $descricao=$vetor["descricao"];
}else{
    $descricao=NULL;
}
if(isset($vetor["ativo"])){
    $ativo=(int)$vetor["ativo"];
}else{
    print('{"erro":"é obrigatório informar se o(a) prestador(a) de serviço está ativo ou não para receber propostas."}');
    exit();
}
$consulta="SELECT usuario_id FROM prestadores WHERE usuario_id=$prestador_id";
$resultado=$pdo->query(query:$consulta);
$consta=$resultado->fetchAll(PDO::FETCH_ASSOC);
if(count($consta)==0){
    $inclusao="INSERT INTO prestadores(usuario_id,preco_dia,descricao,ativo) VALUES($prestador_id,$preco,'$descricao',$ativo)";
    $pdo->prepare($inclusao)->execute();
    print('{"mensagem":"os dados do(a) prestador(a) de serviço foi incluído(a) com sucesso no sistema."}');
}
else{
    print('{"erro":"já constam dados do prestador(a) de serviço no sistema."}');
}
?>