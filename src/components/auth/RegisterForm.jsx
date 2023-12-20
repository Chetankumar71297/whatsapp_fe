import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const { status } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = (data) => console.log(data);
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
          {/*Form*/}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <AuthInput
              name="name"
              type="text"
              placeholder="Full name"
              register={register}
              error={errors?.name?.message}
            />
            <AuthInput
              name="email"
              type="text"
              placeholder="Email address"
              register={register}
              error={errors?.email?.message}
            />
            <AuthInput
              name="status"
              type="text"
              placeholder="Status"
              register={register}
              error={errors?.status?.message}
            />
            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
            />
            {/*submit button*/}
            <button
              className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
              type="submit"
            >
              {status === "loading" ? <PulseLoader color="#fff" /> : "Sign up"}
            </button>
            {/*sign in link*/}
            <p className="flex flex-col items-center justify-center mt-10 text-center text-lg dark:text-dark_text_1">
              <span>Already have an account?</span>
              <Link
                to="/login"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
