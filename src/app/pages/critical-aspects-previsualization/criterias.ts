export const RESPONSE: any = {
    "success": 1,
    "message": "NO_ERROR",
    "errors": null,
    "result": [
        {
            "id": 1,
            "title": "MENUS DE NAVEGAÇÃO asd",
            "subCriteria": [
                {
                    "id": 1,
                    "criteriaId": 1,
                    "subPosition": 1,
                    "title": "O menu de navegação deve estar estruturado como uma lista de opções",
                    "content": "Para que possa ser bem interpretado por tecnologias de apoio, os menus e submenus devem estar estruturados com elementos nativos, do tipo <ul>, ou com a semântica e o estado dos elementos identificados com técnicas em ARIA."
                },
                {
                    "id": 11,
                    "criteriaId": 1,
                    "subPosition": 2,
                    "title": "É possível selecionar as opções e as subopções do menu quer com rato quer com teclado",
                    "content": "Deve ser possível percorrer a estrutura de navegação quer com um dispositivo apontador quer com o teclado."
                },
                {
                    "id": 19,
                    "criteriaId": 1,
                    "subPosition": 3,
                    "title": "As imagens-link, caso existam no menu, devem ter o correspondente equivalente alternativo em texto",
                    "content": "As imagens corretamente legendadas permitem ser interpretadas como texto, tornando todas as opções de navegação acessíveis."
                }
            ],
            "subCount": 3
        },
        {
            "id": 2,
            "title": "TÍTULOS E SUBTÍTULOS",
            "subCriteria": [
                {
                    "id": 2,
                    "criteriaId": 2,
                    "subPosition": 1,
                    "title": "Existe um título <h1> marcado na página",
                    "content": "O título principal de cada página, que sumariza o seu conteúdo, deve ser identificado como o primeiro nível dos títulos (h1). Não deverá ser utilizado mais do que um <h1> por página."
                },
                {
                    "id": 12,
                    "criteriaId": 2,
                    "subPosition": 2,
                    "title": "Existe uma marcação hierarquizada de títulos e subtítulos na página (<h1>...<h6>)",
                    "content": "Os títulos são empregues de forma hierárquica para melhor estruturar os conteúdos, das informações mais gerais às mais particulares. Deverão ser usados de forma consistente por todo o sítio Web."
                }
            ],
            "subCount": 2
        },
        {
            "id": 3,
            "title": "TABELAS DE DADOS",
            "subCriteria": [
                {
                    "id": 3,
                    "criteriaId": 3,
                    "subPosition": 1,
                    "title": "As células que constituem os cabeçalhos da tabela estão marcadas com o elemento <th>",
                    "content": "Identificar os cabeçalhos de uma tabela ajuda a melhor identificar os eixos que caracterizam a informação em cada célula."
                },
                {
                    "id": 13,
                    "criteriaId": 3,
                    "subPosition": 2,
                    "title": "A legenda da tabela está marcada com o elemento <caption>",
                    "content": "Todas as tabelas deverão conter uma legenda descritiva do seu conteúdo, incluindo as fontes da informação, se necessário."
                }
            ],
            "subCount": 2
        },
        {
            "id": 4,
            "title": "FORMULÁRIOS",
            "subCriteria": [
                {
                    "id": 4,
                    "criteriaId": 4,
                    "subPosition": 1,
                    "title": "Ao clicar com o rato na etiqueta, o cursor surge no respetivo campo de edição",
                    "content": "De forma a tornar a seleção de campos pequenos mais fácil, a legenda deverá estar associada ao campo respetivo com o elemento <label>, pois desta forma aumenta-se a sua área clicável. Para os utilizadores de leitores de ecrã (pessoas cegas) a associação da etiqueta ao campo de edição é também fundamental."
                },
                {
                    "id": 14,
                    "criteriaId": 4,
                    "subPosition": 2,
                    "title": "É possível identificar os campos de preenchimento obrigatório quando se usa apenas um leitor de ec",
                    "content": "Os campos obrigatórios devem ser preferencialmente agrupados na parte inicial de um formulário e claramente identificados como tal. Se não for possível, cada campo deverá estar identificado textualmente ou como Obrigatório ou como Opcional. Não deverão ser usados apenas símbolos ou cores como elemento identificador."
                },
                {
                    "id": 20,
                    "criteriaId": 4,
                    "subPosition": 3,
                    "title": "É possível localizar e ler as mensagens de erro usando apenas um leitor de ecrã",
                    "content": "Os erros identificados no decorrer do preenchimento de um formulário deverão preferencialmente ser listados de forma condensada, direcionando cada elemento da lista ao respetivo campo. Cada campo deverá associar a mensagem de erro a si próprio. As mensagens de erro deverão ser breves e claras."
                }
            ],
            "subCount": 3
        },
        {
            "id": 5,
            "title": "GRÁFICOS E IMAGENS-LINK",
            "subCriteria": [
                {
                    "id": 5,
                    "criteriaId": 5,
                    "subPosition": 1,
                    "title": "A imagem ou gráfico tem um equivalente alternativo em texto curto e correto",
                    "content": "As imagens não decorativas deverão ter uma descrição breve associada, nomeadamente através do uso do atributo <ALT>. Esta legenda deve descrever fielmente o propósito da imagem no contexto em que se encontra."
                },
                {
                    "id": 15,
                    "criteriaId": 5,
                    "subPosition": 2,
                    "title": "O gráfico é acompanhado de uma descrição longa",
                    "content": "Gráficos resultantes de análise de dados deverão ser acompanhados da tabela de dados que lhe deu origem, de forma a preservar o acesso à informação completa."
                },
                {
                    "id": 21,
                    "criteriaId": 5,
                    "subPosition": 3,
                    "title": "As imagens-link têm um equivalente alternativo correto",
                    "content": "As hiperligações compostas apenas por uma imagem obrigam que esta tenha um equivalente alternativo em texto que represente fielmente o destino da hiperligação."
                }
            ],
            "subCount": 3
        },
        {
            "id": 6,
            "title": "CONTRASTE",
            "subCriteria": [
                {
                    "id": 6,
                    "criteriaId": 6,
                    "subPosition": 1,
                    "title": "No corpo de um documento, o rácio de contraste entre a cor do texto normal (menor que 18 pontos ou menor que 14 pontos negrito) e a cor do fundo é superior a 4,5:1",
                    "content": "Deve assegurar-se no corpo do documento que o rácio de contraste entre a cor do texto e a cor de fundo é, no mínimo, de 4,5:1, de forma a assegurar a sua legibilidade para utilizadores com deficiências da visão."
                },
                {
                    "id": 16,
                    "criteriaId": 6,
                    "subPosition": 2,
                    "title": "O rácio de contraste entre a cor do texto de tamanho grande (maior ou igual que 18 pontos ou maior ou igual que 14 pontos negrito) e a cor do fundo é superior a 3:1",
                    "content": "Os textos de tamanho superior a 18 pontos, ou os textos de tamanho superior a 14 pontos mas a negrito, devem assegurar um rácio de contraste mínimo de 3:1 entre a cor do texto e a cor do fundo."
                }
            ],
            "subCount": 2
        },
        {
            "id": 7,
            "title": "PLAYERS",
            "subCriteria": [
                {
                    "id": 7,
                    "criteriaId": 7,
                    "subPosition": 1,
                    "title": "Deve ser possível ativar os botões de controlo do leitor quer com o rato quer com o teclado",
                    "content": "Os leitores de multimédia não devem iniciar automaticamente a reprodução dos elementos e têm de ser operáveis usando apenas um rato ou usando apenas um teclado."
                },
                {
                    "id": 17,
                    "criteriaId": 7,
                    "subPosition": 2,
                    "title": "O vídeo ou o áudio deve conter preferencialmente legendas fechadas sincronizadas. Caso não seja possível, no mínimo, deve disponibilizar-se uma transcrição textual",
                    "content": "O uso de legendas fechadas destina-se essencialmente a pessoas surdas. Recomendam-se para a produção das referidas legendas técnicas de tradaptação conhecidas para o efeito bem como o enriquecimento das legendas de sons cuja mensagem não seja percetível visualmente (por ex., o toque de uma campaínha de uma porta).\r\n\r\nPara vídeos com mensagens eminentemente visuais (por ex., um vídeo com música de fundo que passa um conjunto de mensagens apenas percetíveis à visão), os mesmos devem ter uma versão equivalente alternativa com produção de audiodescrição. A audiodescrição é fundamental para que pessoas cegas ou com baixa visão possam percecionar a mensagem veiculada."
                }
            ],
            "subCount": 2
        },
        {
            "id": 8,
            "title": "ESTRUTURA DA PÁGINA",
            "subCriteria": [
                {
                    "id": 8,
                    "criteriaId": 8,
                    "subPosition": 1,
                    "title": "Quando se retira a CSS, todos os elementos HTML devem alinhar à esquerda",
                    "content": "Quando se desativam todos os estilos visuais, o conteúdo da página é apresentado alinhado à esquerda e apresenta-se de forma linear."
                },
                {
                    "id": 18,
                    "criteriaId": 8,
                    "subPosition": 2,
                    "title": "Quando se retira a CSS, a informação aparece numa ordem lógica",
                    "content": "Tendo em conta que o posicionamento de elementos no código pode não refletir a ordem visual de leitura, deve ser assegurada a ordem correta do conteúdo quando se desativam os estilos visuais."
                },
                {
                    "id": 22,
                    "criteriaId": 8,
                    "subPosition": 3,
                    "title": "Quando se retira a CSS, deve ser possível reconhecer a semântica dos diversos elementos",
                    "content": "Os elementos que estruturam o conteúdo devem estar semanticamente bem estruturados, usando os elementos de HTML apropriados a cada tipo de conteúdo, como títulos, parágrafos, listas, ..."
                },
                {
                    "id": 23,
                    "criteriaId": 8,
                    "subPosition": 4,
                    "title": "Quando se retira a CSS, a informação relevante permanece visível",
                    "content": "Toda a informação visível deve permanecer na página sob forma textual, quando se desativam os estilos visuais."
                },
                {
                    "id": 24,
                    "criteriaId": 8,
                    "subPosition": 5,
                    "title": "A maquetização da página é feita sem recorrer ao elemento <table>",
                    "content": "A estrutura de composição gráfica da página não é feita recorrendo a elementos de tabela mas sim a uma maior diversidade de elementos semânticos (por ex., <main>) e genéricos (por ex., <div>), que permitem a recomposição visual para diferentes tipos e dimensões de ecrã."
                }
            ],
            "subCount": 5
        },
        {
            "id": 9,
            "title": "SINTAXE DE HTML",
            "subCriteria": [
                {
                    "id": 9,
                    "criteriaId": 9,
                    "subPosition": 1,
                    "title": "A página apresenta-se sem erros de (x)HTML",
                    "content": "A página não deve apresentar erros de sintaxe de (x)HTML."
                }
            ],
            "subCount": 1
        },
        {
            "id": 10,
            "title": "FICHEIROS PDF",
            "subCriteria": [
                {
                    "id": 10,
                    "criteriaId": 10,
                    "subPosition": 1,
                    "title": "Nos ficheiros PDF é possível, no mínimo, extrair o conteúdo textual para formato TXT",
                    "content": "Os ficheiros PDF devem ter o seu texto inteiramente extraível para que se possa passar o respetivo conteúdo para um processador de texto sem perda de informação."
                }
            ],
            "subCount": 1
        }
    ]
}