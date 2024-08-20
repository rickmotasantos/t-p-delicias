let senha = document.querySelector('.senha-1');


senha.addEventListener('click', (e)=>{
    e.preventDefault();

    let nome = document.querySelector('.nome');
    let valor = nome.value;
    let senha = document.querySelector('.senha');
    let valorSenha = senha.value;

    if(valor == "admin" && valorSenha == "123"){
        window.location.replace('../../index.html')
    }else {
        alert("nome e ou senha incorretos!!!");
    }  
})  