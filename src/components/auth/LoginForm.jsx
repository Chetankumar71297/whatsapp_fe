import { PulseLoader } from "react-spinners";
import AuthInput from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import { changeStatus, loginUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const onSubmit = async (data) => {
    let res = await dispatch(loginUser(data));
    if (res?.payload?.user) navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
          {/*Form*/}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <AuthInput
              name="email"
              type="text"
              placeholder="Email address"
              register={register}
              error={errors?.email?.message}
            />
            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
            />
            {/*if we have an error*/}
            {error ? (
              <div>
                <p className="text-red-400">{error}</p>
              </div>
            ) : null}
            {/*submit button*/}
            <button
              className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
              type="submit"
            >
              {status === "loading" ? <PulseLoader color="#fff" /> : "Sign in"}
            </button>
            {/*sign up link*/}
            <p className="flex flex-col items-center justify-center mt-10 text-center text-lg dark:text-dark_text_1">
              <span>You do not have an account?</span>
              <Link
                to="/register"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
