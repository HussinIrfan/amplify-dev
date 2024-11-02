import { useState } from 'react';
import styles from './page.module.css';

const NewsletterPopup = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const re.test(String(email).toLowerCase());
};

const handleSubmit = (e:any) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    setError('Invalid email address');
  } else {
    setError('');
    setSubmitted(true);
    console.log('Email submitted: ', email);
  }
};

const handleDismiss = () => {
  setSubmitted(false);
  setEmail('');
};

return (
  <div className = "flex items-center justify-center min-h-screen bg-gray-500 font-Roboto">
    {!submitted ? (                
        <div className="lg:-[90%] lg:p-8 bg-[white] shadow-md rounded-lg flex lg:flex-row flex-col-reverse ">
            <div className="lg:pl-8 pl-5 lg:mt-0 mt-5">
                <h2 className="font-extrabold text-4xl text-[#232643]">Stay Updated!</h2>
                <p className="text-[16px] py-2 w-[90%] ">
                   Sign up for our newsletter and stay up to date on:
                </p>
                <ul className="lg:my-5 my-3 text-sm px-3 ">
                    <li className="flex items-center gap-x-2 my-3">
                        <img src={icons} alt="icons" className="w-[18px]" />
                        <span>The firefighter/paramedic of the year</span>
                    </li>
                    <li className="flex items-center gap-x-2 my-3">
                        <img src={icons} alt="icons" className="w-[18px]" />
                        <span>Local events within the community</span>
                    </li>
                    <li className="flex items-center gap-x-2 my-3">
                        <img src={icons} alt="icons" className="w-[18px]" />
                        <span>And much more </span>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} className="flex flex-col w-[90%] lg:my-0 my-10 lg:pl-0 pl-4">
                    <div className="flex justify-between">
                        <label htmlFor="email" className="text-sm font-bold">Email</label>
                        {error && <span className="text-red-500 text-sm font-bold" >{error}</span>}
                    </div>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@company.com"
                        className={`w-[100%] px-4 py-3 my-2 border-2 ${error ? 'border-red-500' : 'border-black'} rounded-lg`}
                    />
                    <button type="submit" className="bg-[#FF6257] hover:bg-[#232643] text-white p-4 rounded-lg  my-5  hover:scale-90 transform transition duration-300 ease-in-out  ">Subscribe </button>
                </form>
            </div>
            <img src={notifiimage} alt="Notification" className="lg:w-[300px] lg:block hidden mt-2 w-full" />
            <img src={moblieimage} alt="Notification" className=" w-full lg:hidden block " />
        </div>
    ) : (
        <div className="lg:w-[35%] h-auto bg-white lg:p-10 p-6 rounded-2xl">
            <img src={icons} alt="" className="w-16 " />
            <h1 className="lg:text-3xl text-2xl text-gray-950 lg:w-[60%] font-Roboto font-bold py-5">Thanks for subscribing! </h1>
            <p className="w-[100%]   ">
                A confirmation email has been sent to your {email} address. Please click on the confirmation link to confirm your subscription.
            </p>
            <button
                type="button"
                onClick={handleDismiss}
                className="bg-[#FF6257] hover:bg-[#232643] lg:mt-5 mt-52 text-white p-3 rounded-lg w-[95%] mx-auto hover:scale-90 transform transition duration-300 ease-in-out "
            >
                Dismiss Message
            </button>
        </div>
    )}
</div>
    );
};

export default NewsletterPopup;
