let numeroPedidoContainer = document.querySelector(".codigo-pedido");

let numeroPedido = localStorage.getItem("numero-pedido");
numeroPedidoContainer.textContent = numeroPedido;