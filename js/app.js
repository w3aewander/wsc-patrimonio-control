 const resposta = document.getElementById('retorno')

        const result = document.getElementById("retorno")
        const endpoint = document.getElementById("endpoint")
        const btnExecute = document.getElementById("btn--execute")

        
        const API = "http://localhost:3000/api/"
        
        const listarPatrimonios = () => {
            
            const tbody = document.getElementById("tbody--patrimonio")
            
            fetch(`${API}patrimonios`).then(resp => {

                resp.json().then(r => {
                      
                    r.forEach(el => {
               
                          tbody.innerHTML += `<tr data-patrimonio="${el.id}" data-tipo="${el.tipo}" data-modelo="${el.modelo}" data-observacao="${el.observacao}">
                                                <td>${el.id}</td>
                                                <td>${el.tipo}</td>
                                                <td>${el.modelo}</td>
                                                <td>${el.observacao}</td>
                                                <td><button onclick="editarPatrimonio(event,this);" class="btn btn-primary btn-sm"><i class="fa fa-edit fa-fw"></i> Editar</button></td>
                                              </tr>`
                      })  
                })
            })
         }


        const editarPatrimonio = (event, el) => {
            document.getElementById('id').value = el.parentNode.parentNode.getAttribute('data-patrimonio')
            document.getElementById('tipo').value = el.parentNode.parentNode.getAttribute('data-tipo')
            document.getElementById('modelo').value = el.parentNode.parentNode.getAttribute('data-modelo')
            document.getElementById('observacao').value = el.parentNode.parentNode.getAttribute('data-observacao')
        }

        document.addEventListener("DOMContentLoaded", (event) => {

            listarPatrimonios()

            btnExecute.addEventListener("click", function (e) {

                const btnText = e.target.innerHTML
                const endPointValue = endpoint.value

                e.target.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i>`

                let URI = `http://127.0.0.1:3000/api/${endPointValue}`

                result.value = "Processando solicitação..."

                fetch(URI).then((resp) => {

                    console.log(resp)

                    resp.json().then(r => {

                        r.forEach(el => {
                            result.value += JSON.stringify(el)
                        })
                    })
                })
                    .catch(err => {
                        console.log(err)
                        result.value = err.message
                    })
                    .finally(() =>
                        e.target.innerHTML = `Enviar`
                    )

            })


            document.getElementById('btn--salvar').addEventListener('click', (e) => {


                const id = document.getElementById('id').value
                const tipo = document.getElementById('tipo').value
                const modelo = document.getElementById('modelo').value
                const observacao = document.getElementById('observacao').value


                fetch('http://localhost:3000/api/patrimonio/add',
                    {
                        method: 'POST',
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify({ id: id, tipo: tipo, modelo: modelo, observacao: observacao })
                    }).then(resp => {
                        resp.json().then(r => {

                            //  r.forEach(element => {

                            //  });

                            resposta.value = JSON.stringify(r)

                        })
                    }).catch(err => {
                        console.log("Erro: " + err.message)
                    })

            })

        })
