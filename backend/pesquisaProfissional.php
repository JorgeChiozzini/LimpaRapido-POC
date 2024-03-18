<?php
    require_once('conexao.php');
    $vetor=json_decode(file_get_contents('php://input'),true);
    if(isset($vetor["municipio"])&&isset($vetor["uf"])){
        $municipio=$vetor["municipio"];
        $uf=$vetor["uf"];
        $consulta="SELECT usuarios.id, usuarios.nome, usuarios.foto, usuarios.bairro, prestadores.preco_dia, prestadores.descricao, prestadores.nota FROM usuarios JOIN prestadores ON usuarios.id=prestadores.usuario_id WHERE usuarios.municipio='$municipio' AND usuarios.uf='$uf' AND prestadores.ativo=1";
        $entrada=$pdo->prepare($consulta);
        $entrada->execute();
        $consta=$entrada->fetchAll(PDO::FETCH_ASSOC);
        if(count($consta)>0){
            $consulta="SELECT agio FROM comissao ORDER BY vigencia DESC LIMIT 1";
            $entrada=$pdo->prepare($consulta);
            $entrada->execute();
            $comissao=$entrada->fetchAll(PDO::FETCH_ASSOC);
            $taxa=(float)$comissao[0]["agio"];
            for($i=0;$i<count($consta);$i++){
                $consta[$i]['preco_dia']=(float)$consta[$i]['preco_dia'];
                $consta[$i]['preco_dia']*=(1+$taxa);
            }
            echo json_encode($consta,JSON_UNESCAPED_UNICODE);
        }else{
            print('{"mensagem":"não há registros que correspondam aos argumentos de busca apresentados."}');
        }
    }else{
        print('{"erro":"falta definir o município e unidade da federação como argumentos da pesquisa."}');
    }
?>