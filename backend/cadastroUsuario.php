<?php
require('conexao.php');
$vetor=json_decode(file_get_contents('php://input'),true);
if(count($vetor)==0){
    print('{"erro":"faltam todos os dados para o cadastro do usuário."}');
    exit();
}
if(isset($vetor["nascimento"])){
    $ano=substr($vetor["nascimento"],6,4);
    $mes=substr($vetor["nascimento"],3,2);
    $dia=substr($vetor["nascimento"],0,2);
    $nascimento=$ano.'-'.$mes.'-'.$dia;
}else{
    print('{"erro":"falta informar a data de nascimento no formato dd/mm/aaaa."}');
    exit();
}
if(isset($vetor["senha"])){
    $senha=password_hash($vetor["senha"],PASSWORD_ARGON2ID);
}else{
    print('{"erro":"falta informar a senha."}');
    exit();
}
if(isset($vetor["email"])){
    $email=$vetor["email"];
}else{
    print('{"erro":"falta informar o endereço de correio eletrônico."}');
    exit();
}
if(isset($vetor["nome"])){
    $nome=$vetor["nome"];
}else{
    print('{"erro":"falta informar o nome do(a) usuário(a)."}');
    exit();
}
if(isset($vetor["cpf"])){
    $cpf=$vetor["cpf"];
}else{
    print('{"erro":"falta informar o número do Cadastro de Pessoa Física - CPF."}');
    exit();
}
if(isset($vetor["celular"])){
    $celular=$vetor["celular"];
}else{
    print('{"erro":"falta informar o número do telefone celular no formato XX-XXXXX-XXXX."}');
    exit();
}
if(isset($vetor["endereco"])){
    $endereco=$vetor["endereco"];
}else{
    print('{"erro":"falta informar o logradouro(rua, avenida, travessa, alameda, ect) sem o número."}');
    exit();
}
if(isset($vetor["numero"])){
    $numero=$vetor["numero"];
}else{
    print('{"erro":"falta informar o número da residência ou prédio."}');
    exit();
}
if(isset($vetor["complemento"])){
    $complemento=$vetor["complemento"];
}else{
    $complemento=NULL;
}
if(isset($vetor["bairro"])){
    $bairro=$vetor["bairro"];
}else{
    print('{"erro":"falta informar o bairro."}');
    exit();
}
if(isset($vetor["municipio"])){
    $municipio=$vetor["municipio"];
}else{
    print('{"erro":"falta informar o município."}');
    exit();
}
if(isset($vetor["uf"])){
    $uf=$vetor["uf"];
}else{
    print('{"erro":"falta informar a unidade da federação."}');
    exit();
}
if(isset($vetor["cep"])){
    $cep=$vetor["cep"];
}else{
    print('{"erro":"falta informar o código de endereçamento postal - CEP."}');
    exit();
}
if(isset($vetor["pix"])){
    $pix=$vetor["pix"];
}else{
    $pix=NULL;
}
if(isset($vetor["foto"])){
    $foto=$vetor["foto"];
}else{
    $foto=NULL;
}
$consulta="SELECT email, cpf FROM usuarios WHERE email='$email' OR cpf='$cpf'";
$resultado=$pdo->query(query:$consulta);
$consta=$resultado->fetchAll(PDO::FETCH_ASSOC);
if(count($consta)==0){
    $inclusao="INSERT INTO usuarios(email,senha,nome,cpf,nascimento,endereco,numero, complemento, municipio,uf,celular,pix,foto,cep,nascimento,bairro) VALUES('$email','$senha','$nome','$cpf','$nascimento','$endereco',$numero,'$complemento','$municipio','$uf','$celular','$pix','$foto','$cep','$bairro')";
    $pdo->prepare($inclusao)->execute();
    print('{"mensagem":"os dados recebidos foram cadastrados com sucesso."}');
}else{
    print('{"erro":"em virtude de inconsistências detectadas nos dados, a operação de cadastramento não pôde ser concluída."}');
}
?>