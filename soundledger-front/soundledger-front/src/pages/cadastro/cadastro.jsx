import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import footer from "./footer.svg";
import image5 from "./image-5.png";
import "./style.css";

const formSchema = z
    .object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        passwordConfirmation: z.string().min(6, "Confirme sua senha"),
        role: z.string().min(1, "Selecione uma função"),
        artisticName: z.string().optional(),
        specialization: z.string().optional(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Senhas não coincidem",
        path: ["passwordConfirmation"],
    });

const roles = [
    { value: "artist", label: "Artista" },
    { value: "composer", label: "Compositor" },
    { value: "producer", label: "Produtor" },
    { value: "label", label: "Gravadora" },
];

const specializations = {
    artist: [
        { value: "singer", label: "Cantor(a)" },
        { value: "musician", label: "Instrumentista" },
        { value: "performer", label: "Performer" },
        { value: "visual-artist", label: "Artista Visual" },
        { value: "dancer", label: "Dançarino(a)" },
    ],
    composer: [
        { value: "songwriter", label: "Compositor de Letras" },
        { value: "melody-composer", label: "Compositor de Melodias" },
        { value: "arranger", label: "Arranjador" },
        { value: "orchestrator", label: "Orquestrador" },
        { value: "beat-maker", label: "Beatmaker" },
    ],
    producer: [
        { value: "music-producer", label: "Produtor Musical" },
        { value: "sound-engineer", label: "Engenheiro de Som" },
        { value: "mixing-engineer", label: "Engenheiro de Mixagem" },
        { value: "mastering-engineer", label: "Engenheiro de Masterização" },
        { value: "executive-producer", label: "Produtor Executivo" },
    ],
    label: [
        { value: "independent", label: "Gravadora Independente" },
        { value: "major", label: "Major Label" },
        { value: "digital-label", label: "Selo Digital" },
        { value: "distribution", label: "Distribuição" },
        { value: "publishing", label: "Editora Musical" },
    ],
};

const RegisterForm = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: "",
            artisticName: "",
            specialization: "",
        },
    });

    const onSubmit = (values) => {
        console.log(values);
        toast({
            title: "Cadastro realizado!",
            description: "Seus dados foram registrados com sucesso.",
        });
    };

    const isArtisticRole =
        selectedRole && ["artist", "composer", "producer", "label"].includes(selectedRole);

    return (
        <div className="cadastro">
            <div className="div">
                <div className="overlap-group">
                    <div className="form">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Nome */}
                            <div className="input">
                                <div className="text-wrapper">Nome Completo</div>
                                <input
                                    type="text"
                                    {...form.register("name")}
                                    placeholder="Digite seu nome completo"
                                    className="label-wrapper"
                                />
                                <span>{form.formState.errors.name?.message}</span>
                            </div>

                            {/* Email */}
                            <div className="input">
                                <div className="text-wrapper">Email</div>
                                <input
                                    type="email"
                                    {...form.register("email")}
                                    placeholder="seu@email.com"
                                    className="label-wrapper"
                                />
                                <span>{form.formState.errors.email?.message}</span>
                            </div>

                            {/* Senha */}
                            <div className="input-2">
                                <div className="text-wrapper">Senha</div>
                                <input
                                    type="password"
                                    {...form.register("password")}
                                    placeholder="••••••••"
                                    className="field-2"
                                />
                                <span>{form.formState.errors.password?.message}</span>
                            </div>

                            {/* Confirmação de Senha */}
                            <div className="input-2">
                                <div className="text-wrapper">Confirme sua senha</div>
                                <input
                                    type="password"
                                    {...form.register("passwordConfirmation")}
                                    placeholder="••••••••"
                                    className="field-2"
                                />
                                <span>{form.formState.errors.passwordConfirmation?.message}</span>
                            </div>

                            {/* Função */}
                            <div className="input-2">
                                <div className="text-wrapper">Função Artística</div>
                                <select
                                    {...form.register("role")}
                                    className="field-2"
                                    onChange={(e) => {
                                        form.register("role").onChange(e);
                                        setSelectedRole(e.target.value);
                                        form.setValue("specialization", "");
                                    }}
                                >
                                    <option value="">Selecione sua função</option>
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                <span>{form.formState.errors.role?.message}</span>
                            </div>

                            {/* Nome artístico ou da gravadora */}
                            {isArtisticRole && (
                                <div className="input-3">
                                    <div className="text-wrapper">
                                        {selectedRole === "label" ? "Nome da Gravadora" : "Nome Artístico"}
                                    </div>
                                    <input
                                        type="text"
                                        {...form.register("artisticName")}
                                        placeholder={
                                            selectedRole === "label"
                                                ? "Digite o nome da gravadora"
                                                : "Digite seu nome artístico"
                                        }
                                        className="div-wrapper"
                                    />
                                </div>
                            )}

                            {/* Outra Função */}
                            {isArtisticRole && (
                                <div className="input-4">
                                    <div className="text-wrapper">Outra Função?</div>
                                    <select {...form.register("specialization")} className="field-2">
                                        <option value="">Selecione a função</option>
                                        {selectedRole &&
                                            specializations[selectedRole]?.map((spec) => (
                                                <option key={spec.value} value={spec.value}>
                                                    {spec.label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}

                            {/* Botão */}
                            <button type="submit" className="button">
                                <div className="text-wrapper-2">Cadastrar</div>
                            </button>
                        </form>
                    </div>

                    <div className="navigation">
                        <img className="img" alt="Image" src={image5} />
                    </div>

                    <img className="navigation-footer" alt="Navigation footer" src={footer} />

                    <div className="heading">
                        <div className="text-wrapper-3">Cadastre-se</div>
                    </div>

                    <div className="text-wrapper-4">Já possui cadastro? Login</div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
