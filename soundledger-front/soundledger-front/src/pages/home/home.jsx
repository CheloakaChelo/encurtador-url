import React from "react";
import { Cards } from "./Cards";
import { CardsWrapper } from "./CardsWrapper";
import { Copy } from "./Copy";
import { Frame } from "./Frame";
import { Navigation } from "./Navigation";
import { NavigationFooter } from "./NavigationFooter";
import { Section } from "./Section";
import { Text } from "./Text";
import image42 from "./image-4-2.png";
import show1 from "./show-1.png";
import "./style.css";

export const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="div-4">
                <p className="text-wrapper-25">Veja as opiniões de quem usa</p>

                <Cards />
                <NavigationFooter />
                <Navigation />
                <p className="text-wrapper-26">
                    Para todos os colaboradores na produção musical
                </p>

                <Frame />
                <div className="show-wrapper">
                    <img className="show" alt="Show" src={show1} />
                </div>

                <p className="text-wrapper-27">Pensado para independentes e gigantes</p>

                <CardsWrapper />
                <div className="text-wrapper-28">Sua música, seus direitos</div>

                <Text />
                <div className="buttons-2">
                    <button className="button-3">
                        <div className="text-wrapper-29">Cadastre-se</div>
                    </button>

                    <button className="button-4">
                        <div className="text-wrapper-30">Login</div>
                    </button>
                </div>

                <Section />
                <img className="image-3" alt="Image" src={image42} />

                <Copy />
            </div>
        </div>
    );
};
