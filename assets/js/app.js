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
			this.helperNavegaCarrinho();
			this.helperContinuarPagamento();
			this.helperExibeCadastro();
			this.helperExibeLogin();
			this.helperLogar();
			this.helperMontaCartao();
			this.helperFinalizarPagamento();
			this.helperEsqueciSenha();
			this.helperHabilitaButton();
			this.helperMaskTelOrCel();
			this.helperVerifyUserLogged();
			this.helperLogout();
			this.helperCarrinhoMaskInputs();
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
		* Função que cria um SVG com um loading.
		* @method helperSVGLoading
		*/
        helperSVGLoading: function(){
        	var $svg = `
				<div class="loader-svg">
				  <svg version="1.1" id="loader-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				      viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
				  <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
				    <animateTransform attributeType="xml"
				      attributeName="transform"
				      type="rotate"
				      from="0 25 25"
				      to="360 25 25"
				      dur="0.6s"
				      repeatCount="indefinite"/>
				    </path>
				  </svg>
				</div>`;

			return $svg;
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
			$('body').on('focus', '.custom-material .custom-field', function(){
				$(this).closest('.form-group').addClass('in');
			});

			$('body').on('focusout', '.custom-material .custom-field', function(){
				if( $(this).val() === '' || $(this).val() === null )
					$(this).closest('.form-group').removeClass('in');
			});
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
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45" height="45" viewBox="0 0 16 16">
								<path fill="#999" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
								<path fill="#999" d="M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path>
								<path fill="#999" d="M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path>
								<path fill="#999" d="M11.3 12.3c-0.7-1.1-2-1.8-3.3-1.8s-2.6 0.7-3.3 1.8l-0.8-0.6c0.9-1.4 2.4-2.2 4.1-2.2s3.2 0.8 4.1 2.2l-0.8 0.6z"></path>
							</svg>
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

			var $content_footer_finalizar = `
			    <ul class="footer-content">
					<li class="row">
						<div class="col">
							<span class="subtitle">Valor total</span>
						</div>
						<div class="col">
							<span class="total text-right text-strong">R$ `+Init.helperConvertMoneyBr($precoTotal)+`</span>
						</div>
					</li>
				</ul>
				<a href="#" class="btn btn-default btn-full btn-finalizar">Finalizar a Compra</a>`;

			$(".footer-info").html($content_footer);
			$(".footer-info.footer-finalizar-compra").html($content_footer_finalizar);
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
						$(".session-carrinho").attr("data-show", "show-carrinho");
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
						$(".session-carrinho").attr("data-show", "show-carrinho");
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
				var $userLogged = Init.helperGetLocalStorage("user_logged");

				if( $userLogged){
					$(".session-carrinho").attr("data-show", "show-form-payment");
				}
				else {
					$(".session-carrinho").attr("data-show", "show-login");
				}
			});
		},

		/**
		* Função que faz o login.
		* @method helperLogar
		*/
		helperLogar: function(){
			$("body").on("click", ".btn-logar", function($event){
				$event.preventDefault();

				var $element = $(this);

				var $login = $(".session-carrinho input[name='login']"),
					$senha = $(".session-carrinho input[name='senha']");

				$element.closest(".main").addClass("loading");
				$element.closest(".main").append(Init.helperSVGLoading());

				//Se os dados do usuário estiverm corretos
				if($login.val() == "braz@gmail.com" && $senha.val() == "123456"){
					Init.helperSetLocalStorage("user_logged", true);
					Init.$functionTimeOut = setTimeout(function(){
						Init.helperVerifyUserLogged();
						$(".session-carrinho").attr("data-show", "show-form-payment");
						$(".loader-svg").remove();
						$element.closest(".main").removeClass("loading");
					}, 3000);
				}
				else {					
					Init.$functionTimeOut = setTimeout(function(){
						$(".session-carrinho .message-info").html("Login ou a senha está incorreto.");
						$(".loader-svg").remove();
						$element.closest(".main").removeClass("loading");
					}, 3000);
					Init.$functionTimeOut = setTimeout(function(){
						$(".session-carrinho .message-info").html("");
					}, 6000);
				}				
				
			});
		},

		/**
		* Função que monta o html da tela de login.
		* @method helperViewLogin
		*/
		helperViewLogin: function(){
			var $content = `
				<div class="main" id="main-login">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">LOGIN</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<p>Digite seu CPF ou e-mail para acessar sua conta.</p>
						<div class="form">
							<span class="message-info"></span>
							<div class="form-group custom-material">
								<input type="email" name="login" class="form-control custom-field valida valida-email" autocomplete="off">
								<label for="login">Login</label>
							</div>
							<div class="form-group custom-material">
								<input type="password" name="senha" class="form-control custom-field valida valida-senha" autocomplete="off new-password">
								<label for="senha">Senha</label>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col">
										<a href="#" class="btn btn-link btn-esq-senha">Esqueceu a senha?</a>
									</div>
									<div class="col">
										<button class="btn btn-default btn-full btn-logar disabled">Login</button>
									</div>
								</div>
							</div>
							<div class="form-group">					
								<a href="#" class="btn btn-link btn-cadastro">Faça seu cadastro agora!</a>
							</div>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de esqueci a senha.
		* @method helperViewEsqueciSenha
		*/
		helperViewEsqueciSenha: function(){
			var $content = `
				<div class="main" id="main-esq-senha">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">LOGIN</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<p>Digite seu e-mail para recuperar sua senha.</p>
						<div class="form">
							<div class="form-group custom-material">
								<input type="email" name="email" class="form-control custom-field valida valida-email" autocomplete="off">
								<label for="login">Seu e-mail</label>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col">
										<a href="#" class="btn btn-link btn-login">Efetuar Login</a>
									</div>
									<div class="col">
										<button class="btn btn-default btn-full disabled">Enviar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de cadastro.
		* @method helperViewCadastroUser
		*/
		helperViewCadastroUser: function(){
			var $content = `
				<div class="main" id="main-cadastro">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">CADASTRO</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<p>Precisamos de mais algumas informações para criar sua conta.</p>
						<div class="form">
							<div class="row">
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="nome" class="form-control custom-field valida valida-empty">
										<label for="nome">Nome</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="sobrenome" class="form-control custom-field valida valida-empty">
										<label for="sobrenome">Sobrenome</label>
									</div>
								</div>	
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="email" name="email-cad" class="form-control custom-field valida valida-email">
										<label for="email-cad">E-mail</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="text" name="cpf-cad" class="form-control custom-field valida valida-cpf mask-car-cpf" maxlength="14">
										<label for="cpf-cad">CPF</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="datanascimento-cad" class="form-control custom-field valida valida-data mask-car-data" maxlength="10">
										<label for="datanascimento-cad">Nascimento</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="tel-cad" class="form-control custom-field mask-tel-cel valida valida-fone mask-car-fone" maxlength="15">
										<label for="tel-cad">Telefone</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="password" name="senha-cad" class="form-control custom-field valida valida-senha valida-texto-igual" autocomplete="off new-password">
										<label for="senha-cad">Senha</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="password" name="confirme-senha-cad" class="form-control custom-field valida valida-senha valida-texto-igual" autocomplete="off new-password">
										<label for="confirme-senha-cad">Confirme sua senha</label>
									</div>
								</div>
								<div class="col-12">	
									<div class="form-group">
										<button class="btn btn-default btn-full disabled">Cadastrar</button>
									</div>
								</div>				
							</div>
							
							<div class="form-group">
								<a href="#" class="btn btn-link btn-login">Efetuar Login</a>
							</div>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de formas de pagamento.
		* @method helperViewFormasPagmento
		*/
		helperViewFormasPagmento: function(){
			var $content = `
				<div class="main" id="main-form-payment">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">PAGAMENTO</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<div class="card-cred">
							<div class="card" data-flag="false">
								<div class="front-card">
									<div class="content-card-cred">
										<span class="card-chip"></span>
										<span class="card-numbrer">•••• •••• •••• ••••</span>
										<span class="card-name">Nome Completo</span>
										<span class="card-expiry" data-before="mm/aa" data-after="valid thru">••/••</span>
										<div class="card-logo">
											<svg class="maestro-logo" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g fill-rule="nonzero">
											            <rect x="0" y="0" rx="40"></rect>
											            <g transform="translate(133.000000, 48.000000)">
											                <path d="M146.8,373.77 L146.8,349 C146.8,339.65 140.8,333.36 131.25,333.28 C126.25,333.2 120.99,334.77 117.35,340.28 C114.62,335.9 110.35,333.28 104.28,333.28 C99.6528149,333.047729 95.2479974,335.280568 92.7,339.15 L92.7,334.27 L84.09,334.27 L84.09,373.82 L92.78,373.82 L92.78,351.85 C92.78,344.98 96.59,341.34 102.46,341.34 C108.17,341.34 111.07,345.06 111.07,351.76 L111.07,373.76 L119.76,373.76 L119.76,351.85 C119.76,344.98 123.76,341.34 129.44,341.34 C135.31,341.34 138.13,345.06 138.13,351.76 L138.13,373.76 L146.8,373.77 Z M195.28,354 L195.28,334.23 L186.67,334.23 L186.67,339 C183.94,335.44 179.8,333.21 174.18,333.21 C163.09,333.21 154.41,341.9 154.41,353.98 C154.41,366.06 163.1,374.75 174.18,374.75 C179.81,374.75 183.94,372.52 186.67,368.96 L186.67,373.76 L195.28,373.76 L195.28,354 Z M163.28,354 C163.28,347.05 167.83,341.34 175.28,341.34 C182.4,341.34 187.19,346.8 187.19,354 C187.19,361.2 182.39,366.66 175.28,366.66 C167.81,366.66 163.26,360.95 163.26,354 L163.28,354 Z M379.4,333.19 C382.306602,333.161358 385.190743,333.701498 387.89,334.78 C390.404719,335.784654 392.697997,337.272736 394.64,339.16 C396.553063,341.035758 398.069744,343.276773 399.1,345.75 C401.246003,351.047587 401.246003,356.972413 399.1,362.27 C398.069744,364.743227 396.553063,366.984242 394.64,368.86 C392.698322,370.747671 390.404958,372.235809 387.89,373.24 C382.423165,375.368264 376.356835,375.368264 370.89,373.24 C368.379501,372.23863 366.092168,370.749994 364.16,368.86 C362.258485,366.978798 360.749319,364.738843 359.72,362.27 C357.573997,356.972413 357.573997,351.047587 359.72,345.75 C360.749788,343.28141 362.258895,341.041542 364.16,339.16 C366.092334,337.270213 368.379623,335.781606 370.89,334.78 C373.595493,333.69893 376.486681,333.158743 379.4,333.19 Z M379.4,341.33 C377.718221,341.315441 376.049964,341.631425 374.49,342.26 C373.019746,342.850363 371.685751,343.735156 370.57,344.86 C369.447092,346.008077 368.563336,347.367702 367.97,348.86 C366.704271,352.169784 366.704271,355.830216 367.97,359.14 C368.562861,360.632544 369.446675,361.992258 370.57,363.14 C371.685751,364.264844 373.019746,365.149637 374.49,365.74 C377.649488,366.979283 381.160512,366.979283 384.32,365.74 C385.794284,365.146098 387.134154,364.26192 388.26,363.14 C389.392829,361.995929 390.283848,360.635594 390.88,359.14 C392.145729,355.830216 392.145729,352.169784 390.88,348.86 C390.283848,347.364406 389.392829,346.004071 388.26,344.86 C387.134154,343.73808 385.794284,342.853902 384.32,342.26 C382.757613,341.626714 381.085807,341.307304 379.4,341.32 L379.4,341.33 Z M242.1,354 C242.02,341.67 234.41,333.23 223.32,333.23 C211.74,333.23 203.63,341.67 203.63,354 C203.63,366.58 212.07,374.77 223.9,374.77 C229.9,374.77 235.32,373.28 240.12,369.23 L235.9,362.86 C232.633262,365.479648 228.586894,366.936341 224.4,367 C218.86,367 213.81,364.44 212.57,357.32 L241.94,357.32 C242,356.23 242.1,355.16 242.1,354 Z M212.65,350.53 C213.56,344.82 217.03,340.93 223.16,340.93 C228.7,340.93 232.26,344.4 233.16,350.53 L212.65,350.53 Z M278.34,344.33 C274.582803,342.165547 270.335565,340.995319 266,340.93 C261.28,340.93 258.47,342.67 258.47,345.56 C258.47,348.21 261.47,348.95 265.17,349.45 L269.22,350.03 C277.83,351.27 283.04,354.91 283.04,361.86 C283.04,369.39 276.42,374.77 265.04,374.77 C258.59,374.77 252.63,373.11 247.91,369.64 L251.96,362.94 C255.757785,365.757702 260.39304,367.215905 265.12,367.08 C270.99,367.08 274.12,365.34 274.12,362.28 C274.12,360.05 271.89,358.81 267.17,358.14 L263.12,357.56 C254.27,356.32 249.47,352.35 249.47,345.89 C249.47,338.03 255.92,333.23 265.93,333.23 C272.22,333.23 277.93,334.64 282.06,337.37 L278.34,344.33 Z M319.69,342.1 L305.62,342.1 L305.62,360 C305.62,364 307.03,366.62 311.33,366.62 C314.014365,366.531754 316.632562,365.76453 318.94,364.39 L321.42,371.75 C318.192475,373.761602 314.463066,374.822196 310.66,374.81 C300.48,374.81 296.93,369.35 296.93,360.16 L296.93,342.16 L288.93,342.16 L288.93,334.3 L296.93,334.3 L296.93,322.3 L305.62,322.3 L305.62,334.3 L319.68,334.3 L319.69,342.1 Z M349.47,333.25 C351.556514,333.260012 353.62609,333.625232 355.59,334.33 L352.94,342.44 C351.229904,341.756022 349.401653,341.416198 347.56,341.44 C341.93,341.44 339.12,345.08 339.12,351.62 L339.12,373.79 L330.52,373.79 L330.52,334.23 L339,334.23 L339,339 C341.149726,335.306198 345.148028,333.084492 349.42,333.21 L349.47,333.25 Z" fill="#FFFFFF"></path>
											                <g>
											                    <rect fill="#7673C0" x="176.95" y="32.39" width="130.5" height="234.51"></rect>
											                    <path d="M185.24,149.64 C185.20514,103.86954 206.225386,60.6268374 242.24,32.38 C181.092968,-15.6818249 93.2777189,-8.68578574 40.5116372,48.4512353 C-12.2544445,105.588256 -12.2544445,193.681744 40.5116372,250.818765 C93.2777189,307.955786 181.092968,314.951825 242.24,266.89 C206.228151,238.645328 185.208215,195.406951 185.24,149.64 Z" fill="#EB001B"></path>
											                    <path d="M483.5,149.64 C483.501034,206.73874 450.90156,258.826356 399.545558,283.782862 C348.189556,308.739368 287.092343,302.183759 242.2,266.9 C278.166584,238.620187 299.164715,195.398065 299.164715,149.645 C299.164715,103.891935 278.166584,60.669813 242.2,32.39 C287.090924,-2.89264477 348.185845,-9.44904288 399.541061,15.5049525 C450.896277,40.4589479 483.497206,92.543064 483.5,149.64 Z" fill="#00A1DF"></path>
											                </g>
											            </g>
											        </g>
											    </g>
											</svg>
											<svg class="mastercard-logo" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g fill-rule="nonzero">
											            <rect x="0" y="0" rx="40"></rect>
											            <g transform="translate(133.000000, 48.000000)">
											                <path d="M88.13,373.67 L88.13,348.82 C88.13,339.29 82.33,333.08 72.81,333.08 C67.81,333.08 62.46,334.74 58.73,340.08 C55.83,335.52 51.73,333.08 45.48,333.08 C40.7599149,332.876008 36.2525337,335.054575 33.48,338.88 L33.48,333.88 L25.61,333.88 L25.61,373.64 L33.48,373.64 L33.48,350.89 C33.48,343.89 37.62,340.54 43.42,340.54 C49.22,340.54 52.53,344.27 52.53,350.89 L52.53,373.67 L60.4,373.67 L60.4,350.89 C60.4,343.89 64.54,340.54 70.34,340.54 C76.14,340.54 79.45,344.27 79.45,350.89 L79.45,373.67 L88.13,373.67 Z M217.35,334.32 L202.85,334.32 L202.85,322.32 L195,322.32 L195,334.32 L186.72,334.32 L186.72,341.32 L195,341.32 L195,360 C195,369.11 198.31,374.5 208.25,374.5 C212.015784,374.421483 215.705651,373.426077 219,371.6 L216.51,364.6 C214.275685,365.996557 211.684475,366.715565 209.05,366.67 C204.91,366.67 202.84,364.18 202.84,360.04 L202.84,341 L217.34,341 L217.34,334.37 L217.35,334.32 Z M291.07,333.08 C286.709355,332.982846 282.618836,335.185726 280.3,338.88 L280.3,333.88 L272.43,333.88 L272.43,373.64 L280.3,373.64 L280.3,351.31 C280.3,344.68 283.61,340.54 289,340.54 C290.818809,340.613783 292.62352,340.892205 294.38,341.37 L296.87,333.91 C294.971013,333.43126 293.02704,333.153071 291.07,333.08 Z M179.66,337.22 C175.52,334.32 169.72,333.08 163.51,333.08 C153.57,333.08 147.36,337.64 147.36,345.51 C147.36,352.14 151.92,355.86 160.61,357.11 L164.75,357.52 C169.31,358.35 172.21,360.01 172.21,362.08 C172.21,364.98 168.9,367.08 162.68,367.08 C157.930627,367.177716 153.278889,365.724267 149.43,362.94 L145.29,369.15 C151.09,373.29 158.13,374.15 162.29,374.15 C173.89,374.15 180.1,368.77 180.1,361.31 C180.1,354.31 175.1,350.96 166.43,349.71 L162.29,349.3 C158.56,348.89 155.29,347.64 155.29,345.16 C155.29,342.26 158.6,340.16 163.16,340.16 C168.16,340.16 173.1,342.23 175.59,343.47 L179.66,337.22 Z M299.77,353.79 C299.77,365.79 307.64,374.5 320.48,374.5 C326.28,374.5 330.42,373.26 334.56,369.94 L330.42,363.73 C327.488758,366.10388 323.841703,367.41823 320.07,367.46 C313.07,367.46 307.64,362.08 307.64,354.21 C307.64,346.34 313,341 320.07,341 C323.841703,341.04177 327.488758,342.35612 330.42,344.73 L334.56,338.52 C330.42,335.21 326.28,333.96 320.48,333.96 C308.05,333.13 299.77,341.83 299.77,353.84 L299.77,353.79 Z M244.27,333.08 C232.67,333.08 224.8,341.36 224.8,353.79 C224.8,366.22 233.08,374.5 245.09,374.5 C250.932775,374.623408 256.638486,372.722682 261.24,369.12 L257.1,363.32 C253.772132,365.898743 249.708598,367.349004 245.5,367.46 C240.12,367.46 234.32,364.15 233.5,357.11 L262.91,357.11 L262.91,353.8 C262.91,341.37 255.45,333.09 244.27,333.09 L244.27,333.08 Z M243.86,340.54 C249.66,340.54 253.8,344.27 254.21,350.48 L232.68,350.48 C233.92,344.68 237.68,340.54 243.86,340.54 Z M136.59,353.79 L136.59,333.91 L128.72,333.91 L128.72,338.91 C125.82,335.18 121.72,333.11 115.88,333.11 C104.7,333.11 96.41,341.81 96.41,353.82 C96.41,365.83 104.69,374.53 115.88,374.53 C121.68,374.53 125.82,372.46 128.72,368.73 L128.72,373.73 L136.59,373.73 L136.59,353.79 Z M104.7,353.79 C104.7,346.33 109.26,340.54 117.13,340.54 C124.59,340.54 129.13,346.34 129.13,353.79 C129.13,361.66 124.13,367.04 117.13,367.04 C109.26,367.45 104.7,361.24 104.7,353.79 Z M410.78,333.08 C406.419355,332.982846 402.328836,335.185726 400.01,338.88 L400.01,333.88 L392.14,333.88 L392.14,373.64 L400,373.64 L400,351.31 C400,344.68 403.31,340.54 408.7,340.54 C410.518809,340.613783 412.32352,340.892205 414.08,341.37 L416.57,333.91 C414.671013,333.43126 412.72704,333.153071 410.77,333.08 L410.78,333.08 Z M380.13,353.79 L380.13,333.91 L372.26,333.91 L372.26,338.91 C369.36,335.18 365.26,333.11 359.42,333.11 C348.24,333.11 339.95,341.81 339.95,353.82 C339.95,365.83 348.23,374.53 359.42,374.53 C365.22,374.53 369.36,372.46 372.26,368.73 L372.26,373.73 L380.13,373.73 L380.13,353.79 Z M348.24,353.79 C348.24,346.33 352.8,340.54 360.67,340.54 C368.13,340.54 372.67,346.34 372.67,353.79 C372.67,361.66 367.67,367.04 360.67,367.04 C352.8,367.45 348.24,361.24 348.24,353.79 Z M460.07,353.79 L460.07,318.17 L452.2,318.17 L452.2,338.88 C449.3,335.15 445.2,333.08 439.36,333.08 C428.18,333.08 419.89,341.78 419.89,353.79 C419.89,365.8 428.17,374.5 439.36,374.5 C445.16,374.5 449.3,372.43 452.2,368.7 L452.2,373.7 L460.07,373.7 L460.07,353.79 Z M428.18,353.79 C428.18,346.33 432.74,340.54 440.61,340.54 C448.07,340.54 452.61,346.34 452.61,353.79 C452.61,361.66 447.61,367.04 440.61,367.04 C432.73,367.46 428.17,361.25 428.17,353.79 L428.18,353.79 Z" id="Shape" fill="#FFFFFF"></path>
											                <g>
											                    <rect id="Rectangle-path" fill="#FF5F00" x="170.55" y="32.39" width="143.72" height="234.42"></rect>
											                    <path d="M185.05,149.6 C185.05997,103.912554 205.96046,60.7376085 241.79,32.39 C180.662018,-15.6713968 92.8620037,-8.68523415 40.103462,48.4380037 C-12.6550796,105.561241 -12.6550796,193.638759 40.103462,250.761996 C92.8620037,307.885234 180.662018,314.871397 241.79,266.81 C205.96046,238.462391 185.05997,195.287446 185.05,149.6 Z" id="Shape" fill="#EB001B"></path>
											                    <path d="M483.26,149.6 C483.30134,206.646679 450.756789,258.706022 399.455617,283.656273 C348.154445,308.606523 287.109181,302.064451 242.26,266.81 C278.098424,238.46936 299.001593,195.290092 299.001593,149.6 C299.001593,103.909908 278.098424,60.7306402 242.26,32.39 C287.109181,-2.86445052 348.154445,-9.40652324 399.455617,15.5437274 C450.756789,40.493978 483.30134,92.5533211 483.26,149.6 Z" id="Shape" fill="#F79E1B"></path>
											                </g>
											            </g>
											        </g>
											    </g>
											</svg>							
											<svg class="visa-logo" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g fill-rule="nonzero">
											            <rect x="0" y="0" rx="40"></rect>
											            <polygon fill="#FFFFFF" points="278.1975 334.2275 311.5585 138.4655 364.9175 138.4655 331.5335 334.2275"></polygon>
											            <path d="M524.3075,142.6875 C513.7355,138.7215 497.1715,134.4655 476.4845,134.4655 C423.7605,134.4655 386.6205,161.0165 386.3045,199.0695 C386.0075,227.1985 412.8185,242.8905 433.0585,252.2545 C453.8275,261.8495 460.8105,267.9695 460.7115,276.5375 C460.5795,289.6595 444.1255,295.6545 428.7885,295.6545 C407.4315,295.6545 396.0855,292.6875 378.5625,285.3785 L371.6865,282.2665 L364.1975,326.0905 C376.6605,331.5545 399.7065,336.2895 423.6355,336.5345 C479.7245,336.5345 516.1365,310.2875 516.5505,269.6525 C516.7515,247.3835 502.5355,230.4355 471.7515,216.4645 C453.1005,207.4085 441.6785,201.3655 441.7995,192.1955 C441.7995,184.0585 451.4675,175.3575 472.3565,175.3575 C489.8055,175.0865 502.4445,178.8915 512.2925,182.8575 L517.0745,185.1165 L524.3075,142.6875" id="path13" fill="#FFFFFF"></path>
											            <path d="M661.6145,138.4655 L620.3835,138.4655 C607.6105,138.4655 598.0525,141.9515 592.4425,154.6995 L513.1975,334.1025 L569.2285,334.1025 C569.2285,334.1025 578.3905,309.9805 580.4625,304.6845 C586.5855,304.6845 641.0165,304.7685 648.7985,304.7685 C650.3945,311.6215 655.2905,334.1025 655.2905,334.1025 L704.8025,334.1025 L661.6145,138.4655 Z M596.1975,264.8725 C600.6105,253.5935 617.4565,210.1495 617.4565,210.1495 C617.1415,210.6705 621.8365,198.8155 624.5315,191.4655 L628.1385,208.3435 C628.1385,208.3435 638.3555,255.0725 640.4905,264.8715 L596.1975,264.8715 L596.1975,264.8725 Z" id="Path" fill="#FFFFFF"></path>
											            <path d="M232.9025,138.4655 L180.6625,271.9605 L175.0965,244.8315 C165.3715,213.5575 135.0715,179.6755 101.1975,162.7125 L148.9645,333.9155 L205.4195,333.8505 L289.4235,138.4655 L232.9025,138.4655" id="path16" fill="#FFFFFF"></path>
											            <path d="M131.9195,138.4655 L45.8785,138.4655 L45.1975,142.5385 C112.1365,158.7425 156.4295,197.9015 174.8155,244.9525 L156.1065,154.9925 C152.8765,142.5965 143.5085,138.8975 131.9195,138.4655" id="path18" fill="#F2AE14"></path>
											        </g>
											    </g>
											</svg>
											<svg class="visaelectron-logo" viewBox="0 0 256 114" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
											    <g>
											        <path d="M97.196506,1.45967206 L63.6812585,81.4179905 L41.8139653,81.4179905 L25.3195076,17.6043316 C24.3207846,13.6829954 23.4511928,12.239669 20.4076212,10.5822138 C15.4336211,7.88026765 7.2199009,5.3532206 0,3.78076314 L0.487102212,1.45967206 L35.6908618,1.45967206 C40.1712214,1.45967206 44.205343,4.44276447 45.2302192,9.6080094 L53.9457525,55.881085 L75.461613,1.45967206 L97.196506,1.45967206 Z M126.757726,1.45967206 L109.653573,81.4179905 L88.96644,81.4179905 L106.070593,1.45967206 L126.757726,1.45967206 Z M182.872555,55.312254 C182.959187,34.2132094 153.698728,33.0428564 153.889973,23.6146498 C153.96026,20.7492465 156.689994,17.6975021 162.665986,16.9178117 C165.626194,16.5353221 173.803954,16.2296572 183.067069,20.4975226 L186.690913,3.53230832 C181.713643,1.73264545 175.309393,0 167.342493,0 C146.892373,0 132.506513,10.8617255 132.392093,26.4277468 C132.258058,37.9416662 142.667007,44.3589927 150.494968,48.1936967 C158.558308,52.110129 161.261889,54.627369 161.224294,58.1269855 C161.167084,63.4916485 154.785718,65.8666805 148.852225,65.954947 C138.448179,66.120039 132.416611,63.1434845 127.606069,60.9024875 L123.851459,78.4299945 C128.691424,80.6481075 137.611278,82.575267 146.849875,82.673341 C168.589672,82.673341 182.808807,71.935843 182.872555,55.312254 L182.872555,55.312254 Z M236.873883,81.4179905 L256,81.4179905 L239.289779,1.45967206 L221.642949,1.45967206 C217.662768,1.45967206 214.318435,3.76932114 212.834245,7.3212443 L181.793738,81.4179905 L203.517189,81.4179905 L207.825918,69.474179 L234.366451,69.474179 L236.873883,81.4179905 Z M213.782296,53.0892375 L224.675078,23.0621648 L230.932217,53.0892375 L213.782296,53.0892375 Z M153.232385,103.427165 L144.82742,103.427165 L144.82742,111.250222 L154.229474,111.250222 L154.229474,113.60237 L141.994708,113.60237 L141.994708,91.898534 L153.747275,91.898534 L153.747275,94.250682 L144.82742,94.250682 L144.82742,101.107708 L153.232385,101.107708 L153.232385,103.427165 Z M158.571711,90.740604 L161.404424,90.740604 L161.404424,113.601716 L158.571711,113.601716 L158.571711,90.740604 Z M168.550278,106.324115 C168.614026,110.157184 171.029923,111.734545 173.893691,111.734545 C175.923829,111.734545 177.17918,111.379843 178.210594,110.930336 L178.725484,112.958839 C177.726761,113.408346 175.989212,113.955928 173.507933,113.955928 C168.712101,113.955928 165.846698,110.768514 165.846698,106.067487 C165.846698,101.36646 168.614026,97.695214 173.154865,97.695214 C178.274342,97.695214 179.595076,102.139613 179.595076,105.005016 C179.595076,105.583654 179.562385,106.002104 179.497002,106.324115 L168.550278,106.324115 L168.550278,106.324115 Z M176.857169,104.295612 C176.88986,102.525372 176.116708,99.7237165 172.929294,99.7237165 C170.0312,99.7237165 168.806906,102.332492 168.581335,104.295612 L176.857169,104.295612 Z M195.01137,113.054298 C194.270909,113.409 192.628165,113.956581 190.535914,113.956581 C185.834888,113.956581 182.776605,110.769168 182.776605,106.002758 C182.776605,101.205292 186.058824,97.6958675 191.147244,97.6958675 C192.821045,97.6958675 194.301966,98.1126835 195.075119,98.532768 L194.432732,100.690402 C193.754385,100.3357 192.691914,99.9483065 191.147244,99.9483065 C187.572437,99.9483065 185.642009,102.62083 185.642009,105.84257 C185.642009,109.448434 187.959831,111.669816 191.050804,111.669816 C192.660857,111.669816 193.723329,111.284058 194.527537,110.929356 L195.01137,113.054298 Z M202.959146,94.282229 L202.959146,98.0172245 L207.014517,98.0172245 L207.014517,100.173224 L202.959146,100.173224 L202.959146,108.578188 C202.959146,110.511887 203.506728,111.605414 205.084089,111.605414 C205.855606,111.605414 206.308383,111.541666 206.726833,111.4109 L206.855964,113.570169 C206.308383,113.763048 205.438791,113.955928 204.343628,113.955928 C203.022894,113.955928 201.960423,113.504786 201.285345,112.76596 C200.512193,111.894734 200.190183,110.511887 200.190183,108.676263 L200.190183,100.173224 L197.774286,100.173224 L197.774286,98.0172245 L200.190183,98.0172245 L200.190183,95.1191295 L202.959146,94.282229 Z M210.972468,102.879746 C210.972468,101.044123 210.938142,99.466762 210.843337,98.0168975 L213.322981,98.0168975 L213.452112,101.107872 L213.546918,101.107872 C214.256321,99.0156205 215.993871,97.694887 217.893242,97.694887 C218.184196,97.694887 218.409767,97.7275785 218.668029,97.758635 L218.668029,100.432794 C218.377075,100.367411 218.089391,100.367411 217.700363,100.367411 C215.706186,100.367411 214.287378,101.848332 213.901619,103.974909 C213.837871,104.360668 213.80518,104.842866 213.80518,105.295643 L213.80518,113.602534 L210.972468,113.602534 L210.972468,102.879746 Z M236.08324,105.680584 C236.08324,111.444082 232.057291,113.956418 228.322296,113.956418 C224.13616,113.956418 220.853941,110.86381 220.853941,105.938846 C220.853941,100.753987 224.297982,97.695704 228.580559,97.695704 C233.056014,97.695704 236.08324,100.946866 236.08324,105.680584 Z M223.750401,105.842407 C223.750401,109.255392 225.682464,111.831475 228.451427,111.831475 C231.156643,111.831475 233.183512,109.286449 233.183512,105.777024 C233.183512,103.137192 231.864412,99.819012 228.515176,99.819012 C225.200266,99.819012 223.750401,102.911621 223.750401,105.842407 Z M240.424989,102.234745 C240.424989,100.593636 240.390662,99.3055935 240.295858,98.017551 L242.806558,98.017551 L242.968381,100.593636 L243.032129,100.593636 C243.805282,99.143771 245.608214,97.6955405 248.184298,97.6955405 C250.340297,97.6955405 253.689534,98.983583 253.689534,104.326996 L253.689534,113.601553 L250.856822,113.601553 L250.856822,104.61795 C250.856822,102.107249 249.923482,100.013363 247.250958,100.013363 C245.415335,100.013363 243.96547,101.334096 243.452214,102.911458 C243.321449,103.26616 243.2577,103.748358 243.2577,104.232191 L243.2577,113.601553 L240.424989,113.601553 L240.424989,102.234745 Z" fill="#FFFFFF"></path>
											    </g>
											</svg>				
											<svg class="hipercard-logo" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g fill-rule="nonzero">
											            <path fill="#FFFFFF" d="M697.115385,0 L52.8846154,0 C23.7240385,0 0,23.1955749 0,51.7065868 L0,419.293413 C0,447.804425 23.7240385,471 52.8846154,471 L697.115385,471 C726.274038,471 750,447.804425 750,419.293413 L750,51.7065868 C750,23.1955749 726.274038,0 697.115385,0 Z"></path>
											            <path d="M321.004048,378.440089 L47,378.538584 L47,377.878758 C47,377.516331 47.4370157,375.164862 47.9706147,372.652739 C48.50517,370.141572 49.3352129,366.146273 49.8171733,363.775678 C50.2972211,361.404127 51.1196139,357.375359 51.6426939,354.82116 C52.1667302,352.268874 53.0378927,348.015382 53.5781857,345.370338 C54.1175223,342.726249 54.9628655,338.547347 55.4572574,336.085906 C55.9516493,333.622553 56.7749984,329.592829 57.289472,327.131388 C57.8029893,324.668991 58.6798895,320.416456 59.2373952,317.680565 C59.7939447,314.944675 60.6402442,310.765772 61.1183796,308.394221 C61.5965149,306.02267 62.3557937,302.366848 62.8061972,300.270702 C63.2556444,298.172645 63.8303631,295.337302 64.080906,293.968879 C64.3324051,292.601412 65.1461914,288.571687 65.8892137,285.015317 C66.632236,281.458947 67.4508037,277.429222 67.7109093,276.061755 C67.9700586,274.693332 68.7934076,270.663607 69.5412112,267.107237 C70.2880586,263.551823 71.1085388,259.522098 71.3648193,258.153675 C71.6210999,256.786208 72.4463614,252.756484 73.1979901,249.200113 C73.9515314,245.642786 74.7643614,241.688607 75.0034291,240.411986 C75.2444093,239.135365 75.9023235,235.852488 76.4665231,233.116597 C77.0297665,230.380707 78.0969646,225.232146 78.837118,221.675776 C79.5782278,218.118449 80.8443301,211.92564 81.6504662,207.912173 C82.4585149,203.899661 83.423392,199.125002 83.7953812,197.301394 C84.1664142,195.477786 84.8386725,192.193952 85.2890759,190.005049 C85.7394794,187.816145 86.5561345,183.861966 87.1050339,181.217878 C87.6539332,178.571877 88.5461337,174.244753 89.0883392,171.599708 C89.6315009,168.95562 90.4672814,164.851306 90.946373,162.480711 C91.4254646,160.10916 92.243076,156.154981 92.7632872,153.692584 C93.2834984,151.230187 94.1785677,146.902106 94.7523301,144.075371 C95.3260925,141.247678 96.2871444,136.920554 96.8876824,134.458157 C97.4882203,131.99576 98.3373887,129.011239 98.7753606,127.82642 C99.2123763,126.639688 100.420146,124.071145 101.458656,122.114616 L103.34729,118.560158 L105.063796,116.311009 C106.006679,115.075507 107.692584,113.121847 108.808552,111.970497 C109.92452,110.819147 111.80646,109.086385 112.993192,108.120551 C114.178012,107.153762 115.894517,105.849408 116.805843,105.222095 C117.718125,104.594781 119.50922,103.496026 120.785842,102.780736 C122.062463,102.065446 123.854514,101.129257 124.76584,100.699891 C125.678122,100.270526 127.543806,99.4854274 128.911273,98.9566097 C130.27874,98.4287484 132.890315,97.5422855 134.713923,96.9886048 C136.537531,96.4339678 139.961937,95.5981873 142.322969,95.1324835 C144.684001,94.6658234 148.413456,94.042335 150.613835,93.7468474 L154.612003,93.2094233 L428.781486,93.106146 L702.950012,93 L702.950012,93.6598267 C702.950012,94.0222533 702.510128,96.3737228 701.97366,98.8848894 C701.43528,101.396056 700.537341,105.689711 699.976967,108.425602 C699.415636,111.161492 698.598981,115.116627 698.159096,117.213729 C697.720168,119.311786 696.888213,123.340554 696.310625,126.16729 C695.733994,128.994983 694.845619,133.323064 694.337839,135.784504 C693.830059,138.246901 693.00671,142.276625 692.509449,144.738066 C692.012189,147.201419 691.184058,151.230187 690.670541,153.692584 C690.155111,156.154981 689.359494,160.035527 688.898572,162.315276 C688.437649,164.595026 687.604737,168.698383 687.047232,171.434273 C686.48877,174.170163 685.592744,178.498244 685.05532,181.051487 C684.51694,183.604729 683.699328,187.559865 683.236493,189.839614 C682.771746,192.119363 681.938834,196.22272 681.383241,198.958611 C680.826691,201.694501 679.932578,206.022582 679.395154,208.576781 C678.85773,211.130023 678.057331,215.009613 677.615534,217.198517 C677.174694,219.386464 676.343695,223.490777 675.769932,226.317513 C675.195213,229.144249 674.360389,233.248563 673.910942,235.438423 C673.461495,237.62637 672.661096,241.506916 672.131322,244.059202 C671.599636,246.613401 670.692135,251.016071 670.115504,253.842807 C669.536004,256.670499 668.70883,260.698311 668.276596,262.797325 C667.842449,264.89347 667.032487,268.848606 666.474025,271.58354 C665.91652,274.321343 665.0291,278.647511 664.501239,281.20171 C663.974334,283.754952 663.148116,287.784677 662.664243,290.156228 C662.182283,292.526823 661.341721,296.631136 660.799515,299.275225 C660.255397,301.919313 659.367978,306.247394 658.826729,308.891482 C658.28548,311.536527 657.474562,315.491662 657.024159,317.680565 C656.573756,319.868513 655.751363,323.898237 655.19577,326.634127 C654.640176,329.370018 653.735544,333.681842 653.186645,336.215003 L652.188298,340.821358 L650.998698,344.007652 C650.344609,345.760496 649.360606,348.089971 648.811707,349.184901 C648.26472,350.277919 647.148752,352.209585 646.333053,353.475688 C645.516398,354.740834 644.378436,356.361712 643.804674,357.077959 C643.230911,357.794206 641.50293,359.643633 639.963335,361.188966 L637.168156,363.995621 L634.476254,365.908162 C632.995947,366.96006 631.400888,368.030127 630.933271,368.285451 C630.464699,368.540775 628.681254,369.452101 626.969529,370.307963 C625.258761,371.165738 622.840353,372.255886 621.598157,372.731153 C620.355006,373.208332 617.892609,374.018293 616.126377,374.531811 C614.360145,375.04724 612.466729,375.554064 611.919742,375.658297 C611.371799,375.763487 609.473602,376.155558 607.698764,376.532329 C605.924882,376.908143 602.343648,377.469474 599.74068,377.779306 L595.00714,378.342549 L321.004048,378.440089 Z M223.517995,307.566091 L230.647949,307.566091 L230.848766,307.041098 C230.96065,306.752305 231.050539,306.074309 231.050539,305.534016 C231.050539,304.992767 231.285782,303.028587 231.573619,301.167684 C231.8605,299.304869 232.533715,295.021733 233.071139,291.64801 C233.607607,288.273331 234.410874,283.199359 234.856496,280.372623 C235.302118,277.544931 235.846236,273.926403 236.066178,272.330387 C236.285164,270.734371 236.551964,269.429062 236.660022,269.429062 C236.767125,269.429062 237.228047,270.133834 237.684188,270.99639 L238.512319,272.562761 L240.350271,274.416013 L242.189179,276.267353 L244.451716,277.173898 L246.715208,278.079486 L249.411891,278.429481 L252.109531,278.77852 L255.532023,278.569097 L258.955472,278.358717 L262.661977,277.399578 L266.369438,276.439482 L268.358481,275.532937 C269.453411,275.032808 271.392728,273.943616 272.669349,273.11166 L274.991174,271.599796 L277.155215,269.435756 C278.345772,268.248068 280.024983,266.339352 280.885626,265.196608 C281.748183,264.054821 282.452954,263.037349 282.452954,262.935984 C282.452954,262.833664 282.876582,262.12698 283.393924,261.363876 C283.911267,260.601728 284.968902,258.484545 285.745394,256.660937 C286.522842,254.837329 287.735393,251.554451 288.443033,249.365548 L289.728261,245.38555 L290.392869,241.93915 C290.758164,240.043822 291.22865,236.910123 291.438073,234.974631 L291.817712,231.458424 L291.59777,228.473904 L291.378784,225.489383 L290.686444,222.503906 L289.99506,219.519385 L288.874311,217.285537 L287.754518,215.050733 L285.590478,212.75664 L283.427394,210.462546 L280.867457,209.140024 L278.307521,207.817502 L275.488435,207.141418 L272.669349,206.467248 L269.850263,206.260693 L267.032134,206.054139 L263.892697,206.414653 L260.751348,206.775167 L258.189499,207.430212 L255.626694,208.083345 L253.39954,209.115161 C252.175513,209.680317 250.393025,210.643281 249.440579,211.253382 C248.487178,211.863483 247.503175,212.564429 247.254545,212.812103 C247.006871,213.059777 246.411114,213.519744 245.932979,213.831488 L245.061816,214.402381 L245.670004,211.488625 C246.005655,209.886871 246.284886,208.390308 246.292537,208.160803 L246.305924,207.746738 L240.224999,207.746738 L234.145987,207.746738 L233.080702,214.462626 C232.493551,218.1567 231.567881,223.863723 231.022807,227.147556 C230.477733,230.430433 229.654384,235.354271 229.195374,238.090161 C228.736364,240.826051 227.91684,245.676256 227.373678,248.868287 C226.831473,252.059362 225.935447,257.134291 225.381767,260.143674 C224.828086,263.153058 224.018125,267.555728 223.580153,269.927279 C223.143137,272.297874 222.318832,276.774177 221.750807,279.874406 C221.182782,282.976548 220.268588,287.900386 219.719688,290.818923 C219.170789,293.736505 218.278588,298.362942 217.736383,301.098833 C217.193221,303.834723 216.669185,306.40996 216.568777,306.819244 L216.388041,307.566091 L223.517995,307.566091 Z M254.214282,269.22442 L251.445879,269.390811 L249.636615,269.070461 L247.826395,268.751066 L245.988442,267.912417 L244.149534,267.072811 L242.866219,265.845916 L241.581947,264.620933 L240.840838,262.96276 C240.43251,262.050478 239.90943,260.501319 239.677056,259.51923 L239.254385,257.734829 L239.423645,254.876536 L239.593861,252.019199 L240.44781,247.54194 C240.917339,245.079543 241.76077,240.453106 242.322101,237.262031 C242.883432,234.069999 243.734513,229.391923 244.211692,226.868325 L245.079029,222.278226 L246.980095,220.696555 C248.026255,219.827305 249.682516,218.660654 250.661737,218.106017 L252.4404,217.096196 L254.761269,216.378036 L257.083094,215.658921 L260.067615,215.483923 L263.052136,215.308926 L265.482975,215.827225 L267.912859,216.344567 L269.628409,217.134446 L271.343002,217.924326 L272.781233,219.370207 L274.22042,220.816088 L274.994999,222.347078 C275.422452,223.189552 276.022034,224.837206 276.327084,226.009594 L276.882678,228.141121 L276.712461,234.442945 L276.542245,240.743812 L275.691164,244.468486 C275.222592,246.516818 274.331348,249.650517 273.709772,251.432049 L272.580416,254.671894 L271.195736,257.293988 C270.434545,258.737 269.261201,260.68588 268.587986,261.625894 C267.914772,262.564951 266.84088,263.784197 266.202091,264.331183 C265.565215,264.880083 264.495148,265.737857 263.826715,266.236074 L262.611295,267.143575 L259.79699,268.100802 L256.982686,269.058029 L254.214282,269.22442 Z M323.076287,278.340548 L326.724459,278.382624 L330.371675,278.049842 C332.378887,277.867194 335.661764,277.485642 337.667064,277.202586 C339.674276,276.920486 343.139801,276.287435 345.369824,275.797824 L349.423455,274.905624 L349.626184,273.410017 C349.737112,272.58858 350.192297,270.14244 350.637919,267.973618 L351.44788,264.029002 L351.268101,263.851135 L351.090235,263.673269 L349.850908,264.270938 C349.169087,264.599895 347.04521,265.38595 345.132669,266.016132 L341.653756,267.161744 L338.002715,267.870341 L334.351674,268.577025 L328.548067,268.589456 L322.744461,268.599019 L320.754461,267.964055 C319.660488,267.615017 318.051084,266.976228 317.178009,266.543037 L315.591556,265.757939 L314.281466,264.574076 L312.971375,263.390213 L311.949122,261.604856 L310.926868,259.817586 L310.286167,257.578 L309.645466,255.337458 L309.641641,251.191069 L309.636859,247.043723 L310.204884,243.345824 L310.774821,239.646013 L315.764641,239.412683 L320.754461,239.179353 L339.201878,239.298887 L357.648339,239.416508 L358.204888,237.05452 C358.511851,235.754948 358.980424,233.068784 359.246267,231.085479 L359.73014,227.478426 L359.740659,224.445135 L359.751178,221.410889 L359.226185,219.145484 L358.700236,216.881035 L357.830986,215.381602 C357.354764,214.557297 356.512289,213.361959 355.961477,212.725083 C355.410665,212.089163 354.426663,211.192181 353.775443,210.732215 C353.123266,210.272248 351.844732,209.498626 350.93245,209.013796 L349.274277,208.132115 L346.377733,207.434037 L343.480233,206.736916 L339.911431,206.395527 L336.340716,206.054139 L333.025326,206.270256 L329.70898,206.485417 L325.728981,207.249477 L321.749939,208.014494 L319.261723,209.008059 C317.894256,209.554089 315.804805,210.552436 314.619985,211.224694 C313.43421,211.896952 311.793249,212.990926 310.972769,213.655534 C310.150377,214.321098 308.729358,215.613976 307.814207,216.529127 C306.8981,217.445234 305.542108,219.088107 304.802911,220.183037 C304.062758,221.277967 302.928621,223.217284 302.281226,224.493905 C301.634787,225.771483 300.792312,227.561621 300.408848,228.473904 C300.026339,229.38523 299.329218,231.250914 298.861602,232.618381 C298.393029,233.986804 297.657657,236.598379 297.227335,238.422943 C296.796057,240.246551 296.206038,243.248285 295.914376,245.093887 L295.385558,248.450397 L295.391296,253.384753 L295.396077,258.31911 L295.900032,260.4755 C296.176394,261.660319 296.707124,263.452371 297.077201,264.454542 C297.447277,265.45767 298.13388,266.950409 298.60054,267.770889 C299.0672,268.591369 300.065546,269.912935 300.817175,270.707596 C301.568804,271.502257 302.930533,272.708114 303.842815,273.38611 C304.754141,274.065062 306.377889,275.020376 307.449868,275.508074 L309.399704,276.395494 L312.118381,277.053408 C313.613032,277.413922 315.869831,277.842331 317.133065,278.004897 C318.395342,278.166507 321.070031,278.318554 323.076287,278.340548 Z M329.32169,231.623859 C320.141492,231.623859 312.629986,231.558833 312.629986,231.47755 C312.629986,231.398179 313.022057,230.241092 313.501149,228.907094 C313.979284,227.574053 314.820802,225.590748 315.368745,224.498687 L316.368048,222.512513 L318.560777,220.331259 L320.754461,218.148093 L322.910852,217.11819 C324.095671,216.551121 325.662999,215.933371 326.391677,215.745942 C327.122268,215.558512 329.210763,215.309882 331.034371,215.194173 L334.351674,214.980925 L336.899179,215.308926 L339.444771,215.63597 L341.295155,216.483226 L343.146495,217.330482 L344.162054,218.425412 C344.71956,219.026906 345.385124,219.913369 345.640448,220.394373 L346.103283,221.270317 L346.40929,223.213459 L346.716253,225.156601 L346.365301,228.389752 L346.015306,231.623859 L329.32169,231.623859 Z M428.534768,278.342461 L432.184853,278.382624 L436.327417,277.892057 C438.60621,277.621433 441.6395,277.174854 443.069125,276.896579 C444.496837,276.620217 446.810056,276.070362 448.20908,275.676378 C449.607147,275.280482 450.872293,274.853029 451.020515,274.726801 C451.168737,274.599617 451.562721,273.094447 451.898372,271.381767 C452.233066,269.670042 452.655738,267.37308 452.836473,266.279107 C453.016252,265.184177 453.109967,264.230775 453.043984,264.159055 C452.977045,264.087334 452.733196,264.180093 452.500822,264.363697 C452.267492,264.549213 450.640876,265.233903 448.884207,265.886079 L445.691219,267.071855 L441.144152,267.95258 L436.596129,268.833305 L432.730883,268.702296 L428.864681,268.570331 L426.668127,267.808183 L424.471574,267.046036 L422.77515,265.56286 L421.078726,264.077772 L419.952239,262.027527 L418.827665,259.978239 L418.29024,257.234699 L417.754729,254.492115 L417.758554,250.934788 L417.761423,247.376505 L418.412643,243.065637 L419.06482,238.753813 L419.753335,236.431988 C420.132974,235.155366 420.562339,233.663584 420.706736,233.116597 C420.853046,232.568654 421.460278,231.002283 422.058903,229.63386 C422.656572,228.266393 423.72377,226.152079 424.429498,224.935702 L425.712813,222.725761 L427.289703,221.091494 L428.866594,219.457228 L430.535286,218.422543 L432.205891,217.386902 L434.349849,216.726119 C435.528931,216.362736 437.613601,215.891295 438.981068,215.679003 L441.468328,215.290757 L445.115544,215.474361 L448.763717,215.657008 L453.074585,216.520521 L457.386409,217.382121 L459.139253,218.03621 C460.103174,218.395767 460.934173,218.691255 460.986768,218.691255 C461.03745,218.691255 461.268868,217.459579 461.500285,215.954409 C461.731703,214.450195 462.142899,211.97441 462.41448,210.45394 C462.687017,208.931557 462.843845,207.621466 462.762562,207.542096 C462.683192,207.461769 461.387445,207.256171 459.884188,207.084998 C458.379974,206.913826 454.292873,206.609732 450.801529,206.407959 L444.452849,206.04362 L439.97559,206.386921 L435.499287,206.731178 L432.181984,207.427343 L428.866594,208.124465 L426.730285,208.978414 C425.555985,209.447943 423.835654,210.296155 422.907115,210.862267 C421.978576,211.429336 420.798538,212.190527 420.282152,212.554866 C419.765766,212.920162 418.201307,214.343093 416.80324,215.71821 L414.264341,218.217901 L412.845236,220.294921 C412.065875,221.437664 410.717533,223.818778 409.848283,225.588835 L408.268524,228.80573 L407.056929,232.286555 C406.391365,234.201965 405.460914,237.335664 404.991385,239.251074 L404.135523,242.733811 L403.824735,245.883767 L403.514903,249.034678 L403.517772,253.180112 L403.521597,257.324588 L403.834297,259.736303 L404.146998,262.148017 L405.140563,264.628584 L406.133172,267.10915 L407.281653,268.902157 L408.428221,270.695164 L410.25183,272.491041 L412.07735,274.285961 L414.006148,275.307258 L415.936858,276.326642 L418.471932,277.031414 C419.865218,277.417747 421.88008,277.862413 422.948235,278.018285 C424.016389,278.174157 426.532337,278.320466 428.540505,278.342461 L428.534768,278.342461 Z M483.084269,278.220058 L487.560572,278.090961 L490.379658,277.369933 L493.198744,276.647949 L495.023308,275.786349 C496.026436,275.312995 497.667396,274.376806 498.670524,273.706461 C499.673652,273.036115 501.227592,271.762362 502.121705,270.8759 C503.015818,269.98848 504.342165,268.47566 505.068931,267.513652 C505.795697,266.550687 506.434486,265.806709 506.488037,265.861216 C506.542544,265.914767 506.374241,267.447669 506.116047,269.268409 C505.858811,271.090104 505.644606,273.512338 505.640781,274.652212 L505.635043,276.724451 L511.72075,276.724451 L517.807412,276.724451 L517.993885,271.999518 L518.179401,267.273628 L519.047695,261.138196 C519.525831,257.763517 520.297541,252.764134 520.763245,250.0292 C521.227992,247.29331 522.036041,242.667829 522.560077,239.748334 C523.083157,236.829796 523.912244,232.278904 524.400898,229.63386 L525.292142,224.825731 L525.322743,220.672648 L525.351431,216.518608 L524.41333,214.599373 L523.473316,212.679182 L522.200519,211.457068 L520.925811,210.233998 L518.836359,209.175406 L516.744996,208.114902 L513.62851,207.421606 L510.512024,206.72831 L506.222194,206.402221 L501.931407,206.076133 L496.405119,206.418478 C493.364179,206.605907 489.087736,206.97694 486.898833,207.243739 L482.918835,207.7257 L480.206851,207.736219 L477.494868,207.746738 L477.099928,209.654498 C476.882854,210.70257 476.279448,213.193655 475.760193,215.191305 C475.239025,217.187998 474.862255,218.869121 474.921543,218.92841 C474.979876,218.987699 476.430538,218.657786 478.144175,218.196863 C479.857812,217.734984 483.499291,216.977618 486.236137,216.510958 L491.209701,215.663702 L495.686004,215.480098 L500.163263,215.294582 L503.047375,215.800449 L505.931487,216.306316 L507.855504,217.255893 L509.780477,218.206426 L510.858194,219.812961 L511.936867,221.418539 L511.921566,223.950744 L511.90531,226.483904 L511.334416,229.262827 L510.762566,232.042706 L498.830222,232.085738 L486.897877,232.127814 L482.993424,233.198837 C480.84564,233.787899 478.467395,234.570129 477.708116,234.936381 C476.948837,235.303588 476.189558,235.603857 476.020298,235.603857 C475.851995,235.603857 474.574417,236.311498 473.181131,237.178835 L470.648926,238.7519 L468.655102,240.742856 C467.557303,241.837786 466.156367,243.479702 465.540528,244.391984 C464.92469,245.30331 463.923475,247.208201 463.317199,248.625395 L462.213663,251.200631 L461.70684,254.096219 L461.200016,256.992763 L461.200016,260.030834 L461.200016,263.069862 L461.682933,265.600154 L462.167762,268.12949 L463.064744,269.779057 C463.559136,270.685602 464.466637,272.015774 465.079606,272.732977 L466.19653,274.03733 L468.178879,275.242231 L470.162184,276.447132 L472.433327,277.08879 C473.682217,277.441654 475.582326,277.870063 476.657175,278.040279 L478.609879,278.348198 L483.087138,278.220058 L483.084269,278.220058 Z M487.229703,268.946145 L484.576052,269.085761 L482.819382,268.63727 C481.853549,268.391508 480.38663,267.842609 479.560412,267.418025 L478.060024,266.646315 L477.239543,265.671875 C476.78914,265.135407 476.100625,264.083509 475.70951,263.332837 L474.999001,261.967282 L474.860342,258.780032 L474.71977,255.591826 L475.282057,253.658247 C475.590933,252.594874 476.316742,250.748315 476.89433,249.556802 L477.944315,247.388937 L479.955352,245.3932 L481.965433,243.396507 L484.099829,242.368516 L486.234225,241.341481 L488.88692,240.710343 L491.540571,240.08016 L499.831437,240.08016 L508.122303,240.08016 L508.64634,240.297234 L509.170376,240.513351 L508.729535,243.116319 C508.486642,244.5469 507.908099,247.135525 507.442395,248.868287 C506.977647,250.602006 506.157167,253.148555 505.618787,254.528453 C505.080406,255.909308 504.639566,257.129509 504.639566,257.240437 C504.639566,257.35232 504.094491,258.357361 503.427971,259.475241 L502.217332,261.509229 L500.229246,263.480102 C499.136228,264.562601 498.119712,265.449064 497.972447,265.449064 C497.826137,265.449064 497.155792,265.822966 496.483533,266.279107 L495.26142,267.107237 L492.57143,267.958318 L489.882397,268.808442 L487.229703,268.946145 Z M595.172575,278.337679 L598.32253,278.377843 L601.308007,277.893013 C602.949924,277.62717 605.038419,277.197805 605.950701,276.939612 C606.862027,276.681419 608.5049,276.012029 609.597917,275.451654 L611.588873,274.43227 L613.300597,272.925187 L615.011365,271.418105 L616.814892,269.014997 C617.806544,267.692475 618.703526,266.387165 618.809672,266.112716 L619.001883,265.614499 L618.834535,267.273628 C618.742733,268.184954 618.537135,269.677692 618.375525,270.589975 C618.214872,271.502257 617.986323,273.255101 617.865833,274.486777 L617.645891,276.724451 L624.152356,276.724451 L630.656909,276.724451 L630.656909,274.486777 L630.656909,272.248148 L631.647605,263.79089 C632.19268,259.13959 632.998816,252.947738 633.4387,250.0292 C633.878585,247.109706 634.558493,242.932715 634.949608,240.743812 C635.33881,238.554909 636.030194,234.599773 636.483466,231.955685 C636.938651,229.311597 637.759131,224.684203 638.30803,221.675776 C638.855973,218.665436 639.734786,213.890777 640.259779,211.064041 C640.783815,208.236348 641.60047,203.833678 642.071911,201.280436 C642.543353,198.727193 643.388696,194.249934 643.950027,191.332352 C644.51327,188.413814 645.331838,184.309501 645.772679,182.211443 C646.214476,180.115298 646.57499,178.285952 646.574034,178.150162 L646.574036,177.900575 L639.476593,177.900575 L632.379152,177.900575 L632.169729,179.97377 C632.054977,181.113644 631.510859,184.881351 630.962916,188.347832 C630.414016,191.8124 629.518947,197.333907 628.973873,200.616784 C628.428798,203.899661 627.904762,207.084042 627.808179,207.69223 L627.630312,208.797679 L627.070894,208.559568 C626.762975,208.428559 625.09237,207.964767 623.360564,207.529664 L620.210609,206.738828 L615.899741,206.403178 L611.587916,206.067527 L607.939744,206.407003 L604.292528,206.747435 L600.976181,207.586084 L597.659835,208.423777 L594.509879,209.960504 L591.358011,211.497231 L589.037142,213.214693 L586.716274,214.933112 L584.710974,217.083764 C583.608394,218.265715 582.016204,220.221288 581.17086,221.429058 L579.637002,223.624655 L577.833476,227.375149 C576.842779,229.438781 575.635966,232.170846 575.153049,233.447467 C574.669176,234.725045 573.818095,237.554649 573.258677,239.736859 L572.244074,243.705382 L571.743944,248.857768 L571.243815,254.008242 L571.618673,258.153675 L571.995444,262.299108 L572.438197,263.79089 C572.683958,264.612327 573.197476,266.074465 573.582853,267.040298 L574.282843,268.79888 L575.559464,270.525904 L576.837042,272.254842 L578.294398,273.448268 L579.751755,274.64265 L581.741754,275.631433 C582.836684,276.173639 584.671767,276.876498 585.821204,277.191111 C586.969685,277.505724 588.835369,277.884407 589.966638,278.030716 C591.096949,278.177982 593.438856,278.316641 595.172575,278.337679 Z M600.827003,268.930845 L598.32253,269.061854 L596.633756,268.75776 C595.704261,268.591369 594.21726,268.141922 593.327929,267.761326 L591.712788,267.069942 L590.352971,265.954931 L588.99411,264.841832 L587.984288,262.907296 L586.974467,260.972761 L586.512588,258.817327 L586.053578,256.660937 L586.092785,252.350069 L586.131036,248.039201 L586.665591,244.224637 L587.200147,240.411986 L588.031146,237.759291 C588.488243,236.300022 588.865014,234.922993 588.866926,234.699225 C588.870751,234.476414 589.320199,233.282989 589.870054,232.047487 C590.418954,230.811029 591.335061,228.905182 591.906911,227.810252 C592.47876,226.715322 593.547871,225.010291 594.281331,224.019595 C595.016703,223.028899 596.325837,221.53616 597.190306,220.702292 C598.054774,219.870337 599.428935,218.776363 600.246547,218.274321 L601.730679,217.361083 L604.338429,216.458363 L606.945223,215.555644 L612.417003,215.552775 L617.888784,215.552775 L621.038739,216.427762 C622.772458,216.90781 624.612322,217.465316 625.127752,217.666133 L626.065854,218.030472 L625.883206,218.940842 C625.782798,219.441928 625.387858,221.642306 625.007262,223.830253 C624.626666,226.019157 623.875038,230.19806 623.33857,233.116597 C622.802102,236.035135 621.977797,240.437805 621.506355,242.899246 C621.03587,245.361643 620.354049,248.495342 619.990666,249.862809 C619.62824,251.231232 619.115679,253.125604 618.852704,254.073268 C618.58973,255.020933 617.964329,256.663805 617.462287,257.721441 C616.960245,258.780032 616.081432,260.317716 615.509582,261.138196 C614.937732,261.958676 613.971899,263.096638 613.361798,263.664663 C612.750741,264.2346 611.431088,265.244422 610.42796,265.910942 L608.604352,267.123494 L605.967914,267.96023 L603.331476,268.796967 L600.827003,268.930845 Z M112.760819,276.724451 L120.817399,276.724451 L121.395942,273.16043 C121.713424,271.199119 122.335,267.430456 122.775841,264.786368 C123.216682,262.14228 124.038118,257.21653 124.599449,253.842807 C125.161736,250.468128 126.005167,245.468745 126.472783,242.733811 C126.940399,239.997921 127.684378,235.753992 128.124262,233.30307 C128.565103,230.850236 129.009769,228.761741 129.111134,228.65942 L129.297607,228.473904 L150.96383,228.473904 L172.629097,228.473904 L172.870078,228.713928 L173.111058,228.954908 L172.734287,230.869362 C172.528689,231.923172 171.917632,235.171623 171.377339,238.090161 C170.837046,241.008699 169.928589,245.933493 169.357696,249.034678 C168.788715,252.134908 167.964409,256.537578 167.527394,258.817327 C167.089422,261.097076 166.203915,265.871735 165.559389,269.429062 C164.915819,272.985433 164.38987,276.081837 164.391782,276.310385 L164.395607,276.724451 L172.485657,276.724451 L180.576663,276.724451 L180.934308,274.652212 C181.132256,273.512338 181.447825,271.460181 181.639079,270.092714 C181.828421,268.724291 182.288387,265.813403 182.658464,263.625456 C183.028541,261.437508 183.767738,257.108471 184.302293,254.008242 C184.835892,250.908013 185.730961,245.610273 186.289423,242.235594 C186.847885,238.860915 187.676016,233.937078 188.131201,231.292989 C188.584473,228.646989 189.394434,224.170686 189.928989,221.34395 C190.463545,218.516258 191.354789,213.741598 191.909426,210.731258 C192.464063,207.722831 193.293149,203.170983 193.754072,200.616784 C194.214994,198.063541 195.0546,193.437104 195.620712,190.336875 C196.186824,187.236645 196.901159,183.618117 197.208121,182.294639 L197.766583,179.890574 L189.575169,179.890574 L181.382799,179.890574 L181.159988,181.466508 C181.038541,182.331933 180.642645,184.757992 180.281175,186.855093 C179.918748,188.953151 179.262747,192.682607 178.82095,195.145003 C178.379153,197.608357 177.57206,202.308427 177.026986,205.59226 C176.481912,208.874181 175.787659,213.220431 175.483565,215.249637 L174.930841,218.937973 L162.905738,219.181822 L150.879678,219.424715 L140.808236,219.185647 C135.26856,219.054638 130.705237,218.919804 130.666986,218.889203 C130.629692,218.85669 130.818077,217.568593 131.085833,216.025173 C131.354545,214.481752 131.861368,211.800369 132.213276,210.068563 C132.565183,208.3358 133.23266,204.903745 133.695495,202.440392 C134.159286,199.978951 134.683323,196.919842 134.862145,195.64322 C135.040012,194.366599 135.413913,192.239853 135.692188,190.916375 C135.970463,189.594809 136.498324,186.809192 136.865532,184.727391 C137.231784,182.64559 137.622899,180.705317 137.734782,180.416523 L137.935599,179.890574 L129.810168,179.890574 L121.68378,179.890574 L121.164525,182.792856 C120.877644,184.388871 120.496092,186.663839 120.316313,187.849615 C120.135578,189.03539 119.530258,192.840391 118.97084,196.305916 C118.411422,199.771441 117.585204,204.920002 117.1348,207.746738 C116.684397,210.57443 115.865829,215.722991 115.315017,219.18756 C114.762293,222.654041 113.85288,228.025413 113.291549,231.125642 C112.731174,234.227784 111.9193,238.629498 111.487066,240.909247 C111.055788,243.188996 110.234352,247.517077 109.660589,250.526461 C109.087783,253.5368 108.249134,257.789336 107.800643,259.978239 C107.351196,262.166187 106.854891,264.703173 106.698063,265.614499 C106.539322,266.526781 106.026761,269.157481 105.556276,271.460181 C105.086747,273.762881 104.702326,275.88867 104.702326,276.18607 L104.702326,276.724451 L112.760819,276.724451 Z M201.95983,276.724451 L209.092653,276.724451 L209.29347,276.200414 C209.405353,275.910664 209.495243,275.154254 209.495243,274.519291 C209.495243,273.882414 209.94469,270.573718 210.491677,267.166526 C211.040576,263.759334 211.946164,258.212008 212.505583,254.837329 C213.064045,251.463606 213.889306,246.538812 214.33971,243.893767 C214.790113,241.249679 215.589555,236.847965 216.117417,234.110163 C216.645278,231.375229 217.456196,227.121737 217.919031,224.660296 C218.380909,222.197899 219.291279,217.51313 219.940587,214.249378 C220.589895,210.985626 221.201908,208.185666 221.300404,208.025969 L221.481139,207.734306 L214.267989,207.823239 L207.05484,207.912173 L206.45239,212.223997 C206.123433,214.595548 205.400492,219.296574 204.847767,222.669341 C204.295999,226.04402 203.460219,231.193537 202.99069,234.110163 C202.521161,237.029657 201.704506,241.729727 201.173776,244.557419 C200.643046,247.384155 199.830215,251.71128 199.366424,254.173677 C198.903589,256.63703 198.07259,260.964154 197.519866,263.79089 C196.967141,266.618583 196.226032,270.348994 195.872211,272.081757 C195.517435,273.815475 195.137796,275.568319 195.026868,275.97856 L194.827008,276.724451 L201.95983,276.724451 Z M368.790804,276.724451 L375.871032,276.724451 L376.083324,273.728455 C376.200945,272.081757 376.600666,268.760629 376.973612,266.349871 C377.346557,263.939112 378.110617,259.13194 378.670036,255.667371 C379.23041,252.20089 380.270833,246.432666 380.982298,242.847607 C381.695676,239.263505 382.4999,235.700441 382.771481,234.930643 C383.044018,234.159889 383.265872,233.326021 383.265872,233.076434 C383.265872,232.825891 383.798515,231.464162 384.448779,230.049838 C385.099043,228.635513 386.311594,226.470517 387.14355,225.237884 L388.655414,222.996385 L390.677926,221.122095 L392.701395,219.249717 L395.196305,218.058204 L397.691215,216.865734 L401.505778,216.886772 L405.318429,216.906854 L407.193676,217.466272 C408.224536,217.774192 409.1569,218.026647 409.265915,218.026647 C409.374929,218.026647 409.463863,217.674739 409.463863,217.243461 C409.463863,216.81314 409.836808,214.629017 410.292949,212.389432 C410.748134,210.150802 411.122036,208.224873 411.122036,208.109164 C411.122036,207.993456 410.040494,207.569828 408.717971,207.168194 C407.395449,206.76656 405.56706,206.345801 404.655734,206.232005 L402.997561,206.027363 L400.842127,206.408915 C399.656351,206.618338 397.893944,207.081173 396.925242,207.437862 C395.955584,207.793595 394.355743,208.600687 393.368872,209.231826 C392.382957,209.863921 390.848142,211.093685 389.959767,211.964847 C389.069479,212.836966 387.573872,214.595548 386.63577,215.872169 C385.696712,217.148791 384.715579,218.492351 384.454517,218.85669 L383.980207,219.519385 L384.268044,218.193994 C384.426785,217.463404 384.868582,215.075596 385.249178,212.887649 C385.629773,210.698745 386.022801,208.645632 386.118428,208.32815 L386.295338,207.746738 L379.972476,207.746738 L373.648659,207.746738 L373.648659,208.54618 C373.648659,208.986064 373.274757,211.633978 372.819572,214.432026 C372.363431,217.23103 371.610846,221.907193 371.148011,224.825731 C370.685176,227.744269 369.862783,232.818241 369.321534,236.101118 C368.780285,239.383995 367.957892,244.085022 367.494101,246.546462 C367.03031,249.008859 366.207917,253.33694 365.664755,256.164632 C365.123506,258.990412 364.221743,263.617805 363.664237,266.444541 C363.105775,269.272234 362.437342,272.609618 362.180105,273.864245 C361.920956,275.11696 361.710576,276.273091 361.710576,276.432788 L361.710576,276.724451 L368.790804,276.724451 Z M536.863973,276.724451 L544.102942,276.724451 L544.102942,274.509728 L544.102942,272.293093 L544.93681,266.798362 C545.396776,263.777503 546.153186,258.990412 546.619846,256.164632 C547.086506,253.33694 547.666963,249.755706 547.910812,248.204635 C548.155617,246.654521 548.802056,243.297055 549.348086,240.743812 C549.896029,238.189613 550.57785,235.429816 550.865688,234.60838 C551.153525,233.787899 551.39068,232.9263 551.393549,232.694882 C551.397374,232.463465 552.014169,230.973595 552.764841,229.384273 L554.131352,226.493467 L555.934878,224.098009 L557.737449,221.703508 L559.710235,220.220332 C560.794646,219.403677 562.53984,218.322135 563.587912,217.814355 L565.492803,216.891554 L569.63728,216.920242 L573.782713,216.949886 L575.415067,217.472966 L577.046465,217.997003 L577.321871,217.826786 L577.596321,217.65657 L577.611621,216.598935 C577.618315,216.016566 577.973091,213.851569 578.399588,211.786025 L579.175123,208.031706 L578.303005,207.690318 C577.823913,207.502889 576.685951,207.114643 575.773669,206.827762 L574.115496,206.304682 L571.130975,206.313288 L568.146454,206.319982 L565.713702,207.1768 L563.280949,208.031706 L561.454472,209.13333 L559.628952,210.234954 L557.253576,212.722214 L554.879156,215.208517 L553.603491,217.138272 C552.902544,218.199732 552.284793,219.020212 552.231242,218.96188 C552.177691,218.904503 552.559243,216.692649 553.078498,214.048561 C553.597753,211.403517 554.029987,208.903825 554.037637,208.493585 L554.051982,207.746738 L547.916549,207.746738 L541.782073,207.746738 L541.782073,207.95903 C541.782073,208.074739 541.476067,210.201484 541.102165,212.683963 C540.728263,215.167398 539.976634,219.95927 539.434429,223.333949 C538.890311,226.707672 537.999066,232.154589 537.45208,235.438423 C536.906049,238.7213 536.081744,243.422326 535.620821,245.884723 C535.160855,248.346164 534.343244,252.674244 533.803907,255.50098 C533.264571,258.328673 532.379064,262.880521 531.835902,265.616411 C531.292741,268.351345 530.571713,271.970829 530.236062,273.657691 L529.624048,276.724451 L536.863973,276.724451 Z M215.986408,195.801961 L217.998401,195.808655 L219.599198,195.263581 L221.200951,194.718507 L222.617188,193.281232 L224.034381,191.844913 L224.779316,189.929503 L225.526164,188.01505 L225.551983,185.195964 L225.578758,182.378791 L224.916063,181.277167 L224.252411,180.176499 L223.098192,179.462165 L221.943018,178.746875 L219.45002,178.746875 L216.957022,178.746875 L215.259642,179.50711 L213.562262,180.266389 L212.577303,181.322111 L211.592344,182.378791 L210.817765,184.202399 L210.044142,186.026007 L209.897833,188.867087 L209.75248,191.708167 L210.471595,193.120578 L211.192623,194.532034 L212.583041,195.163173 L213.972502,195.793355 L215.986408,195.801961 Z"  fill="#B3131B"></path>
											        </g>
											    </g>
											</svg>
											<svg class="elo-logo" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g fill-rule="nonzero">
											            <path d="M40,0 L710,0 C732.1,0 750,17.9 750,40 L750,431 C750,453.1 732.1,471 710,471 L40,471 C17.9,471 0,453.1 0,431 L0,40 C0,17.9 17.9,0 40,0 Z"></path>
											            <path d="M150.7,170.6 C157.5,168.3 164.8,167.1 172.4,167.1 C205.6,167.1 233.3,190.7 239.6,222 L286.6,212.4 C275.8,159.2 228.8,119.1 172.4,119.1 C159.5,119.1 147.1,121.2 135.5,125.1 L150.7,170.6 Z" id="Shape" fill="#FFF100"></path>
											            <path d="M95.2,323 L127,287 C112.8,274.4 103.9,256.1 103.9,235.6 C103.9,215.2 112.8,196.8 127,184.3 L95.2,148.4 C71.1,169.8 55.9,200.9 55.9,235.7 C55.9,270.4 71.1,301.6 95.2,323 Z" id="Shape" fill="#00A3DF"></path>
											            <path d="M239.6,249.4 C233.2,280.7 205.6,304.2 172.4,304.2 C164.8,304.2 157.5,303 150.6,300.7 L135.4,346.2 C147,350.1 159.5,352.2 172.4,352.2 C228.8,352.2 275.8,312.2 286.6,259 L239.6,249.4 Z" id="Shape" fill="#EE4023"></path>
											            <g transform="translate(342.000000, 148.000000)" fill="#FFFFFF">
											                <path d="M101.2,133.6 C93.4,141.2 82.9,145.8 71.3,145.6 C63.3,145.5 55.9,143.1 49.7,139.1 L34.1,163.9 C44.8,170.6 57.3,174.6 70.9,174.8 C90.6,175.1 108.6,167.3 121.7,154.6 L101.2,133.6 Z M73,32.5 C33.8,31.9 1.4,63.3 0.8,102.5 C0.6,117.2 4.8,131 12.3,142.4 L141.1,87.3 C133.9,56.4 106.3,33.1 73,32.5 Z M30.3,108.1 C30.1,106.5 30,104.8 30,103.1 C30.4,80 49.4,61.5 72.5,61.9 C85.1,62.1 96.3,67.8 103.8,76.8 L30.3,108.1 Z M181.6,0.5 L181.6,137.8 L205.4,147.7 L194.1,174.8 L170.5,165 C165.2,162.7 161.6,159.2 158.9,155.2 C156.3,151.2 154.3,145.6 154.3,138.2 L154.3,0.5 L181.6,0.5 Z" id="Shape"></path>
											                <path d="M267.5,64 C271.7,62.6 276.1,61.9 280.8,61.9 C301.1,61.9 317.9,76.3 321.8,95.4 L350.5,89.5 C343.9,57 315.2,32.6 280.8,32.6 C272.9,32.6 265.3,33.9 258.3,36.2 L267.5,64 Z M233.6,156.9 L253,135 C244.3,127.3 238.9,116.1 238.9,103.6 C238.9,91.1 244.4,79.9 253,72.3 L233.6,50.4 C218.9,63.4 209.6,82.5 209.6,103.7 C209.6,124.9 218.9,143.9 233.6,156.9 Z M321.8,112.1 C317.9,131.2 301,145.6 280.8,145.6 C276.2,145.6 271.7,144.8 267.5,143.4 L258.2,171.2 C265.3,173.6 272.9,174.9 280.8,174.9 C315.2,174.9 343.9,150.5 350.5,118 L321.8,112.1 Z"></path>
											            </g>
											        </g>
											    </g>
											</svg>
										</div>
									</div>
								</div>
								<div class="back-card">
									<div class="content-card-cred">
										<span class="card-bar"></span>
										<span class="card-cvv">•••</span>
										<span class="card-chip"></span>
									</div>
								</div>
							</div>
						</div>
						<div class="form">
							<div class="form-group">
								<div class="row">
									<div class="col-8">
										<label for="number-card">Número do Cartão</label>
										<input type="tel" name="number-card" class="form-control" placeholder="•••• •••• •••• ••••" maxlength="23">
									</div>
									<div class="col-4">
										<label for="expiry-date-card">Validade</label>
										<input type="tel" name="expiry-date-card" class="form-control" placeholder="mm/aa" maxlength="5">
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="name-card">Nome do Titular</label>
								<input type="tel" name="name-card" class="form-control">
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-6">
										<label for="cod-seg-card">Cód. de segurança</label>
										<input type="tel" name="cod-seg-card" class="form-control" maxlength="4">
									</div>
									<div class="col-6">
										<label for="number-par">Parcelas</label>
										<div class="custom-select">
											<span class="label-select">Parcelas</span>
											<select name="number-par">
												<option value="">Parcelas</option>
												<option value="x1">1x de R$ 200,00 sem juros</option>
												<option value="x2">2x de R$ 100,00 sem juros</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<footer class="footer-info footer-finalizar-compra"></footer>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de pagamento aprovado.
		* @method helperViewPagamentoAprovado
		*/
		helperViewPagamentoAprovado: function(){
			var $content = `
				<div class="main" id="main-payment-sucesses">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">COMPRA APROVADA</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<div class="txt-sucesses">
							<svg width="45" height="45" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64">
							  <g>
							    <g fill="#999">
							      <path d="M32,0C14.355,0,0,14.355,0,32s14.355,32,32,32s32-14.355,32-32S49.645,0,32,0z M32,60    C16.561,60,4,47.439,4,32S16.561,4,32,4s28,12.561,28,28S47.439,60,32,60z"/>
							      <circle cx="20.518" cy="21.361" r="4.338"/>
							      <circle cx="43.48" cy="21.361" r="4.338"/>
							      <path d="m52.541,36.568c-1.053-0.316-2.172,0.287-2.488,1.344-0.035,0.119-3.739,11.947-18.053,11.947-14.219,0-17.904-11.467-18.055-11.955-0.32-1.055-1.441-1.65-2.486-1.336-1.059,0.317-1.66,1.432-1.344,2.489 0.045,0.148 4.627,14.802 21.885,14.802s21.84-14.654 21.885-14.803c0.316-1.056-0.285-2.171-1.344-2.488z"/>
							    </g>
							  </g>
							</svg>
							<h3>Compra aprovada!</h3>
							<p class="txt-light">Sua compra foi realizada com sucesso. 
								Verifique sua conta de e-mail: <a href="mailto:braz@gmail.com" class="link">braz@gmail.com</a>.</p>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de pagamento recusado.
		* @method helperViewPagamentoRecusado
		*/
		helperViewPagamentoRecusado: function(){
			var $content = `
				<div class="main" id="main-payment-error">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">COMPRA RECUSADA</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<div class="txt-error">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45" height="45" viewBox="0 0 16 16">
								<path fill="#999" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
								<path fill="#999" d="M7 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path>
								<path fill="#999" d="M11 6c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z"></path>
								<path fill="#999" d="M11.3 12.3c-0.7-1.1-2-1.8-3.3-1.8s-2.6 0.7-3.3 1.8l-0.8-0.6c0.9-1.4 2.4-2.2 4.1-2.2s3.2 0.8 4.1 2.2l-0.8 0.6z"></path>
							</svg>
							<h3>Compra não aprovada!</h3>					
							<p class="txt-light">Ops! Sua compra não foi aprovada. Tente com um outro cartão.</p>
							<a href="#" class="btn btn-go-car link-go-car" data-show="show-form-payment">Voltar</a>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de menu carrinho.
		* @method helperViewMenuUser
		*/
		helperViewMenuUser: function(){
			var $content = `
				<div class="main" id="main-menu-user">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">Minha Conta</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<ul class="menu-carrinho">
							<li class="user">
								<svg class="user-logged" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 55 55" style="enable-background:new 0 0 55 55;" xml:space="preserve" width="50" height="50">
									<path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752  c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348  c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98  c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033  c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55  c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287  c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104  c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1  c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764  l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5  c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957  c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545  c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.52,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8  s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.346-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545  c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313  c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z" fill="#999999"/>
								</svg>
								<div class="info-user">
									<span class="name-user">Braz Leonardo</span>
									<span class="email">braz@gmail.com</span>
								</div>
							</li>
							<li><a href="#" class="link-go-car" data-show="show-datas-user">Dados Pessoas</a></li>
							<li><a href="#" class="link-go-car" data-show="show-my-order">Meus Pedidos</a></li>
							<li><a href="#" class="link-go-car" data-show="show-card-saved">Cartões Salvos</a></li>
							<li><a href="#" class="link-logout">Sair da Conta</a></li>
						</ul>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de atualização do dados do usuário.
		* @method helperViewUpdadeteDadosUser
		*/
		helperViewUpdadeteDadosUser: function(){
			var $content = `
				<div class="main" id="main-datas-user">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">Dados Pessoas</h3>
							</div>
						</div>
					</header>
					<div class="content">
						<p class="txt-center">Informações necessárias sobre você.</p>
						<div class="form">
							<div class="row">
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="nome" class="form-control custom-field valida valida-empty">
										<label for="nome">Nome</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="sobrenome" class="form-control custom-field valida valida-empty">
										<label for="sobrenome">Sobrenome</label>
									</div>
								</div>	
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="email" name="email-cad" class="form-control custom-field valida valida-email">
										<label for="email-cad">E-mail</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="text" name="cpf-cad" class="form-control custom-field valida valida-cpf mask-car-cpf" maxlength="14">
										<label for="cpf-cad">CPF</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="datanascimento-cad" class="form-control custom-field valida valida-data mask-car-data" maxlength="10">
										<label for="datanascimento-cad">Nascimento</label>
									</div>
								</div>
								<div class="col">
									<div class="form-group custom-material">
										<input type="text" name="tel-cad" class="form-control custom-field mask-tel-cel valida valida-fone mask-car-fone" maxlength="15">
										<label for="tel-cad">Telefone</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="password" name="senha-cad" class="form-control custom-field valida valida-senha valida-texto-igual" autocomplete="off new-password">
										<label for="senha-cad">Senha</label>
									</div>
								</div>
								<div class="col-12">
									<div class="form-group custom-material">
										<input type="password" name="confirme-senha-cad" class="form-control custom-field valida valida-senha valida-texto-igual" autocomplete="off new-password">
										<label for="confirme-senha-cad">Confirme sua senha</label>
									</div>
								</div>
								<div class="col-12">	
									<div class="form-group">
										<button class="btn btn-default btn-full disabled">Cadastrar</button>
									</div>
								</div>				
							</div>
						</div>
					</div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de meus pedidos.
		* @method helperViewMeusPedidos
		*/
		helperViewMeusPedidos: function(){
			var $content = `
				<div class="main" id="main-my-order">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">Meus Pedidos</h3>
							</div>
						</div>
					</header>
					<div class="content"></div>
				</div>`;

			return $content;
		},

		/**
		* Função que monta o html da tela de cartões cadastrados.
		* @method helperViewCartoesSalvos
		*/
		helperViewCartoesSalvos: function(){
			var $content = `
				<div class="main" id="main-card-saved">
					<header class="header-carrinho">
						<div class="row">
							<div class="col-2">
								<a href="#" class="close-carrinho">&times;</a>
							</div>
							<div class="col">
								<h3 class="subtitle text-center">Cartões Salvos</h3>
							</div>
						</div>
					</header>
					<div class="content"></div>
				</div>`;

			return $content;
		},

		/**
		* Função que verifica se o usuário está logado.
		* @method helperVerifyUserLogged
		*/
		helperVerifyUserLogged: function(){
			var $userLogged = Init.helperGetLocalStorage("user_logged");

			//Se o usuário estiver logado.
			if($userLogged){
				console.log("usuário logado");

				var $button_user = `
					<svg class="open-data-user link-go-car" data-show="show-menu-user" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="16" height="16">
						<g>
							<path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40    c59.551,0,108,48.448,108,108S315.551,256,256,256z" fill="#69b38e"/>
						</g>
					</svg>`;

				//Inseri as telas quando o usuário está logado.
				$(".session-carrinho .dynamic-session").html(
					Init.helperViewFormasPagmento() +
					Init.helperViewPagamentoAprovado() +
					Init.helperViewPagamentoRecusado() +
					Init.helperViewMenuUser() +
					Init.helperViewUpdadeteDadosUser()+
					Init.helperViewMeusPedidos() +
					Init.helperViewCartoesSalvos()
				);

				Init.helperLoaderCarrinho();
				Init.customSelectField();
				Init.helperHabilitaButton();

				$("html").attr("user-logged", "true");
				$(".session-carrinho .header-carrinho").append($button_user);
			}
			//Se o usuário não estiver logado.
			else {
				//Inseri as telas quando o usuário não está logado.
				$(".session-carrinho .dynamic-session").html(
					Init.helperViewLogin() +
					Init.helperViewEsqueciSenha() + 
					Init.helperViewCadastroUser()
				);

				Init.customSelectField();
				Init.helperHabilitaButton();

				$("html").removeAttr("user-logged");
				$(".session-carrinho .header-carrinho .open-data-user").remove();
			}
		},

		/**
		* Função que faz o logout no usuário.
		* @method helperLogout
		*/
		helperLogout: function(){
			$(".session-carrinho").on("click", ".link-logout", function($event){
				$event.preventDefault();
				var $element = $(this);

				Init.helperRemoveLocalStorage("user_logged");
				$element.closest(".main").addClass("loading");
				$element.closest(".main").append(Init.helperSVGLoading());
				Init.$functionTimeOut = setTimeout(function(){
					Init.helperVerifyUserLogged();
					$(".loader-svg").remove();						
					$(".session-carrinho").attr("data-show", "show-carrinho");
					$element.closest(".main").removeClass("loading");
				}, 3000);
			});
		},

		/**
		* Função que retorna uma bandeira válida.
		* @method helperValidaBandeiraCartao
		*/
		helperValidaBandeiraCartao: function($number){
			var $cartoes = {
				'amex': /^3[47]/,
				'hipercard': /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
				'maestro': /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
				'mastercard': /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
				'visaelectron': /^4(026|17500|405|508|844|91[37])/,
				'elo': /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
				'visa': /^4/
		    };
		    for (var $cartao in $cartoes) {
		      if ($number.match($cartoes[$cartao])) {
		        return $cartao;
		      }
		    }
		    return false;
		},

		helperCarrinhoMaskInputs: function(){
			//Input mask CPF
			$("body").on("keyup", ".mask-car-cpf", function(){
				$(this).val(function (index, value) {
			        return value
			        		.replace(/\D/g,"")
							.replace(/(\d{3})(\d)/,"$1.$2")
							.replace(/(\d{3})(\d)/,"$1.$2")
							.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
			    });
			});
			//Input mask data
			$("body").on("keyup", ".mask-car-data", function(){
				$(this).val(function (index, value) {
			        return value
			        		.replace(/\D/g,"")
							.replace(/(\d{2})(\d)/,"$1/$2")
							.replace(/(\d{2})(\d)/,"$1/$2")
			    });
			});
			//Input mask data
			$("body").on("keyup", ".mask-car-fone", function(){				
			    var tel = $(this).val();

			    tel = tel.replace(/\D/g,"")
				tel = tel.replace(/^(\d)/,"($1")
				tel= tel.replace(/(.{3})(\d)/,"$1) $2")

				if(tel.length == 9) {
					tel = tel.replace(/(.{1})$/,"-$1")
				} 
				else if (tel.length == 10) {
					tel = tel.replace(/(.{2})$/,"-$1")
				} 
				else if (tel.length == 11) {
					tel = tel.replace(/(.{3})$/,"-$1")
				} 
				else if (tel.length == 12) {
					tel = tel.replace(/(.{4})$/,"-$1")
				} 
				else if (tel.length > 12) {
					tel = tel.replace(/(.{4})$/,"-$1")
				}
				
				$(this).val(tel);
			});
		},

		/**
		* Função que monta o cartão de crédito.
		* @method helperMontaCartao
		*/
		helperMontaCartao: function(){
			//Monta o número do cartão de credito
			$("body").on("keyup", "#main-form-payment input[name='number-card']", function(){

				var $flag = Init.helperValidaBandeiraCartao(this.value.replace(/\D/g, ''));

				$(this).val(function (index, value) {
			        return value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
			    });

				if( $(this).val() != "" || $(this).val() != null ){
					$("#main-form-payment .card-cred .card-numbrer").html($(this).val());
					$("#main-form-payment .card-cred .card-numbrer").addClass("fhs");
				}
				if( $(this).val() == "" || $(this).val() == null ) {
					$("#main-form-payment .card-cred .card-numbrer").html("•••• •••• •••• ••••");
					$("#main-form-payment .card-cred .card-numbrer").removeClass("fhs");
				}

				if( $flag ){
					$("#main-form-payment .card-cred .card").attr("data-flag", $flag);
				}
				else {
					$("#main-form-payment .card-cred .card").attr("data-flag", "false");
				}

			});
			//Monta a data de expiração cartão de credito
			$("body").on("keyup", "#main-form-payment input[name='expiry-date-card']", function(){

				$(this).val(this.value.replace(/\D/g, ''));
			    $(this).val($(this).val().replace(/(\d{2})(\d{2})+$/, "$1/$2"));

				if( $(this).val() != "" || $(this).val() != null ){
					$("#main-form-payment .card-cred .card-expiry").html($(this).val());
					$("#main-form-payment .card-cred .card-expiry").addClass("fhs");
				}
				if( $(this).val() == "" || $(this).val() == null ) {
					$("#main-form-payment .card-cred .card-expiry").html("••/••");
					$("#main-form-payment .card-cred .card-expiry").removeClass("fhs");
				}

			});
			//Monta o nome do dono do cartão de credito
			$("body").on("keyup", "#main-form-payment input[name='name-card']", function(){
				if( $(this).val() != "" || $(this).val() != null ){
					$("#main-form-payment .card-cred .card-name").html($(this).val());
					$("#main-form-payment .card-cred .card-name").addClass("fhs");
				}
				if( $(this).val() == "" || $(this).val() == null ) {
					$("#main-form-payment .card-cred .card-name").html("NOME COMPLETO");
					$("#main-form-payment .card-cred .card-name").addClass("fhs");
				}

			});
			//Monta o CVV do cartão de credito
			$("body").on("keyup", "#main-form-payment input[name='cod-seg-card']", function(){

				$(this).val(this.value.replace(/\D/g, ''));
			    $(this).val($(this).val().replace(/^(\d{4})+$/, "$1"));

				if( $(this).val() != "" || $(this).val() != null ){
					$("#main-form-payment .card-cred .card-cvv").html($(this).val());
					$("#main-form-payment .card-cred .card-cvv").addClass("fhs");
				}
				if( $(this).val() == "" || $(this).val() == null ) {
					$("#main-form-payment .card-cred .card-cvv").html("•••");
					$("#main-form-payment .card-cred .card-cvv").addClass("fhs");
				}

			});
			//Monta exibe o outro lado do cartão
			$("body").on("focus", "#main-form-payment input[name='cod-seg-card']", function(){
				$("#main-form-payment .card-cred .card").addClass("card-flip");
			});
			$("body").on("blur", "#main-form-payment input[name='cod-seg-card']", function(){
				$("#main-form-payment .card-cred .card").removeClass("card-flip");
			});
		},

		/**
		* Função que finalizar o pagamento.
		* @method helperFinalizarPagamento
		*/
		helperFinalizarPagamento: function(){
			$(".session-carrinho").on("click", ".btn-finalizar", function($event){
				$event.preventDefault();

				var $element = $(this);

				$element.closest(".main").addClass("loading");
				$element.closest(".main").append(Init.helperSVGLoading());
				setTimeout(function(){
					$(".session-carrinho").attr("data-show", "show-payment-sucesses");
					$(".loader-svg").remove();
					$element.closest(".main").removeClass("loading");
				}, 3000);

			});
		},

		/**
		* Função que navega pelas telas do carrinho.
		* @method helperNavegaCarrinho
		*/
		helperNavegaCarrinho: function(){
			$(".session-carrinho").on("click", ".link-go-car", function($event){
				$event.preventDefault();
				var $link = $(this).attr("data-show");
				$(".session-carrinho").attr("data-show", $link);
			});
		},

		/**
		* Função que exibe o cadastro de usuários.
		* @method helperExibeCadastro
		*/
		helperExibeCadastro: function(){
			$("body").on("click", ".btn-cadastro", function($event){
				$event.preventDefault();
				$(".session-carrinho").attr("data-show", "show-cadastro");
			});
		},

		/**
		* Função que exibe o área para pedir nova senha.
		* @method helperEsqueciSenha
		*/
		helperEsqueciSenha: function(){
			$("body").on("click", ".btn-esq-senha", function($event){
				$event.preventDefault();
				$(".session-carrinho").attr("data-show", "show-esq-senha");
			});
		},

		/**
		* Função que exibe o login.
		* @method helperExibeLogin
		*/
		helperExibeLogin: function(){
			$("body").on("click", ".btn-login", function($event){
				$event.preventDefault();
				$(".session-carrinho").attr("data-show", "show-login");
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