<?php
require('autenticacao.php');
$id=$consta[0]["id"];
$nome=isset($vetor["nome"])?$vetor["nome"]:$consta[0]["nome"];
$endereco=isset($vetor["endereco"])?$vetor["endereco"]:$consta[0]["endereco"];
$numero=isset($vetor["numero"])?$vetor["numero"]:$consta[0]["numero"];
$bairro=isset($vetor["bairro"])?$vetor["bairro"]:$consta[0]["bairro"];
$municipio=isset($vetor["municipio"])?$vetor["municipio"]:$consta[0]["municipio"];
$uf=isset($vetor["uf"])?$vetor["uf"]:$consta[0]["uf"];
$cep=isset($vetor["cep"])?$vetor["cep"]:$consta[0]["cep"];
$celular=isset($vetor["celular"])?$vetor["celular"]:$consta[0]["celular"];
$pix=isset($vetor["pix"])?$vetor["pix"]:$consta[0]["pix"];
if(isset($vetor["nascimento"])){
    $ano=substr($vetor["nascimento"],6,4);
    $mes=substr($vetor["nascimento"],3,2);
    $dia=substr($vetor["nascimento"],0,2);
    $nascimento=$ano.'-'.$mes.'-'.$dia;
}else{
    $nascimento=$consta[0]["nascimento"];
}
$email=isset($vetor["novoemail"])?$vetor["novoemail"]:$email;
if(isset($vetor["novasenha"])){
    $senha=password_hash($vetor["novasenha"],PASSWORD_ARGON2ID);
}
$atualizacao="UPDATE usuarios SET email=$email, senha=$senha, nome=$nome, endereco=$endereco, numero=$numero, bairro=$bairro, municipio=$municipio, uf=$uf, cep=$cep, celular=$celular, pix=$pix, nascimento=$nascimento WHERE id=$id";
$pdo->prepare($atualizacao)->execute();
print('{"mensagem":"o cadastro do usuário(a) foi atualizado com sucesso."}');
?>