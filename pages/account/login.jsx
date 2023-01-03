import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService } from "services";

import Image from "next/image";

export default Login;

function Login() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
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
    <Layout>
      <div className="bg-[url('/img/wild-fox-white.svg')] bg-[length:50%] bg-no-repeat bg-center lg:w-1/2 w-0 transition-[width] delay-100 bg-primary-500 rounded-l"></div>

      <div className="w-1/2 rounded-r flex flex-center justify-center flex-col">
        <div className="max-w-md w-full mx-auto text-center">

          <div className="flex w-full flex-col gap-5">
            <h1 className="text-primary-500">entrar</h1>

            <span className="text-right">
              <span className="text-zinc-400">Não tem uma conta?</span> <Link className="text-primary-500" href="/account/register">Registre-se</Link>
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
