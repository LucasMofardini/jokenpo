import React, { useState, useEffect } from 'react';
import './assets/css/jokenpo.css'
import tesoura from './assets/images/tipo3/hand-scissors--v1.png';
import papel from './assets/images/tipo3/hand.png';
import pedra from './assets/images/tipo3/clenched-fist.png';
import imagemComputador from './assets/images/pixel-art-pc.png';
import farmer from './assets/images/farmer_male.png';

export default function Jokenpo() {
    const placarInicial = {
        usuario: 0,
        computador: 0,
        empate: 0
    }
    const JogadaInicial = { nome: "", src: "" }
    const [jogadaUsuario, setJogadaUsuario] = useState(JogadaInicial);
    const [jogadaComputador, setjogadaComputador] = useState(JogadaInicial);
    const [vencedor, setVencedor] = useState({ quemVenceu: "", jogadaVencedora: "" });
    const [placar, setPlacar] = useState(placarInicial);

    const jogadas = [{
        nome: "tesoura",
        src: tesoura
    }, {
        nome: "papel",
        src: papel
    }, {
        nome: "pedra",
        src: pedra
    }];
    const formasDeVencer = [
        { jogador1: "tesoura", jogador2: "papel", vencedor: "tesoura" },
        { jogador1: "pedra", jogador2: "tesoura", vencedor: "pedra" },
        { jogador1: "papel", jogador2: "pedra", vencedor: "papel" },


    ]
    useEffect(() => {
        //Quando ele setar a jogada do computador, ele compara a rodada
        comparaJogadas();
    }, [jogadaComputador])

    const logicaJogada = (jogada) => {
        if (jogada.nome) {
            setJogadaUsuario({ nome: jogada.nome, src: jogada.src });
        }

        gerajogadaComputador();
    }
    const gerajogadaComputador = () => {
        // Vai de 0 até 2
        let indexRandomico = Math.floor(Math.random() * 3);
        setjogadaComputador({ nome: jogadas[indexRandomico].nome, src: jogadas[indexRandomico].src });
        // depois que ele gera e seta a jogada, o useEffect ativa a funçao comparaJogadas
    }
    const resetarPlacar = () => {
        setPlacar(placarInicial);
        setJogadaUsuario(JogadaInicial);
        setjogadaComputador(JogadaInicial);
        setVencedor({ quemVenceu: "", jogadaVencedora: "" });
    }
    const comparaJogadas = () => {
        // Esse && é por que o useEffect inicializa uma jogada no incicio, entao o && é para validar se nao é null;
        // Empate
        if (jogadaUsuario.nome === jogadaComputador.nome && jogadaUsuario.nome && jogadaComputador.nome) {
            //Empate
            setPlacar({ ...placar, empate: placar.empate += 1 });
            setVencedor({ quemVenceu: "Empate", jogadaVencedora: "Empate" });

        }
        formasDeVencer.forEach((forma) => {
            //Verifica se o usuario foi vencedor
            if (forma.jogador1 == jogadaUsuario.nome && forma.jogador2 == jogadaComputador.nome) {
                console.log(forma.vencedor);
                setPlacar({ ...placar, usuario: placar.usuario += 1 });
                setVencedor({ quemVenceu: jogadaUsuario.nome, jogadaVencedora: "Voce" });
            }
            //Verifica se o computador foi vencedor
            if (forma.jogador1 == jogadaComputador.nome && forma.jogador2 == jogadaUsuario.nome) {
                console.log(forma.vencedor);
                setPlacar({ ...placar, computador: placar.computador += 1 });
                setVencedor({ quemVenceu: jogadaComputador.nome, jogadaVencedora: "Computador" });

            }

        })
    }

    return (
        <section className='section-jogo'>


            <div className='container-jogo'>
                <a target="_blank" href="https://github.com/lucasmofardini"><p id="lucasmofardini">@lucasmofardini</p></a>
                <div className='container-btn-reset'><button className="btn-reset" onClick={resetarPlacar}> Resetar o placar </button></div>

                <div className='item-contador'>
                    <p>{`Empate > ${placar.empate} `}</p>
                </div>

                <div className='container-jogadas'>
                    {jogadas.map((jogada, index) => {
                        return (
                            <div className='item-jogada'>
                                <img onClick={() => {
                                    logicaJogada(jogada);

                                }}
                                    src={jogada.src} key={index} id={`${jogada.nome}`} />
                            </div>
                        )
                    })}

                </div>

                <div className='item-jogo'>
                    <div className='container-usuario'>
                        <div><p>voce</p></div>
                        <div className="box-pessoa"><img src={farmer} /></div>
                        <div><p>{jogadaUsuario.nome}</p></div>
                        <div className="box-img"><img src={jogadaUsuario.src} /></div>
                        <div id="box-contador-usuario" className='box-contador-valor'>
                            <p>{` ${placar.usuario}  `} </p>
                        </div>
                    </div>
                    {/* <div class="container-comparacao">
                        <p>{vencedor.quemVenceu}</p>
                        <p>{vencedor.jogadaVencedora}</p>
                    </div> */}
                    <div className='container-computador'>
                        <div><p>computador</p></div>
                        <div className='box-pc'><img src={imagemComputador} /> </div>
                        <div><p>{jogadaComputador.nome}</p></div>
                        <div className="box-img"><img src={jogadaComputador.src} /></div>
                        <div id="box-contador-computador" className='box-contador-valor'>
                            <p>{` ${placar.computador} `}</p>
                        </div>


                    </div>


                </div>
            </div>

        </section>
    );
}