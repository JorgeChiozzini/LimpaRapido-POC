<?php
require('autenticacao.php');
$prestador_id=(int)$consta[0]["id"];
$consulta="SELECT * FROM prestadores WHERE usuario_id=$prestador_id";
$resultado=$pdo->query(query:$consulta);
$consta=$resultado->fetchAll(PDO::FETCH_ASSOC);
$preco_dia=(int)isset($vetor["preco_dia"])?$vetor["preco_dia"]:$consta[0]["preco_dia"];
$descricao=isset($vetor["descricao"])?$vetor["descricao"]:$consta[0]["descricao"];
$ativo=(int)isset($vetor["ativo"])?$vetor["ativo"]:$consta[0]["ativo"];
$atualizacao="UPDATE prestadores SET preco_dia=$preco_dia, descricao='$descricao', ativo=$ativo WHERE usuario_id=$prestador_id";
$pdo->prepare($atualizacao)->execute();
print('{"mensagem":"o cadastro do(a) prestador(a) de serviço foi atualizado com sucesso."}');
?>