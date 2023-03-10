import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link, Spinner } from "components";
import { Layout } from "components/account";
import { userService } from "services";

import Image from 'next/image'
import { LogIn } from "react-feather";
import autoAnimate from "@formkit/auto-animate";

export default Login;

function Login() {
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, [parent]);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Preencha com o seu usuário"),
    password: Yup.string().required("Preencha com a sua senha"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService.login(username, password).then(() => {
      // get return url from query parameters or default to '/'
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
    });
    // .catch(alertService.error);
  }

  return (
    <Layout direction="row">
      <div className="bg-[url('/img/logos/wild-fox-white.svg')] bg-[length:50%] bg-no-repeat bg-center lg:w-1/2 w-0 transition-[width] delay-100 bg-primary-500"></div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 flex-center">
        <div className="flex flex-col w-full max-w-md gap-5 mx-auto text-center">

          <div className="flex flex-col w-full gap-5">
            <h1 className="text-primary-500">entrar</h1>

            <span className="text-sm text-right">
              <span className="text-zinc-400">Não tem uma conta?</span>
              &nbsp;
              <Link className="text-primary-500" href="/account/register">
                Registre-se
              </Link>
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="text-left" ref={formRef}>
                <div className="relative input-floating">
                  <input
                    disabled={formState.isSubmitting}
                    type="text"
                    id="user"
                    className={`peer ${errors.username ? "is-invalid" : ""}`}
                    placeholder=" "
                    {...register("username")}
                  />

                  <label
                    htmlFor="user"
                    className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Usuário
                  </label>
                </div>

                {errors.username?.message && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.username?.message}
                  </p>
                )}
              </div>

              <div className="text-left" ref={formRef}>
                <div className="relative input-floating">
                  <input
                    disabled={formState.isSubmitting}
                    type="password"
                    id="password"
                    className={`peer ${errors.password ? "is-invalid" : ""}`}
                    placeholder=" "
                    {...register("password")}
                  />

                  <label
                    htmlFor="password"
                    className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Senha
                  </label>
                </div>

                {errors.password?.message && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <button
                disabled={formState.isSubmitting}
                className="text-white text-center bg-primary-500 hover:bg-primary-600 font-medium rounded-lg px-5 py-3.5  inline-flex items-center justify-center w-full gap-3"
              >
                {formState.isSubmitting ? (
                  <Spinner color={"white"} size={20}/>
                ) : (
                  <LogIn size={20} />
                )}
                Entrar
              </button>
            </div>
          </form>

          <div className="relative text-zinc-400">
            <div className="bg-white inline relative z-[1] px-3">ou</div>
            <div className="after:content-[''] after:left-0 after:top-[50%] after:w-full after:absolute after:bg-zinc-400 after:h-[1px]"></div>
          </div>

          <button
              disabled={formState.isSubmitting}
              className="text-center bg-[#1B2838] rounded-lg px-5 py-2.5 800 inline-flex items-center justify-center w-full"
            >
              <Image src="/img/steam-hor.svg" width={150} height={30}/>
              
          </button>

        </div>
      </div>
    </Layout>
  );
}
