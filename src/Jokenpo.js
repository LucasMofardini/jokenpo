import React, { useState, useEffect } from 'react';
import tesoura from './assets/images/tesoura.png'
import papel from './assets/images/papel.png'
import pedra from './assets/images/pedra.png'


export default function Jokenpo() {
    const placarInicial = {
        usuario: 0,
        computador: 0,
        empate: 0
    }
    const [jogadaUsuario, setJogadaUsuario] = useState();
    const [jogadaComputador, setjogadaComputador] = useState();
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
        console.log('JogadaUsuario : ' + jogadaUsuario, ' jogadaComputador ' + jogadaComputador);
    }, [jogadaComputador])

    const logicaJogada = (jogada) => {
        if (jogada.nome)
            setJogadaUsuario(jogada.nome);

        gerajogadaComputador();
        // comparaJogadas();
    }
    const gerajogadaComputador = () => {
        // Vai de 0 até 2
        let indexRandomico = Math.floor(Math.random() * 3);
        setjogadaComputador(jogadas[indexRandomico].nome);
    }
    const resetarPlacar = () => {
        setPlacar(placarInicial);
    }
    const comparaJogadas = () => {
        // Esse && é por que o useEffect inicializa uma jogada no incicio, entao o && é para validar se nao é null
        if (jogadaUsuario === jogadaComputador && jogadaUsuario && jogadaComputador) {
            //Empate
            setPlacar({ ...placar, empate: placar.empate += 1 });
        }
        formasDeVencer.forEach((forma) => {

            if (forma.jogador1 == jogadaUsuario && forma.jogador2 == jogadaComputador) {
                console.log(forma.vencedor);
                setPlacar({ ...placar, usuario: placar.usuario += 1 })
            }
            if (forma.jogador1 == jogadaComputador && forma.jogador2 == jogadaUsuario) {
                console.log(forma.vencedor);
                setPlacar({ ...placar, computador: placar.computador += 1 })
            }

        })
    }

    return (
        <>
            <div>
                {`Usuario > ${placar.usuario}  `}
                {`Computador > ${placar.computador} `}
                {`Empate > ${placar.empate} `}


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

                {"jogadaUsuario > " + jogadaUsuario + "  "}
                {"jogadaComputador > " + jogadaComputador}
                <button className="btn-reset" onClick={resetarPlacar}> Reset </button>
            </div>

        </>
    );
}