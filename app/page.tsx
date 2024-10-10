import FormWithReactHookForm from "@/components/form-with-react-hook-form";
import FormWithReactHookFormAndZod from "@/components/form-with-rhf-and-zod";
import FormWithReactHookFormAndZodAndServer from "@/components/form-with-rhf-and-zod-and-server";
import FormWithoutReactHookForm from "@/components/form-without-react-hook-form";
import FormWithUseForm from "@/components/form-with-useForm";
import FromController from "@/components/controller";
import UseField from "@/components/useField";


export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-5">
     <main className="bg-slate-300 min-h-screen p-5">
      {/* <FormWithoutReactHookForm /> */}
      {/* <FormWithReactHookForm /> */}
      {/* <FormWithReactHookFormAndZod /> */}
      {/* <FormWithReactHookFormAndZodAndServer /> */}
      {/* <FormWithUseForm/> */}
      {/* <FromController/> */}
      <UseField/>
    </main>
  );
}
