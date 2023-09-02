(function ($, $LS) {
    //$ jQuery
    //$LS window.localStorage
    //Declaração de Variáveis
    var $board = $('#board'),
        //Quadro onde os Posticks estão colados
        Postick, //Objeto Singleton contendo as Funções para trabalhar com o LocalStorage
        len = 0,
        //Comprimento dos objetos no LocalStorage 
        currentNotes = '',
        //Armazena a construção html dos posticks
        o; //Dados reais do Postick no localStorage
   
   
   
    //Gerencie os Posticks no armazenamento local
	//Cada postick é salvo no localStorage como um objeto  
    Postick = {
        add: function (obj) {
            obj.id = $LS.length;
            $LS.setItem(obj.id, JSON.stringify(obj));
        },

        retrive: function (id) {
            return JSON.parse($LS.getItem(id));
        },

        remove: function (id) {
            $LS.removeItem(id);
        },

        removeAll: function () {
            $LS.clear();
        }

    };

    //Se existir algum postick, crie-o
    len = $LS.length;
    if (len) {
        for (var i = 0; i < len; i++) {
            //Cria todos os posticks salvos no localStorage
            var key = $LS.key(i);
            o = Postick.retrive(key);
            currentNotes += '<div class="postick"';
            currentNotes += ' style="left:' + o.left;
            currentNotes += 'px; top:' + o.top;
			//data-key is the attribute to know what item delete in the localStorage
            currentNotes += 'px"><div class="toolbar"><span class="delete" data-key="' + key;
            currentNotes += '">x</span></div><div contenteditable="true" class="editable">';
            currentNotes += o.text;
            currentNotes += '</div></div>';
        }

        //Anexar todos os posticks ao quadro
        $board.html(currentNotes);
    }

    //Quando o documento estiver pronto, torne todos os posticks arrastáveis
    $(document).ready(function () {
    	$( ".ui-resizable" ).resizable({
			"stack" : '.postick'
		});
        $(".postick").draggable({
			cancel: '.editable',
			"zIndex": 3000,
			"stack" : '.postick'
        });
    });

    //Remove o poststick
    $('span.delete').live('click', function () {
        if (confirm('Tem certeza de que deseja excluir esta anotação?')) {
            var $this = $(this);
			//data-key é o atributo para saber qual item deletar no localStorage
            Postick.remove($this.attr('data-key'));
            $this.closest('.postick').fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });

    //Cria o poststick
    $('#btn-addNote').click(function () {
        $board.append('<div class="postick" style="left:20px;top:70px"><div class="toolbar"><span class="delete" title="Close">x</span></div><div contenteditable class="editable"></div></div>');
        $(".postick").draggable({
            cancel: '.editable'
        });
    });

    //Salva todos os posticks quando o usuário sair da página
    window.onbeforeunload = function () {
        //Limpa o armazenamento local
        Postick.removeAll();
        //Em seguida, insira cada postick no LocalStorage
		//Salvando sua posição na página, para posicioná-los quando a página for carregada novamente
        $('.postick').each(function () {
            var $this = $(this);
            Postick.add({
                top: parseInt($this.position().top),
                left: parseInt($this.position().left),
                text: $this.children('.editable').text()
            });
        });
    }
})(jQuery, window.localStorage);
