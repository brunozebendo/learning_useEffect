/**Esse é um resumo das aulas de useEffect
 * Aula 144. O código que já veio pronto, tem dois campos, nome e senha e
 * um botão de login, e, por enquanto, não há nenhuma validação.
 * O primeiro conceito a ser ensinado será do local storage, que é o armazenamento local.
 * A ideia é não perder o que for digitado, mesmo quando o campo for apagado
 */
/**O primeiro passo foi incluir a linha do localStorage abaixo,
 * o setItem vai atribuir as duas frases na sequência no browser
 * no esquema key: value. Como ele está dentro da função que
 * controla o login, isso acontecerá quando o botão for clicado. 
 * A consulta o localStorage está na ferramenta do desenvolvedor, aplicativo.
*/

const loginHandler = (email, password) => {

    localStorage.setItem('isLoggedin', '1');
    setIsLoggedIn(true);
  };
/**Agora é a hora de usar o useEffect. Como o armazenamento é um efeito
 * colateral e não a principal intenção do React, usa-se o hook, também
 * para evitar um loop eterno se o componente for renderizado e mudar
 * o estado e renderizar de novo...
 * Assim, uma anonymous function executa a seguinte lógica, em uma variável
 * é guardado valor do localStorage (getItem é para pegar o valor) e 
 * se essa informação for igual a '1', ou seja, se algo já tiver sido 
 * digitado conforme código anterior, o estado é autenticado para true e as
 * outras partes do código que dependem desse true são executadas.
 * O [] está vazio aqui, mas, em outras aula ele vai ser usado.
 */
  useEffect (()=> {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

    if (storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
    }  
  }, []);

  /**Por fim, foi adicionada a linha abaixo para apagar o item quando
   * for clicado o logout
   */
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin');
    setIsLoggedIn(false);
  };


/**Na aula 145 será usado um user effect com dependencies [] para controlar 
 * o uso de userEffect quando determinados componentes mudarem. Assim, dentro da 
 * lógica do componente que controla o Login, será incluída, o código abaixo
 * para substituir um anterior que controlava através do getvalue do campo.
 * Portanto, o useEffect abaixo usa o setFormIsValid (que é um controlador de 
 * estado) e só o aciona caso o enteredEmail e o enteredPassword (dois 
 * cotroladores de estado dos inputs) também sejam validados e como eles
 * estão dentro do [] o useEffect garante q só serão re renderizados se 
 * houver alguma mudança no seu estado. Lembrando que esse também é um efeito
 * colateral e que setFormIsValid não foi incluído como dependency pois o
 * React já faz um controle natual do seu estado
 */

useEffect (() => {
  setFormIsValid(
    enteredEmail.target.value.includes('@') && enteredPassword.trim().length > 6
  );

}, [enteredEmail, enteredPassword]);

/**Por fim, na aula 147 ensinou o conceito de Cleanup Function que usa um conceito
 * de debouncing (balancear) para chamar a função somente quando o usuário
 * parar de digitar, pois, do contrário, a função será chamada a cada letra
 * digitada. Para isso, foi usada a função setTimeout que é uma função built-in.
 * A função então foi passada dentro dela, depois foi setado 500 milisegundos,
 * chamada outra função built-in, clearTimeou() para zerar o tempo e estabelecido
 * um return chamando a função para limpar o tempo. Na prática, se o usuário 
 * digitar na velocidade normal, o sistema espera um pouco para verificar
 * a validação e assim não sobrecarregar verificando cada digitação. Essa função
 * é muito usada com http request e outros. 
 */

useEffect (() => {
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredEmail.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  }, 500);
  clearTimeout();

  return () => {
    clearTimeout(identifier);
  };
  /**A aula 148 faz um resumo do useEffect*/