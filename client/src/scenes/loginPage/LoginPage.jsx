import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/actions";
import FormLogIn from "./FormLogIn";
import logo from "../../assets/icon-10.png";

const LoginPage = () => {
  const { thm } = useSelector((state) => state.themeReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    borderRedFunc,
    resetValues,
    val,
    borderRed,
    matchEmail,
    matchPassword,
  } = useForm();

  const userValues = {
    email: `${val.email}`,
    password: `${val.password}`,
  };
  const login = async (e) => {
    e.preventDefault();
    if (val.email && val.password) {
      const loggedInResponse = await fetch(
        `${process.env.REACT_APP_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userValues),
        }
      );

      const loggedIn = await loggedInResponse.json();
      if (loggedIn) {
        dispatch(
          LOGIN({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        resetValues();
        navigate("/home");
      } else {
        borderRedFunc();
      }
    }
  };

  return (
    <div className="p-5">
      <div className="w-fit flex items-center  mx-auto mt-5">
        <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
        <div>
          <h1
            className={`text-[2rem] font-semibold  ${thm.text.primary.main}  p-0`}
          >
            boogysh
          </h1>
          <span className={`relative bottom-[0.6rem] text-sm `}>
            Social Media
          </span>
        </div>
      </div>
      <div className="max-w-[500px] mx-auto bg-white rounded-[1.5rem] p-7  mb-5">
        <h2 className="text-[1.3rem] font-medium mb-3">
          Welcome to boogysh social media!
        </h2>
        <FormLogIn
          login={login}
          borderRed={borderRed}
          matchEmail={matchEmail}
          matchPassword={matchPassword}
        />
        <Link
          to="signin"
          className="underline text-orange-500 hover:text-orange-400 "
        >
          Don't have an account? Sign Up here.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
