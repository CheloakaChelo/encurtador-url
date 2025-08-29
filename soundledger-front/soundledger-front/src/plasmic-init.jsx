import { initPlasmicLoader } from "@plasmicapp/loader-react";

export const PLASMIC = initPlasmicLoader({
    projects: [
        {
            id: "sBp7DxjFLhESuoHP2PFfNH", // ID do projeto
            token: "HKYU0Ga6f1kT0BK2vZao86f910sV8hP5MTXOZXtMGrMP0IDtmZq1Tt97JPStfZdgXH2bCRsLknAP11sVYMhyIA" // Token da API
        }
    ],
    // Busca sempre as últimas revisões (mesmo que não publicadas).
    // Em produção, defina como "false" para garantir que apenas mudanças publicadas sejam renderizadas.
    preview: true
});
