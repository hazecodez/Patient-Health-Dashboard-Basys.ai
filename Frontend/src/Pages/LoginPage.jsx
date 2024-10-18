import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AdminSchema from "../Validations/AdminSchema";
import { adminLogin } from "../Services/Apis";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: AdminSchema,
      onSubmit: Submission,
    });

  async function Submission(formData) {
    try {
      const response = await adminLogin(formData);
      if (response?.data.token) {
        toast.success("Successfully logged");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <h2
            id="form-title"
            className="text-center text-3xl font-bold mb-10 text-gray-900"
          >
            Welcome Back !!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black transition-colors duration-500 border uppercase text-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
