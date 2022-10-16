<?php $tipo_de_entrega = $_POST['tipo_de_entrega'];
$nombre = $_POST['nombre'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$zona = $_POST['zona'];
$numeroPedido = $_POST['numero-pedido'];
$productosFinales = $_POST['productos-finales'];
$cantidadTotal = $_POST['cantidad-total'];
$valorTotal = $_POST['valor-total'];
$formcontent = "
<h1 style='background-color: #851a32; width: max-content; padding: .25rem 1rem; color: white; margin-bottom: 0;'>¡Nuevo pedido en TRD Alpargatas!</h1>
<h2 style='margin-top: 0; color: white; background-color: #1b2446; width: max-content; padding: .25rem 1rem;'>Número de pedido: <span>$numeroPedido</span></h2>
<b style='font-size: 1rem'>Nombre</b>: $nombre<br>
<b style='font-size: 1rem'>Teléfono</b>: $tel<br>
<b style='font-size: 1rem'>E-mail</b>: $email<br>
<b style='font-size: 1rem'>Zona</b>: $zona<br>
<b style='font-size: 1rem'>Tipo de entrega</b>: $tipo_de_entrega<br><br>
<b style='font-size: 1rem'>Cantidad total de productos</b>: $cantidadTotal<br>
<b style='font-size: 1rem'>Valor total del pedido</b>: $valorTotal<br><br>
<b style='font-size: 1rem'>Productos</b>:<br>
$productosFinales
";
$recipient = "colettamatias@gmail.com, juanmanuelruizdiaz@gmail.com";
$subject = "Pedido $numeroPedido";
$header = "From: $email \r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
mail($recipient, $subject, $formcontent, $header) or die("Error!");
header("Location: pedido-finalizado.html");
?>