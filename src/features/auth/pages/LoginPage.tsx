import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { loginSchema, type LoginFormInputs } from '../schemas/login.schema';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { loginUserThunk } from '../../../app/store/authThunks';


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  // Redirección inteligente si venían de intentar entrar a una ruta protegida
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

// Reemplaza la antigua función onSubmit de tu LoginPage por esta:
const onSubmit = async (data: LoginFormInputs) => {
  // Disparamos el Thunk enviando las credenciales validadas por Zod
  const resultAction = await dispatch(loginUserThunk(data));

  // Si la acción se ejecutó con éxito (fulfilled), redirigimos al Dashboard
  if (loginUserThunk.fulfilled.match(resultAction)) {
    navigate(from, { replace: true });
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">NexusERP</h2>
          <p className="text-gray-500 mt-1">Inicia sesión para acceder al sistema</p>
        </div>

        {authError && (
          <Message severity="error" text={authError} className="w-full mb-4 justify-start" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* Campo: Usuario */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold text-gray-700 text-sm">
              Usuario
            </label>
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    id="username"
                    className={`w-full ${errors.username ? 'p-invalid' : ''}`}
                    placeholder="Ingresa tu usuario"
                  />
                )}
              />
            </span>
            {errors.username && (
              <small className="p-error text-xs">{errors.username.message}</small>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
              Contraseña
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  id="password"
                  toggleMask
                  feedback={false}
                  className="w-full"
                  inputClassName={`w-full ${errors.password ? 'p-invalid' : ''}`}
                  placeholder="Ingresa tu contraseña"
                />
              )}
            />
            {errors.password && (
              <small className="p-error text-xs">{errors.password.message}</small>
            )}
          </div>

          {/* Botón de Envío */}
          <Button
            type="submit"
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            loading={isLoading}
            className="w-full bg-blue-900 hover:bg-blue-800 border-none mt-2 py-3"
          />
        </form>
      </div>
    </div>
  );
};