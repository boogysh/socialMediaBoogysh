import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import LoaderBtn from "../../components/Loader/LoaderBtn";

const FormSignIn = ({
  matchFN,
  matchLN,
  matchLocation,
  matchOccupation,
  matchEmail,
  matchPassword,
  borderRed,
  valImage,
  register,
  image,
  setImage,
}) => {
  const [isLoading, setLoading] = useState(false);

  const style = {
    input_red: "w-full  p-4 bg-blue-50 rounded-md border-2 border-red-500",

    input_cyan:
      "w-full  p-4 bg-blue-50 border-[1px] border-gray-800 rounded-md outline-2 outline-orange-400",
    input_image_red:
      "flex items-center bg-blue-50 border-2 border-red-500  rounded-[5px] w-full h-auto p-3 my-3",
    input_image_cyan:
      "flex items-center bg-blue-50 border border-gray-800  rounded-[5px] w-full h-auto p-3 my-3",
  };

  return (
    <form onSubmit={register}>
      {/* ---FIRST NAME--- */}
      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="firstName"
      >
        First Name
      </label>
      <input
        onChange={matchFN}
        className={borderRed.firstName ? style.input_red : style.input_cyan}
        id="firstName"
        placeholder="Your First Name"
        type="text"
      />
      <p
        id="FNErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* ----LAST NAME---- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="lastName"
      >
        Last Name
      </label>
      <input
        onChange={matchLN}
        className={borderRed.lastName ? style.input_red : style.input_cyan}
        id="lastName"
        placeholder="Your Last Name"
        type="text"
      />
      <p
        id="LNErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* ----LOCATION----- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="location"
      >
        Location
      </label>
      <input
        onChange={matchLocation}
        className={borderRed.location ? style.input_red : style.input_cyan}
        id="location"
        placeholder="Your Location"
        type="text"
      />
      <p
        id="LocationErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* ----OCCUPATION---- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="occupation"
      >
        Occupation
      </label>
      <input
        onChange={matchOccupation}
        className={borderRed.occupation ? style.input_red : style.input_cyan}
        id="occupation"
        placeholder="Your Occupation"
        type="text"
      />
      <p
        id="OccupationErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* -----ADD-IMAGE-------- */}

      <div
        className={
          borderRed.image ? style.input_image_red : style.input_image_cyan
        }
      >
        <div className=" border-[3px] border-dashed border-blue-200 w-full h-full px-5 cursor-pointer relative">
          <label
            className="relative bg-white px-2 rounded bottom-7 right-6"
            htmlFor="userImage"
          >
            Image
          </label>
          <input
            className="opacity-0 w-full h-full absolute left-0"
            type="file"
            id="userImage"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="flex items-center">
            {!image ? (
              <p className=" relative bottom-[10px] text-gray-400 ">
                Add your image here
              </p>
            ) : (
              <p className="relative bottom-[10px] text-gray-400">
                {image.name}
              </p>
            )}
            <FiEdit2 className="relative bottom-[10px] w-5 h-5 ml-auto text-gray-400" />
          </div>
        </div>
      </div>

      {/* ------EMAIL-------- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="email"
      >
        Email
      </label>
      <input
        onChange={matchEmail}
        className={borderRed.email ? style.input_red : style.input_cyan}
        id="email"
        placeholder="Your Email Address"
        type="email"
      />
      <p
        id="EmailErrorMsg"
        className=" min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* ---PASSWORD---- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="password"
      >
        Password
      </label>
      <input
        onChange={matchPassword}
        className={borderRed.password ? style.input_red : style.input_cyan}
        id="password"
        placeholder="Your Password"
        type="password"
      />
      <p
        id="PasswordErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>
      {/* REGISTER BTN */}
      <div
        onClick={() => setLoading(true)}
        className="z-10 relative flex w-auto h-auto justify-center items-center"
      >
        <button
          onClick={register}
          type="submit"
          className="z-99 w-full h-14 my-8 bg-orange-500 rounded-md text-white  outline-2 text-xs font-medium  hover:bg-orange-400"
        >
          {!isLoading && <span>REGISTER</span>}
        </button>
        {isLoading && (
          <div
            className={`absolute flex justify-center items-center w-auto h-auto z-99`}
          >
            <LoaderBtn />
          </div>
        )}
      </div>
    </form>
  );
};

export default FormSignIn;
