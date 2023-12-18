export default function RegisterForm() {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
          {/*Form*/}
          <form className="mt-6 space-y-6"></form>
        </div>
      </div>
    </div>
  );
}
