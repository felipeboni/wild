import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import * as Yup from "yup";

import { Link, Spinner } from "components";
import { Layout } from "components/account";
import { userService } from "services";

import { ArrowRight, Eye, User, GitMerge, Shuffle, Check } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

import Avatar, { genConfig } from "react-nice-avatar";
import { hashRandom } from "react-hash-string";

export default Register;

function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Save nickname to generate avatar on next step
  const [nickname, setNickname] = useState("");
  const [config, setConfig] = useState(genConfig(nickname));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(hashRandom());

  useEffect(() => {
    setConfig(genConfig(avatar));
  }, [avatar]);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Insira o seu nickname")
      .matches(
        /^[aA-zZ\s]+$/,
        "Nickname contém caracteres inválidos"
      )
      .test("", "Nickname contém caracteres inválidos", () => {
        setStep(1);
        return true;
      }),
    firstName: Yup.string()
      .required()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, "Insira um nome válido")
      .max(40)
      .test("", "Insira um nome válido", () => {
        // Use function
        setStep(2);
        return true;
      }),
    lastName: Yup.string()
      .matches(
        /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/,
        "Insira um sobrenome válido"
      )
      .max(40)
      .required()
      .test("", "Insira um sobrenome válido",() => {
        // Use function
        setStep(2);
        return true;
      }),
    password: Yup.string()
      .required("Insira sua senha")
      .min(6, "A senha deve conter 6 caracteres")
      .test("", "A senha deve conter 6 caracteres", () => {
        // Use function
        setStep(2);
        return true;
      }),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService.register(user).then(() => {
      // alertService.success('Registration successful', { keepAfterRouteChange: true });
      router.push("/");
    });
    // .catch(alertService.error);
  }

  return (
    <Layout direction="col">
      <div className="w-full max-w-[400px] mx-auto">
        <ol className="flex items-center w-full">
          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block step ${
              step >= 1 && "active"
            }`}
            onClick={() => setStep(1)}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-gray-100">
              <Eye color="white" size={16} />
            </span>
          </li>

          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block step ${
              step >= 2 && "active"
            }`}
            onClick={() => step >= 2 && setStep(2)}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-gray-100">
              <Eye color={`${step >= 2 ? "white" : "black"}`} size={16} />
            </span>
          </li>

          <li className="flex items-center">
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                step === 3 ? "bg-primary-100" : "bg-gray-100"
              }`}
            >
              <Eye color={`${step >= 3 ? "white" : "black"}`} size={16} />
            </span>
          </li>
        </ol>
      </div>

      <div className="h-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                className="w-full max-w-[500px] mx-auto text-center flex flex-col gap-10"
                key="1"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-3vw", opacity: 0 }}
                transition={{
                  x: { duration: 0.3 },
                  default: { ease: "linear" },
                }}
              >
                <div>
                  <h3 className="text-6xl font-medium text-primary-500 mb-3">
                    Olá!
                  </h3>
                  <h2 className="text-4xl font-medium">O meu apelido é...</h2>
                </div>

                <div>
                  <div className="relative input-floating">
                    <input
                      disabled={formState.isSubmitting}
                      type="text"
                      id="user"
                      className={`peer ${errors.username ? "is-invalid" : ""}`}
                      placeholder=" "
                      {...register("username")}
                      onChange={(evt) => setNickname(evt.target.value)}
                    />

                    <label
                      htmlFor="user"
                      className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Digite o seu nickname...
                    </label>
                  </div>
                  
                  {errors.username?.message && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.username?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="w-fit mx-auto text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center disabled:cursor-not-allowed"
                  onClick={() => setStep(2)}
                  disabled={!nickname}
                >
                  <ArrowRight />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                className="w-full max-w-[500px] mx-auto text-center flex flex-col gap-10"
                key="2"
                initial={{ x: "3vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-3vw", opacity: 0 }}
                transition={{
                  x: { duration: 0.3 },
                  default: { ease: "linear" },
                }}
              >
                <div className="mx-auto relative">
                  <Avatar
                    className="w-32 h-32 ring-offset-4 ring-4 ring-primary-500"
                    {...config}
                  />
                  <Shuffle
                    size={18}
                    color="gray"
                    className="absolute right-[-40px] top-1/2 mt-[-8px] cursor-pointer"
                    onClick={() => setAvatar(hashRandom())}
                  />
                </div>

                <div>
                  <div className="relative input-floating">
                    <input
                      disabled={formState.isSubmitting}
                      type="text"
                      id="firstName"
                      className={`peer ${errors.firstName ? "is-invalid" : ""}`}
                      placeholder=" "
                      {...register("firstName")}
                      onChange={(evt) => setFirstName(evt.target.value)}
                    />

                    <label
                      htmlFor="firstName"
                      className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Digite seu Nome...
                    </label>
                  </div>

                  {errors.firstName?.message && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative input-floating">
                    <input
                      disabled={formState.isSubmitting}
                      type="text"
                      id="lastName"
                      className={`peer ${errors.lastName ? "is-invalid" : ""}`}
                      placeholder=" "
                      {...register("lastName")}
                      onChange={(evt) => setLastName(evt.target.value)}
                    />

                    <label
                      htmlFor="lastName"
                      className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Digite seu Sobrenome...
                    </label>
                  </div>
                  
                  {errors.lastName?.message && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.lastName?.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative input-floating">
                    <input
                      disabled={formState.isSubmitting}
                      type="password"
                      id="password"
                      className={`peer ${errors.password ? "is-invalid" : ""}`}
                      placeholder=" "
                      {...register("password")}
                      onChange={(evt) => setPassword(evt.target.value)}
                    />

                    <label
                      htmlFor="password"
                      className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Digite sua Senha...
                    </label>
                  </div>
                                    
                  {errors.password?.message && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="w-fit mx-auto text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center disabled:cursor-not-allowed"
                  onClick={() => setStep(3)}
                  disabled={!firstName || !lastName || !password}
                >
                  <ArrowRight />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                className="w-full max-w-[500px] mx-auto text-center flex flex-col gap-10"
                key="3"
                initial={{ x: "3vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-3vw", opacity: 0 }}
                transition={{
                  x: { duration: 0.3 },
                  default: { ease: "linear" },
                }}
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl font-medium">
                    Conecte-se ao seu perfil da Steam&reg;
                  </h2>
                  <span>
                    Fique tranquilo! Nós teremos acesso apenas á suas
                    informações públicas - como nome do perfil, status online,
                    entre outros.
                  </span>
                  <span>
                    Você pode ver em detalhes todos os dados que coletamos{" "}
                    <Link className="text-primary-500" href="#">
                      clicando aqui.
                    </Link>
                  </span>
                </div>

                <button
                  className="w-fit mx-auto text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? (
                    <Spinner color={"white"} size={24} />
                  ) : (
                    <Check/>
                  )}

                </button>


              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <span className="text-center text-sm">
        <span className="text-zinc-400">Já tem uma conta?</span>
        &nbsp;
        <Link className="text-primary-500" href="/account/login">
          Entre
        </Link>
      </span>

      {/* <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
            </button>

            <Link href="/account/login" className="btn btn-link">
              Cancel
            </Link>

          </form>
        </div>
      </div> */}
    </Layout>
  );
}
