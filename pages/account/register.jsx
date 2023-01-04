import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService } from "services";

import { ArrowRight, Eye, User, GitMerge } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

export default Register;

function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
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
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block peer ${`${ step >= 1 && "active"}`}`}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-gray-100 peer-[.active]:hidden"
            >
              <Eye color="white" size={16} />
            </span>
          </li>

          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
              step >= 2
                ? "text-primary-600 after:border-primary-100"
                : "after:border-gray-100"
            }`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                step >= 2 ? "bg-primary-100" : "bg-gray-100"
              }`}
            >
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
                  />

                  <label
                    htmlFor="user"
                    className="peer-focus:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Digite o seu nickname...
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="w-fit mx-auto text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center"
                onClick={() => setStep(2)}
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
              <div>step 2</div>

              <button
                type="button"
                className="w-fit mx-auto text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center"
                onClick={() => setStep(3)}
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
              <div>step 3</div>
              <button
                type="button"
                className="w-fit mx-auto text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center"
                onClick={() => setStep(1)}
              >
                <ArrowRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
