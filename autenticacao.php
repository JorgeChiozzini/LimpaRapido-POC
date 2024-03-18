<?php
require('conexao.php');
$vetor=json_decode(file_get_contents('php://input'),true);
if(isset($vetor["email"])&&isset($vetor["senha"])){
    $email=$vetor["email"];
    $senha=$vetor["senha"];
    $consulta="SELECT * FROM usuarios WHERE email=:email";
    $entrada=$pdo->prepare($consulta);
    $entrada->bindValue(':email',$email);
    $entrada->execute();
    $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
    if(!(count($consta)==1 && isset($consta[0]["senha"]) && password_verify($senha,$consta[0]["senha"]))){
        print('{"erro":"a senha não confere com aquela armazenada ou o(a) usuário(a) não está cadastrado(a)."}');
        exit();
    }else{
        print('{"mensagem":"autenticação efetuada com sucesso."}');
    }
}else{
    print('{"erro":"falta informar o email ou a senha, indispensáveis para a autenticação do usuário(a)"}');
    exit();
}
?>