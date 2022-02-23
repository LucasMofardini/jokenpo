import React, { useState, useEffect } from 'react';
import tesoura from './assets/images/tesoura.png'
import papel from './assets/images/papel.png'
import pedra from './assets/images/pedra.png'


export default function Jokenpo() {
    const rodadaInicial = {
        usuario: 0,
        computador: 0,
        empate: 0
    }
    const [jogadaUsuario, setJogadaUsuario] = useState("")
    const [jogadaComputador, setjogadaComputador] = useState("");
    const [rodadaVencida, setRodadaVencida] = useState(rodadaInicial);

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
    const comparaJogadas = () => {
        if (jogadaUsuario === jogadaComputador && jogadaUsuario && jogadaComputador) {
            //Empate
            setRodadaVencida({ ...rodadaVencida, empate: rodadaVencida.empate += 1 });
        }
        formasDeVencer.forEach((forma) => {

            if (forma.jogador1 == jogadaUsuario && forma.jogador2 == jogadaComputador) {
                console.log(forma.vencedor);
                setRodadaVencida({ ...rodadaVencida, usuario: rodadaVencida.usuario += 1 })
            }
            if (forma.jogador1 == jogadaComputador && forma.jogador2 == jogadaUsuario) {
                console.log(forma.vencedor);
                setRodadaVencida({ ...rodadaVencida, computador: rodadaVencida.computador += 1 })
            }

        })
    }

    return (
        <>
            <div>
                {`Usuario > ${rodadaVencida.usuario}  `}
                {`Computador > ${rodadaVencida.computador} `}
                {`Empate > ${rodadaVencida.empate} `}


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
            </div>

        </>
    );
}