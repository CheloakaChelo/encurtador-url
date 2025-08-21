import React from "react";
import festivalDeMusica1 from "./festival-de-musica-1.png";
import footer from "./footer.svg";
import image5 from "./image-5.png";
import "./style.css";

export const Login = () => {
    return (
        <div className="login">
            <div className="div">
                <div className="navigation">
                    <img className="image" alt="Image" src={image5} />
                </div>

                <img
                    className="navigation-footer"
                    alt="Navigation footer"
                    src={footer}
                />

                <div className="form">
                    <div className="input">
                        <div className="text-wrapper">Endereço de e-mail</div>

                        <input
                            className="field"
                            placeholder="email@dominiofakedajane.net"
                            type="email"
                        />
                    </div>

                    <div className="input-2">
                        <div className="text-wrapper">Senha</div>

                        <div className="label-wrapper">
                            <div className="label">Senha</div>
                        </div>
                    </div>
                </div>

                <button className="button">
                    <div className="text-wrapper-2">Login</div>
                </button>

                <div className="heading">
                    <div className="text-wrapper-3">Login</div>
                </div>

                <img
                    className="festival-de-musica"
                    alt="Festival de musica"
                    src={festivalDeMusica1}
                />

                <div className="text-wrapper-4">Não possui cadastro? Cadastre-se</div>
            </div>
        </div>
    );
};
