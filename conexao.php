<?php
    $servidor='localhost';
    $banco='nosso_banco';
    $usuario='root';
    $senha='root';
    $url='mysql:host='.$servidor.';dbname='.$banco.';charset=utf8';
    $pdo=new PDO($url,$usuario,$senha);
?>