/**
 * Arquivos que possui as funções responsaveis por manipular
 * o DOM e os Eventos da página.
 */  

(function ($) {
    "use strict";

    var Init = {

		$functionTimeOut: '',

		$totalAsssentosAtual: 0,

		/**
		 * Função que inicia os métodos quando a página é carregada.
		 * @method construct
		 */   
	    construct: function(){
	    	this.showMenuResponsivo();
	    	this.helperFieldsMeterialDesign();
	    	this.customSelectField();
			this.helperSliderMain();	
			this.helperSliderModelos();	
			this.helperSelecionaVeiculo();
			this.helperGallery();
			this.helperMaisNenos();
			this.helperOpenCarrinho();
			this.helperAddCarrinho();
			this.helperRemoveCarrinho();
			this.helperCarrinhoHasItem();
			this.helperLoaderCarrinho();
			this.helperContinuarPagamento();
			this.helperExibeCadastro();
			this.helperExibeLogin();
			this.helperEsqueciSenha();
			this.helperHabilitaButton();
			this.helperMaskTelOrCel();
	    },

	    /**
		* Função que muda a cor da barra de navegação para voltar.
		* @method helperLoaderPage
		*/
	    helperLoaderPage: function(){

			$("body").removeAttr("class");
            
            $(window).on("load", function(){  
				
				$(".loading-page").addClass("remove-loading");

				setTimeout(function(){					
					$(".wrap").addClass("show");
					$(".image-init-bg").addClass("go");
				}, 3000);
            
            });
            
        },

        /**
		* Função que exibe ou oculta o menu responsivo.
		* @method showMenuResponsivo
		*/
	    showMenuResponsivo: function(){

	    	$(".show-menu-sm").on("click", function(){
	    		if( ! $("body").hasClass("menu-resp-active") ){
	    			$(".header .nav-fixed .nav-bar").scrollTop(0);
	    			$("body").addClass("menu-resp-active").append("<div class='mask-menu'></div>");
	    		}
	    		else {
	    			$("body").removeClass("menu-resp-active");
	    			$( ".mask-menu" ).remove();
	    		}
	    	});
	    },

        /**
		* Função que customiza o input select que contém a classe custom-select.
		* @method customSelectField
		*/
		customSelectField: function(){
			if( $(".custom-select").length ){
				var $select = $(".custom-select");

				$select.each(function($index, $obj){

					$($obj).find(".label-select").html(""+$($obj).find("select option:selected").text());

					$($obj).on("change", function(){

						var $labelVisible = $($obj).data("label");

						$labelVisible = ( ($labelVisible === "value" && $labelVisible !== undefined) &&
							$($obj).find("select option:selected").val() !== "" ) ?
							$($obj).find("select option:selected").val() : $($obj).find("select option:selected").text()
						
						$($obj).find(".label-select").html($labelVisible);

						$($obj).find(".label-select").addClass("active");
						if($($obj).find("select option:selected").val() == ""){
							$($obj).find(".label-select").removeClass("active");
						}

						$($obj).removeClass("open");
						$($obj).closest(".form-group").focus();
						$($obj).removeClass("error");
						
					});

					//Função que seta a class open na div custom-select
					$($obj).find("select").on("focus blur", function(){
						var $this = $(this);		
						$this.closest(".custom-select").toggleClass("open", $this.is(":focus"));
					});

				});
				
			}
		},

		/**
		* Função que customiza o formulário no modelo do material designer.
		* @method helperFieldsMeterialDesign
		*/
		helperFieldsMeterialDesign: function(){
			var $material = $('.custom-material');

			if( $material.length ) {

				$material.find(".custom-field").on('focus', function(){
					$(this).closest('.form-group').addClass('in');
				});

				$material.find(".custom-field").on('focusout', function(){
					if( $(this).val() === '' || $(this).val() === null )
						$(this).closest('.form-group').removeClass('in');
				});

			}
		},

		/**
		* Função que faz a validação para CPF Válidos.
		* @method verificaCPF
		* @param {string} $cpf - inforama o cpf
		*/
		verificaCPF: function($cpf){
			var $add, $rev,
				$numCPF = $cpf.replace(/[^\d]+/g,"");

		    // Elimina CPFs inválidos conhecidos    
		    if ($numCPF.length != 11 || 
		        $numCPF == "00000000000" || 
		        $numCPF == "11111111111" || 
		        $numCPF == "22222222222" || 
		        $numCPF == "33333333333" || 
		        $numCPF == "44444444444" || 
		        $numCPF == "55555555555" || 
		        $numCPF == "66666666666" || 
		        $numCPF == "77777777777" || 
		        $numCPF == "88888888888" || 
		        $numCPF == "99999999999") {
		            return false;   
		    }

		    // Valida 1º digito 
		    $add = 0;    
		    for (var i=0; i < 9; i++)       
		        $add += parseInt($numCPF.charAt(i)) * (10 - i);  
		        $rev = 11 - ($add % 11);  
		        if ($rev == 10 || $rev == 11) {
		        	 $rev = 0; 
		        }        
		        if ($rev != parseInt($numCPF.charAt(9))) {
		        	return false; 
		        }    
		                  
		    // Valida 2º digito 
		    $add = 0;    
		    for (var i = 0; i < 10; i++) {
		    	 $add += parseInt($numCPF.charAt(i)) * (11 - i);
		    }

		    $rev = 11 - ($add % 11);  
		    if ($rev == 10 || $rev == 11){
		        $rev = 0;    
		    }

		    if ($rev != parseInt($numCPF.charAt(10))){
		        return false;
		    }
			return true;

		},

		/**
		* Função que verifica se a data passada é menor que data atual.
		* @method verificaSeDataMenor
		*/
		verificaSeDataMenor: function($data){
			var $novaData = $data.split('/').reverse(),
				$dataInformada = new Date($novaData[0] + "/" + $novaData[1] + "/" + $novaData[2]),
				$dataAtual = new Date(),
				$dataCompara = new Date($dataAtual.setFullYear($dataAtual.getFullYear() - 17));

			return $dataInformada <= $dataCompara ? true : false;
		},
	 		
		/**
		* Função que carrega um modal de aleta.
		* @method helperCreateModal
		* @param = $title
		* @param = $content
		* @param = $id
		*/
        helperCreateModal: function($title = "", $content, $id){

			var $modal = '';
				$modal += '<section class="modal fade" id="'+$id+'" tabindex="-1" role="dialog" aria-hidden="true">';
				$modal += '<div class="modal-dialog" role="document">';
				$modal += '<div class="modal-content">';
				$modal += '<header class="modal-header">';
				if( $title != false ){
					$modal += '<h3 class="modal-title">'+$title+'</h3>';
				}
				$modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				$modal += '<span aria-hidden="true">&times;</span>';			
				$modal += '</button>';			
				$modal += '</header>';
				$modal += '<div class="modal-body">'+$content+'</div>';
				$modal += '</div>';
				$modal += '</div>';
				$modal += '</section>';

			$("body").append($modal);	

			setTimeout(function(){
				$("#"+$id).modal("show");
			}, 200);

			//close modal			
			$("#"+$id).on('hidden.bs.modal', function (e) {
			  $("#"+$id).remove();
			});

		},
		
		/**
		* Função que cria um slider para o banner da home.
		* @method helperSliderMain
		*/
		helperSliderMain: function(){

			var $sliderFilmes = $('.session-banner .owl-carousel');

			if( $sliderFilmes.length ) {
				$sliderFilmes.owlCarousel({
					loop: true,
					nav: false,
					items: 1,
					autoplay: true,
					animateOut: 'fadeOut'
				});
			}			
		},

		/**
		* Função que cria um slider para os modelos de veículos.
		* @method helperSliderModelos
		*/
		helperSliderModelos: function(){

			var $sliderFilmes = $('.session-modelos-veliculos .owl-carousel');

			if( $sliderFilmes.length ) {
				$sliderFilmes.owlCarousel({
					loop: false,
					items: 8,
					navText: [
						'<span class="fas fa-chevron-left"></span>',
						'<span class="fas fa-chevron-right"></span>'
					],
					responsive:{
				        0:{
				            items: 2,				            				            
							margin: 30,
				            nav: true
				        },
				        600:{
				            items: 3,				            
							margin: 20,
				            nav: true
				        },
				        1000:{
				            items: 5,				            				            
							margin: 20,
				            nav: true
				        },
				        1200:{
				            items: 8,				            
							margin: 30,
				            nav: true
				        }
				    }
				});
			}			
		},

		/**
		* Função que seleciona o veículo.
		* @method helperSelecionaVeiculo
		*/
		helperSelecionaVeiculo: function(){
			var $select = $(".select-veiculo");

			if( $select.length ){
				$($select).on("click", function($event){
					$event.preventDefault();
					var $anos = '<div class="row todos-anos">',
						$content = "";

					for( var $i = 0; $i < 20; $i++ ){
						$anos += '<div class="col"><a href="#" data-ano="'+(2018 - $i)+'">'+(2018 - $i)+'</a></div>';
					}
					$anos += '</div>';
					
					$content += `
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item" id="item-ano">Ano</li>
							<li class="breadcrumb-item" id="item-modelo">Modelo</li>
						</ol>
					</nav>
					<ul class="nav nav-tabs" id="tab-veiculos" role="tablist">
					  <li class="nav-item">
					    <a class="nav-link active" id="ano-tab" data-toggle="tab" href="#ano" role="tab" aria-controls="ano" aria-selected="true">Ano</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link disabled" id="modelo-tab" data-toggle="tab" href="#modelo" role="tab" aria-controls="modelo" aria-selected="false">Modelo</a>
					  </li>
					</ul>
					<div class="tab-content" id="tabcontent">
					  <div class="tab-pane fade show active" id="ano" role="tabpanel" aria-labelledby="ano-tab">`+$anos+`</div>
					  <div class="tab-pane fade" id="modelo" role="tabpanel" aria-labelledby="modelo-tab"></div>
					</div>`;

					Init.helperCreateModal("Selecione seu veículo", $content, "modal-select-veiculo");

					//Trata o evento tabs quando o link é clicado
					$('.nav-tabs .nav-link').on('shown.bs.tab', function ($eve) {
					  var $active = $($eve.target).attr("href");
					  if( $($eve.target).attr("href") == "#ano" ){
					  	$(".nav-tabs .nav-link").addClass("disabled");
					  	$(".nav-tabs .nav-link[href='#ano']").removeClass("disabled");
					  	$(".tab-content .tab-pane[id!='ano']").html("");
					  	$(".breadcrumb").removeClass("show");
					  	$(".breadcrumb li").removeClass("show");
					  }
					});

				});

				//Busca por ano
				$("body").on("click", ".tab-content a", function($event){
					$event.preventDefault();
					var $ano = $(this).data("ano"),
						$content = '<div class="row justify-content-md-center todos-modelos">';

					$content += '<div class="col col-md-4"><a href="#" data-modelo="01">Modelo 1</a></div>';
					$content += '<div class="col col-md-4"><a href="#" data-modelo="02">Modelo 2</a></div>';
					$content += '<div class="col col-md-4"><a href="#" data-modelo="03">Modelo 3</a></div>';
					$content += '<div class="col col-md-4"><a href="#" data-modelo="04">Modelo 4</a></div>';
					$content += '<div class="col col-md-4"><a href="#" data-modelo="05">Modelo 5</a></div>';
					$content += '<div class="col col-md-4"><a href="#" data-modelo="06">Modelo 6</a></div>';

					$content += '</div>';					

					$(".breadcrumb #item-ano").html($ano);
					$(".breadcrumb").addClass("show");
					$(".breadcrumb li[id='item-ano']").addClass("show");

					if( $(".tab-pane#modelo").hasClass("active") ){
						var $modelo = $(this).text();
						$(".breadcrumb #item-modelo").html($modelo);
						$(".breadcrumb li[id='item-modelo']").addClass("show");
					}

					$(".tab-pane#modelo").html($content);
					$(".nav-tabs li .nav-link").removeClass("active");
					$(".nav-tabs li #modelo-tab").addClass("active");
					$(".nav-tabs .nav-link").removeClass("disabled");
					$(".tab-content .tab-pane").removeClass("show active");
					$(".tab-content .tab-pane[id='modelo']").addClass("show active");

				});

								
			}
		},

		/**
		* Função que carregada a galeria de fotos dos detalhes do produto.
		* @method helperGallery
		*/
		helperGallery: function(){
			var $thumb = $(".thums-gallery img");

			if( $thumb.length ){

				$("body").on("click", ".thums-gallery img", function(){
					var $src = $(this).attr("src");
					$(this).closest(".thums-gallery").prev(".image")
						.find("img").attr("src", $src);
				});
			}
		},

        /**
		* Função que auxilia na atualização no preço do carrinho.
		* @method helperChangeInfoPreco
		*/
		helperChangeInfoPreco: function(){
			var $car = JSON.parse(Init.helperGetLocalStorage("carrinho"));
			var $precoTotal = 0;
			$.each($car.items, function($index, $object){
				$.getJSON("produtos.json", function ($data) {
					$.each($data.produtos, function($ind, $obj){
						if( $obj.item_id == $object.item_id ){
							$precoTotal += parseInt($object.qtd) * Init.helperMoneyToFloat($obj.preco);									
							$(".session-carrinho .total, .session-carrinho .subtotal")
								.html("R$ " + Init.helperConvertMoneyBr($precoTotal));
						}
					});
				});
			});
		},

		/**
		* Função que faz os botões do carrinho somar ou subtrair.
		* @method helperMaisNenos
		*/
		helperMaisNenos: function(){

			$("body").on("click", ".btn-mais", function () {
                var $obj = $(this).closest(".controls").find("input"),
                    $id_produto = $(this).closest("li").data("id-produto"),
                    $car = JSON.parse(Init.helperGetLocalStorage("carrinho"));

                if ($obj.val() === "") {
                    $obj.val("1");
                }
                else {
                    $obj.val("" + (parseInt($obj.val()) + 1));
                    $.each($car.items, function($index, $object){
						if( $id_produto == $object.item_id ){
							$car.items[$index].qtd = ""+$obj.val()+"";
							Init.helperSetLocalStorage("carrinho", JSON.stringify($car));
							Init.helperCarrinhoHasItem("carrinho");
							Init.helperChangeInfoPreco();
						}
					});
                }
                //console.log($obj.val());
            });

            $("body").on("click", ".btn-menos", function () {
                var $obj = $(this).closest(".controls").find("input"),
                    $id_produto = $(this).closest("li").data("id-produto"),
                    $car = JSON.parse(Init.helperGetLocalStorage("carrinho"));

                if ($obj.val() === "") {
                    $obj.val("0");
                }
                if ($obj.val() === "1") {
                	$obj.val("1");                                     	
                }
                else {
                    $obj.val("" + (parseInt($obj.val()) - 1));  
                    $.each($car.items, function($index, $object){
						if( $id_produto == $object.item_id ){
							$car.items[$index].qtd = ""+$obj.val()+"";
							Init.helperSetLocalStorage("carrinho", JSON.stringify($car));
							Init.helperCarrinhoHasItem("carrinho");
							Init.helperChangeInfoPreco();
						}
					});                 
                }                

            });

		},

		/**
		* Função que seta uma variável no localstorage.
		* @method helperSetLocalStorage
		* @param = $key
		* @param = $value
		*/
		helperSetLocalStorage: function($key, $value){
			window.localStorage.setItem($key, $value);
		},

		/**
		* Função que recupera uma variável no localstorage.
		* @method helperGetLocalStorage
		* @param = $key
		*/
		helperGetLocalStorage: function($key){
			var $data = window.localStorage.getItem($key);
            return $data;
		},

		/**
		* Função que remove uma variável no localstorage.
		* @method helperGetLocalStorage
		* @param = $key
		*/
		helperRemoveLocalStorage: function($key){
			window.localStorage.removeItem($key);
		},

		/**
		* Função que converte para a modeda brasileira.
		* @method helperConvertMoneyBr
		* @param = $valor
		*/
		helperConvertMoneyBr: function($valor){
			var $aux = $valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
   			return $aux;
		},

		/**
		* Função que converte uma string em uma variável do tipo float.
		* @method helperMoneyToFloat
		* @param = $valor
		*/
		helperMoneyToFloat: function($valor){
			var $aux = $valor.replace("R$ ", "").replace(",", ".");
			return parseFloat($aux);
		},

		/**
		* Função que exibe o carrinho vazio.
		* @method helperCarrinhoVazio
		*/
		helperCarrinhoVazio: function(){
			var $html_content = `
					<li class="row no-item-car">
						<div class="col align-self-center">
							<span class="far fa-frown"></span>
							<h3 class="subtitle">SEU CARRINHO ESTÁ VAZIA :(</h3>
						</div>
					</li>`;

			$(".session-carrinho .items").html($html_content);
		},

		/**
		* Função que monta as inforações do footer da carrinho.
		* @method helperFooterInfoCarrinho
		* @param = $precoTotal
		*/
		helperFooterInfoCarrinho: function($precoTotal){
			var $content_footer = `
			    <ul class="footer-content">
					<li class="row">
						<div class="col">
							<span class="subtitle">Subtotal</span>
						</div>
						<div class="col">
							<span class="subtotal text-right text-strong">R$ `+Init.helperConvertMoneyBr($precoTotal)+`</span>
						</div>
					</li>
					<li class="row">
						<div class="col">
							<span class="subtitle">Total a pagar</span>
						</div>
						<div class="col">
							<span class="total text-right text-strong">R$ `+Init.helperConvertMoneyBr($precoTotal)+`</span>
						</div>
					</li>
				</ul>
				<a href="#" class="btn btn-default btn-full btn-continuar">Continuar com o pagamento</a>`;

			$(".footer-info").html($content_footer);
		},

		/**
		* Função que verifica se o carrinho não esta vazio.
		* @method helperCarrinhoHasItem
		*/
		helperCarrinhoHasItem: function(){
			var $hasItemCarrinho = JSON.parse(Init.helperGetLocalStorage("carrinho")),
				$titleSessionCar = "CARRINHO (0)";

			if( $hasItemCarrinho != null ){
				var $totalItems = 0;			
				$.each($hasItemCarrinho.items, function($index, $obj){
					if( parseInt($obj.qtd) >= 0 ){
						$("html").attr("data-car", "true");
						$totalItems = $totalItems + parseInt($obj.qtd);
						$titleSessionCar = "CARRINHO ("+$totalItems+")";
					}
					else {
						$("html").removeAttr("data-car");
						$(".footer-info").html("");
						Init.helperCarrinhoVazio();
					}
				});

                if( $totalItems > 0 ) {
				    $(".has-item-car").html($totalItems);
				    $(".session-carrinho #main-carrinho .header-carrinho .subtitle").html($titleSessionCar);
				}
				else {
				    $("html").removeAttr("data-car");
				    $(".footer-info").html("");
				    Init.helperCarrinhoVazio();
				    $(".session-carrinho #main-carrinho .header-carrinho .subtitle").html($titleSessionCar);
			    }
			}
			else {
				$("html").removeAttr("data-car");
				$(".footer-info").html("");
				Init.helperCarrinhoVazio();
				$(".session-carrinho #main-carrinho .header-carrinho .subtitle").html($titleSessionCar);
			}
		},

		/**
		* Função que exibe o carrinho.
		* @method helperOpenCarrinho
		*/
		helperOpenCarrinho: function(){
			var $open = $(".open-to-car");

			if( $open.length ){
				$("body").on("click", ".open-to-car", function($event){
					$event.preventDefault();

					if( !$("body").hasClass("show-carrinho") ){
						$("body").append('<div class="mask-carrinho"></div>');
						setTimeout(function(){
							Init.helperLoaderCarrinho();
							$("body").addClass("show-carrinho");
						}, 500);
					}

				});

				$("body").on("click", ".session-carrinho .close-carrinho, .mask-carrinho", function($event){
					$event.preventDefault();

					$("body").removeClass("show-carrinho");
					setTimeout(function(){
						$(".session-carrinho").removeClass("show-login show-esq-senha show-cadastro");
						$(".mask-carrinho").remove();
					}, 500);

				});
			}
		},

        /**
		* Função que monta o carrinho quando a pagina e iniciada.
		* @method helperLoaderCarrinho
		*/
		helperLoaderCarrinho: function(){			
            var $car = JSON.parse(Init.helperGetLocalStorage("carrinho"));
            var $precoTotal = 0;
			if( $car != null ){
				var $html_content = '',
					$content_footer;					
				$.each($car.items, function($index, $object){					
					$.getJSON('produtos.json', function ($data){
						$.each($data['produtos'], function($ind, $obj){
							if( $obj.item_id == $object.item_id ){
								$precoTotal += parseInt($object.qtd) * Init.helperMoneyToFloat($obj.preco);
								$html_content += `
									<li class="row item-carrinho" data-id-produto="`+$obj.item_id+`">
										<div class="col-3">
											<img src="`+$obj.imagem+`" class="img-fluid" alt="`+$obj.nome+`">
										</div>
										<div class="col">
											<span class="subtitle">`+$obj.nome+`</span>
											<div class="controls">
												<button type="button" class="btn btn-green btn-menos">-</button>
												<input type="text" name="qtd" class="form-control form-qtd" value="`+$object.qtd+`" disabled>
												<button type="button" class="btn btn-green btn-mais">+</button>
											</div>
											<span class="preco">`+$obj.preco+`</span>
										</div>
										<div class="col-2">
											<a href="#" class="remove-item" alt="Remover item" title="Remover item">&times;</span></a>
										</div>
									</li> `;

								$(".session-carrinho .items").html($html_content);	
					            Init.helperFooterInfoCarrinho($precoTotal);	
							}
						});						
					});
					
				});	
					
			}
		},	

        /**
		* Função que auxilia montar o carrinho.
		* @method helperMontaCarrinho
		* @param = $url
		* @param = $id_produto
		*/
		helperMontaCarrinho: function($url, $id_produto){
			var $precoTotal = 0;
            $.getJSON($url, function ($data) {
			    var $item = '',
			        $item_car = $.grep($data.produtos, function($element, $index) {
					   return ($element.item_id == $id_produto);
					});

			    $item += `
					<li class="row item-carrinho" data-id-produto="`+$item_car[0].item_id+`">
						<div class="col-3">
							<img src="`+$item_car[0].imagem+`" class="img-fluid" alt="`+$item_car[0].nome+`">
						</div>
						<div class="col">
							<span class="subtitle">`+$item_car[0].nome+`</span>
							<div class="controls">
								<button type="button" class="btn btn-green btn-menos">-</button>
								<input type="text" name="qtd" class="form-control form-qtd" value="1" disabled>
								<button type="button" class="btn btn-green btn-mais">+</button>
							</div>
							<span class="preco">`+$item_car[0].preco+`</span>
						</div>
						<div class="col-2">
							<a href="#" class="remove-item" alt="Remover item" title="Remover item">&times;</span></a>
						</div>
					</li> `;

				if( $(".session-carrinho .items").find(".item-carrinho").length == 0 ){
					$(".session-carrinho .items").html($item);
				}
				else {
					var $hasIDProd = false;
						$.each($(".session-carrinho .items .item-carrinho"), function($index, $elem){
							if( $($elem).data("id-produto") == $id_produto){
								$hasIDProd = true;
							}
						});

					if( !$hasIDProd ){
						$(".session-carrinho .items").find(".item-carrinho:first").before($item);
					}
				}

				var $itemsCar = JSON.parse(Init.helperGetLocalStorage("carrinho"));

	           	$.each($itemsCar.items, function($index, $object){
	           		$(".session-carrinho .items li[data-id-produto="+$object.item_id+"]").find(".form-qtd").val($object.qtd);
	           		$.each($data['produtos'], function($ind, $obj){
	           			if( $obj.item_id == $object.item_id ){
		           			$precoTotal += parseInt($object.qtd) * Init.helperMoneyToFloat($obj.preco);

		           		}
	           		});	           		
	           	});

	           	Init.helperFooterInfoCarrinho($precoTotal);

			});
			
		},

		/**
		* Função que adiciona um item no carrinho.
		* @method helperAddCarrinho
		*/
		helperAddCarrinho: function(){
			var $add = $(".add-to-car");

			if( $add.length ){
				$("body").on("click", ".add-to-car", function($event){
					$event.preventDefault();
					var $url = "produtos.json",
					    $id_produto = $(this).data("id-produto");

					if( !$("body").hasClass("show-carrinho") ){
						var $hasItemCar = JSON.parse(Init.helperGetLocalStorage("carrinho"));
						if( $hasItemCar === null ) {
							var $data = {"items":[{"item_id": $id_produto, "qtd": "1"}]};							
							Init.helperSetLocalStorage("carrinho", JSON.stringify($data));
							Init.helperCarrinhoHasItem("carrinho");
						}
						else {							
							var $item = {"item_id": $id_produto, "qtd": "1"},
								$copy = JSON.parse(Init.helperGetLocalStorage("carrinho")),
								$hasID = false;

							$.each($copy.items, function($index, $obj){
								if( $id_produto == $obj.item_id ){
									$hasID = true;
								}
							});

							if( ! $hasID ){
								$copy['items'].unshift($item);
								Init.helperSetLocalStorage("carrinho", JSON.stringify($copy));
								Init.helperCarrinhoHasItem("carrinho");
							}
						}
						
						Init.helperMontaCarrinho($url, $id_produto);
						$("body").append('<div class="mask-carrinho"></div>');

						setTimeout(function(){
							$("body").addClass("show-carrinho");
						}, 500);
					}

				});

				//Remove oculta o carrinho
				$("body").on("click", ".session-carrinho .close-carrinho, .mask-carrinho", function($event){
					$event.preventDefault();

					$("body").removeClass("show-carrinho");					
					setTimeout(function(){
						$(".session-carrinho").removeClass("show-login show-esq-senha show-cadastro");
						$(".mask-carrinho").remove();
					}, 500);

				});
			}
		},

		/**
		* Função que remove um item no carrinho.
		* @method helperRemoveCarrinho
		*/
		helperRemoveCarrinho: function(){
			$("body").on("click", ".remove-item", function($event){
				$event.preventDefault();				
				var $id_produto = $(this).closest("li").attr("data-id-produto"),
					$qtd = $(this).closest("li").find(".form-qtd").val(),
					$removePreco = $(this).closest("li").find(".preco").text(),
					$copy = JSON.parse(Init.helperGetLocalStorage("carrinho")),
					$hasID = false;

				$.each($copy.items, function($index, $obj){
					if( $obj.item_id == $id_produto ){
						$hasID = true;
						$copy["items"].splice($index, 1);
						return false;
					}
				});

				if( $hasID ){
					Init.helperSetLocalStorage("carrinho", JSON.stringify($copy));
					Init.helperCarrinhoHasItem("carrinho");
					Init.helperChangeInfoPreco();
					$(this).closest(".item-carrinho").remove();                   
				}
			});
		},

		/**
		* Função que leva o usuário para página de pagamento caso esteja logado.
		* @method helperContinuarPagamento
		*/
		helperContinuarPagamento: function($event){
			$("body").on("click", ".btn-continuar", function($event){
				$event.preventDefault();
				var $userLogged = $("html").data("logged");

				if( $userLogged == true && $userLogged != undefined ){

				}
				else {
					$(".session-carrinho").addClass("show-login");
				}

			});
		},

		/**
		* Função que exibe o cadastro de usuários.
		* @method helperExibeCadastro
		*/
		helperExibeCadastro: function(){
			$("body").on("click", ".btn-cadastro", function($event){
				$event.preventDefault();
				$(".session-carrinho").removeClass("show-login");
				$(".session-carrinho").addClass("show-cadastro");
			});
		},

		/**
		* Função que exibe o área para pedir nova senha.
		* @method helperEsqueciSenha
		*/
		helperEsqueciSenha: function(){
			$("body").on("click", ".btn-esq-senha", function($event){
				$event.preventDefault();
				$(".session-carrinho").removeClass("show-login");
				$(".session-carrinho").addClass("show-esq-senha");
			});
		},

		/**
		* Função que exibe o login.
		* @method helperExibeLogin
		*/
		helperExibeLogin: function(){
			$("body").on("click", ".btn-login", function($event){
				$event.preventDefault();
				$(".session-carrinho").removeClass("show-cadastro show-esq-senha");
				$(".session-carrinho").addClass("show-login");
			});
		},

        /**
		* Função que habilita  botão.
		* @method helperValidaButton
		*/
		helperHabilitaButton: function(){		

			var $regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			    
			$("body").on("keyup", ".valida", function(){
				 var $this = $(this),
					 $totalErros = 0,
					 $form = $this.closest(".form").find(".valida");		

				$.each($form, function($index, $element){

					if( $($element).hasClass("valida-email") ){
						if( ! $regexEmail.test($(this).val()) ){							
							$totalErros++;
						}
					}	
					if( $($element).hasClass("valida-cpf") ){
						if( ! Init.verificaCPF($($element).val()) ){							
							$totalErros++;
						}
					}
					if( $($element).hasClass("valida-data") ){
						if( ! Init.verificaSeDataMenor($(this).val()) || $(this).val().length != 10 ){							
							$totalErros++;
						}
					}
					if( $($element).hasClass("valida-fone") ){
						if( $(this).val().length < 14 ){
							$totalErros++;
						}
					}			
					if( $($element).hasClass("valida-senha") ){
						if( $(this).val().length < 6 ){
							$totalErros++;
						}
					}
					if( $($element).hasClass("valida-texto-igual") ){
						var $name = $(this).attr("name");
						if( $(this).val() != $(this).closest(".form").find(".valida-texto-igual[name!='"+$name +"']").val() ||
						    $(this).val().length > 6 ){
							$totalErros++;
						}
					}
					if( $($element).hasClass("valida-empty") ){
						if( $(this).val().length < 3 ){
							$totalErros++;
						}
					}					

				});

				if( $totalErros == 0 ){
					$(this).closest(".form").find(".btn-default").removeClass("disabled");					
				}	
				else {
					$(this).closest(".form").find(".btn-default").addClass("disabled");
				}	
			});

			//Verifica o e-mail
			$("body").on("keyup", ".valida-email", function(){
				if( $regexEmail.test($(this).val()) ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");
				}
				if( !$regexEmail.test($(this).val()) ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if($(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica CPF
			$("body").on("keyup", ".valida-cpf", function(){
				if( Init.verificaCPF($(this).val()) ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");
				}
				if( ! Init.verificaCPF($(this).val()) ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica o campo de data
			$("body").on("keyup", ".valida-data", function(){				
				if( Init.verificaSeDataMenor($(this).val()) || $(this).val().length == 10 ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");			
				}
				if( ! Init.verificaSeDataMenor($(this).val()) || $(this).val().length != 10 ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica o campo do telefone
			$("body").on("keyup", ".valida-fone", function(){
				if( $(this).val().length >= 14 ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");					
				}
				if( $(this).val().length < 14 ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica o campo do telefone
			$("body").on("keyup", ".valida-empty", function(){
				if( $(this).val().length >= 3 ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");					
				}
				if( $(this).val().length < 3 ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica o campo do telefone
			$("body").on("keyup", ".valida-senha", function(){
				if( $(this).val().length > 5 ){
					$(this).closest(".form-group").removeClass("has-error");
					$(this).closest(".form-group").addClass("validated");					
				}
				if( $(this).val().length <= 5 ){
					$(this).closest(".form-group").removeClass("validated");
					$(this).closest(".form-group").addClass("has-error");
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form-group").removeClass("validated has-error");
				}
			});

			//Verifica o se os campos são iguais
			$("body").on("keyup", ".valida-texto-igual", function(){
				var $name = $(this).attr("name");
				if( $(this).val() === $(this).closest(".form").find(".valida-texto-igual[name!='"+$name +"']").val() ||
					$(this).val().length > 6 ){
					$(this).closest(".form").find(".valida-texto-igual").closest(".form-group").removeClass("has-error");				
					$(this).closest(".form").find(".valida-texto-igual").closest(".form-group").addClass("validated");
				}
				if( $(this).val() !== $(this).closest(".form").find(".valida-texto-igual[name!='"+$name +"']").val() ||
					$(this).val().length < 6 ){
					$(this).closest(".form").find(".valida-texto-igual").closest(".form-group").removeClass("validated");
					$(this).closest(".form").find(".valida-texto-igual").closest(".form-group").addClass("has-error");		
				}
				if( $(this).val() === "" || $(this).val() === null ) {
					$(this).closest(".form").find(".valida-texto-igual").closest(".form-group").removeClass("validated has-error");
				}
			});
		},

		/**
		* Função que cria um helper para mascara do telefone ou Celular.
		* @method helperMaskTelOrCel
		*/
		helperMaskTelOrCel: function(){
			if( $(".mask-tel-cel").length ){
				  var $options = {
					onKeyPress: function ($num, $ev, $el, $op) {
						var $masks = ['(00) 00000-0000', '(00) 0000-00000'],
							$mask = ($num.length == 15) ? $masks[0] : $masks[1];
						$el.mask($mask, $op);
					}
				}				
				$('.mask-tel-cel').mask('(00) 0000-00000', $options);
			}
		}

    };

	var $init = Init;
	$init.construct();

}(jQuery));