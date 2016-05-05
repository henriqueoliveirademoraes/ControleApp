   
  var codi_pes = 0;
  
  function login(){
               
                var pessoal = 0;
              
                    var login = Login.value;
                    var senha = Senha.value;
                    
                    if ((login !== "")&&(senha !=="")){

                        $.getJSON("http://henriquemoraes.ddns.net:90/WebService.asmx/Login?usuario="+login+"&senha="+senha+"", function(dados){
                            if (dados !== "SEM_VALOR") 
                            {
                                $.each(dados,function(i,dados){

                                    codi_pes = JSON.parse(dados.CODI_PES);
                                    pessoal =  JSON.parse(dados.CODI_PES);
                                    $.mobile.loading( "hide" );
                                    location.href="#opcoes";
                                });

                            }else{
                               swal("login ou senha invalido!");
                               $.mobile.loading( "hide" );
                            }
                        });
                    }else{
                        swal("Informe usuário e senha!");
                        $.mobile.loading( "hide" );
                    }
            }

             function busca_agendamentos(){
                var list = $("#AgendamentosList").listview();
                $('#AgendamentosList').empty();
                
                $.getJSON("http://henriquemoraes.ddns.net:90/WebService.asmx/AgendamentosUsuario?cod_pessoal="+sessionStorage.getItem("codigo_pessoal")+"", function(dados_pessoal)
                          
                {
                    if (dados_pessoal !== "SEM_VALOR") 
                    {
                        $(list).html("");
                        $.each(dados_pessoal,function(i,obj){
                                         
                         switch(obj.SITUACAO) {
                                    case "LIBERADO":
                                        $(list).append('<li class="numero_agendamento" id="listitem"><div id="li_agendamentos" onclick="buscar('+obj.AGENDAMENTO+')"><p><strong>AGENDAMENTO:&nbsp;&nbsp;'+obj.AGENDAMENTO+'&nbsp;&nbsp;&nbsp;DATA:&nbsp;&nbsp;'+ obj.DATA_AGENDAMENTO +'</p><p>SITUA&Ccedil;&Atilde;O:<span style="color:#006400;">&nbsp;&nbsp;'+ obj.SITUACAO +'</p></strong></div></li>');
                                        break;
                                    case "PENDENTE":
                                        $(list).append('<li class="numero_agendamento" id="listitem"><div id="li_agendamentos" onclick="buscar('+obj.AGENDAMENTO+')"><p><strong>AGENDAMENTO:&nbsp;&nbsp;'+obj.AGENDAMENTO+'&nbsp;&nbsp;&nbsp;DATA:&nbsp;&nbsp;'+ obj.DATA_AGENDAMENTO +'</p><p>SITUA&Ccedil;&Atilde;O:<span style="color:#FFD700;">&nbsp;&nbsp;'+ obj.SITUACAO +'</p></strong></div></li>');
                                        break;
                                    case "RECUSADA":
                                        $(list).append('<li class="numero_agendamento" id="listitem"><div id="li_agendamentos" onclick="buscar('+obj.AGENDAMENTO+')"><p><strong>AGENDAMENTO:&nbsp;&nbsp;'+obj.AGENDAMENTO+'&nbsp;&nbsp;&nbsp;DATA:&nbsp;&nbsp;'+ obj.DATA_AGENDAMENTO +'</p><p>SITUA&Ccedil;&Atilde;O:<span style="color:#FF0000;">&nbsp;&nbsp;'+ obj.SITUACAO +'</p></strong></div></li>');
                                        break;
                                }   
                            
                        });
                            $(list).listview("refresh"); 
                            $.mobile.loading( "hide" );
                            location.href="#ListaAgendamentos";
                    }else{
                        swal("Colaborador não possui agendamentos!");
                        $.mobile.loading( "hide" );                            
                    }
                });
            }
            
            
            function desabilita_checkbox() {
                document.getElementById('DiaTodoDetalhe').disabled=true;
                document.getElementById('AtestadoDetalhe').disabled=true;
                }

              function buscar(numero_agendamento){

               $.getJSON("http://henriquemoraes.ddns.net:90/WebService.asmx/BuscarAgendamento?agendamento=" + numero_agendamento+"", function(dados_agendamento){
                    
                        if (dados_agendamento !== "SEM_VALOR") 
                        {
                            $.each(dados_agendamento,function(i,dados_agendamento){
                                 window.location="#DetalheAgendamento";

                                self.document.getElementById('AgendamentoDetalhe').textContent = dados_agendamento.AGENDAMENTO;
                                self.document.getElementById('SituacaoDetalhe').textContent = dados_agendamento.SITUACAO;
                                self.document.getElementById('DataInicialDetalhe').value = dados_agendamento.DATA_INICIAL;
                                self.document.getElementById('HoraInicialDetalhe').value = dados_agendamento.HORA_INICIAL;
                                self.document.getElementById('DataFinalDetalhe').value = dados_agendamento.DATA_FINAL;
                                self.document.getElementById('HoraFinalDetalhe').value = dados_agendamento.HORA_FINAL;
                                
                                if(dados_agendamento.DIA_TODO === "S"){
                                    self.document.getElementById('DiaTodoDetalhe').checked = true;
                                }else{
                                    self.document.getElementById('DiaTodoDetalhe').checked = false;
                                }
                                
                                if(dados_agendamento.ATESTADO === "S"){
                                    self.document.getElementById('AtestadoDetalhe').checked = true;
                                }else{
                                    self.document.getElementById('AtestadoDetalhe').checked = false;
                                }
                                
                                                               
                                self.document.getElementById('ObservacaoDetalhe').value = dados_agendamento.OBSERVACAO;
                               $.mobile.loading( "hide" );  
                            });

                        }else{
                           swal("Sem agendamentos!");
                           $.mobile.loading( "hide" ); 
                        }
                    });
            }
            
            function Agendar(){
                       
                    var colaborador = codi_pes;
                    var data_inicial = DataInicial.value;
                    var data_final = DataFinal.value;
                
                    if (DiaTodo.checked)
                    {
                        var dia_todo = "S";
                    }
                    else
                    {
                        var dia_todo = "N";
                    }
            
                    var hora_inicial = HoraInicial.value;
                    var hora_final = HoraFinal.value;
                
                    if (Atestado.checked)
                    {
                        var atestado = "S";
                    }
                    else
                    {
                        var atestado = "N";
                    }
                    var observacao = Observacao.value;
                        
                if ((data_inicial!== "")&&(data_final!=="")&&(hora_inicial !=="")&&(hora_final !=="")){
                    
                $.getJSON("http://henriquemoraes.ddns.net:90/WebService.asmx/CadastrarAgendamento?CodigoColaborador="+colaborador+    "&datainicial="+data_inicial+"&datafinal="+data_final+"&horainicial="+hora_inicial+"&horafinal="+hora_final+"&diatodo="+dia_todo+"&atestado="+atestado+"&observacao="+observacao, function(Agendamento){
                            
                            if (Agendamento === "AGENDADO") 
                                {
                                    swal("Agendamento realizado!");
                                    $.mobile.loading( "hide" );
                                    $('#botao').removeAttr('disabled');
                                    
                                    window.location="#RealizarAgendamento";

                                    
                                document.getElementById('DataInicial').value = "";
                                document.getElementById('HoraInicial').value = "";
                                document.getElementById('DataFinal').value = "";
                                document.getElementById('HoraFinal').value = "";
                                document.getElementById("DiaTodo").checked = false;
                                document.getElementById("Atestado").checked = false;
                                document.getElementById('Observacao').value = "";
                                    
                                    location.href="#opcoes";
                                }
                                else
                                {
                                    if(Agendamento === "ERRO")
                                    {
                                        swal("Erro ao agendar, verifique com o administrador!");
                                         $.mobile.loading( "hide" );
                                         $('#botao').removeAttr('disabled');
                                    }
                                }
                    });
                }else{
                    swal("Verifique os campos obrigatórios!");
                    $.mobile.loading( "hide" );
                    $('#botao').removeAttr('disabled');
                }
            }
