// import React, { useEffect, useRef, useState } from "react";

// const Manager = () => {
//   const [form, setForm] = useState({ site: " ", username: " ", password: " " });
//   const [passwordArray, setPasswordArray] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const passwords = localStorage.getItem("password");
//     if (passwords) {
//       setPasswordArray = JSON.parse(passwords);
//     }
//   }, []);

//   const show = () => {
//     alert("show");
//     if (ref.current.src.includes("icons/eye.png")) {
//       ref.current.src = "icons/hidden.png";
//     } else {
//       ref.current.src = "icons/eye.png";
//       setShowPassword((prev) => !prev);
//     }
//   };

//   const savePassword = () => {
//     if (!form.site || !form.username || !form.password) {
//       alert("Please fill all fields before saving.");
//       return;
//     }
//     setPasswordArray([...passwordArray, form]);
//     localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
//     console.log([...passwordArray, form]);
//   };
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   return (
//     <>
//       <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

//       <div className="container mycontainer">
//         <h1 className="text-4xl font-bold text-center">
//           <span className="text-green-500">&lt;</span>
//           Pass
//           <span className="text-green-500">OP/&gt;</span>
//         </h1>
//         <p className="text-center text-lg text-green-700">
//           Your Password Manager
//         </p>
//         <div className="text-black flex flex-col p-4  gap-6 items-center">
//           <input
//             value={form.site}
//             onChange={handleChange}
//             name="site"
//             placeholder="Enter Website URL"
//             type="text"
//             className="rounded-full border border-green-500 w-full px-4 py-1"
//           />
//           <div className="flex w-full gap-6">
//             <input
//               value={form.username}
//               name="username"
//               onChange={handleChange}
//               placeholder="Enter Username"
//               type="text"
//               className="rounded-full border border-green-500 w-full px-4 py-1"
//             />
//             <div className="relative">
//               <input
//                 value={form.password}
//                 name="password"
//                 onChange={handleChange}
//                 placeholder="Enter Password"
//                 type={showPassword === false ? "text" : "password"}
//                 className="rounded-full border border-green-500 w-full px-4 py-1"
//               />
//               <span
//                 className="absolute right-2 top-1 cursor-pointer"
//                 onClick={show}
//               >
//                 <img ref={ref} width={26} src="icons/hidden.png" alt="Show" />
//               </span>
//             </div>
//           </div>
//           <button
//             onClick={savePassword}
//             className="bg-green-400 hover:bg-green-500 rounded-full flex justify-center items-center w-fit px-2 py-1 gap-2 border border-green-600"
//           >
//             <div>
//               <lord-icon
//                 src="https://cdn.lordicon.com/efxgwrkc.json"
//                 trigger="hover"
//                 style={{ width: "26px", height: "26px" }}
//               ></lord-icon>
//             </div>
//             Add Password
//           </button>
//         </div>
//         <div className="passwords">
//           <h1 className="font-bold py-2 text-2xl">Your Passwords</h1>
//           {passwordArray.length === 0 && <div>No Passwords To Show</div>}
//           {passwordArray.length != 0 && (
//             <table className="table-auto w-full  rounded-md overflow-hidden">
//               <thead className=" bg-green-600 text-white">
//                 <tr>
//                   <th className="py-2">Site</th>
//                   <th className="py-2">Username</th>
//                   <th className="py-2">Password</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-green-100">
//                 {passwordArray.map((i, index) => (
//                   <tr key={index}>
//                     <td className="text-center px-4 w-32 py-2">
//                       <a href="{i.site} target = '_blank"></a>
//                       {i.site}
//                     </td>
//                     <td className="text-center px-4 w-32 py-2">{i.username}</td>
//                     <td className="text-center px-4 w-32 py-2">{i.password}</td>
//                   </tr>
//                 ))}

//                 {/* <tr>
//                   <td className="text-center px-4 w-32 py-2">Witchy Woman</td>
//                   <td className="text-center px-4 w-32 py-2">The Eagles</td>
//                   <td className="text-center px-4 w-32 py-2">1972</td>
//                 </tr>
//                 <tr>
//                   <td className="text-center px-4 w-32 py-2">Shining Star</td>
//                   <td className="text-center px-4 w-32 py-2">
//                     Earth, Wind, and Fire
//                   </td>
//                   <td className="text-center px-4 w-32 py-2">1975</td>
//                 </tr> */}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Manager;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 controls input visibility

  // Load from localStorage
  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // Toggle visibility in table
  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Toggle visibility in input
  const toggleInputPasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields before saving.");
      return;
    }

    const updated = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setForm({ site: "", username: "", password: "" });

    setShowPassword(false);
    toast("Password saved successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password")) {
      const updatedArray = passwordArray.filter((array) => array.id !== id);
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast("Password deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]bg-size-[16px_16px]" />
      <div className="container mx-auto m-4 w-[90%]">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-center text-lg text-green-700">
          Your Password Manager
        </p>

        {/* Input Form */}
        <div className="text-black flex flex-col p-4 gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter Website URL"
            type="text"
            className="rounded-full border border-green-500 w-full px-4 py-1"
          />

          <div className="md:flex  w-full gap-4">
            <input
              value={form.username}
              name="username"
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-green-500 w-full px-4 py-1"
            />

            {/* 👇 Password input with toggle eye */}
            <div className="relative w-full py-4 md:py-0">
              <input
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                className="rounded-full border border-green-500 w-full px-4 py-1 pr-10"
              />
              <img
                src={showPassword ? "icons/eye.png" : "icons/hidden.png"}
                width={22}
                alt="Toggle visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleInputPasswordVisibility}
              />
            </div>
          </div>

          {/* Add Password Button */}
          <button
            onClick={savePassword}
            className="add-btn bg-green-400 hover:bg-green-500 rounded-full flex justify-center cursor-pointer items-center w-fit px-3 py-1.5 gap-2 border-2 border-green-200"
            type="button"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              target=".add-btn"
              style={{ width: "26px", height: "26px" }}
            ></lord-icon>
            Save
          </button>
        </div>

        {/* Password List Table */}
        <div className="passwords mt-6">
          <h1 className="font-bold py-2 text-2xl">Your Passwords</h1>

          {passwordArray.length === 0 ? (
            <div>No Passwords To Show</div>
          ) : (
            <table className="table-auto w-full ">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center px-4  py-2">
                      <div className="flex gap-2 justify-center p-1">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-700 underline"
                        >
                          {item.site}
                        </a>
                        <img
                          className="w-5 cursor-pointer"
                          onClick={() => copyText(item.site)}
                          src="./icons/copy.png"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center px-4  py-2">
                      <div className="flex gap-2 justify-center p-1">
                        {item.username}
                        <img
                          className="w-5 cursor-pointer"
                          src="./icons/copy.png"
                          onClick={() => copyText(item.username)}
                          alt="copy"
                        />
                      </div>
                    </td>

                    {/* 👇 Password cell with toggle eye icon */}
                    <td className="text-center px-4 py-2">
                      <div className="flex gap-2 justify-center p-1">
                        <div className="flex justify-center items-center gap-2">
                          <span className="">
                            {visiblePasswords[index]
                              ? item.password
                              : "•".repeat(item.password.length)}
                          </span>
                          <img
                            src={
                              visiblePasswords[index]
                                ? "icons/eye.png"
                                : "icons/hidden.png"
                            }
                            width={22}
                            alt="Toggle visibility"
                            className="cursor-pointer"
                            onClick={() => togglePasswordVisibility(index)}
                          />
                        </div>
                        <img
                          className="w-5 cursor-pointer"
                          onClick={() => copyText(item.password)}
                          src="./icons/copy.png"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center p-1">
                        <div className="flex justify-center items-center gap-2">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <CiEdit size={30} />
                          </div>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <MdDelete size={30} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
